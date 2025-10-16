"use client";

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";
import Modal from "@/app/Modal/Modal"; // ajuste o caminho se não usar "@/"

// Infere o tipo do componente e de suas props a partir do default export
type ReactPlayerComponent = typeof import("react-player")["default"];
type ReactPlayerProps = ComponentProps<ReactPlayerComponent>;

// Carrega o ReactPlayer dinamicamente (sem SSR) e com tipagem das props
const ReactPlayer = dynamic<ReactPlayerProps>(
() => import("react-player").then((m) => m.default),
{ ssr: false }
);

type VideoPlayerModalProps = {
open: boolean;
url: string | null; // YouTube, Vimeo ou MP4
title?: string;
onClose: () => void;
};

export default function VideoPlayerModal({
open,
url,
title,
onClose,
}: VideoPlayerModalProps) {
if (!open || !url) return null;

return (
<Modal open={open} onClose={onClose}>
<div
style={{
background: "#000",
borderRadius: 14,
overflow: "hidden",
position: "relative",
boxShadow: "0 10px 30px rgba(0,0,0,.35)",
}}
>
{/* Barra superior */}
<div
style={{
position: "absolute",
left: 0,
right: 0,
top: 0,
padding: "10px 14px",
display: "flex",
alignItems: "center",
justifyContent: "space-between",
color: "#fff",
zIndex: 2,
background:
"linear-gradient(180deg, rgba(0,0,0,.6), rgba(0,0,0,0))",
}}
>
<strong style={{ fontSize: 14, opacity: 0.9 }}>{title}</strong>
<button
onClick={onClose}
aria-label="Fechar"
style={{
background: "rgba(255,255,255,.15)",
color: "#fff",
border: "none",
borderRadius: 8,
padding: "6px 10px",
cursor: "pointer",
}}
>
Fechar
</button>
</div>

{/* Área do player (16:9) */}
<div style={{ width: "100%", aspectRatio: "16 / 9" }}>
<ReactPlayer
url={url}
playing
controls
width="100%"
height="100%"
// Se quiser bloquear download no MP4:
// config={{ file: { attributes: { controlsList: "nodownload" as any } } }}
/>
</div>
</div>
</Modal>
);
}