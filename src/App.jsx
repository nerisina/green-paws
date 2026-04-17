import { useState } from "react";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

function App(){
const [message, setMessage] = useState("");
const [messages, setMessages] = useState([])

const askGemini = async (userMessage) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: userMessage,
    config: {
      systemInstruction: `You are a friendly assistant for an Earth Day app called Poop for the Planet. 
      You help dog owners understand the environmental impact of plastic dog poop bags and suggest eco-friendly alternatives like compostable bags, dog waste composters, and biodigesters. 
      Keep answers short, friendly, and fun. Use dog and earth emojis occasionally 🐶🌍`,
    },
  });
  return response.text;
}

const handleSend = async () => {
  if(!message.trim()) return
  setMessage('');
  setMessages([...messages, { role: 'user', text: message}])

  const reply = await askGemini(message)
  setMessages(prev => [...prev, {role: 'gemeni', text: reply}])
}

  return(
    <div>
      <h1>💩 Poo for the Planet</h1>
      <div>
        {messages.map((msg, i) => (
          <p key={i}>{msg.role}: {msg.text}</p>
        ))}
      </div>
      <input value={message} onChange={(e) => setMessage(e.target.value)}
      placeholder="Ask something about dogs and the planet..." />
      <button onClick={handleSend}>Send</button>
    </div>
  )
}

export default App;