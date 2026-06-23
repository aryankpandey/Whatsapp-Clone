export const ME = { id: "me", name: "You", avatar: "👤", color: "#25D366" };

export const CONTACTS = [
  { id: "Aryan",  name: "Aryan Pandey",  avatar: "AP", status: "online",  lastSeen: "now",         color: "#25D366", phone: "+1 (555) 012-3456" },
  { id: "Sapna",    name: "Sapna Tiwari",   avatar: "ST", status: "online",  lastSeen: "now",         color: "#128C7E", phone: "+1 (555) 987-6543" },
  { id: "Varun",  name: "Varun Sharma",    avatar: "VS", status: "offline", lastSeen: "2 hours ago", color: "#8e44ad", phone: "+1 (555) 246-8013" },
  { id: "Tina",   name: "Tina Gupta",       avatar: "TG", status: "online",  lastSeen: "now",         color: "#e67e22", phone: "+1 (555) 135-7924" },
  { id: "group1", name: "Dev Team 🚀",    avatar: "DT", status: "group",   members: "Aryan, Sapna, Varun, Tina, You", color: "#34B7F1", isGroup: true },
];

export const INITIAL_MESSAGES = {
  Aryan: [
    { id: 1, from: "Aryan", text: "Hey! Did you check the new update? 🎉",        time: "09:14", status: "read" },
    { id: 2, from: "me",    text: "Not yet — what changed?",                      time: "09:15", status: "read" },
    { id: 3, from: "Aryan", text: "WebSocket support is finally built-in 🔥",     time: "09:15", status: "read" },
    { id: 4, from: "me",    text: "That's awesome, let's implement it today!",    time: "09:16", status: "read" },
    { id: 5, from: "Aryan", text: "I'm free after 2pm 📅",                        time: "09:17", status: "read" },
  ],
  Sapna: [
    { id: 1, from: "Sapna", text: "Can you review my PR when you get a chance?",   time: "08:30", status: "read" },
    { id: 2, from: "me",  text: "Sure, sending the link now",                    time: "08:32", status: "read" },
    { id: 3, from: "Sapna", text: "Thanks! It's the Spring Boot migration 🙏",     time: "08:33", status: "read" },
    { id: 4, from: "me",  text: "Looks clean. Approved ✅",                      time: "08:50", status: "read" },
    { id: 5, from: "Sapna", text: "Merged! You're the best 🎊",                    time: "08:51", status: "read" },
  ],
  Varun: [
    { id: 1, from: "Varun", text: "Meeting at 3pm tomorrow?",                    time: "Yesterday", status: "read" },
    { id: 2, from: "me",    text: "Works for me 👍",                             time: "Yesterday", status: "read" },
    { id: 3, from: "Varun", text: "Great, I'll send a calendar invite",          time: "Yesterday", status: "read" },
  ],
  Tina: [
    { id: 1, from: "Tina", text: "Java backend is live on staging! 🚀",          time: "10:00", status: "read" },
    { id: 2, from: "me",   text: "Nice! Testing the WebSocket now",              time: "10:02", status: "read" },
    { id: 3, from: "Tina", text: "Latency is under 10ms 🔥",                    time: "10:03", status: "read" },
    { id: 4, from: "me",   text: "Incredible. Ship it!",                         time: "10:05", status: "read" },
  ],
  group1: [
    { id: 1, from: "Aryan", text: "Sprint planning at 2pm everyone 📋",          time: "07:00", status: "read" },
    { id: 2, from: "Sapna",   text: "I'll be 5 mins late 🙏",                      time: "07:05", status: "read" },
    { id: 3, from: "Tina",  text: "Can we push to 2:30?",                        time: "07:10", status: "read" },
    { id: 4, from: "me",    text: "2:30 works for me",                           time: "07:12", status: "read" },
    { id: 5, from: "Varun", text: "Same 👍",                                     time: "07:15", status: "read" },
    { id: 6, from: "Aryan", text: "Perfect, 2:30 it is! ✅",                     time: "07:16", status: "read" },
  ],
};

const AUTO_REPLIES = {
  Aryan: ["Sounds great! 😊","Let me check that for you","Totally agree!","On it! 🚀","Love it ✨","Give me 2 mins","Haha yes exactly 😂"],
  Sapna:   ["Sure thing!","Done ✅","Will do!","On it 🔧","Checked — all good","Merged! 🎉","lgtm 👀"],
  Varun: ["👍","Sounds good!","See you then!","Perfect!","Let me know if anything changes","😊","Already on it"],
  Tina:  ["Performance is green ✅","WebSocket ping: 8ms 🔥","All systems nominal","Load test passed!","Backend holding strong 💪","Deploying now…","Done and done!"],
  group1: ["👍 agreed","Sounds good to me!","I'm in!","Let's gooo 🚀","💯","Noted!","Done on my end ✅"],
};

export function simulateReply(contactId, callback) {
  const replies = AUTO_REPLIES[contactId] || ["Got it!"];
  const delay = 1000 + Math.random() * 2000;
  return setTimeout(() => {
    callback(replies[Math.floor(Math.random() * replies.length)]);
  }, delay);
}