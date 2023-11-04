import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

import Toaster from '@/components/Toaster/Toaster'
import NavbarSmall from "@/components/Navbar/NavbarSmall";
import Footer from "@/components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'Jihad Blogs',
  description: 'Share Your Programming Knowledge',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" >
      <body className={inter.className}>
        <div className='flex min-h-screen flex-col justify-between'>
            <div >
            {/* <Navbar></Navbar> */}
            <NavbarSmall />
              <main className='bg-gray-100'>{children}</main>
            </div>
          </div>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
