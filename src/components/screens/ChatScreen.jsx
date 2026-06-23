import { useState, useEffect, useRef } from "react";
import { CONTACTS } from "../../data/mockData";
import Icon from "../common/Icon";
import Ticks from "../common/Ticks";
import Avatar from "../common/Avatar";

export default function ChatScreen({ contact, messages, onBack, onSend, typing }) {
  const [input, setInput] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const send = () => {
    const t = input.trim();
    if (!t) return;
    onSend(contact.id, t);
    setInput("");
  };

  const grouped = (() => {
    const result = [];
    let lastDate = null;
    (messages || []).forEach(msg => {
      const date = msg.time.includes(":") ? "Today" : msg.time;
      if (date !== lastDate) { result.push({ type: "date", label: date }); lastDate = date; }
      result.push({ type: "msg", msg });
    });
    return result;
  })();

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", position: "relative" }}>
      <div style={{
        background: "#1f2c33", padding: "10px 8px 10px 4px",
        display: "flex", alignItems: "center", gap: 6,
        borderBottom: "1px solid #2a3942"
      }}>
        <button onClick={onBack} style={{ background: "none", border: "none", padding: "4px 8px", cursor: "pointer" }}>
          <Icon d="M19 12H5M12 5l-7 7 7 7" size={22} color="#25D366" />
        </button>
        <div onClick={() => setShowInfo(true)} style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, cursor: "pointer" }}>
          <Avatar contact={contact} size={40} />
          <div>
            <div style={{ color: "#e9edef", fontWeight: 600, fontSize: 15.5 }}>{contact.name}</div>
            <div style={{ fontSize: 12, color: typing ? "#25D366" : contact.status === "online" ? "#25D366" : "#8696a0" }}>
              {typing ? "typing…" : contact.status === "online" ? "online" : contact.isGroup ? contact.members : `last seen ${contact.lastSeen}`}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 16, paddingRight: 8 }}>
          <Icon d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7a2 2 0 011.72 2.01z" size={20} color="#8696a0" />
          <Icon d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" size={20} color="#8696a0" />
        </div>
      </div>

      <div style={{
        flex: 1, overflowY: "auto", padding: "12px 10px",
        background: "#0b141a",
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23182229' fill-opacity='1'%3E%3Cpath fill-rule='evenodd' d='M11 0l5 20H6zM0 60l5-20H-5zM60 0l5 20H55zM60 40l5 20H55zM20 20l5 20H15zM80 20l5 20H75z'/%3E%3C/g%3E%3C/svg%3E")`
      }}>
        {grouped.map((item, i) => {
          if (item.type === "date") return (
            <div key={i} style={{ display: "flex", justifyContent: "center", margin: "8px 0" }}>
              <span style={{ background: "#1f2c33", color: "#8696a0", fontSize: 11.5, padding: "3px 10px", borderRadius: 8 }}>{item.label}</span>
            </div>
          );
          const { msg } = item;
          const isMe = msg.from === "me";
          const sender = contact.isGroup && !isMe ? CONTACTS.find(c => c.id === msg.from) : null;
          return (
            <div key={msg.id} style={{ display: "flex", justifyContent: isMe ? "flex-end" : "flex-start", marginBottom: 3 }}>
              <div style={{
                maxWidth: "78%", background: isMe ? "#005c4b" : "#202c33",
                borderRadius: isMe ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                padding: "7px 10px 5px", boxShadow: "0 1px 3px rgba(0,0,0,0.35)"
              }}>
                {sender && <div style={{ color: sender.color, fontSize: 11.5, fontWeight: 700, marginBottom: 2 }}>{sender.name}</div>}
                <div style={{ color: "#e9edef", fontSize: 15, lineHeight: 1.4, wordBreak: "break-word" }}>{msg.text}</div>
                <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 3, marginTop: 3 }}>
                  <span style={{ color: "#8696a0", fontSize: 11 }}>{msg.time}</span>
                  {isMe && <Ticks status={msg.status} />}
                </div>
              </div>
            </div>
          );
        })}
        {typing && (
          <div style={{ display: "flex", marginBottom: 4 }}>
            <div style={{ background: "#202c33", borderRadius: "16px 16px 16px 4px", padding: "10px 14px", display: "flex", gap: 5, alignItems: "center" }}>
              {[0,1,2].map(i => (
                <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: "#8696a0", animation: `bounce 1.2s ease-in-out ${i*0.2}s infinite` }}/>
              ))}
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div style={{ background: "#1f2c33", padding: "8px 10px", display: "flex", alignItems: "center", gap: 8 }}>
        <button style={{ background: "none", border: "none", cursor: "pointer", padding: 4, flexShrink: 0 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#8696a0" strokeWidth="2"/>
            <path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="#8696a0" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="9" cy="10" r="1" fill="#8696a0"/><circle cx="15" cy="10" r="1" fill="#8696a0"/>
          </svg>
        </button>
        <div style={{ flex: 1, background: "#2a3942", borderRadius: 24, display: "flex", alignItems: "center", padding: "9px 14px", gap: 8 }}>
          <input
            ref={inputRef} value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), send())}
            placeholder="Message"
            style={{ flex: 1, background: "none", border: "none", outline: "none", color: "#e9edef", fontSize: 15 }}
          />
          <button style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
            <Icon d="M21.44 11.05L12.25 20.24a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66L9.64 17.2a2 2 0 01-2.83-2.83l8.49-8.48" size={20} color="#8696a0" />
          </button>
        </div>
        <button
          onClick={send}
          style={{
            width: 48, height: 48, borderRadius: "50%", flexShrink: 0,
            background: input.trim() ? "#25D366" : "#2a3942", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s",
            boxShadow: input.trim() ? "0 2px 8px rgba(37,211,102,0.4)" : "none"
          }}
        >
          {input.trim()
            ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M22 2L11 13" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="white"/></svg>
            : <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 18.5a1 1 0 110-2 1 1 0 010 2zm0-5a1 1 0 110-2 1 1 0 010 2zm0-5a1 1 0 110-2 1 1 0 010 2z" fill="#8696a0"/></svg>
          }
        </button>
      </div>

      {showInfo && (
        <div style={{ position: "absolute", inset: 0, background: "#111b21", zIndex: 10, display: "flex", flexDirection: "column" }}>
          <div style={{ background: "#1f2c33", padding: "12px 16px", display: "flex", alignItems: "center", gap: 12 }}>
            <button onClick={() => setShowInfo(false)} style={{ background: "none", border: "none", cursor: "pointer" }}>
              <Icon d="M19 12H5M12 5l-7 7 7 7" size={22} color="#25D366" />
            </button>
            <span style={{ color: "#e9edef", fontSize: 17, fontWeight: 600 }}>Contact Info</span>
          </div>
          <div style={{ flex: 1, overflowY: "auto" }}>
            <div style={{ background: "#1f2c33", padding: "28px 0 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <Avatar contact={contact} size={90} />
              <div style={{ color: "#e9edef", fontSize: 22, fontWeight: 700 }}>{contact.name}</div>
              <div style={{ color: "#8696a0", fontSize: 14 }}>{contact.isGroup ? contact.members : contact.phone}</div>
            </div>
            {[
              { label: "Status / About", value: contact.isGroup ? "Group for dev work 🚀" : "Hey there! I am using WhatsApp." },
              { label: contact.isGroup ? "Created" : "Phone", value: contact.isGroup ? "Jan 12, 2025" : contact.phone },
            ].map(row => (
              <div key={row.label} style={{ background: "#1f2c33", padding: "14px 20px", marginBottom: 6 }}>
                <div style={{ color: "#25D366", fontSize: 13, marginBottom: 4 }}>{row.label}</div>
                <div style={{ color: "#e9edef", fontSize: 15 }}>{row.value}</div>
              </div>
            ))}
            <div style={{ background: "#1f2c33", padding: "16px 20px", display: "flex", justifyContent: "space-around" }}>
              {["Message", "Audio", "Video"].map(a => (
                <div key={a} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer" }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#2a3942", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon
                      d={a === "Message"
                        ? "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
                        : a === "Audio"
                        ? "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.18 1.2 2 2 0 012.18 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16z"
                        : "M23 7l-7 5 7 5V7z M1 5h15a2 2 0 012 2v10a2 2 0 01-2 2H1a2 2 0 01-1-2V7a2 2 0 011-2z"}
                      size={22} color="#25D366"
                    />
                  </div>
                  <span style={{ color: "#8696a0", fontSize: 12 }}>{a}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}