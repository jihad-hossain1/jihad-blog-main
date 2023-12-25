"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import anime from "animejs";

const HomeBanner = () => {
  const ref = useRef(null);
  const isInview = useInView(ref, { once: true });
  let maincontrols = useAnimation();
  let sideControls = useAnimation();

  useEffect(() => {
    if (isInview) {
      maincontrols.start("visible");
      sideControls.start("visible");
    }
  }, [isInview, maincontrols, sideControls]);
  return (
    <>
      <div className=" relative">
        <DotGrid />
        <div className=" ">
          <div
            className=" flex justify-center"
            style={{ position: "relative", width: "", overflow: "hidden" }}
          >
            <motion.div
              className="py-10 text-center"
              ref={ref}
              variants={{
                hidden: { opacity: 0, y: 75 },
                visible: { opacity: 1, y: 0 },
              }}
              initial="hidden"
              animate={maincontrols}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              {/* <DotGrid /> */}
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
                <div className="text-gray-600 text-sm md:text-xl">
                  Specialized in MERN Stack Developer.
                </div>
              </div>
              <div className="relative mt-7 md:mt-10 flex justify-center mb-4">
                <Link
                  href={"/about"}
                  className="rounded-2xl border-2 border-dashed border-black bg-white px-6 py-3 font-semibold uppercase text-black transition-all duration-300 hover: translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none w-fit absolute z-20"
                >
                  About Me
                </Link>
              </div>
            </motion.div>
            <motion.div
              variants={{
                hidden: { left: 0 },
                visible: { left: "100%" },
              }}
              initial="hidden"
              animate={sideControls}
              transition={{ duration: 0.5, ease: "easeIn" }}
              style={{
                position: "absolute",
                top: 4,
                bottom: 4,
                left: 0,
                right: 0,
                background: "#fff",
                zIndex: 10,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const GRID_WIDTH = 13;
const GRID_HEIGHT = 10;

const DotGrid = () => {
  const handleDotClick = (e) => {
    anime({
      targets: ".dot-point",
      scale: [
        { value: 1.35, easing: "easeOutSine", duration: 250 },
        { value: 1, easing: "easeInOutQuad", duration: 500 },
      ],
      translateY: [
        { value: -15, easing: "easeOutSine", duration: 250 },
        { value: 0, easing: "easeInOutQuad", duration: 500 },
      ],
      opacity: [
        { value: 1, easing: "easeOutSine", duration: 250 },
        { value: 0.5, easing: "easeInOutQuad", duration: 500 },
      ],
      delay: anime.stagger(100, {
        grid: [GRID_WIDTH, GRID_HEIGHT],
        from: e.target.dataset.index,
      }),
    });
  };

  const dots = [];
  let index = 0;

  for (let i = 0; i < GRID_WIDTH; i++) {
    for (let j = 0; j < GRID_HEIGHT; j++) {
      dots.push(
        <div
          onClick={handleDotClick}
          data-index={index}
          className="group cursor-crosshair rounded-full p-2 transition-colors hover:bg-slate-600"
          key={`${i}-${j}`}
        >
          <div className="dot-point h-2 w-2 rounded-full bg-gradient-to-b from-slate-700 to-slate-400 opacity-50 group-hover:from-indigo-600 group-hover:to-white" />
        </div>
      );
      index++;
    }
  }

  return (
    <div className="flex justify-center md:pl-36">
      <div
        style={{ gridTemplateColumns: `repeat(${GRID_WIDTH}, 1fr)` }}
        className="w-fit grid absolute  z-10"
      >
        {dots}
      </div>
    </div>
  );
};

export default HomeBanner;
