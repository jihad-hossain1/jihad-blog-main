import { Inter } from "next/font/google";
import "./globals.css";

import NavbarSmall from "@/components/Navbar/NavbarSmall";
import Footer from "@/components/Footer/Footer";
import { NextAuthProvider } from "./Provider";
import { Toaster } from "@/components/ui/toaster";
import HotToaster from "@/components/Toaster/HotToaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Jihad Blogs",
    description: "Share Your Programming Knowledge",
    keywords:
        "programming, blog, programming, programming blog, programming knowledge, programming blog, programming knowledge, programming blog, programming knowledge, programming blog, programming knowledge",
    openGraph: {
        title: "Jihad Blogs",
        description: "Share Your Programming Knowledge",
        url: "https://jihad-blog-main.vercel.app",
        images: [],
    },
    twitter: {
        card: "summary_large_image",
        title: "Jihad Blogs",
        description: "Share Your Programming Knowledge",
        images: [],
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang='en' data-theme='dark'>
            <body className={inter.className}>
                <NextAuthProvider>
                    <div className='flex min-h-screen flex-col justify-between'>
                        <div>
                            <NavbarSmall />
                            <main className='bg-gray-100'>{children}</main>
                        </div>
                    </div>
                    <Footer />
                </NextAuthProvider>
                <Toaster />
                <HotToaster />
            </body>
        </html>
    );
}
