"use client";
import { useState } from "react";
import Link from "next/link";
import { FiBook, FiTarget, FiHome, FiCalendar, FiUser } from "react-icons/fi";
import SideDrawer from "./SideDrawer";

export default function MobileNav() {
const [open, setOpen] = useState(false);

const itemStyle: React.CSSProperties = {
width: 48,
height: 48,
display: "grid",
placeItems: "center",
color: "#fff",
borderRadius: 12,
};

return (
<>
<nav
aria-label="Navegação inferior"
style={{
position: "fixed",
left: "50%",
bottom: 16,
transform: "translateX(-50%)",
width: "min(680px, calc(100% - 24px))",
background: "#0E2440",
borderRadius: 9999,
padding: "10px 18px",
display: "flex",
alignItems: "center",
justifyContent: "space-between",
boxShadow: "0 12px 30px rgba(0,0,0,.25)",
zIndex: 50,
}}
>
<Link href="/materiais" style={itemStyle}><FiBook size={26} /></Link>

{/* Exemplo de item ativo com “anéis” roxos */}


<Link href="/feed" style={itemStyle}><FiHome size={26} /></Link>
<Link href="/agenda" style={itemStyle}><FiCalendar size={26} /></Link>

{/* Abre o menu lateral */}
<button
aria-label="Abrir menu"
onClick={() => setOpen(true)}
style={{ ...itemStyle, background: "transparent", border: "none", cursor: "pointer" }}
>
<FiUser size={26} />
</button>
</nav>

<SideDrawer open={open} onClose={() => setOpen(false)} />
</>
);
}


