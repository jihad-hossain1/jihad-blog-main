import Image from "next/image";
import Link from "next/link";
import React from "react";

const HomeBanner = () => {
  return (
    <main className="flex justify-center">
      <section className="py-10 text-center">
        <div className="flex flex-col gap-4 md:gap-6">
          <h4 className="text-2xl md:text-5xl font-bold">
            {`Hi, I'm `}
            <span className="text-[#0084d4]">Jihad.</span>
          </h4>
          <h4 className="text-2xl md:text-5xl font-bold">
            On{" "}
            <span className="bg-[#0084d4] rounded shadow-sm px-1 text-yellow-400">
              JS
            </span>{" "}
            Echo System
          </h4>
          <h4 className="text-gray-600 text-sm md:text-xl">
            Specialized in MERN Stack Developer.
          </h4>
        </div>
        <div className="mt-7 md:mt-10 flex justify-center">
          <Link href={"/about"} className="btn w-fit">
            About Me
          </Link>
        </div>
      </section>
    </main>
  );
};

export default HomeBanner;
