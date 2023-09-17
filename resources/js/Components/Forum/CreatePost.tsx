import React, { useState } from 'react';
import useTypedPage from '@/Hooks/useTypedPage';
import useRoute from '@/Hooks/useRoute';
import { router } from '@inertiajs/core';
import { Team } from '@/types';
import classNames from 'classnames';
import axios from 'axios';

import { setApiAxiosHeader } from '../Helper/ApiTokenManager';

export default function FCreatePost({
    formData,
    handleInputChange,
    handleSubmit,
  }) {
    const [postCount, setPostCount] = useState(0); // Initialize with 0
    const page = useTypedPage();

    const fetchPostCount = async () => {
        try {
            setApiAxiosHeader();
          const response = await axios.get(`/api/numPosts`);
          return response.data.numPosts;
        } catch (error) {
          console.error('Error fetching post count:', error);
          return 0;
        }
    };

    const handleClickMe = async (e) => {
        e.preventDefault();
        // Your submission logic here
      
        // After the post is submitted successfully
        setPostCount(postCount + 1); // Increment post count
      };

    console.log(formData);
    return(
        <div className="editor flex flex-col text-gray-800 p-4 shadow-lg w-full">
            
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-300 dark:border-gray-700">
                    <div className="flex items-center space-x-2">
                    <h1 className="text-lg text-gray-800 dark:text-white">Add new post!</h1>
                    </div>
                    <button className="text-c1 hover:text-c4 focus:outline-none">
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 19l-7-7 7-7"
                            ></path>
                        </svg>
                    </button>
                </div>
            <form onSubmit={handleSubmit}>
            <div className='flex justify-center my-4'>
            <p className='text-bold'>
            Hi <span className="font-bold">{page.props.auth.user?.name}</span>! On Business Forum you are free to create a post/thread on any topic.{' '}
            <a href="#">
            <span
                className='font-bold text-blue-500'
                onClick={async () => {
                    const count = await fetchPostCount();
                    setPostCount(count);
                }}
            >
                click me!
            </span>
            </a>{' '}
            <span>You posted {postCount} post{postCount !== 1 ? 's' : ''}!</span>
            </p>
            </div>

            <input 
            className="title w-full bg-gray-50 border border-gray-300 p-2 mb-4 outline-none rounded-lg" 
            placeholder="Title" 
            type="text"
            name="post_title"
            value={formData.post_title}
            onChange={handleInputChange}
            required
            />
            <textarea 
            className="block p-2.5 mb-4 w-full h-screen max-h-[50vh] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="Describe everything about this post here"
            name="post_content"
            value={formData.post_content}
            onChange={handleInputChange}
            required
            ></textarea>

            <div className="buttons flex">
                <button 
                type="submit"
                className="btn border border-c1 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-c1 transition duration-300 hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-c1 focus:ring-opacity-50 rounded-md"
                >Post</button>
            </div>
            </form>
        </div>
    );
}