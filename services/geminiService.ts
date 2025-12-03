import { GoogleGenAI } from "@google/genai";

const getClient = () => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        throw new Error("API Key not found");
    }
    return new GoogleGenAI({ apiKey });
};

export const generateWeddingWish = async (tone: 'sentimental' | 'funny' | 'formal', relationship: string): Promise<string> => {
    try {
        const ai = getClient();
        const prompt = `Write a short, ${tone} wedding wish (max 2 sentences) for a couple named Thomas and Vivian. The writer is a ${relationship}. Keep it warm and personal.`;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text || "Wishing you a lifetime of love and happiness.";
    } catch (error) {
        console.error("Error generating wish:", error);
        return "Wishing you a lifetime of love and happiness.";
    }
};