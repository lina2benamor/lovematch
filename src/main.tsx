import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const title = document.querySelector('title');
if (title && title.hasAttribute('data-default')) {
  title.textContent = 'LoveMatch - Find Your Perfect Connection';
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);