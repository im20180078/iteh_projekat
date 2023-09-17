import React, { PropsWithChildren } from 'react';

export default function FContainer({children,}: PropsWithChildren<Record<string, unknown>>) {
  return (
    <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-c2 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
      <div className="max-w-7xl mx-auto p-6 lg:p-8">
        {children}
      </div>
    </div>
  );
}
