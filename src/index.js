import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalScriptsAndStyles from './components/GlobalScriptsAndStyles';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalScriptsAndStyles />
    <App />
  </React.StrictMode>
);
