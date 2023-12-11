import Link from "next/link";
import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <div className="max-w-screen-xl mx-auto px-6  py-2">
      <nav className=" flex justify-end items-end bg-gray-100/60 rounded shadow-sm md:p-4 p-2">
        <ul className="text-sm md:text-lg flex gap-6 md:gap-5 overflow-x-scroll md:overflow-hidden">
          <Link href={"/dashboard/addResume"}>
            <li className="break-keep">add resume</li>
          </Link>
          <Link href={"/dashboard/addproject"}>
            <li>add project</li>
          </Link>
          <Link href={"/dashboard/addProduct"}>
            <li>add product</li>
          </Link>
          <Link href={"/dashboard/manageBlog"}>
            <li>Manage blog</li>
          </Link>
          <Link href={"/dashboard/manageproject"}>
            <li>Manage projects</li>
          </Link>
          <Link href={"/dashboard"}>
            <li>Dash-Home</li>
          </Link>
        </ul>
      </nav>
      <div className="min-h-screen">{children}</div>
    </div>
  );
};

export default DashboardLayout;
