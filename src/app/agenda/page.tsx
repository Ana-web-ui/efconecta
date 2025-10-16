"use client";

import { useMemo, useState } from "react";
import Header from "../components/Header/Header";
import MobileNav from "../MobileNav/MobileNav";

type Activity = {
  id: number;
  turma: string;
  title: string;
  description: string;
  dueDate: string; // YYYY-MM-DD
};

const TURMAS = ["Turma ABC", "Turma DEF", "Turma JKL"];

// Utils de datas
function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}
function endOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0);
}
function formatYMD(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return y + "-" + m + "-" + day;
}
const MONTH_NAMES = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];
const WEEKDAYS = ["D", "S", "T", "Q", "Q", "S", "S"];

export default function AgendaPage() {
  const [turma, setTurma] = useState(TURMAS[0]);
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Form
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [dueDate, setDueDate] = useState(formatYMD(new Date()));

  // Atividades (mock local)
  const [activities, setActivities] = useState<Activity[]>([]);

  const monthLabel = useMemo(() => {
    const m = MONTH_NAMES[currentMonth.getMonth()];
    const y = currentMonth.getFullYear();
    return m + y;
  }, [currentMonth]);

  function goPrev() {
    setCurrentMonth(
      startOfMonth(
        new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
      )
    );
  }
  function goNext() {
    setCurrentMonth(
      startOfMonth(
        new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
      )
    );
  }

  // Gera as 6 linhas x 7 colunas (42 células)
  const daysMatrix = useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const firstWeekday = start.getDay(); // 0=Dom
    const totalDays = end.getDate();

    const cells: { date: Date; inMonth: boolean }[] = [];
    // anteriores
    for (let i = 0; i < firstWeekday; i++) {
      const d = new Date(start);
      d.setDate(d.getDate() - (firstWeekday - i));
      cells.push({ date: d, inMonth: false });
    }
    // mês atual
    for (let d = 1; d <= totalDays; d++) {
      cells.push({
        date: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), d),
        inMonth: true,
      });
    }
    // posteriores
    while (cells.length < 42) {
      const last = cells[cells.length - 1].date;
      const next = new Date(last);
      next.setDate(last.getDate() + 1);
      cells.push({ date: next, inMonth: false });
    }
    return cells;
  }, [currentMonth]);

  function handlePickDay(d: Date) {
    setSelectedDate(d);
    setDueDate(formatYMD(d));
  }

  function submitActivity(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setActivities((prev) => [
      ...prev,
      {
        id: Date.now(),
        turma,
        title: title.trim(),
        description: desc.trim(),
        dueDate,
      },
    ]);
    setTitle("");
    setDesc("");
  }

  const activitiesOfTurma = activities.filter((a) => a.turma === turma);

  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: 24,
        paddingBottom: 110,
      }}
    >
      <Header />

      {/* Topo: turma */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
          margin: "8px 0 20px",
        }}
      >
        <label>
          <span style={{ fontSize: 12, opacity: 0.7, marginRight: 8 }}>
            Turma
          </span>
          <select
            value={turma}
            onChange={(e) => setTurma(e.target.value)}
            style={{
              padding: "10px 14px",
              borderRadius: 12,
              border: "1px solid #d0d0d0",
              minWidth: 160,
              fontWeight: 600,
              background: "#fff",
            }}
          >
            {TURMAS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Grid responsivo: calendário + formulário lado a lado no desktop */}
      <div
        style={{
          display: "grid",
          gap: 24,
          gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
          alignItems: "start",
        }}
      >
        {/* Calendário */}
        <section>
          <div
            style={{
              background: "#6C4CF7",
              color: "#fff",
              borderRadius: 16,
              padding: 16,
              boxShadow: "0 8px 24px rgba(108,76,247,.25)",
            }}
          >
            {/* Header do calendário */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 8,
                fontWeight: 700,
              }}
            >
              <button
                onClick={goPrev}
                aria-label="Mês anterior"
                style={navBtnStyle}
              >
                ‹
              </button>
              <div>{monthLabel}</div>
              <button
                onClick={goNext}
                aria-label="Próximo mês"
                style={navBtnStyle}
              >
                ›
              </button>
            </div>

            {/* Semana */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: 8,
                marginBottom: 8,
                fontWeight: 700,
                opacity: 0.9,
              }}
            >
              {WEEKDAYS.map((w) => (
                <div key={w} style={{ textAlign: "center" }}>
                  {w}
                </div>
              ))}
            </div>

            {/* Dias */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: 8,
              }}
            >
              {daysMatrix.map(({ date, inMonth }, idx) => {
                const isSelected = formatYMD(date) === formatYMD(selectedDate);
                return (
                  <button
                    key={idx}
                    onClick={() => handlePickDay(date)}
                    disabled={!inMonth}
                    style={{
                      height: 44,
                      borderRadius: 12,
                      border: "none",
                      cursor: inMonth ? "pointer" : "default",
                      background: isSelected ? "#fff" : "rgba(255,255,255,.15)",
                      color: isSelected ? "#6C4CF7" : "#fff",
                      fontWeight: 700,
                      opacity: inMonth ? 1 : 0.45,
                    }}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Lista simples de atividades da turma */}
          <div style={{ marginTop: 16 }}>
            <h3 style={{ margin: "16px 0 10px" }}>Atividades da turma</h3>
            {activitiesOfTurma.length === 0 ? (
              <div
                style={{
                  padding: 16,
                  borderRadius: 12,
                  border: "1px solid #eee",
                  color: "#666",
                  background: "#fafafa",
                }}
              >
                Nenhuma atividade cadastrada.
              </div>
            ) : (
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "grid",
                  gap: 10,
                }}
              >
                {activitiesOfTurma.map((a) => (
                  <li
                    key={a.id}
                    style={{
                      border: "1px solid #eee",
                      borderRadius: 12,
                      padding: 12,
                      background: "#fff",
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 12,
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700 }}>{a.title}</div>
                      <div style={{ fontSize: 13, color: "#555" }}>
                        {a.description}
                      </div>
                    </div>
                    <div
                      style={{ fontSize: 12, fontWeight: 700, opacity: 0.8 }}
                    >
                      {a.dueDate}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* Formulário de nova atividade */}
        <section>
          <h3 style={{ margin: "0 0 10px" }}>Adicionar uma nova atividade:</h3>

          <form
            onSubmit={submitActivity}
            style={{
              border: "1px solid #eee",
              borderRadius: 16,
              padding: 16,
              background: "#fff",
              boxShadow: "0 2px 10px rgba(0,0,0,.04)",
              display: "grid",
              gap: 14,
            }}
          >
            {/* Turma da atividade */}
            <label style={{ display: "grid", gap: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 700, opacity: 0.8 }}>
                Turma
              </span>
              <select
                value={turma}
                onChange={(e) => setTurma(e.target.value)}
                style={{
                  padding: "10px 14px",
                  borderRadius: 12,
                  border: "1px solid #d0d0d0",
                  fontWeight: 600,
                  background: "#f5f5f7",
                }}
              >
                {TURMAS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>

            {/* Título */}
            <label style={{ display: "grid", gap: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 700, opacity: 0.8 }}>
                Título
              </span>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex.: Trabalho de Ciências"
                style={inputStyle}
              />
            </label>

            {/* Descrição */}
            <label style={{ display: "grid", gap: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 700, opacity: 0.8 }}>
                Descrição
              </span>
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Detalhes da atividade..."
                rows={4}
                style={{ ...inputStyle, resize: "vertical" as const }}
              />
            </label>

            {/* Data de entrega */}
            <label style={{ display: "grid", gap: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 700, opacity: 0.8 }}>
                Data de entrega
              </span>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                style={inputStyle}
              />
              <small style={{ opacity: 0.7 }}>
                Dica: clique em um dia no calendário à esquerda para preencher
                esta data.
              </small>
            </label>

            <div
              style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}
            >
              <button
                type="button"
                onClick={() => {
                  setTitle("");
                  setDesc("");
                  setDueDate(formatYMD(new Date()));
                }}
                style={btnGhost}
              >
                Limpar
              </button>
              <button type="submit" style={btnPrimary}>
                Salvar atividade
              </button>
            </div>
          </form>
        </section>
      </div>

      <MobileNav />
    </div>
  );
}

// Estilos reutilizáveis
const navBtnStyle: React.CSSProperties = {
  width: 32,
  height: 32,
  borderRadius: 8,
  border: "none",
  background: "rgba(255,255,255,.2)",
  color: "#fff",
  fontSize: 18,
  fontWeight: 700,
  cursor: "pointer",
};

const inputStyle: React.CSSProperties = {
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid #d0d0d0",
  background: "#f5f5f7",
  outline: "none",
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
