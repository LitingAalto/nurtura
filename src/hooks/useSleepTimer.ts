import { useState, useEffect } from 'react';

export const useSleepTimer = () => {
  const [isActive, setIsActive] = useState(false);
  const [duration, setDuration] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      interval = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const startTimer = () => {
    setIsActive(true);
    setStartTime(new Date());
  };

  const stopTimer = () => {
    setIsActive(false);
    return {
      startTime: startTime!,
      endTime: new Date(),
      duration
    };
  };

  return {
    isActive,
    duration,
    startTime,
    startTimer,
    stopTimer
  };
};