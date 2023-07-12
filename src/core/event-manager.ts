import {
  ContainerInstance,
  DismissAction,
  DisplayOptions,
  PortalId,
  ValidatedPortalProps,
} from '../types';

type OnShowCallback = (
  component: React.ReactNode,
  props: ValidatedPortalProps,
  options: DisplayOptions
) => void;
type OnClearCallback = (dismissAction: DismissAction, id?: PortalId) => void;
type OnDidMountCallback = (containerInstance: ContainerInstance) => void;
type OnWillUnmountCallback = (containerInstance: ContainerInstance) => void;

type Callback =
  | OnShowCallback
  | OnClearCallback
  | OnDidMountCallback
  | OnWillUnmountCallback;

export const enum Event {
  Show,
  Clear,
  DidMount,
  WillUnmount,
}

export interface EventManager {
  events: Map<Event, Callback[]>;

  on(event: Event.Show, callback: OnShowCallback): EventManager;
  on(event: Event.Clear, callback: OnClearCallback): EventManager;
  on(event: Event.DidMount, callback: OnDidMountCallback): EventManager;
  on(event: Event.WillUnmount, callback: OnWillUnmountCallback): EventManager;

  off(event: Event, callback?: Callback): EventManager;

  emit(
    event: Event.Show,
    component: React.ReactNode,
    props: ValidatedPortalProps,
    options?: DisplayOptions
  ): void;
  emit(event: Event.Clear, dismissAction: DismissAction, id?: PortalId): void;
  emit(event: Event.DidMount, containerInstance: ContainerInstance): void;
  emit(event: Event.WillUnmount, containerInstance: ContainerInstance): void;
}

export const eventManager: EventManager = {
  events: new Map<Event, Callback[]>(),

  on(event: Event, callback: Callback): EventManager {
    this.events.has(event) || this.events.set(event, []);
    this.events.get(event)?.push(callback);
    return this;
  },

  off(event: Event, callback?: Callback): EventManager {
    if (callback) {
      this.events.set(
        event,
        this.events.get(event)?.filter((cb) => cb !== callback) || []
      );
      return this;
    }

    this.events.delete(event);
    return this;
  },

  emit(event: Event, ...args: unknown[]) {
    if (this.events.has(event)) {
      this.events.get(event)?.forEach((callback) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        callback(...args);
      });
    }
  },
} as const;
