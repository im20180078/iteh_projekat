import React, { useState, useEffect } from 'react';
import FShowPosts from '@/Components/Forum/ShowPosts';
import ForumLayout from '@/Layouts/ForumLayout';
import axios, { AxiosResponseHeaders } from 'axios';

import prepare_api_response from '@/Components/Helper/XmlJsonLib';
import FPagination from '@/Components/Forum/Pagination';
import { setApiAxiosHeader } from '@/Components/Helper/ApiTokenManager';

function generatePaginationList(currPage, totalPosts, visiblePages, visiblePosts) {
  //const maxPagesToShow = visiblePages;
  const maxPagesToShow = 10;
  const paginationList = [];

  if (totalPosts <= maxPagesToShow) {
      paginationList.push(0);
  } else {
      let startPage = Math.max(currPage - Math.floor(maxPagesToShow / 2), 0);
      let endPage = Math.min(startPage + maxPagesToShow - 1, Math.ceil(totalPosts / visiblePosts) - 1);

      if (endPage - startPage + 1 < maxPagesToShow) {
          startPage = Math.max(endPage - maxPagesToShow + 1, 0);
      }

      for (let page = startPage; page <= endPage; page++) {
          paginationList.push(page);
      }
  }

  return paginationList;
}

export default function Forum() {
  const [posts, setPosts] = useState([]);
  const [pages, setPages] = useState([]);
  const [totalPosts, settotalPosts] = useState(0);
  const [currPage, setCurrPage] = useState(0);
  const [visiblePosts, setVisiblePosts] = useState(10);
  const [visiblePages, setVisiblePages] = useState(10);

  useEffect(() => {
      fetchPosts();
      fetchPages();
  }, [currPage, visiblePosts]);

  const fetchPosts = async () => {
    try {
      setApiAxiosHeader();
        const response = await axios.get(
          '/api/posts/' + currPage + '/' + visiblePosts, {headers: {Accept: 'application/json'}}
        );
        console.log("FETCH POSTS: " + '/api/posts/' + currPage + '/' + visiblePosts);
        setPosts(prepare_api_response(response));
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
  };

  const fetchPages = async () => {
    setApiAxiosHeader();
    console.log("FETCH_PAGES: ");
    try {
        const response = await axios.get(
          '/api/posts/length/'
        );
          // [0] 1 2 3 4
          // 0 [1] 2 3 4
          // 0 1 [2] 3 4
          // 1 2 [3] 4
          // 1 2 3 [4]
        console.log("CurrentPage: " + currPage + "\nVisiblePosts: " + visiblePosts + "\nVisiblePages: " + visiblePages + "\nResponseData: " + response.data + "\nPaginationList: " + generatePaginationList(currPage, response.data, visiblePages, visiblePosts));
        settotalPosts(response.data);
        setPages(generatePaginationList(currPage, response.data, visiblePages, visiblePosts));
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
  };
  
  const handlePageClick = (page) => {
    setCurrPage(page);
  };
    
  return (
    <ForumLayout title="Forum">
        <div className="py-12 mt-10 max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="editor bg-c2 dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg w-full h-[75vh]">
                <div className="flex justify-between items-center px-4 py-3 border-b border-gray-300 dark:border-gray-700">
                    <div className="flex items-center space-x-2">
                        <label className="font-medium text-gray-700 dark:text-gray-300">Posts:</label>
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

                <div className="mt-4 p-6 h-[60vh]">
                    <FShowPosts posts={posts} />
                </div>

                <div className="flex justify-center pb-6">
                    <FPagination
                        pages={pages}
                        current={currPage}
                        onPageClick={handlePageClick}
                        endPage={totalPosts % visiblePosts === 0 ? Math.floor(totalPosts / visiblePosts) - 1 : Math.floor(totalPosts / visiblePosts)}
                    />
                </div>
            </div>
        </div>
    </ForumLayout>
  );
}