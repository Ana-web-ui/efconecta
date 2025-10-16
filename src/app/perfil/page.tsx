"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { FiCamera } from "react-icons/fi";
import Header from "../components/Header/Header";
import MobileNav from "../MobileNav/MobileNav";

type Profile = {
  name: string;
  email: string;
  disciplina: string;
  bio: string;
  avatarUrl: string;
};

const DISCIPLINAS = [
  "Educação física",
  "Matemática",
  "Português",
  "Ciências",
  "História",
  "Geografia",
];

export default function PerfilPage() {
  const [profile, setProfile] = useState<Profile>({
    name: "Professor João Silva",
    email: "joao.silva@escola.com",
    disciplina: "Educação física",
    bio: "Apaixonado por ensinar e aprender todos os dias.",
    avatarUrl:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=500&q=60&auto=format&fit=crop",
  });

  const [form, setForm] = useState<Profile>(profile);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const fileRef = useRef<HTMLInputElement | null>(null);

  // Limpa URL gerada quando o componente desmontar
  useEffect(() => {
    return () => {
      if (form.avatarUrl.startsWith("blob:")) {
        URL.revokeObjectURL(form.avatarUrl);
      }
    };
  }, [form.avatarUrl]);

  function onAvatarPick(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      alert("Selecione uma imagem.");
      return;
    }
    const url = URL.createObjectURL(f);
    setForm((prev) => ({ ...prev, avatarUrl: url }));
  }

  function onChange<K extends keyof Profile>(key: K, val: Profile[K]) {
    setForm((prev) => ({ ...prev, [key]: val }));
  }

  function onCancel() {
    setForm(profile);
    setSaved(false);
  }

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    // Simula request
    await new Promise((r) => setTimeout(r, 800));
    setProfile(form);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  }

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: 24, paddingBottom: 110 }}>
      <Header />

      <h2 style={{ margin: "12px 0 20px" }}>Perfil do Professor</h2>

      {/* Grid responsiva: card à esquerda e formulário à direita */}
      <div
        style={{
          display: "grid",
          gap: 24,
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          alignItems: "start",
        }}
      >
        {/* Card do avatar */}
        <section
          style={{
            background: "#fff",
            border: "1px solid #eee",
            borderRadius: 16,
            padding: 20,
            boxShadow: "0 2px 10px rgba(0,0,0,.04)",
          }}
        >
          <div style={{ display: "grid", placeItems: "center", marginBottom: 16 }}>
            <div style={{ position: "relative", width: 160, height: 160 }}>
              <img
                src={form.avatarUrl}
                alt="Foto do perfil"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "50%",
                  border: "4px solid #f2f2f2",
                  boxShadow: "0 4px 16px rgba(0,0,0,.08)",
                }}
              />
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                aria-label="Alterar foto"
                style={{
                  position: "absolute",
                  right: 6,
                  bottom: 6,
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  border: "none",
                  background: "#6C4CF7",
                  color: "#fff",
                  display: "grid",
                  placeItems: "center",
                  cursor: "pointer",
                  boxShadow: "0 4px 10px rgba(108,76,247,.35)",
                }}
              >
                <FiCamera size={20} />
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={onAvatarPick}
                style={{ display: "none" }}
              />
            </div>
          </div>

          <div style={{ textAlign: "center" }}>
            <div style={{ fontWeight: 700, fontSize: 18 }}>{form.name}</div>
            <div style={{ fontSize: 14, opacity: 0.8, marginTop: 4 }}>{form.email}</div>
            <div style={{ fontSize: 14, opacity: 0.9, marginTop: 6 }}>
              Disciplina: <strong>{form.disciplina}</strong>
            </div>
          </div>
        </section>

        {/* Formulário */}
        <section
          style={{
            background: "#fff",
            border: "1px solid #eee",
            borderRadius: 16,
            padding: 20,
            boxShadow: "0 2px 10px rgba(0,0,0,.04)",
          }}
        >
          <form onSubmit={onSave} style={{ display: "grid", gap: 14 }}>
            {/* Nome */}
            <label style={{ display: "grid", gap: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 700, opacity: 0.85 }}>Nome</span>
              <input
                value={form.name}
                onChange={(e) => onChange("name", e.target.value)}
                style={inputStyle}
                placeholder="Seu nome"
              />
            </label>

            {/* E-mail */}
            <label style={{ display: "grid", gap: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 700, opacity: 0.85 }}>E-mail</span>
              <input
                type="email"
                value={form.email}
                onChange={(e) => onChange("email", e.target.value)}
                style={inputStyle}
                placeholder="voce@escola.com"
              />
            </label>

            {/* Disciplina */}
            <label style={{ display: "grid", gap: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 700, opacity: 0.85 }}>Disciplina</span>
              <select
                value={form.disciplina}
                onChange={(e) => onChange("disciplina", e.target.value)}
                style={{ ...inputStyle, background: "#f5f5f7" }}
              >
                {DISCIPLINAS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </label>

            {/* Bio */}
            <label style={{ display: "grid", gap: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 700, opacity: 0.85 }}>Bio</span>
              <textarea
                rows={5}
                value={form.bio}
                onChange={(e) => onChange("bio", e.target.value)}
                placeholder="Conte um pouco sobre você..."
                style={{ ...inputStyle, resize: "vertical" as const }}
              />
            </label>

            {/* Ações */}
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 6 }}>
              <button type="button" onClick={onCancel} style={btnGhost}>
                Cancelar
              </button>
              <button type="submit" disabled={saving} style={btnPrimary}>
                {saving ? "Salvando..." : saved ? "Salvo!" : "Salvar"}
              </button>
            </div>
          </form>
        </section>
      </div>

      <MobileNav />
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid #d0d0d0",
  background: "#f5f5f7",
  outline: "none",
  fontSize: 14,
};

const btnPrimary: React.CSSProperties = {
  padding: "10px 14px",
  borderRadius: 10,
  border: "none",
  background: "#6C4CF7",
  color: "#fff",
  fontWeight: 700,
  cursor: "pointer",
};

const btnGhost: React.CSSProperties = {
  padding: "10px 14px",
  borderRadius: 10,
  border: "1px solid #d0d0d0",
  background: "#fff",
  color: "#333",
  fontWeight: 700,
  cursor: "pointer",
};