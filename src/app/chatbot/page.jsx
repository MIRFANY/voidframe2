"use client";

import { useState, useEffect, useRef } from "react";
import Navigation from "@/components/Navigation";

export default function ChatbotPage() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! I am the MDONER AI assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  // Scroll to bottom smoothly
  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  // 🔥 Floating Suggestions
  const suggestions = [
    "How do I upload a DPR  , give answer in mizo?",
    "What is the process for DPR completeness check?",
    "How can I track my project status?",
    "Explain risk indicators in the MDONER portal.",
    "Steps for administrators to approve a DPR.",
  ];

  // 🧠 Send message to backend
  const sendMessage = async (text) => {
    const finalText = text || input;
    if (!finalText.trim()) return;

    const userMsg = { sender: "user", text: finalText };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: finalText }),
      });

      const data = await res.json();

      const botMsg = {
        sender: "bot",
        text: data.answer || "The server did not return a response.",
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Error connecting to server." },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white relative">

      {/* 🔥 Navigation */}
      <Navigation />

      {/* Chat Container */}
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-36">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">
          MDONER AI Chatbot
        </h1>

        {/* Chat Window */}
        <div
          ref={chatRef}
          className="backdrop-blur-lg bg-white/5 border border-white/10 shadow-2xl rounded-xl p-6 h-[520px] overflow-y-auto custom-scroll"
        >
          {messages.map((m, i) => (
            <div
              key={i}
              className={`my-4 flex ${
                m.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-md ${
                  m.sender === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-gray-800/70 border border-gray-700 rounded-bl-none"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {loading && (
            <div className="flex gap-2 my-3">
              <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
              <div className="w-3 h-3 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="flex gap-3 fixed bottom-0 left-0 w-full bg-black/90 backdrop-blur-xl px-6 py-4 border-t border-gray-800">
          <input
            type="text"
            className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            placeholder="Ask something..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />

          <button
            onClick={() => sendMessage()}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold shadow-lg transition transform hover:scale-105"
          >
            Send
          </button>
        </div>
      </div>

      {/* Floating Suggestions */}
      <div className="fixed bottom-28 right-6 flex flex-col gap-3">
        {suggestions.map((text, idx) => (
          <button
            key={idx}
            onClick={() => sendMessage(text)}
            className="px-4 py-2 text-xs bg-black/70 backdrop-blur-md border border-gray-700 rounded-full shadow-lg hover:bg-gray-700 transition hover:scale-105"
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
}
