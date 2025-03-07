import { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  // const [isDark, setIsDark] = useState(false);
  const [isDark, setIsDark] = useLocalStorageState(false, "isDark");

  function toggleMode() {
    setIsDark((dark) => !dark);
  }

  useEffect(
    function () {
      if (isDark) {
        document.documentElement.classList.add("dark-mode");
        document.documentElement.classList.remove("light-mode");
      } else {
        document.documentElement.classList.remove("dark-mode");
        document.documentElement.classList.add("light-mode");
      }
      // document.documentElement.classList.toggle("dark-mode");
    },
    [isDark]
  );

  return (
    <DarkModeContext.Provider value={{ isDark, toggleMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkModeContext() {
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error("Darkmode context is used outside provider!");
  return context;
}

export { DarkModeProvider, useDarkModeContext };
