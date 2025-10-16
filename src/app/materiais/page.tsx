"use client";

import { useMemo, useState } from "react";
import Header from "../components/Header/Header";
import MobileNav from "../MobileNav/MobileNav";
import VideoPlayerModal from "../../../VideoModal/VideoPlayerModal";

type Video = {
  id: string;
  title: string;
  thumb: string; // thumbnail
  url: string;   // YouTube/Vimeo/MP4
  duration?: string;
};

type LibraryByClass = Record<
  string,
  {
    alongamentos: Video[];
    exercicios: Video[];
    desafios: Video[];
  }
>;

const LIBRARY: LibraryByClass = {
  "Turma ABC": {
    alongamentos: [
      { id: "a1", title: "Respiração 1", thumb: "https://images.unsplash.com/photo-1469474968028-56623f02e42e", url: "https://www.youtube.com/watch?v=ysz5S6PUM-U", duration: "3:45" },
      { id: "a2", title: "Respiração 2", thumb: "https://images.unsplash.com/photo-1519681393784-d120267933ba", url: "https://vimeo.com/90509568", duration: "5:10" },
      { id: "a3", title: "Mobilidade 1", thumb: "https://images.unsplash.com/photo-1501785888041-af3ef285b470", url: "/videos/mobilidade1.mp4", duration: "2:20" },
      { id: "a4", title: "Mobilidade 2", thumb: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e", url: "https://www.youtube.com/watch?v=jNgP6d9HraI" },
    ],
    exercicios: [
      { id: "e1", title: "Circuito 1", thumb: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee", url: "https://www.youtube.com/watch?v=aqz-KE-bpKQ" },
      { id: "e2", title: "Força 1", thumb: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429", url: "https://vimeo.com/76979871" },
    ],
    desafios: [
      { id: "d1", title: "Desafio 30s", thumb: "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d", url: "/videos/desafio30s.mp4" },
    ],
  },
  "Turma DEF": {
    alongamentos: [
      { id: "a6", title: "Respiração guiada", thumb: "https://images.unsplash.com/photo-1501785888041-af3ef285b470", url: "https://www.youtube.com/watch?v=oUFJJNQGwhk" },
      { id: "a7", title: "Flexibilidade", thumb: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e", url: "https://vimeo.com/90509568" },
    ],
    exercicios: [
      { id: "e4", title: "Circuito 2", thumb: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438", url: "/videos/circuito2.mp4" },
      { id: "e5", title: "Força 2", thumb: "https://images.unsplash.com/photo-1438232992991-995b7058aaa0", url: "https://www.youtube.com/watch?v=ysz5S6PUM-U" },
    ],
    desafios: [
      { id: "d3", title: "Desafio 1 min", thumb: "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d", url: "https://vimeo.com/76979871" },
    ],
  },
  "Turma JKL": {
    alongamentos: [
      { id: "a8", title: "Alongamento leve", thumb: "https://images.unsplash.com/photo-1491553895911-0055eca6402d", url: "/videos/alongamento-leve.mp4" },
    ],
    exercicios: [],
    desafios: [
      { id: "d4", title: "Desafio coordenação", thumb: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85", url: "https://www.youtube.com/watch?v=jNgP6d9HraI" },
    ],
  },
};

export default function MateriaisPage() {
  const turmas = useMemo(() => Object.keys(LIBRARY), []);
  const [turma, setTurma] = useState<string>(turmas[0] ?? "Turma ABC");
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);

  const data = LIBRARY[turma];

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: 24, paddingBottom: 110 }}>
      <Header />

      {/* Topo: seletor de turma */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          justifyContent: "space-between",
          margin: "12px 0 20px",
          flexWrap: "wrap",
        }}
      >
        <h2 style={{ margin: 0 }}>Biblioteca de vídeos</h2>

        <label style={{ marginLeft: "auto" }}>
          <span style={{ fontSize: 12, opacity: 0.7, marginRight: 8 }}>Turma</span>
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
            {turmas.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
      </div>

      <CategorySection title="Alongamentos" items={data.alongamentos} onOpen={setActiveVideo} />
      <CategorySection title="Exercícios" items={data.exercicios} onOpen={setActiveVideo} />
      <CategorySection title="Desafios" items={data.desafios} onOpen={setActiveVideo} />

      {/* Modal do player */}
      <VideoPlayerModal
        open={!!activeVideo}
        url={activeVideo?.url ?? null}
        title={activeVideo?.title}
        onClose={() => setActiveVideo(null)}
      />

      <MobileNav />
    </div>
  );
}

function CategorySection({
  title,
  items,
  onOpen,
}: {
  title: string;
  items: Video[];
  onOpen: (v: Video) => void;
}) {
  return (
    <section style={{ marginBottom: 36 }}>
      <h3 style={{ margin: "16px 0 14px" }}>{title}</h3>

      {items.length === 0 ? (
        <div
          style={{
            padding: 20,
            borderRadius: 12,
            background: "#f7f7f9",
            border: "1px solid #eee",
            color: "#666",
          }}
        >
          Sem vídeos nesta categoria para a turma selecionada.
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gap: 16,
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          }}
        >
          {items.map((v) => (
            <VideoCard key={v.id} video={v} onClick={() => onOpen(v)} />
          ))}
        </div>
      )}
    </section>
  );
}

function VideoCard({ video, onClick }: { video: Video; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "16 / 10",
        borderRadius: 16,
        overflow: "hidden",
        cursor: "pointer",
        border: "none",
        padding: 0,
        background: "#eef1f5",
        boxShadow: "0 2px 8px rgba(0,0,0,.08)",
      }}
      aria-label={video.title}
      title={video.title}
    >
      <img
        src={`${video.thumb}?auto=format&fit=crop&w=800&q=60`}
        alt={video.title}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          transition: "transform .25s ease",
        }}
        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,.45) 0%, rgba(0,0,0,0) 60%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 12,
          bottom: 10,
          right: 12,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <div
          style={{
            fontWeight: 700,
            textShadow: "0 1px 2px rgba(0,0,0,.45)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {video.title}
        </div>
        {video.duration ? (
          <span
            style={{
              background: "rgba(0,0,0,.55)",
              padding: "4px 8px",
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            {video.duration}
          </span>
        ) : null}
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          placeItems: "center",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: "rgba(255,255,255,.85)",
            boxShadow: "0 2px 10px rgba(0,0,0,.2)",
            display: "grid",
            placeItems: "center",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#0E2440" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </button>
  );
}