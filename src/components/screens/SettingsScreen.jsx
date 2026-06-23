import { ME } from "../../data/mockData";
import Avatar from "../common/Avatar";
import Icon from "../common/Icon";

export default function SettingsScreen() {
  const items = [
    { icon: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z", label: "Account",         sub: "Privacy, security, change number" },
    { icon: "M18 8h1a4 4 0 010 8h-1 M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z M6 1v3 M10 1v3 M14 1v3", label: "Chats",           sub: "Theme, wallpapers, chat history" },
    { icon: "M18 20V10 M12 20V4 M6 20v-6",  label: "Storage and Data", sub: "Network usage, storage usage" },
    { icon: "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 01-3.46 0", label: "Notifications",   sub: "Message, group & call tones" },
    { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", label: "Privacy",          sub: "Block contacts, disappearing messages" },
    { icon: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", label: "Help",            sub: "FAQ, contact us, privacy policy" },
  ];
  return (
    <div style={{ flex: 1, overflowY: "auto", background: "#111b21" }}>
      <div style={{ background: "#1f2c33", padding: "14px 16px", display: "flex", alignItems: "center", gap: 14, marginBottom: 8 }}>
        <Avatar contact={ME} size={64} />
        <div>
          <div style={{ color: "#e9edef", fontWeight: 700, fontSize: 18 }}>You</div>
          <div style={{ color: "#8696a0", fontSize: 13, marginTop: 2 }}>Hey there! I am using WhatsApp.</div>
        </div>
      </div>
      {items.map(item => (
        <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 20px", borderBottom: "1px solid #1f2c33", cursor: "pointer" }}>
          <Icon d={item.icon} size={22} color="#8696a0" />
          <div>
            <div style={{ color: "#e9edef", fontSize: 15 }}>{item.label}</div>
            <div style={{ color: "#8696a0", fontSize: 13, marginTop: 1 }}>{item.sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
}