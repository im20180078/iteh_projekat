import React from 'react';
import {cs} from '@/Components/Forum/ColorScheme';

interface ComponentArgs{
  name: string,
  text:string,
  svgPath1: string,
  svgPath2: string,
  svgColor: string
}

// style={{ height: "552px", width: "302px"}} 

export default function InfoBlock(props: ComponentArgs) {
  return (
    <div className="w-302 h-552 p-6 bg-white dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none flex motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-red-500">
      <div>
        
        {/* SVG LOGO */}
        <div className="h-16 w-16 bg-red-50 dark:bg-red-800/20 flex items-center justify-center rounded-full">
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
        <h2 className="mt-6 text-c0 text-xl font-semibold text-gray-900 dark:text-white">
          {props.name}
        </h2>

        {/* TEXT AREA */}
        <p className="mt-8 text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
          {props.text}
        </p>
      </div>
    </div>
  );
}
