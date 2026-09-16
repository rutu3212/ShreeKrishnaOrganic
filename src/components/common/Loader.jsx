import React from "react";
import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

const Loader = ({
  size = "medium",
  text = "Loading...",
  fullScreen = false,
  showText = true,
}) => {
  const sizes = {
    small: {
      container: "w-12 h-12",
      leaf: 18,
      ring: "border-2",
      text: "text-xs",
    },
    medium: {
      container: "w-20 h-20",
      leaf: 28,
      ring: "border-[3px]",
      text: "text-sm",
    },
    large: {
      container: "w-28 h-28",
      leaf: 38,
      ring: "border-4",
      text: "text-base",
    },
  };

  const currentSize = sizes[size] || sizes.medium;

  const loaderContent = (
    <div className="flex flex-col items-center justify-center">

      {/* Loader Circle */}
      <div
        className={`
          relative
          ${currentSize.container}
          flex
          items-center
          justify-center
        `}
      >
        {/* Outer Rotating Ring */}
        <motion.div
          className={`
            absolute
            inset-0
            rounded-full
            ${currentSize.ring}
            border-[#E4EBD9]
            border-t-[#56663D]
            border-r-[#9A7B2F]
          `}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Inner Rotating Ring */}
        <motion.div
          className="
            absolute
            inset-2
            rounded-full
            border-2
            border-transparent
            border-b-[#765A3A]
          "
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Center Background */}
        <motion.div
          className="
            w-[65%]
            h-[65%]
            rounded-full
            bg-[#F3F0E6]
            flex
            items-center
            justify-center
            shadow-inner
          "
          animate={{
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Animated Leaf */}
          <motion.div
            animate={{
              rotate: [-8, 8, -8],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Leaf
              size={currentSize.leaf}
              className="text-[#56663D]"
              strokeWidth={1.8}
            />
          </motion.div>
        </motion.div>

        {/* Floating Dots */}
        <motion.span
          className="
            absolute
            top-0
            right-1
            w-2
            h-2
            rounded-full
            bg-[#9A7B2F]
          "
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.span
          className="
            absolute
            bottom-1
            left-0
            w-1.5
            h-1.5
            rounded-full
            bg-[#765A3A]
          "
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3,
          }}
        />
      </div>

      {/* Loading Text */}
      {showText && (
        <motion.div
          className={`
            mt-5
            ${currentSize.text}
            font-medium
            text-[#56663D]
            tracking-wide
          `}
          animate={{
            opacity: [0.45, 1, 0.45],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {text}
        </motion.div>
      )}

      {/* Animated Loading Dots */}
      {showText && (
        <div className="flex gap-1 mt-2">
          {[0, 1, 2].map((dot) => (
            <motion.span
              key={dot}
              className="w-1.5 h-1.5 rounded-full bg-[#9A7B2F]"
              animate={{
                y: [0, -4, 0],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: dot * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );

  // Full Screen Loader
  if (fullScreen) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="
          fixed
          inset-0
          z-[9999]
          bg-[#F7F5EF]
          flex
          items-center
          justify-center
        "
      >
        {loaderContent}
      </motion.div>
    );
  }

  // Normal Loader
  return loaderContent;
};

export default Loader;