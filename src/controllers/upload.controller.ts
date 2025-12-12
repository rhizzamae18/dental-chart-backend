import { Request, Response } from "express";
import { extractFormData } from "../services/gemini.service";
import { prompt } from "../prompts/promptLoaded";

import { prisma } from "../config/prisma";

export const uploadImage = async (req: Request, res: Response) => {
  const file = (req as any).file;

  try {
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const extractedData = await extractFormData(
      file.buffer,
      file.mimetype,
      prompt
    );

    const { patient, dentalHistory, medicalHistory } = extractedData;

    function toISODateOrNull(value: any): string | null {
      if (!value) return null;
      const d = new Date(value);
      return isNaN(d.getTime()) ? null : d.toISOString();
    }

    patient.birthdate = toISODateOrNull(patient.birthdate);
    patient.effectiveDate = toISODateOrNull(patient.effectiveDate);

    if (patient.age) {
      const parsedAge = parseInt(patient.age);
      patient.age = isNaN(parsedAge) ? null : parsedAge;
    }

    const saveForm = await prisma.patient.create({
      data: {
        ...patient,

        dentalHistory: dentalHistory ? { create: dentalHistory } : undefined,

        medicalHistory: medicalHistory
          ? {
              create: {
                ...medicalHistory,

                allergies: medicalHistory.allergies
                  ? { create: medicalHistory.allergies }
                  : undefined,

                medicalConditions: medicalHistory.medicalConditions
                  ? { create: medicalHistory.medicalConditions }
                  : undefined,

                forWomenOnly: medicalHistory.forWomenOnly
                  ? { create: medicalHistory.forWomenOnly }
                  : undefined,
              },
            }
          : undefined,
      },
      include: {
        dentalHistory: true,
        medicalHistory: {
          include: {
            medicalConditions: true,
            allergies: true,
            forWomenOnly: true,
          },
        },
      },
    });

    return res.json({ success: true, saveForm, extracted: extractedData });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      error: "Failed to process image",
      detail: error.message,
    });
  }
};
