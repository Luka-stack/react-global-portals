import { styled } from 'styled-components';
import React, { forwardRef, useEffect } from 'react';

import { Portal } from './portal';
import { usePortalContainer } from '../hooks/use-portal-container';
import { PortalContainerProps } from '../types';

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
      <Container ref={containerRef} id={containerId} data-testid={containerId}>
        {portal ? (
          <Portal component={portal.component} props={portal.props} />
        ) : null}
      </Container>
    );
  }
);

const Container = styled.div`
  z-index: 9999;
  position: fixed;
`;
