import { useState } from "react";
import { CONTACTS } from "../../data/mockData";
import Icon from "../common/Icon";
import Avatar from "../common/Avatar";

export default function ChatsScreen({ messages, onOpen, unread, typing }) {
  const [search, setSearch] = useState("");
  const filtered = CONTACTS.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  const lastMsg = (id) => {
    const msgs = messages[id] || [];
    return msgs[msgs.length - 1];
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ background: "#075E54", padding: "10px 16px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 10 }}>
          <span style={{ color: "white", fontWeight: 700, fontSize: 20 }}>WhatsApp</span>
          <div style={{ display: "flex", gap: 18 }}>
            <Icon d="M21 21L16.65 16.65M11 19a8 8 0 100-16 8 8 0 000 16z" size={20} color="white" />
            <Icon d={["M12 20h9","M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"]} size={20} color="white" />
            <Icon d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" size={20} color="white" />
          </div>
        </div>
        <div style={{
          background: "rgba(255,255,255,0.15)", borderRadius: 24,
          display: "flex", alignItems: "center", gap: 8,
          padding: "8px 14px", marginBottom: 8
        }}>
          <Icon d="M21 21L16.65 16.65M11 19a8 8 0 100-16 8 8 0 000 16z" size={16} color="rgba(255,255,255,0.7)" />
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search"
            style={{ background: "none", border: "none", outline: "none", color: "white", fontSize: 14, width: "100%" }}
          />
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", background: "#111b21" }}>
        {filtered.map(c => {
          const last = lastMsg(c.id);
          const u = unread[c.id] || 0;
          const isTyping = typing[c.id];
          return (
            <div
              key={c.id}
              onClick={() => onOpen(c)}
              style={{
                display: "flex", alignItems: "center", gap: 13,
                padding: "12px 16px", borderBottom: "1px solid #1f2c33",
                cursor: "pointer"
              }}
            >
              <div style={{ position: "relative" }}>
                <Avatar contact={c} size={50} />
                {c.status === "online" && (
                  <div style={{
                    width: 13, height: 13, borderRadius: "50%",
                    background: "#25D366", border: "2px solid #111b21",
                    position: "absolute", bottom: 1, right: 1
                  }}/>
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                  <span style={{ color: "#e9edef", fontWeight: 600, fontSize: 16 }}>{c.name}</span>
                  <span style={{ color: u > 0 ? "#25D366" : "#8696a0", fontSize: 12 }}>{last?.time}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{
                    color: isTyping ? "#25D366" : "#8696a0",
                    fontSize: 13.5, overflow: "hidden",
                    textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 195
                  }}>
                    {isTyping ? "typing…" : last?.from === "me" ? `You: ${last?.text}` : last?.text}
                  </span>
                  {u > 0 && (
                    <div style={{
                      background: "#25D366", color: "white", borderRadius: 10,
                      minWidth: 20, height: 20, display: "flex", alignItems: "center",
                      justifyContent: "center", fontSize: 11, fontWeight: 700, padding: "0 5px"
                    }}>{u}</div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ position: "absolute", bottom: 72, right: 16 }}>
        <div style={{
          width: 56, height: 56, borderRadius: "50%",
          background: "#25D366", display: "flex",
          alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 16px rgba(37,211,102,0.4)", cursor: "pointer"
        }}>
          <Icon d={["M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"]} size={24} color="white" />
        </div>
      </div>
    </div>
  );
}