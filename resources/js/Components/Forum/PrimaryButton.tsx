import React from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import { Link } from '@inertiajs/react';

export default function FPrimaryButton(props){
    const {href, name, alternative, ...otherProps} = props;
    console.log(props);
    return(
        <div className="justify-center">
          <div className='flex justify-center'>
          <PrimaryButton
            {...otherProps}
          >
            {name}
          </PrimaryButton>
          </div>
          <div className='flex justify-center'>
          <Link
            href={href}
            className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
          >
            {alternative}
          </Link>
          </div>
        </div>
    );
}