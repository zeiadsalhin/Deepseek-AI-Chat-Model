// src/deepseekService.js

import OpenAI from "openai";

// Initialize DeepSeek API connection
const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: '<DeepSeek API Key>' // Replace with your actual DeepSeek API key
});

// Function to send a message and get a response
export async function getDeepSeekResponse(userMessage) {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: userMessage },
      ],
      model: "deepseek-chat", // Using DeepSeek's chat model
    });
    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Error with DeepSeek API:", error);
    return "Sorry, something went wrong. Please try again.";
  }
}
