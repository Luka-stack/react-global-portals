import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { PortalContainer } from '../../src/components/portal-container';
import { Event, eventManager } from '../../src/core/event-manager';
import { portal } from '../../src/core/portal';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.clearAllTimers();
});

describe('PortalContainer', () => {
  it('should render container with id', () => {
    render(<PortalContainer containerId="test" />);

    expect(screen.getByTestId('test')).not.toBe(null);
  });

  it('should render empty container', () => {
    render(<PortalContainer containerId="test" />);

    const container = screen.getByTestId('test');

    expect(container.children.length).toBe(0);
  });

  it('should bind events on mount', () => {
    render(<PortalContainer containerId="test" />);

    expect(eventManager.events.has(Event.Show)).toBe(true);
    expect(eventManager.events.has(Event.Clear)).toBe(true);
  });

  it('should unbind events when unmounted', () => {
    const { unmount } = render(<PortalContainer containerId="test" />);

    unmount();

    expect(eventManager.events.has(Event.Clear)).toBe(false);
    expect(eventManager.events.has(Event.Show)).toBe(false);
  });

  it('should rebind events when re-mounted', () => {
    const { unmount } = render(<PortalContainer containerId="test" />);

    unmount();
    render(<PortalContainer containerId="test" />);

    expect(eventManager.events.has(Event.Show)).toBe(true);
    expect(eventManager.events.has(Event.Clear)).toBe(true);
  });

  describe('usePortalContainer', () => {
    it('should render portal on show with default container id', () => {
      render(<PortalContainer />);

      act(() => portal.show(<div>Test</div>));

      expect(screen.queryByText(/Test/)).not.toBe(null);
    });

    it('should render portal on show', () => {
      render(<PortalContainer containerId="test" />);

      act(() => portal.show(<div>Test</div>));

      expect(screen.getByTestId('test').children.length).toBe(1);
      expect(screen.queryByText(/Test/)).not.toBe(null);
    });

    it('should not render portal if provided id is not valid', () => {
      render(<PortalContainer containerId="test" />);

      try {
        act(() => portal.show(<div>Test</div>, { id: {} as string }));
      } catch (err: unknown) {
        /* empty */
      }

      expect(screen.getByTestId('test').children.length).toBe(0);
      expect(screen.queryByText(/Test/)).toBe(null);
    });

    it('should not render portal if component is not valid', () => {
      render(<PortalContainer containerId="test" />);

      act(() => portal.show(false));

      expect(screen.getByTestId('test').children.length).toBe(0);
      expect(screen.queryByText(/Test/)).toBe(null);
    });

    it('should unmount portal on dismiss', () => {
      render(<PortalContainer containerId="test" />);

      act(() => {
        portal.show(<div>Test</div>);
        portal.dismiss();
      });

      expect(screen.getByTestId('test').children.length).toBe(0);
      expect(screen.queryByText(/Test/)).toBe(null);
    });

    it('should mount another portal on dismiss', () => {
      render(<PortalContainer containerId="test" />);

      act(() => {
        portal.show(<div>First</div>);
        portal.show(<div>Second</div>);
        portal.dismiss();
      });

      expect(screen.getByTestId('test').children.length).toBe(1);
      expect(screen.queryByText(/First/)).toBe(null);
      expect(screen.queryByText(/Second/)).not.toBe(null);
    });

    it('should unmount portal on dismissAll', () => {
      render(<PortalContainer containerId="test" />);

      act(() => {
        portal.show(<div>Test</div>);
        portal.dismissAll();
      });

      expect(screen.getByTestId('test').children.length).toBe(0);
      expect(screen.queryByText(/Test/)).toBe(null);
    });

    it('should unmount portal on dismissAll and not show other', () => {
      render(<PortalContainer containerId="test" />);

      act(() => {
        portal.show(<div>First</div>);
        portal.show(<div>Second</div>);
        portal.show(<div>Third</div>);
        portal.dismissAll();
      });

      expect(screen.getByTestId('test').children.length).toBe(0);
      expect(screen.queryByText(/First/)).toBe(null);
      expect(screen.queryByText(/Second/)).toBe(null);
      expect(screen.queryByText(/Third/)).toBe(null);
    });

    it('should mount new portal on forceShow', () => {
      render(<PortalContainer containerId="test" />);

      act(() => {
        portal.show(<div>First</div>);
        portal.forceShow(<div>Important</div>);
      });

      expect(screen.getByTestId('test').children.length).toBe(1);
      expect(screen.queryByText(/First/)).toBe(null);
      expect(screen.queryByText(/Important/)).not.toBe(null);
    });

    it('should not unmount portal on show', () => {
      render(<PortalContainer containerId="test" />);

      act(() => {
        portal.show(<div>First</div>);
        portal.show(<div>Second</div>);
      });

      expect(screen.getByTestId('test').children.length).toBe(1);
      expect(screen.queryByText(/First/)).not.toBe(null);
      expect(screen.queryByText(/Second/)).toBe(null);
    });
  });
});
