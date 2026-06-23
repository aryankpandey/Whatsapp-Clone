import { useState, useRef, useCallback } from "react";
import { INITIAL_MESSAGES, simulateReply } from "../data/mockData";

export function useChat() {
  const [openChat, setOpenChat] = useState(null);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [typing, setTyping] = useState({});
  const [unread, setUnread] = useState({ Sapna: 2, Tina: 1 });
  const timers = useRef({});

  const handleOpen = useCallback((contact) => {
    setOpenChat(contact);
    setUnread(prev => ({ ...prev, [contact.id]: 0 }));
  }, []);

  const handleBack = useCallback(() => {
    setOpenChat(null);
  }, []);

  const handleSend = useCallback((contactId, text) => {
    const now = new Date();
    const time = now.getHours().toString().padStart(2, "0") + ":" + now.getMinutes().toString().padStart(2, "0");
    const id = Date.now();
    const newMsg = { id, from: "me", text, time, status: "sent" };

    setMessages(prev => ({ ...prev, [contactId]: [...(prev[contactId] || []), newMsg] }));

    setTimeout(() => setMessages(prev => ({
      ...prev,
      [contactId]: prev[contactId].map(m => m.id === id ? { ...m, status: "delivered" } : m)
    })), 600);

    clearTimeout(timers.current[contactId]);
    setTyping(prev => ({ ...prev, [contactId]: true }));
    
    timers.current[contactId] = simulateReply(contactId, reply => {
      const rt = new Date();
      const rtime = rt.getHours().toString().padStart(2, "0") + ":" + rt.getMinutes().toString().padStart(2, "0");
      setTyping(prev => ({ ...prev, [contactId]: false }));
      setMessages(prev => ({
        ...prev,
        [contactId]: [
          ...(prev[contactId] || []).map(m => m.id === id ? { ...m, status: "read" } : m),
          { id: Date.now(), from: contactId, text: reply, time: rtime, status: "read" }
        ]
      }));
    });
  }, []);

  return {
    openChat,
    messages,
    typing,
    unread,
    handleOpen,
    handleBack,
    handleSend
  };
}