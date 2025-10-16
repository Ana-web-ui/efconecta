"use client";
import { useState } from "react";
import { ArrowLeft, Send } from "lucide-react";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Oi! Tudo bem?", sender: "other" },
    { id: 2, text: "Oi! Tudo sim, e você?", sender: "me" },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        { id: Date.now(), text: newMessage, sender: "me" },
      ]);
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* HEADER */}
      <div className="flex items-center gap-3 bg-blue-600 text-white px-4 py-3 shadow-md">
        <button onClick={() => window.history.back()}>
          <ArrowLeft size={22} />
        </button>
        <img
          src="https://i.pravatar.cc/100"
          alt="Avatar"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h2 className="font-semibold">Kawsar Ahmed</h2>
          <p className="text-sm text-blue-200">Online</p>
        </div>
      </div>

      {/* MENSAGENS */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "me" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-2xl text-sm max-w-[75%] ${
                msg.sender === "me"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-800"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* INPUT */}
      <div className="flex items-center bg-white p-3 border-t border-gray-200">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Digite uma mensagem..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="ml-2 bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
