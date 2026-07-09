import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ChatMessage } from '../types';

let ai: GoogleGenAI | null = null;

const getAiClient = () => {
  const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'undefined' || apiKey === '') {
    return null;
  }
  if (!ai) {
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
};

export const getGeminiCoachResponse = async (
  history: ChatMessage[], 
  currentQuestion: string,
  userCode: string = ""
): Promise<string> => {
  try {
    const aiClient = getAiClient();
    if (!aiClient) {
      return "The coding coach is currently offline because the GEMINI_API_KEY is not configured. Add the environment variable to enable this feature!";
    }

    const systemInstruction = `
      You are an expert FAANG Interview DSA Coach. 
      Your goal is to help students solve coding problems without giving them the direct answer.
      - Ask leading questions.
      - Provide small hints about data structures or algorithms.
      - Correct their logic if they are heading in the wrong direction.
      - Encourage the user to think about time and space complexity.
      - If they provide code, review it and point out edge cases or bugs.
      - Keep responses encouraging and professional.
      - Current Question the user is working on: ${currentQuestion}.
    `;

    const contents = history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    const response = await aiClient.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: contents as any,
      config: {
        systemInstruction,
        temperature: 0.7,
        topP: 0.9,
      }
    });

    return response.text || "I'm having trouble thinking of a hint right now. Try explaining your approach!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The coding coach is currently unavailable. Try again in a moment!";
  }
};