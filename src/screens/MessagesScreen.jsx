import { useNavigate } from "react-router-dom";

const conversations = [
  { id: 1, name: "TechCorp Kenya",    lastMsg: "Please review the contract details", time: "2:15 PM",  unread: 2 },
  { id: 2, name: "Savannah Studios",  lastMsg: "Great work on the mockups!",          time: "Yesterday", unread: 0 },
  { id: 3, name: "MediaHub Africa",   lastMsg: "When can you start?",                 time: "Mon",       unread: 1 },
];

export default function MessagesScreen() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      
      {/* Sticky Header */}
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-4 py-4 flex items-center justify-center">
        <h1 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Messages</h1>
      </header>

      {/* Conversations List */}
      <main className="flex-1 overflow-y-auto">
        <div className="divide-y divide-gray-105 dark:divide-gray-800">
          {conversations.map(chat => (
            <div
              key={chat.id}
              onClick={() => navigate(`/messages/${chat.id}`)}
              className="flex items-center gap-3.5 px-4.5 py-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-850 active:bg-gray-100 dark:active:bg-gray-800 transition-colors select-none"
            >
              {/* Avatar circle with initial */}
              <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                {chat.name[0]}
              </div>

              {/* Message preview and sender name */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-xs truncate">
                    {chat.name}
                  </h3>
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">
                    {chat.time}
                  </span>
                </div>
                <p className={`text-xs truncate ${chat.unread > 0 ? "text-gray-900 dark:text-white font-semibold" : "text-gray-450 dark:text-gray-400 font-normal"}`}>
                  {chat.lastMsg}
                </p>
              </div>

              {/* Unread badge indicators */}
              {chat.unread > 0 && (
                <div className="w-5 h-5 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-gray-900 shadow-sm animate-pulse">
                  {chat.unread}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
