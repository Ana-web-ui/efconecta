"use client";
import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Send } from "lucide-react";

type Contact = {
  id: string;
  name: string;
  avatar: string;
};

type Message = {
  id: string;
  text: string;
  sender: "me" | "other";
};

type ChatDetailProps = {
  contact: Contact;
  messages: Message[];
  onSendMessage: (text: string) => void;
  onBack: () => void;
};

export default function ChatDetail({
  contact,
  messages,
  onSendMessage,
  onBack,
}: ChatDetailProps) {
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Faz o scroll automático para o final da conversa
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (inputText.trim() === "") return;
    onSendMessage(inputText);
    setInputText("");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Cabeçalho */}
      <div className="flex items-center gap-3 p-4 bg-white shadow-md">
        <button onClick={onBack}>
          <ArrowLeft size={24} />
        </button>
        <img
          src={contact.avatar}
          alt={contact.name}
          className="w-10 h-10 rounded-full"
        />
        <h2 className="font-semibold text-lg">{contact.name}</h2>
      </div>

      {/* Área de mensagens */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "me" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-xs ${
                msg.sender === "me"
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-gray-200 text-gray-800 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Campo de digitação */}
      <div className="flex items-center p-3 bg-white shadow-inner">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Digite uma mensagem..."
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="ml-2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}
