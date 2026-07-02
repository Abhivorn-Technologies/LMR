"use client";

import React from 'react';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  delay?: number;
  className?: string;
  color?: string;
  shineColor?: string;
  spread?: number;
  direction?: 'left' | 'right';
  yoyo?: boolean;
  pauseOnHover?: boolean;
}

const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 3,
  delay = 0,
  className = '',
  color = '#b5b5b5',
  shineColor = '#ffffff',
  spread = 120,
  direction = 'left',
  yoyo = false,
  pauseOnHover = false,
}) => {
  const animationDuration = `${speed}s`;
  const animationDelay = `${delay}s`;

  // Determine gradient direction
  const gradientDirection = direction === 'left' ? '120deg' : '-120deg';
  
  // Calculate spread percentage
  const spreadPercent = spread / 100;
  const start = 50 - spreadPercent * 50;
  const end = 50 + spreadPercent * 50;

  return (
    <span
      className={`inline-block bg-clip-text text-transparent ${disabled ? '' : 'animate-shine'} ${pauseOnHover ? 'hover:[animation-play-state:paused]' : ''} ${className}`}
      style={{
        backgroundImage: `linear-gradient(${gradientDirection}, ${color} ${start}%, ${shineColor} 50%, ${color} ${end}%)`,
        backgroundSize: '200% 100%',
        animationDuration,
        animationDelay,
        animationIterationCount: 'infinite',
        animationDirection: yoyo ? 'alternate' : 'normal',
      }}
    >
      {text}
    </span>
  );
};

export default ShinyText;
