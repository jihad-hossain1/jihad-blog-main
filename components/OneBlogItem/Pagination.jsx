

import Link from "next/link";

const Pagination = ({ page, setPage, itemsPerPage, setItemsPerPage, totalBlog }) => {
  
  const handlePrevious = () => {
    
  setPage(page - 1)
}
  const handleNext = () => {

  setPage(page + 1)
}
  return (
    <div className="flex justify-between">
      <button onClick={handlePrevious} >
        Prev
      </button>
      <button onClick={handleNext}>
        Nex
      </button>
    </div>
  );
};

export default Pagination;
