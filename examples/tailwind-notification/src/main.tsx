import ReactDOM from 'react-dom/client';
import './index.css';

import { App } from './App';

// Attention
// I'm using useEffect to show notification at the start
// since react 18 React.StrictMode runs useEffect twice in dev mode
// and that creates notification twice
// that is why I'm not running in StrictMode

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App />
);
