"use client";

import { useState, useEffect } from 'react';

const Countdown = () => {
  const calculateTimeLeft = () => {
    const difference = +new Date('2026-01-01T09:00:00') - +new Date();
    let timeLeft = {
      jours: 0,
      heures: 0,
      minutes: 0,
      secondes: 0,
    };

    if (difference > 0) {
      timeLeft = {
        jours: Math.floor(difference / (1000 * 60 * 60 * 24)),
        heures: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        secondes: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState({ jours: 0, heures: 0, minutes: 0, secondes: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Set initial time on client
    setTimeLeft(calculateTimeLeft());
    
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeParts = [
    { label: 'Jours', value: timeLeft.jours },
    { label: 'Heures', value: timeLeft.heures },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Secondes', value: timeLeft.secondes },
  ];
  
  if (!isClient) {
    return null;
  }

  return (
    <div className="flex justify-center items-start gap-4 md:gap-8">
      {timeParts.map((part) => (
        <div key={part.label} className="text-center w-20 md:w-28">
          <div 
            className="font-headline text-4xl md:text-6xl font-bold text-primary"
            style={{textShadow: '0 0 8px hsl(var(--primary)), 0 0 16px hsl(var(--primary) / 0.5)'}}
          >
            {part.value.toString().padStart(2, '0')}
          </div>
          <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-widest mt-1">{part.label}</div>
        </div>
      ))}
    </div>
  );
};

export default Countdown;