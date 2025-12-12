import fs from "fs";
import path from "path";

const promptPath = path.join(__dirname, "prompt.txt");

export const prompt = fs.readFileSync(promptPath, "utf-8");
