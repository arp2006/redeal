import { useEffect, useState } from "react";
import ConversationItem from "./ConversationItem";
import { API } from "../../config/api";

export default function ConversationList({ onSelect, activeId, conversations, setConversations }) {
  const [loading, setLoading] = useState(false);
  const [conversationType, setConversationType] = useState("buying");

  async function fetchConversations() {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API}/api/chats/${conversationType}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch chats");

      const data = await res.json();
      setConversations(data);
      
    } 
    catch (err) {
      console.error("Failed to load conversations", err);
      setConversations([]);
    } 
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchConversations();
  }, [conversationType]);

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-slate-100">
        <h1 className="text-xl font-bold mb-4">Messages</h1>

        <input
          className="w-full h-10 rounded-lg bg-slate-100 px-3 text-sm outline-none"
          placeholder="Search conversations..."
        />

        <div className="flex px-4 py-3">
          <div className="flex h-10 flex-1 items-center justify-center rounded-lg bg-[#e7eff3] p-1">
            {["buying", "selling"].map(type => (
              <label
                key={type}
                className="flex cursor-pointer h-full grow items-center justify-center rounded-lg px-2
                has-[:checked]:bg-slate-50 has-[:checked]:shadow-[0_0_4px_rgba(0,0,0,0.1)]
                has-[:checked]:text-[#0d171b] text-[#4c809a] text-sm font-medium"
              >
                <span className="truncate">
                  {type === "buying" ? "Buying" : "Selling"}
                </span>
                <input
                  type="radio"
                  name="conversation-type"
                  value={type}
                  checked={conversationType === type}
                  onChange={() => setConversationType(type)}
                  className="hidden"
                />
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading && <p className="p-4 text-sm">Loading...</p>}

        {!loading && conversations.length === 0 && (
          <p className="p-4 text-sm text-slate-500">
            No {conversationType} conversations yet
          </p>
        )}

        {!loading && conversations.map(chat => (
          <ConversationItem
            key={chat.id}
            id={chat.id}
            activeId={activeId}
            data={chat}
            onClick={() => {
              onSelect(chat.id, conversationType, chat.name, chat.item_id)
            }}
          />
        ))}
      </div>
    </div>
  );
}
