import { useState } from "react";
import { GoogleGenAI } from "@google/genai";
import './App.css';

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
  <div className="app">
    <div className="header">
      <h1>Green<br/>Paws 🐾</h1>
      <p>eco assistant · earth day · powered by gemini</p>
    </div>
    <div className="gif-row">
      <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbDRtcDVtbWN1NWxhbWQ3ZGZtdzZ6OWF1OHZtcGF6dWJ6dDR6eTBxZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MDJ9IbxxvDUQM/giphy.gif" alt="dog" />
      <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdjBtNTBvZGU1NXpmdWU3ZzZiczFleHcwejZuNHY2ZHdvbHdibzlodyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0Exk8EUzSLsrErEQ/giphy.gif" alt="earth" />
    </div>
    <div className="chat-area">
      {messages.map((msg, i) => (
        <div key={i} className={msg.role === 'user' ? 'bubble-user' : 'bubble-bot'}>
          {msg.text}
        </div>
      ))}
    </div>
    <div className="input-area">
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        placeholder="ask about eco dog care..."
      />
      <button onClick={handleSend}>Send ➤</button>
    </div>
  </div>
  )
}

export default App;