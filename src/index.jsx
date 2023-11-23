import React from 'react';
import ReactDOM from 'react-dom/client';
import { Memo } from './features/memo/index';
import { Login } from './features/auth/index';
import { AuthContextProvider } from './contexts/authContext';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <Login />
      <Memo />
    </AuthContextProvider>
  </React.StrictMode>,
);
