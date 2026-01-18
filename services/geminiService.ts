import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.EXPO_PUBLIC_GEMINI_KEY || "";
const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateFridgeRecipe = async (ingredients: string[]) => {
  if (!API_KEY) return null;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash", 
      contents: [{ 
        role: "user", 
        parts: [{ text: `I have: ${ingredients.join(", ")}. Suggest 3 different recipes. Return ONLY a JSON array of objects, each with: "name", "ingredients", "instructions". Do not include markdown.` }] 
      }],
    });

    let text = response.text || "[]";
    if (text.includes("```")) {
        text = text.replace(/```json|```/g, "").trim();
    }

    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
};