import { useEffect } from 'react';
import { portal, PortalContainer } from '../../../src';

import { Sidebar } from './components/sidebar';
import { Content } from './components/content';
import { Navigation } from './components/navigation';
import { StartingPortal } from './components/starting-portal';

export function App() {
  useEffect(() => {
    portal.show(<StartingPortal />);
  }, []);

  return (
    <div className="flex flex-col h-screen">
      {/* Nav */}
      <Navigation />

      <div className="flex flex-1">
        {/* SideBar */}
        <Sidebar />

        {/* Content */}
        <Content />
      </div>

      <PortalContainer containerId="tw-example" />
    </div>
  );
}
