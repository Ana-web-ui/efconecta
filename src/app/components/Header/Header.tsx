export default function Header() {

return (
<>
<div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 32,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                fontSize: 24,
                marginRight: 8,
                color: "#333",
              }}
            >
              <span role="img" aria-label="user">
                👤
              </span>
            </span>
            <span style={{ fontWeight: 500, fontSize: 20 }}>
              Olá, professor
            </span>
          </div>
          <span
            style={{
              fontSize: 24,
              color: "#333",
              cursor: "pointer",
            }}
            title="Mensagens"
          >
            <span role="img" aria-label="chat">
              💬
            </span>
          </span>
        </div>
</>

);
}