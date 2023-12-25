"use client";

import { motion, AnimatePresence ,useScroll,useTransform} from "framer-motion";
import { useRef } from "react";

const Layout = ({ children }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });
 const scaleProgress =  useTransform(scrollYProgress,[0, 1],[0.8, 1])
 const opacityProgress =  useTransform(scrollYProgress,[0, 1],[0.6, 1])
return (
    <AnimatePresence >
    <motion.div
      style={{
          scale: scaleProgress,
          opacity: opacityProgress,
        }}
        ref={ref}
       initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
        transition={{ duration: 0.25, delay: 0.5 }}       
    >
      {children}
    </motion.div>
  </AnimatePresence>
  )
}
export default Layout;

// initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: 10 }}
//         transition={{ duration: 0.3 }}

// initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 15 }} transition={{ delay: 0.25 }}


//  initial={{ x: 300, opacity: 0 }}
//     animate={{ x: 0, opacity: 1 }}
//     exit={{ x: 300, opacity: 0 }}
//     transition={{
//       type: "spring",
//       stiffness: 260,
//       damping: 20,
//     }}