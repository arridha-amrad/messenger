import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';
import { BrowserRouter } from 'react-router-dom';
import store from './app/store';
import { Provider } from 'react-redux';
import { SocketProvider } from './context/SocketContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <SocketProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </SocketProvider>
        </Provider>
    </React.StrictMode>
);
