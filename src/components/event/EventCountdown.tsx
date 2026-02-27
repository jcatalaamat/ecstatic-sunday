'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils/cn';

interface EventCountdownProps {
  targetDate: string;
  className?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function EventCountdown({ targetDate, className }: EventCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();
      if (difference <= 0) return null;
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      const tl = calculateTimeLeft();
      if (!tl) {
        clearInterval(timer);
      }
      setTimeLeft(tl);
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) return null;

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Min', value: timeLeft.minutes },
    { label: 'Sec', value: timeLeft.seconds },
  ];

  return (
    <div className={cn('flex gap-3', className)}>
      {units.map((unit) => (
        <div
          key={unit.label}
          className="text-center glass rounded-lg px-3 py-2 min-w-[60px]"
        >
          <p className="text-2xl font-bold font-heading text-[var(--color-orange)]">
            {String(unit.value).padStart(2, '0')}
          </p>
          <p className="text-xs text-[var(--foreground-muted)] uppercase tracking-wider">
            {unit.label}
          </p>
        </div>
      ))}
    </div>
  );
}
