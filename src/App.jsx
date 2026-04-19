import { useState } from "react";
import { GoogleGenAI } from "@google/genai";
import "./App.css";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const askGemini = async (userMessage) => {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: userMessage,
      config: {
        systemInstruction: `You are a friendly assistant for an Earth Day app called Green Paws. 
        You help dog owners understand the environmental impact of plastic dog poop bags and suggest eco-friendly alternatives like compostable bags, dog waste composters, and biodigesters. 
        Keep answers short, friendly, and fun. No markdown formatting, plain text only. Use dog and earth emojis occasionally 🐶🌍`,
      },
    });
    return response.text;
  };

  const handleSend = async (text) => {
    const msg = text || message;
    if (!msg.trim()) return;
    setMessage("");
    setMessages((prev) => [...prev, { role: "user", text: msg }]);
    const reply = await askGemini(msg);
    setMessages((prev) => [...prev, { role: "gemini", text: reply }]);
  };

  return (
    <div className="app">
      <div className="hero">
        <div className="deco star top-left">✦</div>
        <div className="deco flower top-right">✿</div>
        <div className="deco star bottom-left">✦</div>
        <div className="deco flower bottom-right">✿</div>
        <h1 className="hero-title">
          GREEN
          <br />
          PAWS
        </h1>
        <p className="hero-sub">
          🐾 eco assistant · earth day · powered by gemini
        </p>
      </div>

      <div className="desc-section">
        <p className="desc-text">
          Every day, millions of plastic dog poop bags end up in landfills
          taking up to 1000 years to break down. We built Green Paws to help dog
          owners find smarter, eco-friendly alternatives. Small swaps, big
          impact. 🐾🌍
        </p>
      </div>

      <div className="chat-section">
        <div className="rainbow-card">
          <div className="chat-area">
            {messages.length === 0 && (
              <div className="empty-state">
                ask me anything about eco-friendly dog care! 🌱
              </div>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={msg.role === "user" ? "bubble-user" : "bubble-bot"}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="dotted-divider" />
          <div className="example-questions">
            <p className="example-label">try asking:</p>
            <div className="chips">
              {[
                "are plastic poop bags bad for the environment?",
                "what are compostable bag alternatives?",
                "how do dog waste composters work?",
                "is dog poop good for grass?",
              ].map((q, i) => (
                <button key={i} className="chip" onClick={() => handleSend(q)}>
                  {q}
                </button>
              ))}
            </div>
          </div>
          <div className="input-area">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="ask about eco dog care..."
            />
            <button onClick={() => handleSend()}>SEND ✦</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
