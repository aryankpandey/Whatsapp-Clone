export default function Ticks({ status }) {
  const color = status === "read" ? "#53bdeb" : "#8696a0";
  if (status === "sent") return (
    <svg width="14" height="10" viewBox="0 0 16 11" fill="none">
      <path d="M1 5.5L5 9.5L11 1.5" stroke="#8696a0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  return (
    <svg width="18" height="10" viewBox="0 0 20 11" fill="none">
      <path d="M1 5.5L5 9.5L11 1.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 5.5L11 9.5L17 1.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}