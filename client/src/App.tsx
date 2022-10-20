import { Route, Routes } from 'react-router-dom';
import Login from '@features/user/Login';
import Register from '@features/user/Register';
import { useEffect } from 'react';
import Home from './pages/Home';
import useSocket from '@hooks/useSocket';

export default function App() {
  useSocket();
  useEffect(() => {
    let theme = localStorage.getItem('theme');
    if (theme === null) {
      theme = 'light';
    }
    document.documentElement.setAttribute('theme-mode', theme);
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
