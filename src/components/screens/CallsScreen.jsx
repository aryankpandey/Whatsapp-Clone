import { CONTACTS } from "../../data/mockData";
import Avatar from "../common/Avatar";

export default function CallsScreen() {
  const calls = [
    { contact: CONTACTS[0], type: "incoming", time: "Today, 09:32", missed: false },
    { contact: CONTACTS[1], type: "outgoing", time: "Today, 08:15", missed: false },
    { contact: CONTACTS[3], type: "incoming", time: "Yesterday, 18:45", missed: true },
    { contact: CONTACTS[2], type: "outgoing", time: "Yesterday, 14:10", missed: false },
    { contact: CONTACTS[0], type: "incoming", time: "Mon, 11:30", missed: true },
  ];
  return (
    <div style={{ flex: 1, overflowY: "auto", background: "#111b21" }}>
      {calls.map((call, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 13, padding: "12px 16px", borderBottom: "1px solid #1f2c33" }}>
          <Avatar contact={call.contact} size={50} />
          <div style={{ flex: 1 }}>
            <div style={{ color: call.missed ? "#f15c6d" : "#e9edef", fontWeight: 600, fontSize: 15 }}>{call.contact.name}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 3 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                {call.type === "incoming"
                  ? <path d="M12 19v-7M7 14l5 5 5-5" stroke={call.missed ? "#f15c6d" : "#25D366"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  : <path d="M12 5v7M7 10l5-5 5 5" stroke="#25D366" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                }
              </svg>
              <span style={{ color: "#8696a0", fontSize: 13 }}>
                {call.type === "incoming" ? "Incoming" : "Outgoing"} · {call.time}
              </span>
            </div>
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7a2 2 0 011.72 2.01z" />
          </svg>
        </div>
      ))}
    </div>
  );
}