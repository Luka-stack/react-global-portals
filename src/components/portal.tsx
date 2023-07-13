import React from 'react';

import { ValidatedPortalProps } from '../types';
import { useDismissTimer } from '../hooks/use-dismiss-timer';

type Props = {
  component: React.ReactNode;
  props: ValidatedPortalProps;
};

export function Portal({ component, props }: Props) {
  useDismissTimer(props.id, props.timeout, props.pauseOnFocusLoss);

  return (
    <div className="portify__portal" style={props.style} data-testid={'portal'}>
      {component}
    </div>
  );
}
