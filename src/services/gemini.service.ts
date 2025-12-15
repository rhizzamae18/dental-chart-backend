import { geminiModel } from "../lib/gemini";

export const extractFormData = async (
  buffer: Buffer,
  mimeType: string,
  prompt: string
) => {
  const image = {
    inlineData: {
      data: buffer.toString("base64"),
      mimeType: mimeType,
    },
  };

  const result = await geminiModel.generateContent({
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }, image],
      },
    ],
    generationConfig: {
      responseMimeType: "application/json",
    },
  });

  const raw = result.response.text();

  const cleaned = raw.replace(/```json|/g, "").trim();

  return JSON.parse(cleaned);
};
