import React from 'react';
import { cs } from '@/Components/Forum/ColorScheme';

var logoSource = "/img/logo.png";
var logoName = "BizForum";

export default function LogoRow() {
  return (
    <div className="flex justify-center">
      <div 
        className="flex hover:drop-shadow-lg hover:text-c1 hover:cursor-pointer transition duration-400 ease-in-out"
        >
        <img className="h-10" src={logoSource}/>
        <p className="py-2 font-bold text-inherit">{logoName}&#8482;</p>
      </div>
    </div>
  );
}
