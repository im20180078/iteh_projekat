import React from 'react';
import { Head } from '@inertiajs/react';

import ForumLayout from '@/Layouts/ForumLayout';
import FShowPost from '@/Components/Forum/ShowPost';

export default function ForumWelcome(props: any) 
{
  console.log(props.post);

  return (
    <ForumLayout
      title="Forum"
    >
      <div className="py-12 mt-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 w-full">
          <div className="editor bg-c2 dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg ">
            <FShowPost post={props.post} num_likes={props.num_likes} liked={props.liked} />
          </div>
        </div>
      </div>
    </ForumLayout>
  );
}
