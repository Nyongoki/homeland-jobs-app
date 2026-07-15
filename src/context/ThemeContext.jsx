import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);
  
  // Toggle function switches the dark mode state, which propagates the "dark" class to all children
  const toggle = () => setIsDark(d => !d);
  
  return (
    <ThemeContext.Provider value={{ isDark, toggle }}>
      <div className={isDark ? "dark" : ""}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
