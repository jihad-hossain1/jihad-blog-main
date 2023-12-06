"use client";

import { usePathname } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const ShareContent = ({ bid }) => {
  const pathname = usePathname();
  const handleClipBoard = () => {
    const handle = navigator.clipboard.writeText(
      "https://jihad-blog-main.vercel.app" + pathname
    );
    if (handle) {
      toast.success("Link copy successfull, check your clipboard");
    }
    return handle;
  };
  return (
    <aside className="flex flex-col gap-4">
      <Toaster />
      <h4 className="bg-green-600 text-center text-zinc-50 rounded-md shadow">
        Share This
      </h4>
      <a onClick={handleClipBoard} href={"#"} className="w-20">
        <img
          src="https://i.ibb.co/yqRfDGq/icons8-facebook-1.gif"
          className="rounded-full shadow hover:translate-x-2 transition-all duration-300"
        />
      </a>
      <a onClick={handleClipBoard} href={"#"} className="w-20">
        <img
          src="https://i.ibb.co/G2YpH2p/icons8-twitter-circled.gif"
          className="rounded-full shadow hover:translate-x-2 transition-all duration-300"
        />
      </a>
      <a onClick={handleClipBoard} href={"#"} className="w-20">
        <img
          src="https://i.ibb.co/LvKCh4Q/icons8-linkedin.gif"
          className="rounded-full shadow hover:translate-x-2 transition-all duration-300"
        />
      </a>
    </aside>
  );
};

export default ShareContent;
