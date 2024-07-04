"use client";

import Link from "next/link";
import React from "react";

const Denied = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-[90vh]">
      <div className="text-center flex flex-col gap-2">
        <h4 className="text-xl text-red-500">
          Access Denied. You are not allow
        </h4>
        <Link
          href={"/"}
          className="text-blue-600 border border-gray-300 rounded-md shadow-sm hover:shadow transition-all duration-300 px-3 py-1 text-sm uppercase"
        >
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default Denied;
