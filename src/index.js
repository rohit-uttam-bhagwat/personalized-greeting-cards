import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import './styles/globals.css';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
