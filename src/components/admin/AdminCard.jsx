import React from "react";
import { motion } from "framer-motion";

const AdminCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  onClick,
  variant = "default",
}) => {
  const variants = {
    default: {
      iconBg: "bg-[#E8EDE0]",
      iconColor: "text-[#4F5D3A]",
    },
    gold: {
      iconBg: "bg-[#F3E8C8]",
      iconColor: "text-[#9A7B2F]",
    },
    green: {
      iconBg: "bg-[#DDE8D2]",
      iconColor: "text-[#3F5A32]",
    },
    brown: {
      iconBg: "bg-[#EEE4D7]",
      iconColor: "text-[#765A3A]",
    },
  };

  const selectedVariant = variants[variant] || variants.default;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -6,
        scale: 1.01,
      }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
      onClick={onClick}
      className={`
        group relative overflow-hidden
        bg-white
        border border-[#E6E1D8]
        rounded-2xl
        p-5 sm:p-6
        shadow-[0_4px_20px_rgba(60,70,40,0.06)]
        hover:shadow-[0_12px_35px_rgba(60,70,40,0.12)]
        transition-shadow duration-300
        ${onClick ? "cursor-pointer" : ""}
      `}
    >
      {/* Decorative background circle */}
      <div
        className="
          absolute
          -right-10
          -top-10
          w-32
          h-32
          rounded-full
          bg-[#F7F4EC]
          opacity-0
          group-hover:opacity-100
          transition-opacity
          duration-500
        "
      />

      <div className="relative z-10 flex items-start justify-between gap-4">
        {/* Text Content */}
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-[#777568] mb-2">
            {title}
          </p>

          <h3 className="text-2xl sm:text-3xl font-semibold text-[#29321F] tracking-tight">
            {value}
          </h3>

          {subtitle && (
            <p className="mt-2 text-xs sm:text-sm text-[#8A897E]">
              {subtitle}
            </p>
          )}
        </div>

        {/* Icon */}
        {Icon && (
          <motion.div
            whileHover={{ rotate: 5, scale: 1.08 }}
            transition={{ duration: 0.2 }}
            className={`
              flex
              items-center
              justify-center
              shrink-0
              w-12
              h-12
              sm:w-14
              sm:h-14
              rounded-xl
              ${selectedVariant.iconBg}
              ${selectedVariant.iconColor}
            `}
          >
            <Icon size={25} strokeWidth={1.8} />
          </motion.div>
        )}
      </div>

      {/* Bottom accent */}
      <div
        className="
          absolute
          bottom-0
          left-0
          h-[3px]
          w-0
          bg-[#56663D]
          group-hover:w-full
          transition-all
          duration-500
        "
      />
    </motion.div>
  );
};

export default AdminCard;