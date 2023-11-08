import Link from "next/link";
import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <div className="max-w-screen-xl mx-auto px-6  py-2">
      <nav className="flex justify-end items-end bg-blue-gray-100/60 rounded shadow-sm p-4">
        <ul className="flex space-x-5">
          {/* <Link href={"/dashboard/addblog"}>
            <li>add blog</li>
          </Link> */}
          <Link href={"/dashboard/addproject"}>
            <li>add project</li>
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
