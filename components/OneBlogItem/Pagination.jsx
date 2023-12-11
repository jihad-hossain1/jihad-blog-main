import Link from "next/link";

const Pagination = ({ BlogsPerPage, totalBlogs, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalBlogs / BlogsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav className="mt-6 flex justify-center">
      <ul className="flex items-center gap-4">
        {pageNumbers.map((number) => (
          <li key={number} className="">
            <Link
              href={"#"}
              onClick={() => paginate(number)}
              className={
                "bg-gray-700 px-4 py-2 text-gray-50 w-fit rounded-md shadow"
              }
            >
              {number}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
