import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

const container: HTMLElement | null = document.getElementById('root');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
