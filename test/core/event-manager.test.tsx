/* eslint-disable @typescript-eslint/no-empty-function */
import { eventManager, Event } from '../../src/core/event-manager';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { DISMISS_ACTION } from '../../src/types';

const events: Event[] = [
  Event.Clear,
  Event.Show,
  Event.DidMount,
  Event.WillUnmount,
];

beforeEach(() => {
  eventManager.events.clear();
});

describe('EventManager', () => {
  it('should add events', () => {
    eventManager
      .on(Event.Clear, () => {})
      .on(Event.DidMount, () => {})
      .on(Event.Show, () => {})
      .on(Event.WillUnmount, () => {});

    events.forEach((event) =>
      expect(eventManager.events.has(event)).toBe(true)
    );
  });

  it('should emit event', () => {
    const callbackNr1 = vi.fn();
    const callbackNr2 = vi.fn();

    eventManager.on(Event.Clear, callbackNr1);
    eventManager.on(Event.Clear, callbackNr2);
    expect(callbackNr1).not.toBeCalled();
    expect(callbackNr2).not.toBeCalled();

    eventManager.emit(Event.Clear, DISMISS_ACTION.Dismiss);
    expect(callbackNr1).toHaveBeenCalledTimes(1);
    expect(callbackNr2).toHaveBeenCalledTimes(1);
  });

  it('should remove callback', () => {
    const callbackNr1 = vi.fn();
    const callbackNr2 = vi.fn();

    eventManager.on(Event.Clear, callbackNr1);
    eventManager.on(Event.Clear, callbackNr2);

    eventManager.emit(Event.Clear, DISMISS_ACTION.Dismiss);

    eventManager.off(Event.Clear, callbackNr1);

    eventManager.emit(Event.Clear, DISMISS_ACTION.Dismiss);

    expect(callbackNr1).toBeCalledTimes(1);
    expect(callbackNr2).toBeCalledTimes(2);
    expect(eventManager.events.get(Event.Clear)?.length).toBe(1);
  });

  it('should be able to remove event', () => {
    const callback = vi.fn();

    eventManager.on(Event.Clear, callback);
    eventManager.emit(Event.Clear, DISMISS_ACTION.Dismiss);
    eventManager.off(Event.Clear);
    eventManager.emit(Event.Clear, DISMISS_ACTION.Dismiss);

    expect(callback).toBeCalledTimes(1);
    expect(eventManager.events.get(Event.Clear)).toBeUndefined();
  });
});
