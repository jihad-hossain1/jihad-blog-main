"use client";

import React, { useState } from "react";
import NavLink from "../Navlink/NavLink";
import { FiChevronDown } from "react-icons/fi";
import Link from "next/link";
import Search from "./search/Search";
import { useSession, signOut } from "next-auth/react";
import Logo from "./Logo";
import Book from "./Book";
import Buyproduct from "./Buyproduct";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";

const NavbarSmall = () => {
  const { status } = useSession();
  const user = false;
  let [open, setOpen] = useState(false);
  const [isAccountButtonActive, setIsAccountButtonActive] = useState(false);
  const [isBlogButtonActive, setIsBlogButtonActive] = useState(false);
  const navlist = (
    <>
      <li className="pl-5">
        <NavLink
          href="/"
          className="text-gray-500 hover:text-gray-700 hover:underline"
          activeClassName="text-gray-700"
        >
          Start page
        </NavLink>
      </li>
      <li className=" className=pl-5t'">
        <button
          onClick={() => setIsBlogButtonActive(!isBlogButtonActive)}
          className="text-gray-500 hover:text-gray-700 flex items-center space-x-1 hover:underline"
        >
          <span> Blog article</span>
          <FiChevronDown />
        </button>
        {isBlogButtonActive && (
          <div className="md:fixed  md:z-10 bg-gray-100 mt-7 rounded-sm">
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
      <li className="pl-5">
        <NavLink
          href="/myproject"
          className="text-gray-500 hover:text-gray-700 hover:underline"
          activeClassName="text-gray-700"
        >
          My projects
        </NavLink>
      </li>
      <li className="pl-5">
        <NavLink
          href="/contact"
          className="text-gray-500 hover:text-gray-700 hover:underline"
          activeClassName="text-gray-700"
        >
          contact me
        </NavLink>
      </li>
      <li className="pl-5">
        <button
          onClick={() => setIsAccountButtonActive(!isAccountButtonActive)}
          className="text-gray-500 hover:text-gray-700 flex items-center space-x-1 hover:underline"
        >
          <span>Account</span>
          <FiChevronDown />
        </button>
        {isAccountButtonActive && (
          <div className="md:fixed z-10 bg-white md:mt-7 rounded-sm">
            <ul>
              {status === "authenticated" ? (
                <>
                  <li
                    onClick={() => setIsAccountButtonActive(false)}
                    className="m hover:bg-gray-100 text-gray-600 hover:text-gray-900 px-10 transition duration-300   text-center py-3 border-b border-gray-200"
                  >
                    <NavLink href={"/profile"}>Profile</NavLink>
                  </li>
                  <li onClick={() => signOut()}>
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
      {status === "authenticated" && (
        <>
          <li>
            <NavLink
              href="/addBlog"
              className=" text-gray-500 hover:text-gray-700 hover:underline"
              activeClassName="text-gray-700"
            >
              create blog
            </NavLink>
          </li>
        </>
      )}
    </>
  );
  return (
    <nav className="shadow-md w-full sticky top-0 left-0 bg-white">
      <div className="max-w-screen-xl mx-auto px-4   pb-6">
        <div className="hidden md:block">
          <div className="flex justify-between items-center border-b border-gray-200 pb-4 px-4">
            <Logo />
            <Book />
            <div>
              <Search />
            </div>
          </div>
        </div>
        <div className="flex justify-between px-6 py-2 mt-2">
          <ul className="hidden md:flex space-x-5 items-center ">{navlist}</ul>
          <Buyproduct />
        </div>

        {/* mobile device  */}
        <div className="md:hidden block">
          <div className="relative  top-0 flex items-center space-x-4">
            <Logo />
            <Search />

            <div
              onClick={() => setOpen(!open)}
              className="text-3xl absolute right-8 top-0 cursor-pointer"
            >
              {open ? (
                <RxCross1
                  className=""
                  name={open ? "close" : "menu"}
                ></RxCross1>
              ) : (
                <RxHamburgerMenu
                  className=""
                  name={open ? "close" : "menu"}
                ></RxHamburgerMenu>
              )}
            </div>
          </div>
          <ul
            className={` px-10 py-12 absolute  bg-white md:z-auto z-[-1] left-0 w-full md:w-auo space-y-7 md:space-x-0 transition-all duration-500 ease-in ${
              open ? "top-10 " : "top-[-490px] "
            }`}
          >
            {navlist}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarSmall;
