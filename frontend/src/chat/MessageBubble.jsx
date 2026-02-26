export default function MessageBubble({ text, mine }) {
  return (
    <div className={`max-w-[80%] ${mine ? "self-end" : "self-start"}`}>
      <div
        className={`p-3 rounded-xl text-sm ${
          mine ? "bg-[#3498DB] text-white " : "bg-slate-200"
        }`}
      >
        {text}
      </div>
    </div>
  );
}