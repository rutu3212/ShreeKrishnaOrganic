import React from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const StatsCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendValue,
  trendLabel = "vs last month",
  variant = "default",
  onClick,
}) => {
  const variants = {
    default: {
      iconBg: "bg-[#E4EBD9]",
      iconColor: "text-[#56663D]",
      accent: "bg-[#56663D]",
    },

    gold: {
      iconBg: "bg-[#F3E8C8]",
      iconColor: "text-[#9A7B2F]",
      accent: "bg-[#9A7B2F]",
    },

    brown: {
      iconBg: "bg-[#EEE4D7]",
      iconColor: "text-[#765A3A]",
      accent: "bg-[#765A3A]",
    },

    green: {
      iconBg: "bg-[#DDE8D2]",
      iconColor: "text-[#3F5A32]",
      accent: "bg-[#3F5A32]",
    },
  };

  const selectedVariant =
    variants[variant] || variants.default;

  const isPositive =
    trend === "up" ||
    trend === "positive";

  const isNegative =
    trend === "down" ||
    trend === "negative";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -5,
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
      {/* Decorative Circle */}
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

      {/* Top Section */}
      <div className="relative z-10 flex items-start justify-between gap-4">
        {/* Text */}
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-[#777568]">
            {title}
          </p>

          <h3 className="mt-2 text-2xl sm:text-3xl font-semibold text-[#29321F] tracking-tight">
            {value}
          </h3>

          {subtitle && (
            <p className="mt-2 text-xs sm:text-sm text-[#8B8A7D]">
              {subtitle}
            </p>
          )}
        </div>

        {/* Icon */}
        {Icon && (
          <motion.div
            whileHover={{
              rotate: 5,
              scale: 1.08,
            }}
            transition={{
              duration: 0.2,
            }}
            className={`
              shrink-0
              w-12 h-12
              sm:w-14 sm:h-14
              rounded-xl
              flex items-center justify-center
              ${selectedVariant.iconBg}
              ${selectedVariant.iconColor}
            `}
          >
            <Icon
              size={25}
              strokeWidth={1.8}
            />
          </motion.div>
        )}
      </div>

      {/* Trend */}
      {(trendValue || trend) && (
        <div className="relative z-10 mt-5 flex items-center flex-wrap gap-2">
          {/* Trend Badge */}
          {trendValue && (
            <span
              className={`
                inline-flex
                items-center
                gap-1
                px-2.5
                py-1
                rounded-full
                text-xs
                font-semibold
                ${
                  isPositive
                    ? "bg-[#E4EBD9] text-[#56663D]"
                    : isNegative
                    ? "bg-[#FAE9E4] text-[#A6533D]"
                    : "bg-[#F1EFE5] text-[#777568]"
                }
              `}
            >
              {isPositive && (
                <TrendingUp size={13} />
              )}

              {isNegative && (
                <TrendingDown size={13} />
              )}

              {!isPositive &&
                !isNegative && (
                  <ArrowUpRight size={13} />
                )}

              {trendValue}
            </span>
          )}

          {/* Trend Label */}
          {trendLabel && (
            <span className="text-xs text-[#99978C]">
              {trendLabel}
            </span>
          )}
        </div>
      )}

      {/* Bottom Accent */}
      <div
        className={`
          absolute
          bottom-0
          left-0
          h-[3px]
          w-0
          ${selectedVariant.accent}
          group-hover:w-full
          transition-all
          duration-500
        `}
      />
    </motion.div>
  );
};

export default StatsCard;

import React from "react";
import { motion } from "framer-motion";
import { Loader2, ArrowRight } from "lucide-react";

const Button = ({
  children,
  type = "button",
  variant = "primary",
  size = "medium",
  icon,
  iconPosition = "right",
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  className = "",
}) => {
  const variants = {
    primary: {
      base: "bg-[#56663D] text-white border-[#56663D]",
      hover: "hover:bg-[#465532]",
    },

    secondary: {
      base: "bg-[#E4EBD9] text-[#29321F] border-[#D5DFC7]",
      hover: "hover:bg-[#D8E2CC]",
    },

    outline: {
      base: "bg-transparent text-[#56663D] border-[#56663D]",
      hover: "hover:bg-[#56663D] hover:text-white",
    },

    gold: {
      base: "bg-[#9A7B2F] text-white border-[#9A7B2F]",
      hover: "hover:bg-[#806525]",
    },

    beige: {
      base: "bg-[#F3E8C8] text-[#765A3A] border-[#E8DDBD]",
      hover: "hover:bg-[#EBDDAD]",
    },

    danger: {
      base: "bg-[#A6533D] text-white border-[#A6533D]",
      hover: "hover:bg-[#8F4534]",
    },

    white: {
      base: "bg-white text-[#29321F] border-white",
      hover: "hover:bg-[#F5F3EC]",
    },
  };

  const sizes = {
    small: "px-4 py-2 text-sm rounded-lg",
    medium: "px-5 py-3 text-sm sm:text-base rounded-xl",
    large: "px-7 py-3.5 text-base sm:text-lg rounded-xl",
  };

  const selectedVariant = variants[variant] || variants.primary;
  const selectedSize = sizes[size] || sizes.medium;

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={
        disabled || loading
          ? {}
          : {
              scale: 1.03,
              y: -2,
            }
      }
      whileTap={
        disabled || loading
          ? {}
          : {
              scale: 0.96,
              y: 0,
            }
      }
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17,
      }}
      className={`
        relative
        overflow-hidden
        inline-flex
        items-center
        justify-center
        gap-2
        font-medium
        border
        shadow-sm
        transition-all
        duration-300
        group
        ${selectedVariant.base}
        ${selectedVariant.hover}
        ${selectedSize}
        ${fullWidth ? "w-full" : ""}
        ${
          disabled || loading
            ? "opacity-60 cursor-not-allowed"
            : "cursor-pointer hover:shadow-lg"
        }
        ${className}
      `}
    >
      {/* Shine Animation */}
      {!disabled && !loading && (
        <motion.span
          initial={{ x: "-120%" }}
          whileHover={{ x: "120%" }}
          transition={{
            duration: 0.7,
            ease: "easeInOut",
          }}
          className="
            absolute
            inset-y-0
            w-1/3
            bg-white/20
            -skew-x-12
            pointer-events-none
          "
        />
      )}

      {/* Button Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {loading ? (
          <>
            <Loader2
              size={18}
              className="animate-spin"
            />
            <span>Loading...</span>
          </>
        ) : (
          <>
            {iconPosition === "left" && icon && (
              <span className="transition-transform duration-300 group-hover:-translate-x-1">
                {icon}
              </span>
            )}

            <span>{children}</span>

            {iconPosition === "right" && icon && (
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                {icon}
              </span>
            )}
          </>
        )}
      </span>
    </motion.button>
  );
};

export default Button;