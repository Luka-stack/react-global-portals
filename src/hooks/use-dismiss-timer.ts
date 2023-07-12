import { useEffect, useRef } from 'react';
import { PortalId } from '../types';
import { portal } from '../core/portal';

interface Timer {
  pause(): void;
  resume(): void;
}

export class NullTimer implements Timer {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  pause(): void {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  resume(): void {}
}

export class DismissTimer implements Timer {
  private _timerId: number | NodeJS.Timeout | undefined;
  private _start = 0;

  constructor(private _remaining: number, private _portalId: string) {
    this.resume();
  }

  pause(): void {
    clearTimeout(this._timerId);
    this._timerId = undefined;
    this._remaining -= Date.now() - this._start;
  }

  resume(): void {
    if (this._timerId) return;

    this._start = Date.now();
    this._timerId = setTimeout(
      () => portal.dismiss(this._portalId),
      this._remaining
    );
  }
}

export function useDismissTimer(
  id: PortalId,
  timeout = 0,
  pauseOnFocusLoss = false
) {
  const timer = useRef<Timer>(
    timeout > 0 ? new DismissTimer(timeout, id) : new NullTimer()
  ).current;

  const resume = () => timer.resume();
  const pause = () => timer.pause();

  useEffect(() => {
    if (timeout && pauseOnFocusLoss) {
      window.addEventListener('blur', pause);
      window.addEventListener('focus', resume);

      return () => {
        window.removeEventListener('focus', resume);
        window.removeEventListener('blur', pause);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
}
