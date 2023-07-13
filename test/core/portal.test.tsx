import React from 'react';
import { beforeEach, describe, it, expect, vi, afterEach } from 'vitest';
import { act, render, screen } from '@testing-library/react';

import {
  Event as ManagerEvent,
  eventManager,
} from '../../src/core/event-manager';
import { portal } from '../../src/core/portal';
import { PortalContainer } from '../../src/components/portal-container';

beforeEach(() => {
  vi.useFakeTimers();
  eventManager.off(ManagerEvent.Show);
});

afterEach(() => {
  vi.clearAllTimers();
});

describe('portal', () => {
  it('should not render nor crush when container is not mounted', () => {
    act(() => portal.show(<div>Test</div>));

    expect(screen.queryByText(/Test/)).toBe(null);
  });

  it('should return portal id', () => {
    const portalId = portal.show(<div>Test</div>);

    expect(portalId).toBeDefined();
    expect(portalId.length).not.toBe('');
  });

  it('should return unique id', () => {
    const firstPortalId = portal.show(<div>Test</div>);
    const secondPortalId = portal.show(<div>Test2</div>);

    expect(firstPortalId).not.toEqual(secondPortalId);
  });

  it('should return provided id', () => {
    const providedId = 'UniquePortalId';
    const returnedId = portal.show(<div>Test</div>, { id: providedId });

    expect(returnedId).toEqual(providedId);
  });

  it('should queue portals and show on mount', () => {
    act(() => portal.show(<div>Test</div>));
    expect(screen.queryByText(/Test/)).toBe(null);

    render(<PortalContainer containerId="test" />);
    expect(screen.queryByText(/Test/)).not.toBe(null);
  });

  it('should remove all events', () => {
    const { unmount } = render(<PortalContainer containerId="test" />);

    expect(eventManager.events.get(ManagerEvent.DidMount)).toBeDefined();
    expect(eventManager.events.get(ManagerEvent.WillUnmount)).toBeDefined();

    unmount();

    expect(eventManager.events.get(ManagerEvent.Show)).toBeUndefined();
    expect(eventManager.events.get(ManagerEvent.Clear)).toBeUndefined();
  });

  describe('show', () => {
    it('should show portal', () => {
      render(<PortalContainer containerId="test" />);

      act(() => {
        portal.show(<div>Test</div>);
      });

      expect(screen.getByText(/Test/)).not.toBe(null);
    });

    it('should not show portal if component is not valid', () => {
      render(<PortalContainer containerId="test" />);

      const component = true;

      act(() => {
        portal.show(component);
      });

      expect(screen.queryByText(/Test/)).toBe(null);
    });

    it('should show portal with id', () => {
      render(<PortalContainer containerId="test" />);

      act(() => {
        portal.show(<div>Test</div>, { id: 'Portal_ID_1' });
      });

      expect(screen.getByText(/Test/)).not.toBe(null);
    });

    it('should throw error if provided id is not valid', () => {
      render(<PortalContainer containerId="test" />);

      try {
        act(() => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          portal.show(<div>Test</div>, { id: false as any });
        });

        expect(true).toBe(false);
      } catch (err: unknown) {
        expect(err).not.toBe(null);
      }
    });

    it('should add portal to queue', () => {
      render(<PortalContainer containerId="test" />);

      act(() => {
        portal.show(<div>Test</div>);
        portal.show(<div>Second</div>);
      });

      expect(screen.queryByText(/Test/)).not.toBe(null);
      expect(screen.queryByText(/Second/)).toBe(null);
    });

    it('should dismiss portal after timeout', async () => {
      render(<PortalContainer containerId="test" />);

      await act(async () => {
        portal.show(<div>Test</div>, { timeout: 2000 });
        vi.advanceTimersByTimeAsync(2000);
      });

      expect(screen.queryByText(/Test/)).toBe(null);
    });

    it('should show portal in defined position', () => {
      render(<PortalContainer containerId="test" />);

      act(() => {
        portal.show(<div>Test</div>, {
          size: { height: '50vh', width: '100vh' },
          position: { bottom: '0', left: '0' },
        });
      });

      const element = screen.getByText(/Test/);

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const parent = element.parentElement!;

      expect(parent.style.width).toEqual('100vh');
      expect(parent.style.height).toEqual('50vh');
      expect(parent.style.left).toEqual('0px');
      expect(parent.style.bottom).toEqual('0px');
      expect(parent.style.right).toBe('');
      expect(parent.style.top).toBe('');
    });
  });

  describe('dismiss', () => {
    it('should dismiss visible portal', () => {
      render(<PortalContainer containerId="test" />);

      act(() => {
        portal.show(<div>Test</div>);
      });

      expect(screen.getByText(/Test/)).not.toBe(null);

      act(() => {
        portal.dismiss();
      });

      expect(screen.queryByText(/Test/)).toBe(null);
    });

    it('should dismiss visible portal and load one from queue', () => {
      render(<PortalContainer containerId="test" />);

      act(() => {
        portal.show(<div>Test</div>);
        portal.show(<main>Second</main>);
      });

      expect(screen.queryByText(/Test/)).not.toBe(null);
      expect(screen.queryByText(/Second/)).toBe(null);

      act(() => {
        portal.dismiss();
      });

      expect(screen.queryByText(/Test/)).toBe(null);
      expect(screen.queryByText(/Second/)).not.toBe(null);
    });

    it('should dismiss portal with id', () => {
      render(<PortalContainer containerId="test" />);

      const portalId = new Date().toISOString();

      act(() => {
        portal.show(<div>Test</div>, { id: portalId });
      });

      expect(screen.getByText(/Test/)).not.toBe(null);

      act(() => {
        portal.dismiss(portalId);
      });

      expect(screen.queryByText(/Test/)).toBe(null);
    });

    it('should delete portal with id from queue', () => {
      render(<PortalContainer containerId="test" />);

      const portalId = new Date().toISOString();

      act(() => {
        portal.show(<div>Test</div>);
        portal.show(<div>Second</div>, { id: portalId });
      });

      expect(screen.queryByText(/Test/)).not.toBe(null);
      expect(screen.queryByText(/Second/)).toBe(null);

      act(() => {
        portal.dismiss(portalId);
        portal.dismiss();
      });

      expect(screen.queryByText(/Test/)).toBe(null);
      expect(screen.queryByText(/Second/)).toBe(null);
    });
  });

  describe('dismissAll', () => {
    it('should dismiss all portals', () => {
      render(<PortalContainer containerId="test" />);

      act(() => {
        portal.show(<div>First</div>);
        portal.show(<div>Second</div>);
        portal.show(<div>Third</div>);

        portal.dismissAll();
      });

      expect(screen.queryByText(/First/)).toBe(null);
      expect(screen.queryByText(/Second/)).toBe(null);
      expect(screen.queryByText(/Third/)).toBe(null);
    });
  });

  describe('forceShow', () => {
    it('should show portal and queue current', () => {
      render(<PortalContainer containerId="text" />);

      act(() => {
        portal.show(<div>Show</div>);
        portal.forceShow(<div>Force</div>);
      });

      expect(screen.queryByText(/Show/)).toBe(null);
      expect(screen.queryByText(/Force/)).not.toBe(null);

      act(() => {
        portal.dismiss();
      });

      expect(screen.queryByText(/Show/)).not.toBe(null);
      expect(screen.queryByText(/Force/)).toBe(null);
    });

    it('should show portal and dismiss current', () => {
      render(<PortalContainer containerId="text" />);

      act(() => {
        portal.show(<div>Show</div>);
        portal.forceShow(<div>Force</div>, {}, 'DismissCurrent');
      });

      expect(screen.queryByText(/Show/)).toBe(null);
      expect(screen.queryByText(/Force/)).not.toBe(null);

      act(() => {
        portal.dismiss();
      });

      expect(screen.queryByText(/Show/)).toBe(null);
      expect(screen.queryByText(/Force/)).toBe(null);
    });

    it('should show portal, dismiss queue and queue current', () => {
      render(<PortalContainer containerId="text" />);

      act(() => {
        portal.show(<div>Show</div>);
        portal.show(<div>Second</div>);
        portal.forceShow(<div>Force</div>, {}, 'DismissQueue');
      });

      expect(screen.queryByText(/Show/)).toBe(null);
      expect(screen.queryByText(/Second/)).toBe(null);
      expect(screen.queryByText(/Force/)).not.toBe(null);

      act(() => {
        portal.dismiss();
      });

      expect(screen.queryByText(/Show/)).not.toBe(null);
      expect(screen.queryByText(/Second/)).toBe(null);
      expect(screen.queryByText(/Force/)).toBe(null);
    });

    it('should show portal and dismiss everything else', () => {
      render(<PortalContainer containerId="text" />);

      act(() => {
        portal.show(<div>Show</div>);
        portal.show(<div>Second</div>);
        portal.forceShow(<div>Force</div>, {}, 'DismissAll');
      });

      expect(screen.queryByText(/Show/)).toBe(null);
      expect(screen.queryByText(/Second/)).toBe(null);
      expect(screen.queryByText(/Force/)).not.toBe(null);

      act(() => {
        portal.dismiss();
      });

      expect(screen.queryByText(/Show/)).toBe(null);
      expect(screen.queryByText(/Second/)).toBe(null);
      expect(screen.queryByText(/Force/)).toBe(null);
    });
  });
});
