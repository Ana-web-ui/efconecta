import React from "react";
 import Header from "../components/Header/Header";
import Cards from "../components/Cards/Cards";
export default function feed() {
  return (
    <div
      style={{
        background: "#fff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px 0",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1100,
          padding: 32,
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
        }}
      >
        {/* Header */}
        <Header />

        {/* Lembretes */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontWeight: 600, marginBottom: 16, fontSize: 18 }}>
            Lembretes
          </div>
          <div
            style={{
              display: "flex",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <Reminder color="#b7d89c" text="Aula na turma ABC" />
            <Reminder color="#5fd1e7" text="Aula na turma EFG" />
            <Reminder color="#ff7b7b" text="Aula na turma HIJ" />
            <Reminder color="#c9a1d7" text="Aula na turma KLM" />
          </div>
        </div>

        {/* Turmas */}
        <Cards />
        
      </div>
    </div>
  );
}

function Reminder({ color, text }: { color: string; text: string }) {
  return (
    <div
      style={{
        background: color,
        borderRadius: 8,
        padding: "12px 28px 12px 16px",
        fontWeight: 500,
        fontSize: 16,
        color: "#222",
        minWidth: 180,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        cursor: "pointer",
      }}
    >
      {text}
      <span style={{ fontSize: 22, marginLeft: 12 }}>➔</span>
    </div>
  );
}

function ClassCard({ color }: { color: string }) {
  return (
    <div
      style={{
        background: color,
        borderRadius: 12,
        padding: 20,
        minHeight: 120,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        position: "relative",
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          fontSize: 18,
          color: "#333",
          opacity: 0.7,
        }}
        title="Expandir"
      >
        ↗
      </span>
      <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>
        Turma
      </div>
      <div style={{ fontWeight: 400, fontSize: 16, marginBottom: 16 }}>ABC</div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Avatar src="https://randomuser.me/api/portraits/men/32.jpg" />
        <Avatar src="https://randomuser.me/api/portraits/women/44.jpg" />
        <Avatar src="https://randomuser.me/api/portraits/lego/1.jpg" />
        <span
          style={{
            background: "#fff",
            color: "#333",
            borderRadius: "50%",
            width: 28,
            height: 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 600,
            fontSize: 14,
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
        width: 28,
        height: 28,
        borderRadius: "50%",
        objectFit: "cover",
        border: "2px solid #fff",
        boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
      }}
    />
  );
}
