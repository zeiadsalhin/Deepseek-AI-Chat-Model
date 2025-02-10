import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini API connection
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_DeepSeek_API_KEY);

// Function to send a message and get a response
export async function getDeepSeekResponse(userMessage) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(userMessage);
    return result.response.text();
  } catch (error) {
    console.error("Error with Gemini API:", error);
    return "Sorry, something went wrong. Please try again.";
  }
}