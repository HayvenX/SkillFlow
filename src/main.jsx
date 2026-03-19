import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.jsx';

import '@/styles/variables.scss';
import '@/styles/fonts.scss';
import '@/styles/reset.scss';
import '@/styles/globals.scss';
import '@/styles/utilities.scss';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
