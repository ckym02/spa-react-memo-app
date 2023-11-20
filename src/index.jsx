import React from 'react';
import ReactDOM from 'react-dom/client';
import { Memo } from './features/memo/index';
import { Login } from './features/auth/index';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Login />
    <Memo />
  </React.StrictMode>,
);
