import { useNavigate, useLocation } from "react-router-dom";

const tabs = [
  { path: "/",             icon: "🏠", label: "Home"         },
  { path: "/applications", icon: "📄", label: "Applications", badge: 2 },
  { path: "/messages",     icon: "💬", label: "Messages"     },
  { path: "/profile",      icon: "👤", label: "Profile"      },
];

export default function BottomTabBar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Hide the navigation tab bar on deep pages like job details or active chat sessions
  if (pathname.includes("/job/") || pathname.match(/\/messages\/\d+/)) return null;

  return (
    <nav className="flex border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 select-none pb-safe">
      {tabs.map(tab => {
        const isActive = tab.path === "/" ? pathname === "/" : pathname.startsWith(tab.path);
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            className={`flex-1 flex flex-col items-center py-2.5 relative transition-all duration-200 active:scale-95 ${
              isActive 
                ? "text-blue-600 dark:text-blue-400 font-semibold" 
                : "text-gray-450 dark:text-gray-500"
            }`}
          >
            <span className="text-xl relative">
              {tab.icon}
              {tab.badge && (
                <span className="absolute -top-1 -right-2 w-4.5 h-4.5 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-gray-900">
                  {tab.badge}
                </span>
              )}
            </span>
            <span className="text-[10px] mt-1 tracking-tight">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
