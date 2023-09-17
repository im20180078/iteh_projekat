import React, { PropsWithChildren } from 'react';
import { preprocessCSS } from 'vite';

function F3BlockContainer({children,}: PropsWithChildren<Record<string, unknown>>) {
  return (
    <div className="mt-8 bg-cs1">
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-20`}>
            {children}
        </div>
    </div>
  );
}

function F1BlockContainer({children,}: PropsWithChildren<Record<string, unknown>>) {
  return (
    <div 
      className="mt-8 bg-cs1" 
      >
        <div className={`grid grid-cols-1`}>
            {children}
        </div>
    </div>
  );
}

export{F3BlockContainer, F1BlockContainer};