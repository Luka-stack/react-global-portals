import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { PortalContainer } from '../../src/components/portal-container';
import { portal } from '../../src/core/portal';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.clearAllTimers();
});

describe('Portal', () => {
  it('should not render if theres no portal', () => {
    render(<PortalContainer containerId="test" />);

    expect(screen.queryByTestId('portal')).toBe(null);
  });

  it('should render portal', () => {
    render(<PortalContainer containerId="test" />);

    act(() => portal.show(<div>Test</div>));

    expect(screen.queryByTestId('portal')).not.toBe(null);
    expect(screen.queryByText(/Test/)).not.toBe(null);
  });

  describe('useDismissTimer', () => {
    it('should dismiss portal without timeout', () => {
      render(<PortalContainer containerId="test" />);

      act(() => portal.show(<div>Test</div>));

      expect(screen.queryByText(/Test/)).not.toBe(null);

      act(() => portal.dismiss());

      expect(screen.queryByText(/Test/)).toBe(null);
      expect(screen.queryByTestId('portal')).toBe(null);
    });

    it('should dismiss portal with timeout', () => {
      render(<PortalContainer containerId="test" />);

      act(() => {
        portal.show(<div>First</div>, { timeout: 2000 });
        portal.dismiss();
      });

      expect(screen.queryByText(/First/)).toBe(null);
      expect(screen.queryByTestId('portal')).toBe(null);
    });

    it('should dismiss all portal with timeout', () => {
      render(<PortalContainer containerId="test" />);

      act(() => {
        portal.show(<div>First</div>, { timeout: 2000 });
        portal.dismissAll();
      });

      expect(screen.queryByText(/First/)).toBe(null);
      expect(screen.queryByTestId('portal')).toBe(null);
    });

    it('should not dismiss portal without timeout', async () => {
      render(<PortalContainer containerId="test" />);

      await act(async () => {
        portal.show(<div>Test</div>);
        vi.advanceTimersByTimeAsync(1000);
      });

      expect(screen.queryByText(/Test/)).not.toBe(null);
      expect(screen.queryByTestId('portal')).not.toBe(null);
    });

    it('should dismiss portal on timeout', async () => {
      render(<PortalContainer containerId="test" />);

      await act(async () => {
        portal.show(<div>Test</div>, { timeout: 1000 });
        vi.advanceTimersByTimeAsync(1000);
      });

      expect(screen.queryByText(/Test/)).toBe(null);
      expect(screen.queryByTestId('portal')).toBe(null);
    });

    it('should dismiss portal on timeout, show one from queue', async () => {
      render(<PortalContainer containerId="test" />);

      await act(async () => {
        portal.show(<div>First</div>, { timeout: 1000 });
        portal.show(<div>Second</div>, { timeout: 2000 });
        vi.advanceTimersByTimeAsync(1000);
      });

      expect(screen.queryByText(/First/)).toBe(null);
      expect(screen.queryByText(/Second/)).not.toBe(null);
    });

    it('should force new portal, dismiss it on timeout and show another', async () => {
      render(<PortalContainer containerId="test" />);

      await act(async () => {
        portal.show(<div>First</div>, { timeout: 1000 });
        portal.forceShow(<div>Second</div>, { timeout: 2000 });
        vi.advanceTimersByTimeAsync(2000);
      });

      expect(screen.queryByText(/First/)).not.toBe(null);
      expect(screen.queryByText(/Second/)).toBe(null);
    });

    it('should dismiss portal on timeout and then dismiss another portal', async () => {
      render(<PortalContainer containerId="test" />);

      await act(async () => {
        portal.show(<div>First</div>, { timeout: 1000 });
        portal.show(<div>Second</div>, { timeout: 2000 });

        vi.advanceTimersByTimeAsync(5000);
      });

      expect(screen.queryByText(/First/)).toBe(null);
      expect(screen.queryByText(/Second/)).toBe(null);
    });

    it('should dismiss forced portal on timeout and then dismiss another portal', async () => {
      render(<PortalContainer containerId="test" />);

      await act(async () => {
        portal.show(<div>First</div>, { timeout: 1000 });
        portal.forceShow(<div>Second</div>, { timeout: 2000 });

        vi.advanceTimersByTimeAsync(5000);
      });

      expect(screen.queryByText(/First/)).toBe(null);
      expect(screen.queryByText(/Second/)).toBe(null);
    });

    it('should dismiss portal on timeout when pauseOnFocusLoss is true and window is focused', async () => {
      render(<PortalContainer containerId="test" />);

      await act(async () => {
        portal.show(<div>Test</div>, { timeout: 1000, pauseOnFocusLoss: true });
        vi.advanceTimersByTimeAsync(1000);
      });

      expect(screen.queryByText(/Test/)).toBe(null);
      expect(screen.queryByTestId('portal')).toBe(null);
    });

    it('should not dismiss portal on timeout when pauseOnFocusLoss is true and window has lost focused', async () => {
      render(<PortalContainer containerId="test" />);

      await act(async () => {
        portal.show(<div>Test</div>, {
          timeout: 1000,
          pauseOnFocusLoss: true,
        });
      });

      fireEvent.blur(window);

      act(() => vi.advanceTimersByTime(1000));

      expect(screen.queryByText(/Test/)).not.toBe(null);
      expect(screen.queryByTestId('portal')).not.toBe(null);
    });

    it('should dismiss portal on timeout when pauseOnFocusLoss is true and window regained focus', async () => {
      render(<PortalContainer containerId="test" />);

      await act(async () => {
        portal.show(<div>Test</div>, {
          timeout: 1000,
          pauseOnFocusLoss: true,
        });
      });

      fireEvent.blur(window);

      act(() => vi.advanceTimersByTime(1000));

      fireEvent.focus(window);

      act(() => vi.advanceTimersByTime(1000));

      expect(screen.queryByText(/Test/)).toBe(null);
      expect(screen.queryByTestId('portal')).toBe(null);
    });
  });
});
