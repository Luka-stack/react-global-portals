import React from 'react';
import styled, { css } from 'styled-components';

import { ValidatedPortalProps } from '../types';
import { useDismissTimer } from '../hooks/use-dismiss-timer';

type Props = {
  component: React.ReactNode;
  props: ValidatedPortalProps;
};

export function Portal({ component, props }: Props) {
  useDismissTimer(props.id, props.timeout, props.pauseOnFocusLoss);

  return (
    <Container $custom={props.style} data-testid={'portal'}>
      {component}
    </Container>
  );
}

const Container = styled.div<{ $custom: React.CSSProperties }>`
  position: fixed;
  > * {
    &:first-child {
      width: 100%;
      height: 100%;
    }
  }
  ${({ $custom }) => css($custom as any)}
`;
