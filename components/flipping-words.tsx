'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const words = ['brighter', 'faster', 'clearer', 'smarter', 'bolder', 'better'];

export default function WordFlipper() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className=" relative w-[8ch] align-baseline leading-[1] ml-1">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className="absolute left-0 top-[0.15em]"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
