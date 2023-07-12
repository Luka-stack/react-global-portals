export type ForceAction =
  | 'DismissNone'
  | 'DismissCurrent'
  | 'DismissQueue'
  | 'DismissAll';

export type PortalId = string;

export type PortalProps = {
  /**
   * Set a custom 'portalId'
   */

  id?: PortalId;

  /**
   * Add a timeout in ms after which the portal should be dismissed
   */
  timeout?: number;

  /**
   * Pause the dismiss timer when the window loses focus
   * `Default: false`
   */
  pauseOnFocusLoss?: boolean;

  /**
   * Provide the width and height the portal should cover
   * `Default: { width: '100vw', height: '100vh' }`
   */
  size?: {
    width?: string;
    height?: string;
  };

  /**
   * Provide positions for your portal
   * `Default: { left: '0', top: '0' }
   */
  position?: {
    left?: string;
    right?: string;
    top?: string;
    bottom?: string;
  };
};

export type PortalContainerProps = {
  /**
   * Set a custom 'containerId'
   */
  containerId?: string;
};

/**
 * @INTERNAL
 */
export type DismissAction = 'Dismiss' | 'DismissAll';

/**
 * @INTERNAL
 */
export type ValidatedPortalProps = {
  id: PortalId;
  style: React.CSSProperties;
  timeout?: number;
  pauseOnFocusLoss?: boolean;
};

/**
 * @INTERNAL
 */
export type DisplayOptions = {
  forceAction?: ForceAction;
};

/**
 * @INTERNAL
 */
export type ContainerInstance = {
  containerId: string;
  queue: QueuedPortal[];
  isDisplaying: boolean;
  portalId?: PortalId;
  currentPortal?: QueuedPortal;
};

type QueuedPortal = {
  props: ValidatedPortalProps;
  component: React.ReactNode;
};
