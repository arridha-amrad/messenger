import Moon from '@assets/Moon';
import Sun from '@assets/Sun';
import { useEffect, useState } from 'react';

const ThemeButton = () => {
  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => {
    setIsDark((val) => !val);
    document.documentElement.setAttribute(
      'theme-mode',
      isDark ? 'light' : 'dark'
    );
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
  };

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      setIsDark(true);
    }
    localStorage.setItem('theme', theme ?? 'light');
  }, []);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 transition-all group duration-200 ease-in relative"
    >
      {isDark ? <Sun /> : <Moon />}
      <div className="absolute dark:bg-indigo-500 bg-slate-300 p-1 rounded-lg opacity-0 transition-opacity duration-200 ease-linear group-hover:opacity-100 top-10 -right-0 shadow text-sm z-50">
        <p className="leading-4 ">{isDark ? 'light' : 'dark'} mode</p>
      </div>
    </button>
  );
};

export default ThemeButton;
