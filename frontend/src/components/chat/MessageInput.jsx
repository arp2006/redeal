import { useState, useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { API } from "../../config/api";

export default function MessageInput({ chatId, onMessageSent }) {
  const [text, setText] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API}/api/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          convId: chatId,
          msg: text,
        }),
      });

      if (!res.ok) throw new Error("Failed to send");

      const savedMessage = await res.json();
      setText("");
      onMessageSent(savedMessage);
    } 
    catch (err) {
      console.error("Send failed", err);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-slate-200 p-3 flex gap-2"
    >
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none"
        placeholder="Type a message…"
      />
      <button
        type="submit"
        className="bg-[#3498DB] text-white px-4 rounded-lg text-sm font-medium"
      >
        Send
      </button>
    </form>
  );
}
