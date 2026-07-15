import { useTheme } from "../context/ThemeContext";

const skills = ["React", "Node.js", "TypeScript", "UI/UX"];

export default function ProfileScreen() {
  const { isDark, toggle } = useTheme();

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      
      {/* Sticky Header */}
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-4 py-4 flex items-center justify-center">
        <h1 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Profile</h1>
      </header>

      {/* Main Profile Info and Settings Layout */}
      <main className="flex-1 overflow-y-auto px-5 py-6">
        
        {/* User Card Info Area */}
        <section className="flex flex-col items-center text-center pb-6 border-b border-gray-100 dark:border-gray-800 mb-6" aria-label="User Info summary">
          {/* Avatar initial bubble */}
          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-extrabold shadow-md mb-3 select-none">
            J
          </div>
          
          <h2 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">Jane Mwangi</h2>
          <p className="text-xs text-gray-400 dark:text-gray-500 font-medium mt-1">Member since January 2025</p>

          {/* Earnings summary card */}
          <div className="w-full bg-gray-50 dark:bg-gray-850 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 mt-5">
            <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-1">Total Earnings</span>
            <span className="text-base font-extrabold text-gray-850 dark:text-gray-100">KES 284,500</span>
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-6" aria-label="User Skills inventory">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">My Skills</h2>
          <div className="flex flex-wrap gap-1.5">
            {skills.map(skill => (
              <span key={skill} className="text-xs font-semibold border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full bg-gray-50 dark:bg-gray-850">
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Settings Panel */}
        <section aria-label="Settings">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-2">Settings</h2>
          <div className="flex items-center justify-between py-3 border-b border-gray-105 dark:border-gray-800">
            <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">Dark mode</span>
            <button
              role="switch"
              aria-checked={isDark}
              onClick={toggle}
              className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none ${isDark ? "bg-blue-600" : "bg-gray-300"}`}
              aria-label="Toggle dark mode setting"
            >
              <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${isDark ? "translate-x-5" : "translate-x-0"}`} />
            </button>
          </div>
        </section>

      </main>
    </div>
  );
}
