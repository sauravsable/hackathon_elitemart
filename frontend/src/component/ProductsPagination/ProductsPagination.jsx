import './ProductsPagination.css';

const Pagination = ({ pageNo, setPageNo, totalItems, itemsPerPage }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const prevThreeArray = Array.from({ length: 3 }, (_, index) => pageNo - 1 - index)
        .filter((value) => value > 0)
        .reverse();

    const nextFourArray = new Array(4)
        .fill(null)
        .map((_, index) => pageNo + index)
        .filter((value) => value <= totalPages);

    const paginationArray = [...prevThreeArray, ...nextFourArray];

    function handleNext() {
        if (pageNo < totalPages) setPageNo(pageNo + 1);
    }

    function handlePrev() {
        if (pageNo > 1) setPageNo(pageNo - 1);
    }

    return (
        <div className='paginationDiv'>
            <div className="pagination-container">

                {pageNo > 1 && (
                    <div className="page-btn" onClick={handlePrev}>
                        Prev
                    </div>
                )}

                {paginationArray.map((value, index) => (
                    <div
                        onClick={() => setPageNo(value)}
                        className={value === pageNo ? "page-btn active" : "page-btn"}
                        key={index}
                    >
                        {value}
                    </div>
                ))}

                {pageNo < totalPages && (
                    <div className="page-btn" onClick={handleNext}>
                        Next
                    </div>
                )}
            </div>
        </div>
    );
};

export default Pagination;
