import React from 'react';
import route from 'ziggy-js';
import { cs } from './ColorScheme';

interface ComponentArgs{
  name: string
}

// style={{ height: "552px", width: "302px"}} 

export default function MainBlock(props: ComponentArgs) {
  return (
    <div className="p-6 dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent rounded-lg dark:shadow-none transition-all duration-250 focus:outline focus:outline-2 focus:outline-red-500">
      <div className="flex flex-col items-center justify-center">
        
        {/* SVG LOGO */}
        <div className="h-16 w-16 flex items-center justify-center rounded-full">
          <svg 
            className="h-8 w-8 text-red-500"  
            fill="none" 
            viewBox="0 0 24 24" 
            stroke={cs['c1']}
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d={props.svgPath1}
            />
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d={props.svgPath2}
            />
          </svg>
        </div>

        {/* BLOCK NAME */}
        <h2 className="mt-6 text-center text-xl font-semibold text-gray-900 dark:text-white">
          {props.name}
        </h2>

        <a
          href={route('login')}
          className="px-20 py-1 mt-20 bg-c5 text-c2 hover:bg-c2 hover:text-c4 rounded-lg shadow-xl shadow-gray-500/20 dark:shadow-none self-center">
            Login
        </a>
        
        <p className="mt-4 text-center text-gray-500 dark:text-gray-400 text-sm leading-relaxed">or</p>
        
        <a 
          href={route('register')}
          className="mt-4 px-16 py-1 bg-c4 text-c2 hover:bg-c2 hover:text-c4 rounded-lg shadow-xl shadow-gray-500/20 dark:shadow-none">
            Register
          </a>
        
        <p className="mt-6 text-center text-gray-500 dark:text-gray-400 text-sm leading-relaxed">and chat away!</p>

      </div>
    </div>
  );
}
