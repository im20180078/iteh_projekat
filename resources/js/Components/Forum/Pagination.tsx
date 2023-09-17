import React from 'react';

export default function FPagination({ pages, current, onPageClick, endPage }) {
    console.log("ENDPAGE: " + endPage);
    return (
        <div className="flex justify-center mt-4">
            <nav aria-label="Page navigation example">
                <ul className="inline-flex -space-x-px text-sm">
                    {/* Previous link */}
                    <li>
                        <button
                            onClick={() => onPageClick(0)}
                            className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            Start
                        </button>
                    </li>

                    {/* Render dynamic pagination links */}
                    {pages.map((page) => (
                        <li key={page}>
                            <button
                                onClick={() => onPageClick(page)}
                                className={`flex items-center justify-center px-4 h-8 ${
                                    page === current ? 'ml-1 text-c3 border bg-c4' : 'ml-1 border text-c0'
                                } ${
                                    page === current ? 'border-c5' : 'border-c2'
                                } hover:bg-c5 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white`}
                            >
                                {page}
                            </button>
                        </li>
                    ))}

                    {/* Next link */}
                    <li>
                        <button
                            onClick={() => onPageClick(endPage)}
                            className="flex ml-1 items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            End
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}