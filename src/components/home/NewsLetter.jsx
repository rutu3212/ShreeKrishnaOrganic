import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  ArrowRight,
  CheckCircle,
  Leaf,
  Sparkles,
} from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setIsSuccess(false);
      setMessage("Please enter your email address.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedEmail)) {
      setIsSuccess(false);
      setMessage("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    setMessage("");

    // --------------------------------------------------
    // FRONTEND DEMO
    // Replace this section with your API call later.
    // --------------------------------------------------

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setMessage(
        "Thank you for subscribing to Srikrishn Organics!"
      );
      setEmail("");
    }, 800);
  };

  return (
    <section className="relative overflow-hidden bg-[#F3E8C8] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      {/* Decorative Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-[#56663D]/10"
          animate={{
            scale: [1, 1.08, 1],
            rotate: [0, 8, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-[#9A7B2F]/10"
          animate={{
            scale: [1, 1.12, 1],
            rotate: [0, -8, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="absolute left-[10%] top-[20%] text-[#56663D]/10">
          <Leaf size={90} strokeWidth={1} />
        </div>

        <div className="absolute bottom-[15%] right-[12%] text-[#9A7B2F]/10">
          <Sparkles size={75} strokeWidth={1} />
        </div>
      </div>

      {/* Main Container */}
      <div className="relative mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="rounded-[2rem] border border-[#56663D]/10 bg-white/80 px-5 py-10 shadow-[0_20px_60px_rgba(41,50,31,0.10)] backdrop-blur-sm sm:px-8 sm:py-12 lg:px-16 lg:py-14"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -15 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.15,
              type: "spring",
              stiffness: 150,
            }}
            className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#E4EBD9] text-[#56663D]"
          >
            <Mail size={26} />
          </motion.div>

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.25em] text-[#9A7B2F] sm:text-sm"
          >
            Stay Connected
          </motion.p>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto max-w-2xl text-center text-3xl font-semibold leading-tight text-[#29321F] sm:text-4xl lg:text-5xl"
          >
            Bring More Goodness
            <span className="block text-[#56663D]">
              Into Your Inbox
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mx-auto mt-5 max-w-2xl text-center text-sm leading-7 text-[#777568] sm:text-base"
          >
            Get updates about new products, special offers,
            seasonal collections and stories from Srikrishn
            Organics.
          </motion.p>

          {/* Newsletter Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mx-auto mt-8 max-w-2xl"
          >
            <div className="flex flex-col gap-3 sm:flex-row">
              {/* Email Input */}
              <div className="relative flex-1">
                <Mail
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#777568]"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setMessage("");
                  }}
                  placeholder="Enter your email address"
                  className="h-14 w-full rounded-xl border border-[#E6E1D8] bg-[#F7F5EF] pl-12 pr-4 text-sm text-[#29321F] outline-none transition-all placeholder:text-[#99978B] focus:border-[#56663D] focus:bg-white focus:ring-4 focus:ring-[#56663D]/10"
                  disabled={isLoading}
                />
              </div>

              {/* Subscribe Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={!isLoading ? { scale: 1.02 } : {}}
                whileTap={!isLoading ? { scale: 0.97 } : {}}
                className="group flex h-14 items-center justify-center gap-2 rounded-xl bg-[#56663D] px-7 text-sm font-semibold text-white shadow-lg shadow-[#56663D]/15 transition-colors hover:bg-[#465532] disabled:cursor-not-allowed disabled:opacity-70 sm:min-w-[150px]"
              >
                {isLoading ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white"
                    />

                    <span>Joining...</span>
                  </>
                ) : (
                  <>
                    <span>Subscribe</span>

                    <motion.span
                      className="transition-transform group-hover:translate-x-1"
                    >
                      <ArrowRight size={18} />
                    </motion.span>
                  </>
                )}
              </motion.button>
            </div>

            {/* Message */}
            <AnimatePresence mode="wait">
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className={`mt-4 flex items-center justify-center gap-2 text-sm ${
                    isSuccess
                      ? "text-[#56663D]"
                      : "text-[#A6533D]"
                  }`}
                >
                  {isSuccess && <CheckCircle size={17} />}
                  <span>{message}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>

          {/* Privacy Text */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-5 text-center text-xs text-[#777568]"
          >
            We respect your inbox. No spam, only useful updates
            and natural goodness.
          </motion.p>

          {/* Bottom Trust Items */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-[#E6E1D8] pt-6"
          >
            <div className="flex items-center gap-2 text-xs text-[#777568]">
              <Leaf size={15} className="text-[#56663D]" />
              <span>Natural Products</span>
            </div>

            <div className="hidden h-4 w-px bg-[#E6E1D8] sm:block" />

            <div className="flex items-center gap-2 text-xs text-[#777568]">
              <CheckCircle size={15} className="text-[#56663D]" />
              <span>Special Offers</span>
            </div>

            <div className="hidden h-4 w-px bg-[#E6E1D8] sm:block" />

            <div className="flex items-center gap-2 text-xs text-[#777568]">
              <Sparkles size={15} className="text-[#9A7B2F]" />
              <span>New Arrivals</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;

