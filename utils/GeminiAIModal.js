import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenerativeAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
});

async function main() {
  const model = ai.getGenerativeModel({ model: "gemini-pro" }); 

  const result = await model.generateContent(
    "Explain how AI works in a few words"
  );
  const response = await result.response;
  const text = await response.text();

  console.log(text);
}

main();
