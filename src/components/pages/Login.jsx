import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Leaf,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

const AdminLogin = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  // =====================================================
  // Handle Input
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  // =====================================================
  // Validate Form
  // =====================================================

  const validateForm = () => {
    if (!formData.email.trim()) {
      setError("Please enter your email address.");
      return false;
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address.");
      return false;
    }

    if (!formData.password.trim()) {
      setError("Please enter your password.");
      return false;
    }

    if (formData.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return false;
    }

    return true;
  };

  // =====================================================
  // Handle Login
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      /*
       * ==================================================
       * FRONTEND DEMO LOGIN
       *
       * Replace this section later with:
       *
       * const response = await login(formData);
       *
       * Backend should return:
       * {
       *   token,
       *   user: {
       *      id,
       *      name,
       *      email,
       *      role: "ADMIN"
       *   }
       * }
       * ==================================================
       */

      if (
        formData.email === "admin@srikrishnorganics.com" &&
        formData.password === "admin123"
      ) {
        const adminUser = {
          id: 1,
          name: "Admin",
          email: formData.email,
          role: "ADMIN",
        };

        /*
         * If your AuthContext login accepts
         * user data, this will work.
         *
         * If login expects email/password,
         * replace this with:
         *
         * await login(formData.email, formData.password);
         */

        if (typeof login === "function") {
          try {
            await login(adminUser);
          } catch {
            // Demo mode continues even if the current
            // AuthContext has a different login signature.
          }
        }

        localStorage.setItem(
          "srikrishn_admin_user",
          JSON.stringify(adminUser)
        );

        localStorage.setItem(
          "srikrishn_admin_authenticated",
          "true"
        );

        navigate("/admin/dashboard");
      } else {
        setError(
          "Invalid admin email or password. Please try again."
        );
      }
    } catch (err) {
      console.error("Admin login error:", err);

      setError(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // Animation
  // =====================================================

  const containerAnimation = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemAnimation = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  // =====================================================
  // JSX
  // =====================================================

  return (
    <div className="min-h-screen bg-[#F7F5EF]">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* =================================================
            LEFT SIDE - BRANDING
        ================================================= */}

        <div className="relative hidden overflow-hidden bg-[#56663D] lg:flex">
          
          {/* Decorative circles */}

          <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full border border-white/10" />

          <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full border border-white/10" />

          <div className="absolute right-20 top-20 h-24 w-24 rounded-full bg-white/5" />

          <div className="absolute bottom-24 left-20 h-16 w-16 rounded-full bg-[#9A7B2F]/20" />

          {/* Content */}

          <motion.div
            variants={containerAnimation}
            initial="hidden"
            animate="visible"
            className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16"
          >

            {/* Logo */}

            <motion.div
              variants={itemAnimation}
              className="flex items-center gap-3"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm">
                <Leaf size={25} />
              </div>

              <div>
                <h1 className="text-lg font-semibold tracking-wide text-white">
                  ShreeKrishna
                </h1>

                <p className="text-xs uppercase tracking-[0.25em] text-[#F3E8C8]">
                  Organics
                </p>
              </div>
            </motion.div>

            {/* Main Content */}

            <div className="max-w-lg">

              <motion.div
                variants={itemAnimation}
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-medium text-[#F3E8C8]"
              >
                <ShieldCheck size={15} />

                Secure Admin Portal
              </motion.div>

              <motion.h2
                variants={itemAnimation}
                className="text-4xl font-semibold leading-tight text-white xl:text-5xl"
              >
                Manage your
                <span className="block text-[#F3E8C8]">
                  organic store
                </span>
                with confidence.
              </motion.h2>

              <motion.p
                variants={itemAnimation}
                className="mt-6 max-w-md text-sm leading-7 text-white/70"
              >
                Manage products, categories, offers,
                images and website content from one
                simple administration dashboard.
              </motion.p>

              {/* Feature List */}

              <motion.div
                variants={itemAnimation}
                className="mt-8 space-y-4"
              >
                {[
                  "Manage products and pricing",
                  "Update categories and offers",
                  "Control homepage content",
                  "Manage store images",
                ].map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 text-sm text-white/85"
                  >
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
                      <Leaf size={13} />
                    </div>

                    {feature}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Bottom */}

            <motion.div
              variants={itemAnimation}
              className="text-xs text-white/50"
            >
              © {new Date().getFullYear()} ShreeKrishna
              Organics
            </motion.div>
          </motion.div>
        </div>

        {/* =================================================
            RIGHT SIDE - LOGIN FORM
        ================================================= */}

        <div className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 lg:px-12 xl:px-20">

          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            className="w-full max-w-md"
          >

            {/* Mobile Logo */}

            <div className="mb-8 flex justify-center lg:hidden">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E4EBD9] text-[#56663D]">
                  <Leaf size={25} />
                </div>

                <div>
                  <h1 className="text-lg font-semibold text-[#29321F]">
                    ShreeKrishna
                  </h1>

                  <p className="text-xs uppercase tracking-[0.2em] text-[#9A7B2F]">
                    Organics
                  </p>
                </div>
              </div>
            </div>

            {/* Heading */}

            <div className="mb-8">
              <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#9A7B2F]">
                <span className="h-px w-8 bg-[#9A7B2F]" />
                Admin Portal
              </div>

              <h2 className="text-3xl font-semibold tracking-tight text-[#29321F] sm:text-4xl">
                Welcome back
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#777568]">
                Sign in to manage your Srikrishn Organics
                store.
              </p>
            </div>

            {/* Error */}

            {error && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: -10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="mb-5 flex items-start gap-3 rounded-xl border border-[#A6533D]/20 bg-[#A6533D]/5 p-4"
              >
                <AlertCircle
                  size={19}
                  className="mt-0.5 shrink-0 text-[#A6533D]"
                />

                <p className="text-sm leading-5 text-[#8F4534]">
                  {error}
                </p>
              </motion.div>
            )}

            {/* =================================================
                FORM
            ================================================= */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Email */}

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-[#29321F]"
                >
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#777568]"
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="admin@srikrishnorganics.com"
                    autoComplete="email"
                    className="w-full rounded-xl border border-[#E6E1D8] bg-white py-3.5 pl-11 pr-4 text-sm text-[#29321F] outline-none transition-all placeholder:text-[#AAA79B] focus:border-[#56663D] focus:ring-4 focus:ring-[#56663D]/10"
                  />
                </div>
              </div>

              {/* Password */}

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-[#29321F]"
                >
                  Password
                </label>

                <div className="relative">
                  <Lock
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#777568]"
                  />

                  <input
                    id="password"
                    name="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="w-full rounded-xl border border-[#E6E1D8] bg-white py-3.5 pl-11 pr-12 text-sm text-[#29321F] outline-none transition-all placeholder:text-[#AAA79B] focus:border-[#56663D] focus:ring-4 focus:ring-[#56663D]/10"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((prev) => !prev)
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-[#777568] transition-colors hover:bg-[#E4EBD9] hover:text-[#56663D]"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember / Forgot */}

              <div className="flex items-center justify-between text-xs">
                <label className="flex cursor-pointer items-center gap-2 text-[#777568]">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-[#E6E1D8] accent-[#56663D]"
                  />

                  Remember me
                </label>

                <button
                  type="button"
                  onClick={() =>
                    navigate("/admin/forgot-password")
                  }
                  className="font-medium text-[#56663D] transition-colors hover:text-[#9A7B2F]"
                >
                  Forgot password?
                </button>
              </div>

              {/* Login Button */}

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={
                  !loading
                    ? {
                        scale: 1.01,
                        y: -1,
                      }
                    : {}
                }
                whileTap={
                  !loading
                    ? {
                        scale: 0.98,
                      }
                    : {}
                }
                className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[#56663D] px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#56663D]/15 transition-colors hover:bg-[#465532] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In

                    <ArrowRight
                      size={18}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </>
                )}
              </motion.button>
            </form>

            {/* =================================================
                DEMO LOGIN INFO
            ================================================= */}

            <div className="mt-7 rounded-xl border border-[#E6E1D8] bg-white p-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#9A7B2F]">
                Demo Login
              </p>

              <div className="space-y-1 text-xs text-[#777568]">
                <p>
                  <span className="font-medium text-[#29321F]">
                    Email:
                  </span>{" "}
                  admin@srikrishnorganics.com
                </p>

                <p>
                  <span className="font-medium text-[#29321F]">
                    Password:
                  </span>{" "}
                  admin123
                </p>
              </div>
            </div>

            {/* Back to Website */}

            <button
              type="button"
              onClick={() => navigate("/")}
              className="mt-6 flex w-full items-center justify-center gap-2 text-xs font-medium text-[#777568] transition-colors hover:text-[#56663D]"
            >
              ← Back to Website
            </button>

            {/* Security */}

            <div className="mt-7 flex items-center justify-center gap-2 text-[11px] text-[#99978B]">
              <ShieldCheck size={14} />

              Secure Admin Access
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
