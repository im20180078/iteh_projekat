import React, {useState, useEffect} from 'react';
import axios from 'axios';

import { setApiAxiosHeader } from '@/Components/Helper/ApiTokenManager';

interface ComponentArguments {
    post: any,
    liked: any,
    num_likes: any
}

export default function FShowPost(props: ComponentArguments) {
    const { id, post_title, post_content, post_time, post_author, ...otherProps } = props.post;
    console.log(props);

    const [likes, setLikes] = useState(props.num_likes);
    const [isLiked, setIsLiked] = useState(props.liked);   

    const handleLikeClick = () => {
        setApiAxiosHeader();
        axios.post(`/api/posts/${id}/like`)
            .then(response => {
                console.log(response);
                setLikes(response.data.num_likes);
                setIsLiked(response.data.liked);
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div className="block shadow-md rounded-lg p-4 h-[75vh] max-h-[75vh]">
            <h2 className="text-xl font-semibold mb-2">"{post_title}"</h2>
            <p className="text-sm text-gray-500 mb-2">By <span className="font-bold text-black-980">{otherProps.author.name}</span> at {post_time}</p>
            <div className="prose prose-sm text-gray-800 mb-4" dangerouslySetInnerHTML={{ __html: post_content }} />

            {likes > 0 && <p className="text-xs text-gray-500 mb-2 text-left">{`${likes} ${likes === 1 ? 'person' : 'people'} liked this`}</p>}
            {likes == 0 && <p className="text-xs text-gray-500 mb-2 text-left">{`No likes`}</p>}

            <div className="flex justify-left items-center mb-2">
                <button
                    onClick={handleLikeClick}
                    className={`text-c1 transition-colors duration-200 hover:text-c4 focus:outline-none ${isLiked ? 'text-c4' : ''}`}
                >
                    {isLiked ? 'Liked' : 'Like'}
                </button>
                <button className="ml-4 text-c1 transition-colors duration-200 hover:text-c4 focus:outline-none">Share</button>
            </div>
        </div>
    );
}