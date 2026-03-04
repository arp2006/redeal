import { AuthContext } from "../../AuthContext";
import { useContext } from "react";

export default function ConversationItem({ onClick, id, activeId, data }) {
  const { user } = useContext(AuthContext);
  const active = activeId === id;

  const trimmedTitle =
    data.title && data.title.length > 25
      ? data.title.slice(0, 23) + "..."
      : data.title;

  return (
    <div
      onClick={onClick}
      className={`flex gap-4 px-4 py-3 cursor-pointer border-b border-slate-200
        hover:bg-slate-50
        ${active ? "border-x" : ""}
      `}
    >
      <div className="flex-1">
        <div className="flex justify-between">
          <p className="text-sm font-bold">
            {data.name} | {trimmedTitle}
          </p>

          <span className="text-xs text-slate-400">
            {data.updated_at
              ? new Date(data.updated_at).toLocaleTimeString()
              : ""}
          </span>
        </div>

        <p className="text-sm text-slate-600 truncate flex gap-1">
          {data.last_message ? (
            <>
              {Number(data.last_sender_id) === Number(user?.id) && (
                <span className="font-semibold text-slate-800">You:</span>
              )}
              <span className="truncate">{data.last_message}</span>
            </>
          ) : (
            "No messages yet"
          )}
        </p>
      </div>
    </div>
  );
}