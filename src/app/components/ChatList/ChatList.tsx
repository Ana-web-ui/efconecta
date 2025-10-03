import { Search } from "lucide-react";
import { Contact } from "../../types/contact";


type ChatListProps = {
  contacts: Contact[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onContactClick: (contact: Contact) => void;
};

export default function ChatList({
  contacts,
  searchTerm,
  onSearchChange,
  onContactClick,
}: ChatListProps) {
  return (
    <div className="chat-list">
      {/* Barra de busca */}
      <div className="search-container">
        {/* Ícone de busca */}
        <Search size={20} color="#aaa" />
        {/* Input controlado para busca */}
        <input
          type="text"
          className="search-input"
          placeholder="Search Anything"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Lista de contatos/chats */}
      <div className="contacts-list">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="chat-item"
            onClick={() => onContactClick(contact)}
          >
            {/* Avatar do contato */}
            <img src={contact.avatar} alt={contact.name} className="avatar" />
            {/* Informações do chat */}
            <div className="chat-info">
              <div className="chat-name">{contact.name}</div>
              <div className="chat-message">{contact.message}</div>
            </div>
            {/* Horário da última mensagem */}
            <div className="chat-time">{contact.time}</div>
          </div>
        ))}
      </div>

      {/* Estilos CSS-in-JS */}
      <style jsx>{`
        .chat-list {
          padding: 15px;
          height: 100vh;
          overflow-y: auto;
        }

        .search-container {
          display: flex;
          align-items: center;
          background-color: #f2f2f2;
          padding: 0 10px;
          border-radius: 25px;
          margin-bottom: 15px;
        }

        .search-input {
          flex: 1;
          height: 40px;
          font-size: 14px;
          color: #333;
          background: transparent;
          border: none;
          outline: none;
          padding: 0 10px;
        }

        .chat-item {
          display: flex;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid #eee;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .chat-item:hover {
          background-color: #f9f9f9;
        }

        .avatar {
          width: 50px;
          height: 50px;
          border-radius: 25px;
          margin-right: 10px;
          object-fit: cover;
        }

        .chat-info {
          flex: 1;
        }

        .chat-name {
          font-weight: bold;
          font-size: 16px;
          color: #000;
        }

        .chat-message {
          color: #666;
          font-size: 14px;
          margin-top: 2px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .chat-time {
          font-size: 12px;
          color: #999;
        }
      `}</style>
    </div>
  );
}

/*
Lógica do componente:
- Recebe uma lista de contatos, termo de busca, e funções para busca e clique.
- Renderiza um campo de busca controlado.
- Renderiza cada contato como um item clicável, mostrando avatar, nome, última mensagem e horário.
- Ao clicar em um contato, chama a função onContactClick passando o contato selecionado.
- O CSS-in-JS estiliza toda a lista, busca e itens.
*/
