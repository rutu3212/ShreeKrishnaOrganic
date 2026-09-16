import React from "react";
import { IndianRupee, Tag } from "lucide-react";

/**
 * PriceDisplay
 *
 * Reusable product price component.
 *
 * Supports:
 * - Selling Price
 * - Regular Price
 * - Discount %
 * - Savings amount
 * - Different sizes
 *
 * Example:
 *
 * <PriceDisplay
 *   sellingPrice={799}
 *   regularPrice={999}
 *   discount={20}
 * />
 */

const PriceDisplay = ({
  sellingPrice = 0,
  regularPrice = 0,
  discount = 0,
  showDiscount = true,
  showSavings = false,
  size = "medium",
  layout = "default",
  className = "",
}) => {
  const selling = Number(sellingPrice) || 0;
  const regular = Number(regularPrice) || selling;

  // Calculate discount automatically if not provided
  const calculatedDiscount =
    discount > 0
      ? Number(discount)
      : regular > selling
      ? Math.round(((regular - selling) / regular) * 100)
      : 0;

  // Calculate savings
  const savings = Math.max(regular - selling, 0);

  // --------------------------------------------------
  // SIZE CLASSES
  // --------------------------------------------------

  const sizeClasses = {
    small: {
      selling: "text-base sm:text-lg",
      regular: "text-xs sm:text-sm",
      discount: "text-[10px] sm:text-xs",
      savings: "text-[10px] sm:text-xs",
    },

    medium: {
      selling: "text-lg sm:text-xl",
      regular: "text-xs sm:text-sm",
      discount: "text-[10px] sm:text-xs",
      savings: "text-xs sm:text-sm",
    },

    large: {
      selling: "text-2xl sm:text-3xl",
      regular: "text-sm sm:text-base",
      discount: "text-xs sm:text-sm",
      savings: "text-xs sm:text-sm",
    },

    xlarge: {
      selling: "text-3xl sm:text-4xl",
      regular: "text-sm sm:text-lg",
      discount: "text-xs sm:text-sm",
      savings: "text-sm sm:text-base",
    },
  };

  const currentSize = sizeClasses[size] || sizeClasses.medium;

  // --------------------------------------------------
  // FORMAT PRICE
  // --------------------------------------------------

  const formatPrice = (price) => {
    return Number(price).toLocaleString("en-IN");
  };

  // --------------------------------------------------
  // SIMPLE LAYOUT
  // --------------------------------------------------

  if (layout === "simple") {
    return (
      <div className={`flex items-center gap-2 ${className}`}>

        <span
          className={`font-bold text-[#56663D] ${currentSize.selling}`}
        >
          ₹{formatPrice(selling)}
        </span>

        {regular > selling && (
          <del
            className={`font-medium text-[#99958A] ${currentSize.regular}`}
          >
            ₹{formatPrice(regular)}
          </del>
        )}

      </div>
    );
  }

  // --------------------------------------------------
  // COMPACT LAYOUT
  // --------------------------------------------------

  if (layout === "compact") {
    return (
      <div className={`flex flex-wrap items-center gap-2 ${className}`}>

        <span
          className={`font-bold text-[#56663D] ${currentSize.selling}`}
        >
          ₹{formatPrice(selling)}
        </span>

        {regular > selling && (
          <del
            className={`text-[#99958A] ${currentSize.regular}`}
          >
            ₹{formatPrice(regular)}
          </del>
        )}

        {showDiscount && calculatedDiscount > 0 && (
          <span
            className={`rounded-full bg-[#F3E8C8] px-2 py-1 font-bold text-[#765A3A] ${currentSize.discount}`}
          >
            {calculatedDiscount}% OFF
          </span>
        )}

      </div>
    );
  }

  // --------------------------------------------------
  // DEFAULT LAYOUT
  // --------------------------------------------------

  return (
    <div className={`flex flex-col ${className}`}>

      {/* PRICE ROW */}

      <div className="flex flex-wrap items-center gap-2 sm:gap-3">

        {/* SELLING PRICE */}

        <div
          className={`flex items-center font-bold text-[#56663D] ${currentSize.selling}`}
        >
          <span>₹</span>
          <span>{formatPrice(selling)}</span>
        </div>

        {/* REGULAR PRICE */}

        {regular > selling && (
          <del
            className={`font-medium text-[#99958A] ${currentSize.regular}`}
          >
            ₹{formatPrice(regular)}
          </del>
        )}

        {/* DISCOUNT */}

        {showDiscount && calculatedDiscount > 0 && (
          <span
            className={`inline-flex items-center gap-1 rounded-full bg-[#E4EBD9] px-2.5 py-1 font-bold text-[#56663D] ${currentSize.discount}`}
          >
            <Tag size={11} />
            {calculatedDiscount}% OFF
          </span>
        )}

      </div>

      {/* SAVINGS */}

      {showSavings && savings > 0 && (
        <p
          className={`mt-1 flex items-center gap-1 font-medium text-[#765A3A] ${currentSize.savings}`}
        >
          <IndianRupee size={12} />
          You save ₹{formatPrice(savings)}
        </p>
      )}

    </div>
  );
};

export default PriceDisplay;
