"use client";

import AdminAuth from "@/context/AdminAuth";
import Link from "next/link";
import React, { useState } from "react";
import { FaHome, FaClipboardList ,FaBabyCarriage, FaEnvelope,FaHotTub,FaPoo, FaDragon} from "react-icons/fa";
import { FiAlignLeft } from "react-icons/fi";
import { TfiControlBackward } from "react-icons/tfi";

const DashboardLayout = ({ children }) => {
  const [open, setOpen] = useState(true);
  const navList = [
    {
      icon: <FaClipboardList  />,
      name: "Resume",
      link: "/dashboard/addResume",
    },
    {
      icon: <FaPoo />,
      name: "Blogs",
      link: "/dashboard/manageBlog",
    },
    {
      icon: <FaHotTub />,
      name: "Projects",
      link: "/dashboard/manageproject",
    },
    {
      icon: <FaDragon />,
      name: "Category",
      link: "/dashboard/category",
    },
    {
      icon: <FaBabyCarriage />,
      name: "Products",
      link: "/dashboard/manageProduct",
    },

    {
      icon: <FaEnvelope />,
      name: "Messages",
      link: "/dashboard/messages",
    },
  ];

  return (
    <AdminAuth>
        <main className="flex relative min-h-screen">
        <div className="w-full fixed top-0 z-50 bg-slate-300 shadow p-2 flex justify-between items-center">
          <button onClick={() => setOpen(!open)} className="p-2">
            {open ? (
              <TfiControlBackward className="text-3xl" />
            ) : (
              <FiAlignLeft className="text-3xl" />
            )}
          </button>
          <Link href="/" className="flex gap-2 items-center">
            <FaHome /> Home
          </Link>
        </div>
        <aside
          className={`${
            open ? "block" : "hidden"
          } bg-slate-300 shadow-sm border-l border-gray-800  fixed top-[63px] z-50 h-screen `}
        >
          <div className="relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute -right-7 top-0 bg-slate-300 px-3 py-1 shadow rounded-br-md"
            >
              <TfiControlBackward className="text-3xl cursor-pointer" />
            </button>
          </div>
          <div className="flex flex-col gap-2 mt-10">
            {navList.map((item, index) => (
              <Link
                key={index}
                href={item?.link}
                className="hover:bg-gray-50 py-2 px-6 transition duration-300 text-nowrap text-[16px] flex items-center gap-6"
              >
                {item?.icon} {item?.name}
              </Link>
            ))}
          </div>
        </aside>
        <div className={`flex-grow ${open ? "ml-[200px]" : "ml-0"} mt-[63px] p-4 `}>
          {children}
        </div>
      </main>
    </AdminAuth>
  );
};

export default DashboardLayout;
