"use client";
import React from "react";
import { useRouter } from "next/navigation";

interface CardProps {
  color: string;
  avatars: string[];
}

function Card({ color, avatars }: CardProps) {
  const router = useRouter();

  function handleExpand() {
    router.push("/chamada");
  }

  return (
    <div
      style={{
        background: color,
        borderRadius: 16,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        padding: 20,
        minHeight: 120,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 14,
          right: 16,
          fontSize: 18,
          color: "#222",
          opacity: 0.7,
          cursor: "pointer",
        }}
        title="Expandir"
        onClick={handleExpand}
      >
        ↗
      </span>
      <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>
        Turma
      </div>
      <div style={{ fontWeight: 400, fontSize: 16, marginBottom: 16 }}>ABC</div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {avatars.map((src, idx) => (
          <Avatar key={idx} src={src} />
        ))}
        <span
          style={{
            background: "#fff",
            color: "#333",
            borderRadius: "50%",
            width: 32,
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 600,
            fontSize: 16,
            border: "1px solid #eee",
          }}
        >
          +1
        </span>
      </div>
    </div>
  );
}

function Avatar({ src }: { src: string }) {
  return (
    <img
      src={src}
      alt="avatar"
      style={{
        width: 32,
        height: 32,
        borderRadius: "50%",
        objectFit: "cover",
        border: "2px solid #fff",
        boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
        background: "#eee",
      }}
    />
  );
}

export default function Cards() {
  // Exemplos de avatares (substitua pelos reais do seu app)
  const avatars = [
    [
      "https://randomuser.me/api/portraits/men/32.jpg",
      "https://randomuser.me/api/portraits/women/44.jpg",
      "https://api.dicebear.com/7.x/bottts/svg?seed=avatar1",
    ],
    [
      "https://randomuser.me/api/portraits/men/32.jpg",
      "https://randomuser.me/api/portraits/women/44.jpg",
      "https://api.dicebear.com/7.x/bottts/svg?seed=avatar2",
    ],
    [
      "https://randomuser.me/api/portraits/men/32.jpg",
      "https://randomuser.me/api/portraits/women/44.jpg",
      "https://api.dicebear.com/7.x/bottts/svg?seed=avatar3",
    ],
    [
      "https://randomuser.me/api/portraits/men/32.jpg",
      "https://randomuser.me/api/portraits/women/44.jpg",
      "https://api.dicebear.com/7.x/bottts/svg?seed=avatar4",
    ],
    [
      "https://randomuser.me/api/portraits/men/32.jpg",
      "https://randomuser.me/api/portraits/women/44.jpg",
      "https://api.dicebear.com/7.x/bottts/svg?seed=avatar5",
    ],
    [
      "https://randomuser.me/api/portraits/men/32.jpg",
      "https://randomuser.me/api/portraits/women/44.jpg",
      "https://api.dicebear.com/7.x/bottts/svg?seed=avatar6",
    ],
  ];

  const colors = [
    "#ff7b7b",
    "#ffc34d",
    "#c9a1d7",
    "#c98b7b",
    "#b7d89c",
    "#5fd1e7",
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 24,
      }}
    >
      {colors.map((color, idx) => (
        <Card key={color} color={color} avatars={avatars[idx]} />
      ))}
    </div>
  );
}
