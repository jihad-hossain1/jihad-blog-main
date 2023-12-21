import {motion} from 'framer-motion'

export const cardMotion = {
    initial: { opacity: 0, scale: 0.5 }
    // animate: {}
}


const card_effect = {
    initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.3 },
}


export default function Framer_card ({children}) {
  <motion.main {...card_effect}>
    {children}
  </motion.main>
};


