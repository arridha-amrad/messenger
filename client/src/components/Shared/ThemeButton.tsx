import Moon from "@/assets/Moon";
import Sun from "@/assets/Sun";
import { useState } from "react";

const ThemeButton = () => {
  const currTheme = localStorage.getItem("theme");

  const [isDark, setIsDark] = useState(
    !currTheme || currTheme === "dark" ? true : false
  );
  const toggleTheme = () => {
    setIsDark((val) => !val);
    document.documentElement.setAttribute(
      "theme-mode",
      isDark ? "light" : "dark"
    );
    localStorage.setItem("theme", isDark ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 transition-all duration-200 ease-in group"
    >
      {isDark ? <Sun /> : <Moon />}
      <div className="absolute z-50 p-1 text-sm rounded-lg shadow opacity-0 transition-opacity duration-200 ease-linear dark:bg-indigo-500 bg-slate-300 group-hover:opacity-100 top-10 -right-0">
        <p className="leading-4 ">{isDark ? "light" : "dark"} mode</p>
      </div>
    </button>
  );
};

export default ThemeButton;
