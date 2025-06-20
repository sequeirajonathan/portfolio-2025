import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";

// Initialize theme immediately to prevent flash
const initializeTheme = (): Theme => {
  // Check if we're in the browser
  if (typeof window === "undefined") return "dark";
  
  try {
    const storedTheme = localStorage.getItem("theme") as Theme | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    // Default to dark mode if no preference stored
    const theme: Theme = storedTheme || (prefersDark ? "dark" : "light");
    
    // Apply theme immediately
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    
    return theme;
  } catch (error) {
    // Fallback to dark mode if localStorage fails
    console.warn("Failed to access localStorage:", error);
    document.documentElement.classList.add("dark");
    return "dark";
  }
};

export const ThemeToggle = (): JSX.Element => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // Initialize state immediately to prevent flash
    if (typeof window === "undefined") return true;
    return initializeTheme() === "dark";
  });

  useEffect(() => {
    // Ensure theme is properly set on mount
    const theme: Theme = initializeTheme();
    setIsDarkMode(theme === "dark");
    
    // Store the theme if it wasn't already stored
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
        "fixed max-sm:hidden top-5 right-5 z-50 p-2 rounded-full transition-colors duration-300",
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