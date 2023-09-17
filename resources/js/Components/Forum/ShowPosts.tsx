import React from 'react';
import route from 'ziggy-js';

interface ComponentArguments{
    posts: any,    
}

// id ; post_title ; post_content ; post_time ; post_autor ; visible

export default function FShowPosts(props: ComponentArguments){
    console.log(props.posts[0]);
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
            {props.posts.map((post) => (
                <a
                    key={post.id}
                    href={route('post', post.id)}
                    className="block bg-gray-50 rounded-lg shadow-md transition duration-300 hover:bg-c1 hover:text-c2"
                >
                    <div className="p-6">
                        <h2 className="text-lg font-semibold text-c1 mb-2">
                            {post.id}. {post.post_title}
                        </h2>
                        <p className="text-c5 text-sm">
                            By {post.post_author} at {post.post_time}
                        </p>
                    </div>
                </a>
            ))}
        </div>
    );
}