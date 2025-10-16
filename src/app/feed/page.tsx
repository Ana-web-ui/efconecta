"use client";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import Cards from "../components/Cards/Cards";
import Header from "../components/Header/Header";
import MobileNav from "../MobileNav/MobileNav";

type Reminder = { id: number; text: string; color: string };
type ReminderItemProps = {
reminder: Reminder;
onDelete: (id: number) => void;
onDetails: (text: string) => void;
};

function ReminderItem({ reminder, onDelete, onDetails }: ReminderItemProps) {
const [translateX, setTranslateX] = useState(0);
const [removing, setRemoving] = useState(false);
const handlers = useSwipeable({
onSwiping: (e) => setTranslateX(e.deltaX),
onSwipedLeft: () => {
setTranslateX(-300);
setTimeout(() => {
setTranslateX(0);
onDetails(reminder.text);
}, 300);
},
onSwipedRight: () => {
setTranslateX(300);
setRemoving(true);
setTimeout(() => onDelete(reminder.id), 300);
},
preventScrollOnSwipe: true,
trackMouse: true,
});

return (
<div
{...handlers}
style={{
background: reminder.color,
borderRadius: 12,
padding: "12px 16px",
fontWeight: 600,
color: "#222",
display: "flex",
alignItems: "center",
justifyContent: "space-between",
cursor: "grab",
userSelect: "none",
transform: "translateX(${translateX}px)",
transition: removing ? "transform .3s ease, opacity .3s ease" : "transform .3s ease",
opacity: removing ? 0 : 1,
boxShadow: "0 1px 4px rgba(0,0,0,.05)",
}}
>
<span>{reminder.text}</span>
<span style={{ fontSize: 20 }}>→</span>
</div>
);
}

export default function FeedPage() {
const [reminders, setReminders] = useState<Reminder[]>([
{ id: 1, text: "Aula na turma ABC", color: "#9BD06B" },
{ id: 2, text: "Aula na turma DEF", color: "#54E3F3" },
{ id: 3, text: "Aula na turma JKL", color: "#F26C6C" },
{ id: 4, text: "Aula na turma MNO", color: "#C6A2C8" },
]);

const handleDelete = (id: number) => setReminders((prev) => prev.filter((r) => r.id !== id));
const handleDetails = (text: string) => console.log("Detalhes do lembrete:", text);

return (
<div style={{ maxWidth: 1100, margin: "0 auto", padding: 24, paddingBottom: 110 }}>
<Header />

<div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
<section>
<h3 style={{ margin: "8px 0 12px 0" }}>Lembretes</h3>
<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
{reminders.map((r) => (
<ReminderItem key={r.id} reminder={r} onDelete={handleDelete} onDetails={handleDetails} />
))}
</div>
</section>

<section>
<Cards />
</section>
</div>

<MobileNav />
</div>
);
}