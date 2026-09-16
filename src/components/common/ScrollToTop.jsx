import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

const ScrollToTop = ({
  showButton = true,
  showAfter = 400,
}) => {
  const { pathname } = useLocation();
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Scroll to top whenever route changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  // Detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > showAfter) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showAfter]);

  // Scroll button click
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {showButton && showScrollButton && (
        <motion.button
          type="button"
          onClick={handleScrollToTop}
          aria-label="Scroll to top"
          initial={{
            opacity: 0,
            scale: 0.5,
            y: 30,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.5,
            y: 30,
          }}
          whileHover={{
            scale: 1.1,
            y: -4,
          }}
          whileTap={{
            scale: 0.9,
          }}
          transition={{
            type: "spring",
            stiffness: 350,
            damping: 20,
          }}
          className="
            fixed
            right-4
            bottom-5
            sm:right-6
            sm:bottom-6
            lg:right-8
            lg:bottom-8
            z-50

            w-11
            h-11
            sm:w-12
            sm:h-12

            rounded-full

            bg-[#56663D]
            text-white

            flex
            items-center
            justify-center

            border
            border-white/20

            shadow-[0_8px_25px_rgba(41,50,31,0.22)]

            hover:bg-[#465532]

            transition-colors
            duration-300

            group
          "
        >
          {/* Animated Outer Ring */}
          <motion.span
            className="
              absolute
              inset-0
              rounded-full
              border
              border-[#9A7B2F]/40
            "
            animate={{
              scale: [1, 1.18, 1],
              opacity: [0.7, 0, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />

          {/* Arrow */}
          <motion.span
            className="relative z-10"
            animate={{
              y: [2, -3, 2],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ArrowUp
              size={19}
              strokeWidth={2}
            />
          </motion.span>

          {/* Shine Effect */}
          <motion.span
            className="
              absolute
              inset-0
              rounded-full
              bg-white/10
              pointer-events-none
            "
            initial={{
              opacity: 0,
            }}
            whileHover={{
              opacity: 1,
            }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;