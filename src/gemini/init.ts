import { GoogleGenerativeAI, StartChatParams } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export function startChatSession(chatHistory: StartChatParams) {
  return model.startChat(chatHistory);
}

export let chat = startChatSession({ history: [] });

export function updateChatSession(chatHistory: StartChatParams) {
  chat = startChatSession(chatHistory);
}
