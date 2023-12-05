"use client";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";
import { BlogContext } from ".";

export default function BlogProvider({ children }) {
  const [blogData, setBlogData] = useState([]);

  return (
    <BlogContext.Provider value={{ blogData, setBlogData }}>
      <SessionProvider>{children}</SessionProvider>
    </BlogContext.Provider>
  );
}
