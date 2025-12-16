import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_KEY) {
  throw new Error("No GEMINI_API_KEY found");
}

export const genAI = new GoogleGenerativeAI(GEMINI_KEY);

console.log(GEMINI_KEY);

export const geminiModel = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});