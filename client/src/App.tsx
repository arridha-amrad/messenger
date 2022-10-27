import { Route, Routes } from 'react-router-dom';
import Login from '@features/user/Login';
import Register from '@features/user/Register';
import Home from './pages/Home';
import useTheme from '@hooks/useTheme';
import ProtectedRoute from '@comps/Shared/ProtectedRoute';

export default function App() {
    useTheme();
    return (
        <Routes>
            <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Home />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
}
