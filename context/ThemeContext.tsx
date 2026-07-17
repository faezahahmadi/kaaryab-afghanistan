"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type ThemeContextValue = {
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (value: boolean) => void;
};

const defaultThemeValue: ThemeContextValue = {
  isDark: false,
  toggleTheme: () => undefined,
  setTheme: () => undefined,
};

const ThemeContext = createContext<ThemeContextValue>(defaultThemeValue);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const storedTheme = window.localStorage.getItem("karyaab-theme");

    if (storedTheme === "dark") {
      setIsDark(true);
      return;
    }

    if (storedTheme === "light") {
      setIsDark(false);
      return;
    }

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    setIsDark(prefersDark);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.style.colorScheme = isDark ? "dark" : "light";
    window.localStorage.setItem("karyaab-theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleTheme = () => setIsDark((current) => !current);
  const setTheme = (value: boolean) => setIsDark(value);

  const value = useMemo(() => ({ isDark, toggleTheme, setTheme }), [isDark]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
