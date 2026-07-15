import { useEffect } from "react";

export default function BottomSheet({ isOpen, onClose, children }) {
  // Escape key handler ensures accessibility by closing the bottom sheet
  useEffect(() => {
    const handler = (e) => { 
      if (e.key === "Escape") onClose(); 
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <>
      {/* Backdrop with fade-in overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="absolute inset-0 bg-black/40 z-20 transition-opacity duration-300"
          aria-hidden="true"
        />
      )}
      {/* Slide-up sheet panel container */}
      <div 
        className={`absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-800 rounded-t-3xl z-30 transition-transform duration-300 shadow-xl border-t border-gray-100 dark:border-gray-700 ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* Decorative grab/drag handle for mobile affordance */}
        <div className="flex justify-center pt-3 pb-2 select-none">
          <div className="w-10 h-1 bg-gray-350 dark:bg-gray-600 rounded-full" />
        </div>
        {children}
      </div>
    </>
  );
}
