import React from 'react';

interface colorScheme {
    readonly c0: string;  // black
    readonly c1: string;  // main
    readonly c2: string;  // background
    readonly c3: string;
    readonly c4: string;
    readonly c5: string;
  }
  
 function fillColorScheme (clrSch: colorScheme) {}
  fillColorScheme({
    c0: "#000000",
    c1: "#ef4444",
    c2: "#f3f4f6",
    c3: "#b5c8c9",
    c4: "#6a897a",
    c5: "#343f39"  
})

export const cs: colorScheme = 
{
    c0: "#000000",
    c1: "#ef4444",
    c2: "#f3f4f6",
    c3: "#b5c8c9",
    c4: "#6a897a",
    c5: "#343f39"
};