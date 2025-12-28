import React from 'react';
import clsx from 'clsx';

interface LCDLineProps {
  text: string;
  align?: 'left' | 'center' | 'right';
  size?: 'sm' | 'lg';
  className?: string;
}

export const LCDLine: React.FC<LCDLineProps> = ({ 
  text, 
  align = 'left', 
  size = 'sm', 
  className 
}) => {
  return (
    <div className={clsx(
      'font-display w-full tracking-widest truncate',
      {
        'text-left': align === 'left',
        'text-center': align === 'center',
        'text-right': align === 'right',
        'text-terminal-text text-[14px] leading-tight': size === 'sm',
        'text-terminal-text text-[24px] font-bold mt-1': size === 'lg',
      },
      className
    )}>
      {text}
    </div>
  );
};