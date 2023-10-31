import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="font-bold text-xl  px-10 py-6 flex justify-between items-center min-h-10 bg-gray-900 rounded text-white">
      <Link href={"/"} className="hover:underline">
        null.
      </Link>
      <Link href={"/addTopic"} className="hover:underline">
        add Topic
      </Link>
    </nav>
  );
};

export default Navbar;
