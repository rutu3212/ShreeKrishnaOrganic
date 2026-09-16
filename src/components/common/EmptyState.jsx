import React from "react";
import { motion } from "framer-motion";
import { Inbox, ArrowRight, RefreshCw } from "lucide-react";

const EmptyState = ({
  title = "No Data Found",
  description = "There is currently no data to display.",
  icon: Icon = Inbox,
  actionText,
  onAction,
  secondaryActionText,
  onSecondaryAction,
  actionIcon = <ArrowRight size={17} />,
  secondaryActionIcon = <RefreshCw size={17} />,
  className = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
      className={`
        w-full
        flex
        items-center
        justify-center
        px-4
        py-12
        sm:py-16
        ${className}
      `}
    >
      <div className="w-full max-w-lg text-center">

        {/* Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: 0.15,
            duration: 0.4,
            type: "spring",
            stiffness: 200,
          }}
          className="
            relative
            mx-auto
            mb-6
            w-20
            h-20
            sm:w-24
            sm:h-24
            rounded-full
            bg-[#E4EBD9]
            flex
            items-center
            justify-center
            text-[#56663D]
          "
        >
          {/* Decorative Circle */}
          <span
            className="
              absolute
              inset-0
              rounded-full
              border
              border-[#56663D]/10
              scale-110
            "
          />

          {/* Icon */}
          <motion.div
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Icon
              size={38}
              strokeWidth={1.5}
            />
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="
            text-xl
            sm:text-2xl
            font-semibold
            text-[#29321F]
          "
        >
          {title}
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="
            mt-3
            max-w-md
            mx-auto
            text-sm
            sm:text-base
            leading-6
            text-[#777568]
          "
        >
          {description}
        </motion.p>

        {/* Actions */}
        {(actionText || secondaryActionText) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="
              mt-7
              flex
              flex-col
              sm:flex-row
              items-center
              justify-center
              gap-3
            "
          >

            {/* Primary Action */}
            {actionText && (
              <motion.button
                type="button"
                onClick={onAction}
                whileHover={{
                  scale: 1.03,
                  y: -2,
                }}
                whileTap={{
                  scale: 0.96,
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 17,
                }}
                className="
                  w-full
                  sm:w-auto
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  px-5
                  py-3
                  rounded-xl
                  bg-[#56663D]
                  text-white
                  text-sm
                  font-medium
                  shadow-sm
                  hover:bg-[#465532]
                  hover:shadow-lg
                  transition-all
                  duration-300
                  group
                "
              >
                <span>{actionText}</span>

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  {actionIcon}
                </span>
              </motion.button>
            )}

            {/* Secondary Action */}
            {secondaryActionText && (
              <motion.button
                type="button"
                onClick={onSecondaryAction}
                whileHover={{
                  scale: 1.03,
                }}
                whileTap={{
                  scale: 0.96,
                }}
                className="
                  w-full
                  sm:w-auto
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  px-5
                  py-3
                  rounded-xl
                  border
                  border-[#DCD8CE]
                  bg-white
                  text-[#56663D]
                  text-sm
                  font-medium
                  hover:bg-[#F5F3EC]
                  transition-all
                  duration-300
                "
              >
                {secondaryActionIcon}
                <span>{secondaryActionText}</span>
              </motion.button>
            )}

          </motion.div>
        )}

        {/* Bottom Decorative Line */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 45, opacity: 1 }}
          transition={{
            delay: 0.55,
            duration: 0.5,
          }}
          className="
            h-1
            mx-auto
            mt-8
            rounded-full
            bg-[#9A7B2F]
          "
        />
      </div>
    </motion.div>
  );
};

export default EmptyState;