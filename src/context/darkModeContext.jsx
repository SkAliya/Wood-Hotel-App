import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  // const [isDark, setIsDark] = useState(false);
  // const [isDark, setIsDark] = useLocalStorageState(false, "isDark");
  // getting pur local machine mode which is light dark detectd by window nd sets that as defult mode when u open app

  const [isDark, setIsDark] = useLocalStorageState(
    window.matchMedia("(prefer-color-scheme:dark)").matches,
    "isDark"
  );

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

// eslint-disable-next-line react-refresh/only-export-components
export { DarkModeProvider, useDarkModeContext };
