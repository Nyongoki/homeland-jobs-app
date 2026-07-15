// MobileShell simulates a physical phone shell (390px x 844px, matching an iPhone viewport)
// on desktop viewports, centering it and adding a shadow, while rendering fullscreen on mobile.

export default function MobileShell({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 flex items-center justify-center transition-colors duration-300 p-0 sm:p-4">
      {/* 390px phone container frame */}
      <div className="w-full h-screen sm:w-[390px] sm:h-[844px] bg-white dark:bg-gray-900 overflow-hidden relative flex flex-col sm:shadow-2xl sm:rounded-[40px] border border-transparent sm:border-gray-200 dark:sm:border-gray-850">
        
        {/* Simulated iOS Status Bar */}
        <header className="flex justify-between items-center px-6 pt-3 pb-2 bg-white dark:bg-gray-900 border-b border-gray-50 dark:border-gray-850 select-none">
          <span className="text-xs font-bold text-gray-900 dark:text-gray-100 font-sans tracking-tight">9:41</span>
          <div className="flex items-center gap-1.5">
            {/* Cellular, Wifi, and Battery icons simulated */}
            <span className="text-[10px] text-gray-800 dark:text-gray-200">📶</span>
            <span className="text-[10px] text-gray-800 dark:text-gray-200">📶</span>
            <span className="text-xs text-gray-800 dark:text-gray-200">🔋</span>
          </div>
        </header>

        {/* Inner page content display area */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {children}
        </div>
      </div>
    </div>
  );
}
