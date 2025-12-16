import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { extractFormData } from "../services/gemini.service";
import { prompt } from "../prompts/prompt4Loaded";

export const uploadPage4Form = async (req: Request, res: Response) => {
  const { patientId } = req.body;

  const file = (req as any).file;

  if (!patientId) {
    return res.status(400).json({ error: "Attach page 1, 2, and 3 first" });
  }

  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const chart = await prisma.dentalChart.findUnique({
      where: { patientId },
    });

    if (!chart) {
      return res.status(400).json({ error: "No chartId found" });
    }

    const extractedData = await extractFormData(
      file.buffer,
      file.mimetype,
      prompt
    );

    console.log("📊 Page 4 Extracted Data:", JSON.stringify(extractedData, null, 2));

    await prisma.treatmentRecord.deleteMany({
      where: { dentalChartId: chart.id },
    });

    // Check if treatmentRecord exists and is an array
    if (!extractedData.treatmentRecord || !Array.isArray(extractedData.treatmentRecord)) {
      console.log("⚠️ No treatment records found or invalid format");
      return res.json({
        success: true,
        dentalChartId: chart.id,
        extractedData,
        message: "No treatment records to save"
      });
    }

    // Filter out empty records
    const validRecords = extractedData.treatmentRecord.filter((row: any) => {
      return row.date || row.toothQuantity || row.procedure || row.dentist;
    });

    if (validRecords.length === 0) {
      console.log("ℹ️ No valid treatment records to save");
      return res.json({
        success: true,
        dentalChartId: chart.id,
        extractedData,
        message: "No valid treatment records to save"
      });
    }

    const createdRecords = await prisma.treatmentRecord.createMany({
      data: validRecords.map((row: any) => {
        const charged = Number(row.amountCharged) || 0;
        const paid = Number(row.amountPaid) || 0;

        return {
          dentalChartId: chart.id,
          date: row.date ? new Date(row.date) : null,
          toothQuantity: row.toothQuantity || null,
          procedure: row.procedure || null,
          dentist: row.dentist || null,
          amountCharged: charged,
          amountPaid: paid,
          balance: row.balance,
          nextAppointment: row.nextAppointment
            ? new Date(row.nextAppointment)
            : null,
        };
      }),
    });

    return res.json({
      success: true,
      dentalChartId: chart.id,
      extractedData
    });
  } catch (error: any) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Failed to process page 4", detail: error.message });
  }
};
