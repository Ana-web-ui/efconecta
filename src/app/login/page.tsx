"use client";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push("/feed");
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "#f5f6fa",
      }}
    >
      <img
        src="/logo-efconecta.png"
        alt="logo"
        style={{ width: 120, marginBottom: 32 }}
      />
      <h1 style={{ marginBottom: 24 }}>Login</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          background: "#fff",
          padding: 32,
          borderRadius: 8,
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          name="email"
          id="email"
          style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
        />
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          name="password"
          id="password"
          style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
        />
        <button
          type="submit"
          style={{
            marginTop: 16,
            padding: "10px 0",
            borderRadius: 4,
            border: "none",
            background: "#1976d2",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
