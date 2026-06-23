import { CONTACTS, ME } from "../../data/mockData";
import Avatar from "../common/Avatar";

export default function StatusScreen() {
  return (
    <div style={{ flex: 1, overflowY: "auto", background: "#111b21" }}>
      <div style={{ background: "#1f2c33", padding: "12px 16px 8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, paddingBottom: 14, borderBottom: "1px solid #2a3942" }}>
          <div style={{ position: "relative" }}>
            <Avatar contact={ME} size={52} />
            <div style={{
              position: "absolute", bottom: 0, right: 0,
              background: "#25D366", borderRadius: "50%", width: 20, height: 20,
              display: "flex", alignItems: "center", justifyContent: "center",
              border: "2px solid #1f2c33"
            }}>
              <span style={{ color: "white", fontSize: 14, lineHeight: 1 }}>+</span>
            </div>
          </div>
          <div>
            <div style={{ color: "#e9edef", fontWeight: 600, fontSize: 15 }}>My Status</div>
            <div style={{ color: "#8696a0", fontSize: 13 }}>Tap to add status update</div>
          </div>
        </div>
      </div>
      <div style={{ padding: "12px 16px 6px" }}>
        <span style={{ color: "#8696a0", fontSize: 13, fontWeight: 600 }}>RECENT UPDATES</span>
      </div>
      {CONTACTS.filter(c => !c.isGroup && c.status === "online").map(c => (
        <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "10px 16px" }}>
          <div style={{ borderRadius: "50%", padding: 2, background: "linear-gradient(135deg, #25D366, #128C7E)" }}>
            <div style={{ background: "#111b21", borderRadius: "50%", padding: 2 }}>
              <Avatar contact={c} size={46} />
            </div>
          </div>
          <div>
            <div style={{ color: "#e9edef", fontWeight: 600, fontSize: 15 }}>{c.name}</div>
            <div style={{ color: "#8696a0", fontSize: 13 }}>{Math.floor(Math.random() * 59 + 1)} minutes ago</div>
          </div>
        </div>
      ))}
      <div style={{ padding: "24px 16px", textAlign: "center" }}>
        <div style={{ color: "#8696a0", fontSize: 13 }}>Status updates from contacts<br/>will appear here</div>
      </div>
    </div>
  );
}