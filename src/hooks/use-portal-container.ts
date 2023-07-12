import { useEffect, useRef, useState, isValidElement } from 'react';
import {
  ContainerInstance,
  DismissAction,
  DisplayOptions,
  ForceAction,
  PortalContainerProps,
  PortalId,
  ValidatedPortalProps,
} from '../types';
import { Event, eventManager } from '../core/event-manager';

export function usePortalContainer(props: PortalContainerProps) {
  const containerRef = useRef(null);
  const [portal, setPortal] = useState<{
    component: React.ReactNode;
    props: ValidatedPortalProps;
  }>();
  const instance = useRef<ContainerInstance>({
    containerId: 'portify__container',
    isDisplaying: false,
    queue: [],
  }).current;

  useEffect(() => {
    instance.containerId = props.containerId || instance.containerId;

    eventManager
      .on(Event.Show, showPortal)
      .on(Event.Clear, dismissPortal)
      .emit(Event.DidMount, instance);

    return () => {
      eventManager.emit(Event.WillUnmount, instance);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function showPortal(
    component: React.ReactNode,
    props: ValidatedPortalProps,
    options: DisplayOptions
  ): void {
    if (!isValidElement(component)) {
      return;
    }

    if (options.forceAction) {
      return forcePortal(component, props, options.forceAction);
    }

    queuePortal(component, props);
  }

  function forcePortal(
    component: React.ReactNode,
    props: ValidatedPortalProps,
    forceAction: ForceAction
  ): void {
    switch (forceAction) {
      case 'DismissNone':
        instance.currentPortal &&
          instance.queue.unshift(instance.currentPortal);
        break;

      case 'DismissCurrent':
        break;

      case 'DismissQueue':
        instance.queue = [];
        instance.currentPortal && instance.queue.push(instance.currentPortal);
        break;

      case 'DismissAll':
        instance.queue = [];
        break;
    }

    instance.portalId = props.id;
    instance.isDisplaying = true;
    instance.currentPortal = { component, props };
    setPortal(instance.currentPortal);
  }

  function queuePortal(
    component: React.ReactNode,
    props: ValidatedPortalProps
  ): void {
    if (instance.isDisplaying) {
      instance.queue.push({
        component,
        props,
      });

      return;
    }

    instance.isDisplaying = true;
    instance.portalId = props.id;
    instance.currentPortal = { component, props };
    setPortal(instance.currentPortal);
  }

  function dismissPortal(dismissAction: DismissAction, id?: PortalId) {
    if (!containerRef.current) return;

    if (dismissAction === 'DismissAll') {
      dismissAll();
      return;
    }

    if (!id || instance.portalId === id) {
      dismissCurrentPortal();
      return;
    }

    instance.queue = instance.queue.filter((portal) => portal.props.id !== id);
  }

  function dismissCurrentPortal() {
    if (instance.queue.length) {
      const nextPortal = instance.queue.shift();
      instance.portalId = nextPortal?.props.id;
      instance.currentPortal = nextPortal;
      setPortal(instance.currentPortal);

      return;
    }

    setPortal(undefined);
    instance.isDisplaying = false;
    instance.portalId = undefined;
    instance.currentPortal = undefined;
  }

  function dismissAll() {
    instance.queue = [];
    instance.isDisplaying = false;
    instance.portalId = undefined;
    instance.currentPortal = undefined;

    setPortal(undefined);
  }

  return {
    containerRef,
    portal,
  };
}
