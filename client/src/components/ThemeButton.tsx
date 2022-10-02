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
      className="p-2 rounded-lg transition-all duration-200 eas"
    >
      {isDark ? <Sun /> : <Moon />}
    </button>
  );
};

export default ThemeButton;

// initial={{
//   opacity: 0,
// }}
// animate={{
//   opacity: 1,
// }}
// exit={{
//   opacity: 0,
// }}
// transition={{ duration: 1 }}
