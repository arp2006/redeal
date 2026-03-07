import { useEffect, useState } from "react";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import { useNavigate } from "react-router-dom";
import { getSocket } from "../../socket";
import { API } from "../../config/api";

export default function ChatDetails({ onMessageUpdate, chatId, onBack, type, name, item }) {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [postInfo, setPostInfo] = useState({});

  async function getInfo() {
    try {
      const response = await fetch(`${API}/api/items/${item}?summary=true`, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Failed to fetch post');
      const pInfo = await response.json();
      setPostInfo(pInfo);
    }
    catch (error) {
      console.error(error);
    }
  }

  async function fetchMessages() {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API}/api/messages/${chatId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch messages");

      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error("Failed to load messages", err);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  }

  async function loadChat() {
    setLoading(true);
    await Promise.all([fetchMessages(), getInfo()]);
    setLoading(false);
  }


  function handleNewMessage(message) {
    if (Number(message.conv_id) === Number(chatId)) {
      setMessages(prev => [...prev, message]);
    }
    onMessageUpdate?.(message);
  }



  useEffect(() => {
    if (!chatId) return;

    setMessages([]);
    setLoading(true);

    loadChat();

    const socket = getSocket();
    if (!socket) return;
    socket.on("new_message", handleNewMessage);

    return () => {
      socket.off("new_message", handleNewMessage);
    };

  }, [chatId]);

  return (
    <>
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 sticky top-0 bg-white z-10">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="md:hidden text-slate-500">←</button>
          <div className="min-w-0">
            <p className="font-bold text-lg truncate">{name}</p>
            <p className="text-xs text-green-500 flex items-center gap-1">
              Online
            </p>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex items-center gap-3 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200">
          <div className="hidden lg:block">
            <p className="text-xs font-bold truncate">{postInfo.title}</p>
            <p className="text-[10px] text-slate-500">{postInfo.price}</p>
          </div>
          <button
            className="bg-[#3498DB] text-white text-[10px] h-[2rem] font-bold px-3 py-1 rounded-lg cursor-pointer hover:bg-[#0a6bab] transition"
            onClick={() => navigate(`/product/${item}`)}
          >
            Manage
          </button>
        </div>
      </div>

      <MessageList messages={messages} loading={loading} type={type} />
      <MessageInput
        chatId={chatId}
        onMessageSent={(newMessage) => {
          setMessages((prev) => [...prev, newMessage]);
          onMessageUpdate?.(newMessage);
        }}
      />
    </>
  );
}
