"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import Link from "next/link";
import Search from "./search/Search";
import { useSession, signOut } from "next-auth/react";
import Logo from "./Logo";
import Book from "./Book";
import Buyproduct from "./Buyproduct";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";

const listvariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const navMotion = {
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.15,
    },
  },
  hidden: {
    opacity: 0,
  },
};

const itemMotion = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -100 },
};

const NavbarSmall = () => {
  const { status, data: session } = useSession();
  let [open, setOpen] = useState(false);
  const path = usePathname();

  const paths = ["/login", "/register", "/Denied"];
  // const location =
  return (
    <nav
      className={
        paths.includes(path)
          ? "hidden"
          : "shadow-md w-full sticky z-50 top-0 left-0 bg-white"
      }
    >
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
          <motion.div
            variants={listvariants}
            initial="hidden"
            animate="show"
            className="hidden md:flex gap-5 items-center "
          >
            <motion.div whileHover={{ scale: 1.02 }} className="w-fit">
              <Link href={"/"}>Home</Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="w-fit">
              <Link href={"/blogsArticle"}>Blogs</Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="w-fit">
              <Link href={"/myproject"}>Projects</Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="w-fit">
              <Link href={"/contact"}>Contact</Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="w-fit">
              <Link href={"/about"}>About</Link>
            </motion.div>

            <DropdownMenu>
              <DropdownMenuTrigger>Account</DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href="/addBlog">create blog</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {status === "authenticated" ? (
                  <>
                    <Link href={"/profile"}>
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                    </Link>

                    {session?.user?.role == "admin" && (
                      <Link href={"/dashboard"}>
                        <DropdownMenuItem>Dashboard</DropdownMenuItem>
                      </Link>
                    )}

                    <DropdownMenuItem
                      onClick={() => signOut()}
                      className="cursor-pointer"
                    >
                      Log-Out
                    </DropdownMenuItem>
                  </>
                ) : (
                  <Link href="/login">
                    <DropdownMenuItem>Log-In</DropdownMenuItem>
                  </Link>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </motion.div>
          <Buyproduct />
        </div>

        {/* mobile device  */}

        <div className="md:hidden block">
          <div className="flex justify-between items-center gap-4">
            <Logo />
            {/* <Search /> */}
            <div className="relative flex items-center gap-6">
              <Search />
              <button
                onClick={() => setOpen((pre) => !pre)}
                className="text-3xl"
              >
                <RxHamburgerMenu />
              </button>
              {open && (
                <div>
                  <motion.div
                    animate={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: 25 }}
                    className="fixed bg-zinc-50 bottom-0 left-0 w-full h-screen flex items-center justify-center z-50"
                  >
                    <div className="fixed top-0 right-0 p-10">
                      <button
                        className="z-50"
                        onClick={() => setOpen((pre) => !pre)}
                      >
                        <RxCross1 size={30} />
                      </button>
                    </div>
                    <motion.div
                      variants={navMotion}
                      animate="visible"
                      initial="hidden"
                      className="flex flex-col gap-20 font-semibold"
                    >
                      <motion.a variants={itemMotion} href="/">
                        Start page
                      </motion.a>
                      <motion.a variants={itemMotion} href="/blogsArticle">
                        Blog Article
                      </motion.a>
                      <motion.a variants={itemMotion} href="/myproject">
                        My Projects
                      </motion.a>
                      <motion.a variants={itemMotion} href="/contact">
                        Contact
                      </motion.a>

                      {status === "authenticated" ? (
                        <>
                          <motion.a href="/addBlog">create blog</motion.a>
                          <motion.a href="/addBlog">create blog</motion.a>
                          <motion.a
                            className="cursor-pointer"
                            onClick={() => signOut()}
                          >
                            Log-Out
                          </motion.a>
                        </>
                      ) : (
                        <motion.a variants={itemMotion} href="/login">
                          Log-In
                        </motion.a>
                      )}
                    </motion.div>
                  </motion.div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarSmall;
