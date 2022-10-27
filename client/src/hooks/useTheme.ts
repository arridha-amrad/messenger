import { useEffect } from 'react';

const useTheme = () => {
  useEffect(() => {
    let theme = localStorage.getItem('theme');
    if (theme === null) {
      theme = 'dark';
    }
    document.documentElement.setAttribute('theme-mode', theme);
  }, []);
};

export default useTheme;
