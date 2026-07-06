import { GoogleGenerativeAI } from "@google/generative-ai";

export const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-pro";

let cachedClient: GoogleGenerativeAI | null = null;

export function getGeminiClient(): GoogleGenerativeAI {
  if (cachedClient) return cachedClient;
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY не задано в .env.local");
  }
  cachedClient = new GoogleGenerativeAI(apiKey);
  return cachedClient;
}
