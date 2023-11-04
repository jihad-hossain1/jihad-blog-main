"use client";

import React, { useState } from "react";
import { PiShoppingCartThin } from "react-icons/pi";
import NavLink from "../Navlink/NavLink";
import { FiChevronDown } from "react-icons/fi";
import Link from "next/link";
import { BiChevronRight } from "react-icons/bi";
import Search from "./search/Search";

const NavbarSmall = () => {
  const user = {
    permit: true,
    status: "admin",
  };

  const [isAccountButtonActive, setIsAccountButtonActive] = useState(false);
  const [isBlogButtonActive, setIsBlogButtonActive] = useState(false);

  return (
    <div className="max-w-screen-xl mx-auto px-4   pb-6">
      <div className="lg:block hidden mx-auto max-w-screen-xl px-6 py-2 mt-2">
        <div className="flex justify-between items-center border-b border-gray-200 pb-4">
          <div>Jihad Blogs</div>
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
          <div>
            <Search />
          </div>
        </div>
      </div>
      <div className="lg:flex  hidden justify-between px-6 py-2 mt-2">
        <ul className="flex space-x-5 items-center">
          <li>
            <NavLink
              href="/"
              className="text-gray-500 hover:text-gray-700 hover:underline"
              activeClassName="text-gray-700"
            >
              Start page
            </NavLink>
          </li>
          <li className="group">
            <button
              onClick={() => setIsBlogButtonActive(!isBlogButtonActive)}
              className="text-gray-500 hover:text-gray-700 flex items-center space-x-1 hover:underline"
            >
              <span> Blog article</span>
              <FiChevronDown />
            </button>
            {isBlogButtonActive && (
              <div className="fixed z-10 bg-gray-100 mt-7 rounded-sm">
                <ul className="text-sm min-w-[150px]">
                  <Link href={`/blogsArticle`}>
                    <li
                      onClick={() => setIsBlogButtonActive(false)}
                      className="ctg-l-b"
                    >
                      <h4 className="uppercase text-gray-600">CSS</h4>
                      <div className="bg-[#38b7ea] rounded-full h-2 w-2"></div>
                    </li>
                  </Link>
                  <Link href={`/blogsArticle`}>
                    <li
                      onClick={() => setIsBlogButtonActive(false)}
                      className="ctg-l-b"
                    >
                      <h4 className="uppercase text-gray-600">Html</h4>
                      <div className="bg-[#ff7473] rounded-full h-2 w-2"></div>
                    </li>
                  </Link>
                  <Link href={`/blogsArticle`}>
                    <li
                      onClick={() => setIsBlogButtonActive(false)}
                      className="ctg-l-b"
                    >
                      <h4 className=" text-gray-600">JavaScript</h4>
                      <div className="bg-[#ffc952] rounded-full h-2 w-2"></div>
                    </li>
                  </Link>
                  <Link href={`/blogsArticle`}>
                    <li
                      onClick={() => setIsBlogButtonActive(false)}
                      className="ctg-l-b"
                    >
                      <h4 className=" text-gray-600">React</h4>
                      <div className="bg-[#6dc8bf] rounded-full h-2 w-2"></div>
                    </li>
                  </Link>
                  <Link href={`/blogsArticle`}>
                    <li
                      onClick={() => setIsBlogButtonActive(false)}
                      className="ctg-l-b"
                    >
                      <h4 className=" text-gray-600">Others</h4>
                      <div className="bg-gray-600 rounded-full h-2 w-2"></div>
                    </li>
                  </Link>

                  <Link href={`/blogsArticle`}>
                    <li
                      onClick={() => setIsBlogButtonActive(false)}
                      className="ctg-l-b"
                    >
                      All Blogs
                    </li>
                  </Link>
                </ul>
              </div>
            )}
          </li>
          <li>
            <NavLink
              href="/myproject"
              className="text-gray-500 hover:text-gray-700 hover:underline"
              activeClassName="text-gray-700"
            >
              My projects
            </NavLink>
          </li>
          <li>
            <NavLink
              href="/contact"
              className="text-gray-500 hover:text-gray-700 hover:underline"
              activeClassName="text-gray-700"
            >
              contact me
            </NavLink>
          </li>
          <li>
            <button
              onClick={() => setIsAccountButtonActive(!isAccountButtonActive)}
              className="text-gray-500 hover:text-gray-700 flex items-center space-x-1 hover:underline"
            >
              <span>Account</span>
              <FiChevronDown />
            </button>
            {isAccountButtonActive && (
              <div className="fixed z-10 bg-white mt-7 rounded-sm">
                <ul>
                  {user ? (
                    <>
                      <li
                        onClick={() => setIsAccountButtonActive(false)}
                        className="hover:bg-gray-100 text-gray-600 hover:text-gray-900 px-10 transition duration-300   text-center py-3 border-b border-gray-200"
                      >
                        <NavLink href={"#"}>Profile</NavLink>
                      </li>
                      <li onClick={() => setIsAccountButtonActive(false)}>
                        <button className="w-full hover:bg-gray-100 text-gray-600 hover:text-gray-900 px-10 transition duration-300  text-center py-3 border-b border-gray-200">
                          Log-Out
                        </button>
                      </li>
                      {user?.status == "admin" && (
                        <>
                          <li
                            onClick={() => setIsAccountButtonActive(false)}
                            className="hover:bg-gray-100 text-gray-600 hover:text-gray-900 px-10 transition duration-300  text-center py-3 border-b border-gray-200"
                          >
                            <NavLink href={"/dashboard"}>Dashboard</NavLink>
                          </li>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <li
                        onClick={() => setIsAccountButtonActive(false)}
                        className="hover:bg-gray-100 text-gray-600 hover:text-gray-900 px-10 transition duration-300  text-center py-3 border-b border-gray-200"
                      >
                        <NavLink href={"/login"}>Log-In</NavLink>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            )}
          </li>
          {user && (
            <>
              <li>
                <NavLink
                  href="/addBlog"
                  className="text-gray-500 hover:text-gray-700 hover:underline"
                  activeClassName="text-gray-700"
                >
                  create blog
                </NavLink>
              </li>
            </>
          )}
        </ul>
        <NavLink
          href={"/products"}
          className="flex space-x-2 items-center cursor-pointer hover:text-gray-700  hover:underline"
        >
          <PiShoppingCartThin className="text-2xl" />
          <span>Buy products</span>
        </NavLink>
      </div>
    </div>
  );
};

export default NavbarSmall;
