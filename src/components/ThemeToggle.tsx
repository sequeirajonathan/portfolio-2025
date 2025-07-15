import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import React from "react";

type Theme = "light" | "dark";


const initializeTheme = (): Theme => {
  
  if (typeof window === "undefined") return "dark";
  
  try {
    const storedTheme = localStorage.getItem("theme") as Theme | null;
    
    // Default to dark theme on first visit, regardless of system preference
    const theme: Theme = storedTheme || "dark";
    
    
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    
    return theme;
  } catch (error) {
    
    console.warn("Failed to access localStorage:", error);
    document.documentElement.classList.add("dark");
    return "dark";
  }
};

export const ThemeToggle = (): React.ReactElement => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    
    if (typeof window === "undefined") return true;
    return initializeTheme() === "dark";
  });

  useEffect(() => {
    
    const theme: Theme = initializeTheme();
    setIsDarkMode(theme === "dark");
    
    
    if (!localStorage.getItem("theme")) {
      try {
        localStorage.setItem("theme", theme);
      } catch (error) {
        console.warn("Failed to save theme to localStorage:", error);
      }
    }
  }, []);

  const toggleTheme = (): void => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      try {
        localStorage.setItem("theme", "light");
      } catch (error) {
        console.warn("Failed to save theme to localStorage:", error);
      }
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      try {
        localStorage.setItem("theme", "dark");
      } catch (error) {
        console.warn("Failed to save theme to localStorage:", error);
      }
      setIsDarkMode(true);
    }
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "p-2 rounded-full transition-colors duration-300",
        "focus:outline-none"
      )}
    >
      {isDarkMode ? (
        <Sun className="h-6 w-6 text-yellow-300" aria-hidden="true" />
      ) : (
        <Moon className="h-6 w-6 text-blue-900" aria-hidden="true" />
      )}
    </button>
  );
};