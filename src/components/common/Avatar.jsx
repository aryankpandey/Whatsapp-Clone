export default function Avatar({ contact, size = 44 }) {
  const gradients = {
    Aryan:  ["#25D366","#128C7E"],
    Sapna:    ["#128C7E","#075E54"],
    Varun:  ["#8e44ad","#6c3483"],
    Tina:   ["#e67e22","#d35400"],
    group1: ["#34B7F1","#2980b9"],
    me:     ["#25D366","#1e8449"],
  };
  const [a, b] = gradients[contact.id] || ["#555","#333"];
  const isEmoji = contact.avatar?.length <= 2 && /\p{Emoji}/u.test(contact.avatar);
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: `linear-gradient(135deg, ${a}, ${b})`,
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0, fontSize: isEmoji ? size * 0.45 : size * 0.32,
      color: "white", fontWeight: 700, letterSpacing: "0.5px",
      fontFamily: isEmoji ? "apple color emoji, segoe ui emoji, sans-serif" : "monospace",
    }}>
      {contact.avatar}
    </div>
  );
}