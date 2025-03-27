import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GlobalUIProvider } from './context/GlobalUIContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalUIProvider>
      <App />
    </GlobalUIProvider>
  </React.StrictMode>
);
