import { useState, useEffect } from 'react';

interface TimerState {
  isActive: boolean;
  duration: number;
}

export const useTimer = (initialDuration = 0) => {
  const [state, setState] = useState<TimerState>({
    isActive: false,
    duration: initialDuration,
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (state.isActive) {
      interval = setInterval(() => {
        setState(prev => ({
          ...prev,
          duration: prev.duration + 1,
        }));
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [state.isActive]);

  const start = () => setState(prev => ({ ...prev, isActive: true }));
  const stop = () => setState(prev => ({ ...prev, isActive: false }));

  return {
    ...state,
    start,
    stop,
  };
};