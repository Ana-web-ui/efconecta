import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Send } from "lucide-react";

import { Contact } from "../../types/contact";

type Message = {
  id: string | number;
  sender: string;
  text: string;
};



type ChatDetailProps = {
  contact: Contact;
  messages: Message[];
  onSendMessage: (msg: string) => void;
  onBack: () => void;
};

export default function ChatDetail({
  contact,
  messages,
  onSendMessage,
  onBack,
}: ChatDetailProps) {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (input.trim() === "") return;
    onSendMessage(input);
    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-detail">
      {/* Header */}
      <div className="header">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={24} />
        </button>
        <img src={contact.avatar} alt={contact.name} className="avatar" />
        <div>
          <div className="header-name">{contact.name}</div>
          <div className="header-status">Online</div>
        </div>
      </div>

      {/* Mensagens */}
      <div className="messages-container">
        {messages.map((message) => {
          const isMe = message.sender === "me";
          return (
            <div
              key={message.id}
              className={`message ${isMe ? "my-message" : "other-message"}`}
            >
              {message.text}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="input-container">
        <input
          className="input"
          type="text"
          placeholder="Digite sua mensagem..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button className="send-button" onClick={handleSend}>
          <Send size={20} color="#fff" />
        </button>
      </div>

      <style jsx>{`
        .chat-detail {
          display: flex;
          flex-direction: column;
          height: 100vh;
        }

        .header {
          display: flex;
          align-items: center;
          padding: 15px;
          border-bottom: 1px solid #eee;
          background: #fff;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .back-button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 5px;
          margin-right: 10px;
        }

        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 20px;
          margin-right: 10px;
          object-fit: cover;
        }

        .header-name {
          font-weight: bold;
          font-size: 16px;
        }

        .header-status {
          font-size: 12px;
          color: green;
        }

        .messages-container {
          flex: 1;
          padding: 15px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .message {
          padding: 10px 15px;
          border-radius: 15px;
          max-width: 75%;
          word-wrap: break-word;
        }

        .my-message {
          background-color: #6c63ff;
          color: white;
          align-self: flex-end;
        }

        .other-message {
          background-color: #f1f1f1;
          color: #000;
          align-self: flex-start;
        }

        .input-container {
          display: flex;
          align-items: center;
          padding: 10px;
          border-top: 1px solid #eee;
          background: #fff;
        }

        .input {
          flex: 1;
          background-color: #f2f2f2;
          border-radius: 25px;
          padding: 12px 15px;
          margin-right: 10px;
          border: none;
          outline: none;
          font-size: 14px;
        }

        .send-button {
          background-color: #6c63ff;
          border: none;
          border-radius: 25px;
          padding: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .send-button:hover {
          background-color: #5a52d5;
        }
      `}</style>
    </div>
  );
}
