import { useParams, useNavigate } from "react-router-dom";

const chatPartners = {
  1: "TechCorp Kenya",
  2: "Savannah Studios",
  3: "MediaHub Africa",
};

const messages = [
  { id: 1, text: "Hello! I saw your proposal.",          sent: false, time: "2:10 PM" },
  { id: 2, text: "Thank you for reaching out!",          sent: true,  time: "2:11 PM" },
  { id: 3, text: "Please review the contract details.",  sent: false, time: "2:15 PM" },
  { id: 4, text: "Sure, I'll take a look now.",          sent: true,  time: "2:16 PM" },
];

export default function ChatScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const partnerName = chatPartners[id] || "Employer";

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 relative">
      
      {/* Sticky Header with Back Button and Partner Name */}
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-4 py-3 flex items-center justify-between select-none">
        <button
          onClick={() => navigate(-1)}
          className="text-base font-bold text-gray-750 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 p-1 -ml-1 transition-all"
          aria-label="Navigate back"
        >
          ← Back
        </button>
        <div className="flex flex-col items-center flex-1">
          <h2 className="text-xs font-bold text-gray-900 dark:text-white truncate max-w-[200px] leading-tight">
            {partnerName}
          </h2>
          <span className="text-[10px] text-green-500 font-semibold mt-0.5">Online</span>
        </div>
        <div className="w-8" /> {/* Visual layout spacer */}
      </header>

      {/* Message History list */}
      <main className="flex-1 overflow-y-auto px-4 py-5 space-y-4">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex ${msg.sent ? "justify-end" : "justify-start"}`}
          >
            {/* Bubble wrapping */}
            <div className={`max-w-[75%] px-3.5 py-2.5 shadow-xs ${
              msg.sent
                ? "bg-blue-600 text-white rounded-2xl rounded-br-sm text-xs font-medium"
                : "bg-gray-100 dark:bg-gray-800 text-gray-850 dark:text-gray-100 rounded-2xl rounded-bl-sm text-xs font-normal"
            }`}>
              <p className="leading-relaxed select-text">{msg.text}</p>
              <span className={`block text-[9px] mt-1 text-right font-medium select-none ${
                msg.sent 
                  ? "text-blue-200" 
                  : "text-gray-400 dark:text-gray-500"
              }`}>
                {msg.time}
              </span>
            </div>
          </div>
        ))}
      </main>

      {/* Disabled Footer Message Input box to complete native look */}
      <footer className="p-3 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 flex gap-2">
        <input
          type="text"
          disabled
          placeholder="Messaging is read-only..."
          className="flex-1 bg-gray-50 dark:bg-gray-850 border border-gray-150 dark:border-gray-800 rounded-xl px-4 py-2 text-xs text-gray-400 dark:text-gray-500 cursor-not-allowed"
        />
        <button
          disabled
          className="bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 w-9 h-9 rounded-xl flex items-center justify-center cursor-not-allowed text-sm"
        >
          ➔
        </button>
      </footer>
    </div>
  );
}
