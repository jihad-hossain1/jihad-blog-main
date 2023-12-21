import { Inter } from "next/font/google";
import "./globals.css";


import Toaster from "@/components/Toaster/Toaster";
import NavbarSmall from "@/components/Navbar/NavbarSmall";
import Footer from "@/components/Footer/Footer";
import { NextAuthProvider } from "./Provider";
import Responsive from "@/components/Navbar/Responsive";
import BlogProvider from "@/context/ContextApi";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Jihad Blogs",
  description: "Share Your Programming Knowledge",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <body className={inter.className}>
        {/* <BlogProvider> */}
        <NextAuthProvider>
          <div className="flex min-h-screen flex-col justify-between">
          <div>
            <NavbarSmall />
            {/* <Responsive /> */}
            <main className="bg-gray-100">{children}</main>
          </div>
        </div>
        <Footer />
          </NextAuthProvider>
          {/* </BlogProvider> */}
        <Toaster />
      </body>
    </html>
  );
}
