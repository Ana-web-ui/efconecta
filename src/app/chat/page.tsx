"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ChatList from "../components/ChatList/ChatList";
import { Contact } from "../types/contact";


const contacts: Contact[] = [
  {
    id: "1",
    name: "Kawsar Ahmed",
    message: "Hey there! What's up? I am going...",
    time: "27min",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "2",
    name: "Mahbuba",
    message: "Hi, don't worry! I am here...",
    time: "5min",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
  },
  {
    id: "3",
    name: "Lucas Silva",
    message: "Podemos revisar a matéria amanhã?",
    time: "10min",
    avatar: "https://randomuser.me/api/portraits/men/14.jpg",
  },
];

export default function Chat() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  // Filtra contatos pelo termo de busca
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Ao clicar em um contato, navega para a tela de chat do contato
  const handleContactClick = (contact: Contact) => {
    router.push(`/chat/${contact.id}`);
  };

  return (
    <div className="container">
      <ChatList
        contacts={filteredContacts}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onContactClick={handleContactClick}
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
