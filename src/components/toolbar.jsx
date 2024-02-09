import * as React from 'react';
import { cn } from '../lib/utils';

export default function Toolbar({ className, children }) {
  return (
    <div
      className={cn(
        'flex flex-row items-center min-h-[48px] h-[48px] border-b-2 px-4',
        className,
      )}>
      {children}
    </div>
  );
}
