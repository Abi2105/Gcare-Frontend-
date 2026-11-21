import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// Bootstrap 5.1.3 JS plugins used by the reference markup (data-bs-* attributes).
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/tab';
import 'bootstrap/js/dist/carousel';
import 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/toast';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
