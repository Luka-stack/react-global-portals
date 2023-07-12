import ReactDOM from 'react-dom/client';

import './index.css';
import './lib/external';

import { App } from './app';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App />
);
