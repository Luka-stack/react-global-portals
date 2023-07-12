import '../index.css';

import { forwardRef, useEffect } from 'react';
import { PortalContainerProps } from '../types';
import { usePortalContainer } from '../hooks/use-portal-container';
import { Portal } from './portal';

export const PortalContainer = forwardRef<HTMLDivElement, PortalContainerProps>(
  (props, ref) => {
    const { portal, containerRef } = usePortalContainer(props);
    const { containerId } = props;

    useEffect(() => {
      if (ref) {
        (ref as React.MutableRefObject<HTMLDivElement>).current =
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          containerRef.current!;
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <div
        className="portify__container"
        ref={containerRef}
        id={containerId}
        data-testid={containerId}
      >
        {portal ? (
          <Portal component={portal.component} props={portal.props} />
        ) : null}
      </div>
    );
  }
);
