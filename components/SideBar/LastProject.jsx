import Link from "next/link";
import React from "react";

const LastProject = () => {
  return (
    <div className="bg-white">
      <h4 className="text-gray-600 bg-gray-50/30 p-5 border-b">Last Project</h4>
      <div className="p-5">
        <h4 className="text-sm text-gray-900 mb-2">Node.js</h4>
        <p className="text-xs text-gray-600 mb-2">October 05,2023</p>
        <p className="text-sm text-gray-600 mb-4">
          create a uptime monitoring server by raw node.js
        </p>
        <Link
          href={"#"}
          className="transition-all duration-300 rounded-3xl px-4 md:px-8 py-2 text-sm border border-neutral-200 text-gray-600 hover:text-gray-50 hover:bg-neutral-900"
        >
          watch it
        </Link>
      </div>
    </div>
  );
};

export default LastProject;
