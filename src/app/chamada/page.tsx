"use client";
import React from "react";
import { useRouter } from "next/navigation";

const dias = Array.from({ length: 31 }, (_, i) => i + 1);
const linhas = Array.from({ length: 15 }, (_, i) => i + 1);

export default function Chamada() {
  const router = useRouter();

  function handleVoltar() {
    router.push("/feed");
  }

  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "40px auto",
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        padding: 32,
        overflowX: "auto",
      }}
    >
      <button
        onClick={handleVoltar}
        style={{
          marginBottom: 24,
          padding: "8px 20px",
          borderRadius: 6,
          border: "none",
          background: "#1976d2",
          color: "#fff",
          fontWeight: 600,
          fontSize: 16,
          cursor: "pointer",
        }}
      >
        Voltar para o Feed
      </button>
      {/* Cabeçalho */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", gap: 32, marginBottom: 8 }}>
          <div>
            <strong>ESCOLA:</strong>{" "}
            <span
              style={{
                borderBottom: "1px solid #aaa",
                minWidth: 180,
                display: "inline-block",
              }}
            >
              &nbsp;
            </span>
          </div>
          <div>
            <strong>PROFESSORA:</strong>{" "}
            <span
              style={{
                borderBottom: "1px solid #aaa",
                minWidth: 180,
                display: "inline-block",
              }}
            >
              &nbsp;
            </span>
          </div>
          <div>
            <strong>TURMA:</strong>{" "}
            <span
              style={{
                borderBottom: "1px solid #aaa",
                minWidth: 100,
                display: "inline-block",
              }}
            >
              &nbsp;
            </span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 32 }}>
          <div>
            <strong>MÊS:</strong>{" "}
            <span
              style={{
                borderBottom: "1px solid #aaa",
                minWidth: 60,
                display: "inline-block",
              }}
            >
              &nbsp;
            </span>
          </div>
          <div>
            <strong>ANO:</strong>{" "}
            <span
              style={{
                borderBottom: "1px solid #aaa",
                minWidth: 60,
                display: "inline-block",
              }}
            >
              &nbsp;
            </span>
          </div>
        </div>
      </div>

      {/* Tabela */}
      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            borderCollapse: "collapse",
            width: "100%",
            minWidth: 1100,
            fontSize: 15,
            background: "#fff",
          }}
        >
          <thead>
            <tr>
              <th style={thStyle}>Nº</th>
              <th style={thStyle}>NOME</th>
              {dias.map((dia) => (
                <th style={thStyle} key={dia}>
                  {dia}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {linhas.map((linha) => (
              <tr key={linha}>
                <td style={tdStyle}>{linha}</td>
                <td style={tdStyle}></td>
                {dias.map((dia) => (
                  <td style={tdStyle} key={dia}></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div
        style={{
          marginTop: 16,
          fontSize: 12,
          color: "#888",
          textAlign: "right",
        }}
      >
        www.meustrabalhospedagogicos.blogspot.com
      </div>
    </div>
  );
}

const thStyle: React.CSSProperties = {
  border: "1px solid #888",
  padding: "4px 6px",
  background: "#f8f8f8",
  fontWeight: 600,
  textAlign: "center",
};

const tdStyle: React.CSSProperties = {
  border: "1px solid #888",
  padding: "4px 6px",
  minWidth: 28,
  height: 28,
  textAlign: "center",
  background: "#fff",
};
