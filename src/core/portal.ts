import { Event, eventManager } from './event-manager';
import {
  ContainerInstance,
  PortalId,
  ForceAction,
  DisplayOptions,
  ValidatedPortalProps,
  PortalProps,
  DismissAction,
} from '../types';
import { isStr } from '../utils/validators';

type QueuedPortal = {
  props: ValidatedPortalProps;
  component: React.ReactNode;
  options: DisplayOptions;
};

const containers = new Map<string, ContainerInstance>();
let queue: QueuedPortal[] = [];
let CURRENT_PORTAL_ID = 1;

function generatePortalId() {
  return `${CURRENT_PORTAL_ID++}`;
}

function dispatchPortal(
  component: React.ReactNode,
  props: ValidatedPortalProps,
  options: DisplayOptions
): PortalId {
  if (containers.size > 0) {
    eventManager.emit(Event.Show, component, props, options);
  } else {
    queue.push({
      component,
      props,
      options,
    });
  }

  return props.id || '';
}

function dismissPortal(dismissAction: DismissAction, id?: PortalId) {
  if (containers.size > 0) {
    eventManager.emit(Event.Clear, dismissAction, id);
    return;
  }

  queue = queue.filter((portal) => portal.props.id !== id);
}

function mergePortalProps(props?: PortalProps): ValidatedPortalProps {
  if (props?.id && !isStr(props.id)) {
    throw Error(
      'Provided portal id is not a string. Please provide only strings as a portal Id'
    );
  }

  const position = props?.position || { left: 0, top: 0 };

  return {
    ...props,
    id: props?.id || generatePortalId(),
    style: {
      ...position,
      width: props?.size?.width || '100vw',
      height: props?.size?.height || '100vh',
    },
  };
}

eventManager
  .on(Event.DidMount, (containerInstance: ContainerInstance) => {
    containers.set(containerInstance.containerId, containerInstance);

    queue.forEach((portal) =>
      eventManager.emit(
        Event.Show,
        portal.component,
        portal.props,
        portal.options
      )
    );
    queue = [];
  })
  .on(Event.WillUnmount, (containerInstance: ContainerInstance) => {
    containers.delete(containerInstance.containerId);

    if (containers.size === 0) {
      eventManager.off(Event.Show).off(Event.Clear);
    }
  });

export const portal = {
  show(component: React.ReactNode, props?: PortalProps): PortalId {
    return dispatchPortal(component, mergePortalProps(props), {});
  },

  forceShow(
    component: React.ReactNode,
    props?: PortalProps,
    forceAction: ForceAction = 'DismissNone'
  ): PortalId {
    return dispatchPortal(component, mergePortalProps(props), { forceAction });
  },

  dismiss(id?: PortalId) {
    dismissPortal('Dismiss', id);
  },

  dismissAll() {
    dismissPortal('DismissAll');
  },
} as const;
