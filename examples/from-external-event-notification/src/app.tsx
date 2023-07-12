import { Content } from './components/content';
import { Sidebar } from './components/sidebar';
import { Navigation } from './components/navigation';

import { PortalContainer } from '../../../src';

export function App() {
  return (
    <div className="flex flex-col h-screen">
      <Navigation />

      <div className="flex flex-1">
        <Sidebar />
        <Content />
      </div>

      <PortalContainer containerId="external-example" />
    </div>
  );
}
