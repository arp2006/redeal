import React, { useState, useContext, useEffect } from "react";
import ConversationList from "../chat/ConversationList";
import ChatDetails from "../chat/ChatDetails";
import { AuthContext } from "../AuthContext";

export default function ChatLayout() {
  const [showChat, setShowChat] = useState(false);
  const [activeChatId, setActiveChatId] = useState(null);
  const [otherUser, setOtherUser] = useState("");
  const [productId, setProductId] = useState(null);
  const [activeChatType, setActiveChatType] = useState("buying");
  const [conversations, setConversations] = useState([]);

  function handleKeyDown(e) {
    if (e.key === "Escape") {
      setShowChat(false);
      setActiveChatId(null);
    }
  }

  useEffect(() => {
    if (!showChat) return;
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showChat]);

  return (
    <div className="bg-background-light font-display text-slate-900 mx-[35rem] w-full h-[58rem] overflow-hidden border border-slate-200 rounded-lg">
      <div className="flex h-full">
        <aside className="flex w-full md:w-[350px] lg:w-[400px] flex-col border-r border-slate-200 bg-white">
          <ConversationList
            activeId={activeChatId}
            setConversations = {setConversations}
            conversations = {conversations}
            onSelect={(chatId, type, name, product) => {
              setActiveChatId(chatId);
              setShowChat(true);
              setActiveChatType(type);
              setOtherUser(name);
              setProductId(product);
            }}
          />
        </aside>

        <section className={`${showChat ? "flex" : "hidden"} flex-1 flex-col bg-white`}>
          {activeChatId && (
            <ChatDetails
              chatId={activeChatId}
              type={activeChatType}
              name={otherUser}
              item={productId}
              onBack={() => setShowChat(false)}
            />
          )}
        </section>
      </div>
    </div>
  );
}