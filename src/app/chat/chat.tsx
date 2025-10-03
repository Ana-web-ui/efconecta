"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
// Make sure the path is correct and the file exists; adjust if necessary:
import ChatDetail from "../components/ChatDetail/ChatDetail";

import { Contact } from "../types/contact";


export default function ChatDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const id = params?.id;
  const [contact, setContact] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);

  // Busca o contato e mensagens iniciais ao carregar a página
  useEffect(() => {
    if (id) {
      const foundContact = contact.find((c: Contact) => c.id === id);
      setContact(foundContact);

      // Mensagens iniciais baseadas no contato
      const initialMessages = [
        { id: "1", text: "Hi, I need your help immediately", sender: "other" },
        {
          id: "2",
          text: "Hi, don't worry! I am here. Let me know your situation now.",
          sender: "me",
        },
      ];
      setMessages(initialMessages);
    }
  }, [id]);

  // Envia uma nova mensagem
  const handleSendMessage = (text: string) => {
    if (text.trim() === "") return;
    const newMessage = {
      id: Date.now().toString(),
      text: text,
      sender: "me",
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  // Volta para a página anterior
  const handleBack = () => {
    router.back();
  };

  if (!contact) {
    return (
      <div className="loading">
        Loading...
        <style jsx>{`
          .loading {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="container">
      <ChatDetail
        contact={contact}
        messages={messages}
        onSendMessage={handleSendMessage}
        onBack={handleBack}
      />
      <style jsx>{`
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #fff;
          min-height: 100vh;
        }
      `}</style>
    </div>
  );
}

/*
Lógica do componente:
- Recebe o id do contato via params (App Router).
- Busca o contato correspondente e define mensagens iniciais.
- Renderiza o ChatDetail passando contato, mensagens e handlers.
- handleSendMessage adiciona nova mensagem ao estado.
- handleBack retorna para a página anterior.
- Exibe "Loading..." enquanto o contato não é carregado.
*/
