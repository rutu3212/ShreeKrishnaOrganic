import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function IntroAnimation() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 1600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[200] bg-[#3f4a29] text-white flex items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="text-5xl sm:text-7xl font-serif">
              Srikrishn
            </div>

            <div className="mt-3 text-xs uppercase tracking-[0.5em] text-white/70">
              Pure Tradition
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}