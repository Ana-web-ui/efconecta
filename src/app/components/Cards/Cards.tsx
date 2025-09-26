import React from "react";

interface CardProps {
  color: string;
}

function Card({ color }: CardProps) {
  return (
    <div
      style={{
        background: color,
        height: 100,
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    />
  );
}

export default function Cards() {
  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 24,
        }}
      >
        <Card color="#ff7b7b" />
        <Card color="#ffc34d" />
        <Card color="#c9a1d7" />
        <Card color="#c98b7b" />
        <Card color="#b7d89c" />
        <Card color="#5fd1e7" />
      </div>
    </>
  );
}