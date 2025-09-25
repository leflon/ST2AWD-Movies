import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './assets/main.css';
import App from './App.tsx';
import { SWRConfig } from 'swr';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SWRConfig>
      <App />
    </SWRConfig>
  </StrictMode>,
);
