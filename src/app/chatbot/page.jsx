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
  const [isStreaming, setIsStreaming] = useState(false);
  const chatRef = useRef(null);

  const suggestions = [
    "How do I upload a DPR?",
    "Explain the completeness check.",
    "How do I track project status?",
    "What are risk indicators?",
    "Admin steps to approve DPR.",
  ];

  // Auto-scroll on message change
  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isStreaming]);

  // Send message
  const sendMessage = async (text) => {
    const finalText = text || input;
    if (!finalText.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: finalText }]);
    setInput("");

    // Empty bot bubble for response
    setMessages((prev) => [...prev, { sender: "bot", text: "" }]);
    setIsStreaming(true);

    const res = await fetch("http://127.0.0.1:8000/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: finalText }),
    });

    const data = await res.json();
    const formatted = data.answer || "No response from server.";

    setMessages((prev) => {
      const updated = [...prev];
      updated[updated.length - 1].text = formatted;
      return updated;
    });

    setIsStreaming(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <Navigation />

      <div className="max-w-3xl mx-auto px-6 pt-32 pb-48">

        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-300 to-blue-600 text-transparent bg-clip-text">
          MDONER AI Chatbot
        </h1>

        {/* Chat Window */}
        <div
          ref={chatRef}
          className="backdrop-blur-lg bg-white/5 border border-white/10 shadow-2xl rounded-xl p-6 h-[520px] overflow-y-auto"
        >
          {messages.map((m, i) => (
            <div key={i} className={`my-4 flex ${m.sender === "user" ? "justify-end" : ""}`}>
              <div
                className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm shadow-md ${
                  m.sender === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-gray-800/70 border border-gray-700 rounded-bl-none"
                }`}
              >
                <pre className="whitespace-pre-wrap leading-relaxed">
                  {m.text}
                </pre>

                {isStreaming && i === messages.length - 1 && (
                  <span className="ml-1 animate-pulse">▍</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ✨ Floating Input Bar — Improved Placement & UI */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[95%] md:w-[70%] lg:w-[50%]">
        <div className="flex gap-3 bg-gray-900/90 backdrop-blur-xl border border-gray-700 shadow-2xl rounded-2xl px-4 py-3">

          <input
            type="text"
            className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white
                       focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Ask something..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />

          <button
            onClick={() => sendMessage()}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold
                       shadow-lg transform hover:scale-105 active:scale-95 transition"
            disabled={isStreaming}
          >
            Send
          </button>
        </div>
      </div>

      {/* Floating Suggestions */}
      <div className="fixed bottom-32 right-6 flex flex-col gap-3">
        {suggestions.map((text, idx) => (
          <button
            key={idx}
            onClick={() => sendMessage(text)}
            className="px-4 py-2 text-xs bg-black/60 backdrop-blur-md border border-gray-700 
                       rounded-full hover:bg-gray-700 transition shadow-lg"
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
}
