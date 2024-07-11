"use client";

import AdminAuth from "@/context/AdminAuth";
import Link from "next/link";
import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <AdminAuth>
      <div className="max-w-screen-xl mx-auto px-1  py-2">
        <nav className=" flex justify-end items-end bg-gray-100/60 rounded shadow-sm md:p-4 p-2">
          <ul className="text-sm md:text-lg flex gap-6 md:gap-5 overflow-x-scroll md:overflow-hidden ">
            <Link href={"/dashboard/addResume"}>
              <li className="text-xs md:text-lg">
                <span className="hidden md:block">add resume</span>
                <span className="md:hidden">Resume</span>
              </li>
            </Link>

            <Link href={"/dashboard/manageBlog"}>
              <li className="text-xs md:text-lg">
                <span className="hidden md:block">Manage blog</span>
                <span className="md:hidden">Blogs</span>
              </li>
            </Link>
            <Link href={"/dashboard/manageproject"}>
              <li className="text-xs md:text-lg">
                <span className="hidden md:block">Manage projects</span>
                <span className="md:hidden">Projects</span>
              </li>
            </Link>
            <Link href={"/dashboard/manageProduct"}>
              <li className="text-xs md:text-lg">
                <span className="hidden md:block">Manage Products</span>
                <span className="md:hidden">Products</span>
              </li>
            </Link>
            <Link href={"/dashboard/messages"}>
              <li className="text-xs md:text-lg">
                <span className="hidden md:block">Messages</span>
              </li>
            </Link>
          </ul>
        </nav>
        <div className="min-h-screen">{children}</div>
      </div>
    </AdminAuth>
  );
};

export default DashboardLayout;
