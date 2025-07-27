import React from 'react';

const Pagination = ({ currentPage, setCurrentPage, pageArray }) => {
    const handleNext = () => {
        setCurrentPage(prev => 
            prev === pageArray.length ? 1 : prev + 1
        );
    };

    const handlePrevious = () => {
        setCurrentPage(prev => 
            prev === 1 ? pageArray.length : prev - 1
        );
    };

    return (
        <div id="pagination" className="w-full px-10 bg-gray-300 py-2 flex justify-around rounded-lg">
            <button 
                onClick={handlePrevious} 
                className="bg-white rounded-md font-semibold text-gray-800 px-5 py-2 hover:bg-green-500 hover:text-white tracking-wide shadow-md"
            >
                Previous
            </button>
            
            <div id="pages" className="flex justify-center items-center">
              
                    <button 
                        // key={currentPage} 
                        // onClick={() => setCurrentPage(currentPage)}
                        className={`
                            ml-1 text-center rounded-sm shadow-lg w-9 h-9
                            bg-blue-500 text-white }
                        `}
                    >
                        {currentPage}
                    </button> 
                    <span className='text-2xl text-center ml-2 mr-2 text-slate-700'>of</span>
         
                    <button 
                        // key={currentPage} 
                        // onClick={() => setCurrentPage(currentPage)}
                        className={`
                           bg-white ml-1 text-center rounded-sm shadow-lg w-9 h-9
                            }
                        `}
                    >
                        {pageArray.length}
                    </button>
         
                {/* {pageArray.map((page) => (
                    <button 
                        key={page} 
                        onClick={() => setCurrentPage(page)}
                        className={`
                            ml-1 text-center rounded-sm shadow-lg w-9 h-9
                            ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-white'}
                        `}
                    >
                        {page}
                    </button>
                ))} */}
            </div>
            
            <button 
                onClick={handleNext} 
                className="bg-white rounded-md text-gray-800 px-5 py-2 font-semibold hover:bg-primary hover:text-white tracking-wide shadow-md"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;