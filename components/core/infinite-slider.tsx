'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface InfiniteSliderProps {
  children: React.ReactNode;
  gap?: number;
  reverse?: boolean;
  className?: string;
}

export function InfiniteSlider({
  children,
  gap = 16,
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const childrenArray = React.Children.toArray(children);

  return (
    <div
      className={cn(
        'relative flex w-full overflow-hidden',
        className
      )}
    >
      <div
        className="flex animate-infinite-scroll"
        style={{
          '--gap': `${gap}px`,
          animationDirection: reverse ? 'reverse' : 'normal',
        } as React.CSSProperties}
      >
        {[...childrenArray, ...childrenArray].map((child, index) => (
          <div
            key={index}
            style={{ marginRight: `${gap}px` }}
            className="flex-shrink-0"
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
