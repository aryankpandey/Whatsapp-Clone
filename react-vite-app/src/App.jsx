import { useState } from "react";
import { useChat } from "./hooks/useChat";

import Icon from "./components/common/Icon";
import ChatsScreen from "./components/screens/ChatsScreen";
import ChatScreen from "./components/screens/ChatScreen";
import StatusScreen from "./components/screens/StatusScreen";
import CallsScreen from "./components/screens/CallsScreen";
import SettingsScreen from "./components/screens/SettingsScreen";

const TABS = [
  { id: "status", icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", label: "Status" },
  { id: "calls",  icon: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7a2 2 0 011.72 2.01z", label: "Calls" },
  { id: "chats",  icon: "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z", label: "Chats" },
  { id: "settings", icon: "M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z", label: "Settings" },
];

export default function App() {
  const [tab, setTab] = useState("chats");
  const { openChat, messages, typing, unread, handleOpen, handleBack, handleSend } = useChat();

  return (
    <div style={{
       minHeight: "100vh",
     width: "100%",
     background: "#111b21",
     display: "flex",
     flexDirection: "column"
     }}>
      <style>{`
        @keyframes bounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-6px)} }
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: #2a3942; border-radius: 2px; }
        input::placeholder { color: rgba(255,255,255,0.45); }
      `}</style>

      <div style={{
       width: "100%",
     height: "100vh",
     background: "#111b21",
     display: "flex",
     flexDirection: "column",
     overflow: "hidden"
      }}>
        
       

        {/* Content Shell */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>
          {openChat ? (
            <ChatScreen
              contact={openChat}
              messages={messages[openChat.id]}
              onBack={handleBack}
              onSend={handleSend}
              typing={typing[openChat.id]}
            />
          ) : (
            <>
              {tab !== "chats" && (
                <div style={{ background: "#1f2c33", padding: "12px 20px", borderBottom: "1px solid #2a3942" }}>
                  <span style={{ color: "#e9edef", fontWeight: 700, fontSize: 20 }}>
                    {tab === "status" ? "Status" : tab === "calls" ? "Calls" : "Settings"}
                  </span>
                </div>
              )}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>
                {tab === "chats"    && <ChatsScreen messages={messages} onOpen={handleOpen} unread={unread} typing={typing} />}
                {tab === "status"   && <StatusScreen />}
                {tab === "calls"    && <CallsScreen />}
                {tab === "settings" && <SettingsScreen />}
              </div>
            </>
          )}
        </div>

        {/* Navigation Layer */}
        {!openChat && (
          <div style={{ background: "#1f2c33", borderTop: "1px solid #2a3942", display: "flex", paddingBottom: 8 }}>
            {TABS.map(t => {
              const active = tab === t.id;
              const totalUnread = t.id === "chats" ? Object.values(unread).reduce((a, b) => a + b, 0) : 0;
              return (
                <button
                  key={t.id}
                  onClick={() => { setTab(t.id); }}
                  style={{
                    flex: 1, background: "none", border: "none", cursor: "pointer",
                    padding: "10px 0 4px", display: "flex", flexDirection: "column",
                    alignItems: "center", gap: 4, position: "relative"
                  }}
                >
                  <div style={{ position: "relative" }}>
                    <Icon d={t.icon} size={23} color={active ? "#25D366" : "#8696a0"} />
                    {totalUnread > 0 && t.id === "chats" && (
                      <div style={{
                        position: "absolute", top: -5, right: -8,
                        background: "#25D366", borderRadius: 10,
                        minWidth: 17, height: 17, display: "flex", alignItems: "center",
                        justifyContent: "center", fontSize: 10, fontWeight: 700, color: "white",
                        padding: "0 4px"
                      }}>{totalUnread}</div>
                    )}
                  </div>
                  <span style={{ color: active ? "#25D366" : "#8696a0", fontSize: 10.5, fontWeight: active ? 600 : 400 }}>
                    {t.label}
                  </span>
                  {active && (
                    <div style={{
                      position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
                      width: 32, height: 3, background: "#25D366", borderRadius: "0 0 3px 3px"
                    }}/>
                  )}
                </button>
              );
            })}
          </div>
        )}

       

      </div>
    </div>
  );
}