import React from "react";
import { motion } from "framer-motion";

const SectionTitle = ({
  eyebrow,
  title,
  description,
  align = "center",
  size = "medium",
  showLine = true,
  className = "",
}) => {
  const alignment = {
    left: {
      container: "items-start text-left",
      line: "justify-start",
    },
    center: {
      container: "items-center text-center",
      line: "justify-center",
    },
    right: {
      container: "items-end text-right",
      line: "justify-end",
    },
  };

  const titleSizes = {
    small: "text-2xl sm:text-3xl",
    medium: "text-3xl sm:text-4xl lg:text-5xl",
    large: "text-4xl sm:text-5xl lg:text-6xl",
  };

  const selectedAlignment = alignment[align] || alignment.center;
  const selectedTitleSize = titleSizes[size] || titleSizes.medium;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 25,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.3,
      }}
      transition={{
        duration: 0.7,
        ease: "easeOut",
      }}
      className={`
        w-full
        flex
        flex-col
        ${selectedAlignment.container}
        ${className}
      `}
    >
      {/* Eyebrow */}
      {eyebrow && (
        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.5,
            delay: 0.1,
          }}
          className="
            mb-3
            flex
            items-center
            gap-2
            text-xs
            sm:text-sm
            font-semibold
            uppercase
            tracking-[0.18em]
            text-[#9A7B2F]
          "
        >
          <span className="w-7 h-px bg-[#9A7B2F]" />

          <span>{eyebrow}</span>

          <span className="w-7 h-px bg-[#9A7B2F]" />
        </motion.div>
      )}

      {/* Title */}
      <motion.h2
        initial={{
          opacity: 0,
          y: 15,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.6,
          delay: 0.15,
        }}
        className={`
          ${selectedTitleSize}
          font-semibold
          leading-tight
          tracking-tight
          text-[#29321F]
        `}
      >
        {title}
      </motion.h2>

      {/* Decorative Line */}
      {showLine && (
        <div
          className={`
            mt-4
            flex
            w-full
            ${selectedAlignment.line}
          `}
        >
          <motion.div
            initial={{
              width: 0,
              opacity: 0,
            }}
            whileInView={{
              width: 55,
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
              delay: 0.3,
              ease: "easeOut",
            }}
            className="
              h-1
              rounded-full
              bg-[#9A7B2F]
            "
          />
        </div>
      )}

      {/* Description */}
      {description && (
        <motion.p
          initial={{
            opacity: 0,
            y: 10,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
            delay: 0.35,
          }}
          className="
            mt-5
            max-w-2xl
            text-sm
            sm:text-base
            lg:text-lg
            leading-7
            text-[#777568]
          "
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
};

export default SectionTitle;