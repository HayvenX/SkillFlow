import '@/styles/variables.scss';
import '@/styles/fonts.scss';
import '@/styles/reset.scss';
import '@/styles/globals.scss';
import '@/styles/utilities.scss';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.js';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
