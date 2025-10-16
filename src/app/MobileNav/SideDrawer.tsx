"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
FiHome,
FiBook,
FiCalendar,
FiSettings,
FiLogOut,
FiUser,
FiTarget,
} from "react-icons/fi";

type SideDrawerProps = {
open: boolean;
onClose: () => void;
};

export default function SideDrawer({ open, onClose }: SideDrawerProps) {
useEffect(() => {
const prev = document.body.style.overflow;
if (open) document.body.style.overflow = "hidden";
const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
window.addEventListener("keydown", onKey);
return () => {
document.body.style.overflow = prev;
window.removeEventListener("keydown", onKey);
};
}, [open, onClose]);

return (
<>
<div
onClick={onClose}
style={{
position: "fixed",
inset: 0,
background: open ? "rgba(0,0,0,.4)" : "transparent",
transition: "background .2s ease",
pointerEvents: open ? "auto" : "none",
zIndex: 60,
}}
/>
<aside
role="dialog"
aria-modal="true"
style={{
position: "fixed",
top: 0,
left: 0,
height: "100vh",
width: "80vw",
maxWidth: 320,
background: "#0F2742",
color: "#fff",
boxShadow: "2px 0 16px rgba(0,0,0,.25)",
transform: open ? "translateX(0)" : "translateX(-100%)",
transition: "transform .28s ease",
zIndex: 61,
display: "flex",
flexDirection: "column",
}}
onClick={(e) => e.stopPropagation()}
>
<div style={{ padding: 20, borderBottom: "1px solid rgba(255,255,255,.12)" }}>
<div style={{ display: "flex", alignItems: "center", gap: 12 }}>
<div
style={{
width: 40,
height: 40,
borderRadius: "50%",
background: "rgba(255,255,255,.15)",
display: "grid",
placeItems: "center",
}}
>
<FiUser size={22} />
</div>
<div>
<div style={{ fontWeight: 700 }}>Olá, professor</div>
<div style={{ fontSize: 12, opacity: 0.8 }}>perfil@escola.com </div>
</div>
</div>
</div>

<nav style={{ padding: 10, display: "flex", flexDirection: "column", gap: 4 }}>
<MenuLink href="/materiais" icon={<FiBook />} label="Materiais" onClose={onClose} />
<MenuLink href="/desafios" icon={<FiTarget />} label="Desafios" onClose={onClose} />
<MenuLink href="/feed" icon={<FiHome />} label="Feed" onClose={onClose} />
<MenuLink href="/agenda" icon={<FiCalendar />} label="Agenda" onClose={onClose} />
<MenuLink href="/perfil" icon={<FiUser />} label="Perfil" onClose={onClose} />
<div style={{ height: 4 }} />
<MenuLink href="/configuracoes" icon={<FiSettings />} label="Configurações" onClose={onClose} />
</nav>

<div style={{ marginTop: "auto", padding: 10, borderTop: "1px solid rgba(255,255,255,.12)" }}>
<MenuButton icon={<FiLogOut />} label="Sair" onClick={() => alert("Logout")} />
</div>
</aside>
</>
);
}

function MenuLink({
href,
icon,
label,
onClose,
}: {
href: string;
icon: React.ReactNode;
label: string;
onClose: () => void;
}) {
const pathname = usePathname();
const active = pathname === href;

return (
<Link
href={href}
onClick={onClose}
style={{
display: "flex",
alignItems: "center",
gap: 12,
padding: "12px 10px",
borderRadius: 10,
color: "#fff",
textDecoration: "none",
background: active ? "rgba(255,255,255,.12)" : "transparent",
fontWeight: active ? 700 : 600,
}}
>
<span style={{ display: "grid", placeItems: "center", width: 24 }}>
{icon}
</span>
<span>{label}</span>
</Link>
);
}

function MenuButton({
icon,
label,
onClick,
}: {
icon: React.ReactNode;
label: string;
onClick: () => void;
}) {
return (
<button
onClick={onClick}
style={{
width: "100%",
display: "flex",
alignItems: "center",
gap: 12,
padding: "12px 10px",
borderRadius: 10,
color: "#fff",
background: "transparent",
border: "none",
textAlign: "left",
cursor: "pointer",
}}
>
<span style={{ display: "grid", placeItems: "center", width: 24 }}>
{icon}
</span>
<span style={{ fontWeight: 600 }}>{label}</span>
</button>
);
}