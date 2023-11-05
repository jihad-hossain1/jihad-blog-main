import Link from "next/link";
import { BiChevronRight } from "react-icons/bi";

const Book = () => {
  return (
    <div className="flex space-x-1">
      <h4 className="text-gray-500 text-sm ">{`"Modern Javascript"book is available!`}</h4>
      <Link
        href={"#"}
        className="hover:underline flex space-x-2 text-sm items-center text-gray-900 hover:text-gray-500"
      >
        {" "}
        <span>Check out</span>
        <BiChevronRight />
      </Link>
    </div>
  );
};

export default Book;
