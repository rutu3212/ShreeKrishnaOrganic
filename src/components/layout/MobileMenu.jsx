// ======================================================
// Srikrishn Organics - Mobile Menu
// ======================================================

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Home,
  ShoppingBag,
  Tag,
  Info,
  Phone,
  User,
  LogOut,
  ChevronRight,
  Leaf,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";

// ======================================================
// Navigation Items
// ======================================================

const navigationItems = [
  {
    name: "Home",
    path: "/",
    icon: Home,
  },
  {
    name: "Shop",
    path: "/shop",
    icon: ShoppingBag,
  },
  {
    name: "Offers",
    path: "/offers",
    icon: Tag,
  },
  {
    name: "About Us",
    path: "/about",
    icon: Info,
  },
  {
    name: "Contact",
    path: "/contact",
    icon: Phone,
  },
];

// ======================================================
// MobileMenu Component
// ======================================================

const MobileMenu = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();

  const { user, isAuthenticated, logout } = useAuth();

  const { totalItems, subtotal } = useCart();

  // ----------------------------------------------------
  // Close menu and navigate
  // ----------------------------------------------------

  const handleNavigation = (path) => {
    onClose();
    navigate(path);
  };

  // ----------------------------------------------------
  // Logout
  // ----------------------------------------------------

  const handleLogout = () => {
    logout();
    onClose();
    navigate("/");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ==================================================
              BACKDROP
          ================================================== */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-[998] bg-[#29321F]/50 backdrop-blur-sm"
          />

          {/* ==================================================
              MOBILE MENU
          ================================================== */}

          <motion.aside
            initial={{
              x: "100%",
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            exit={{
              x: "100%",
              opacity: 0,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className="fixed right-0 top-0 z-[999] flex h-full w-[88%] max-w-[390px] flex-col overflow-hidden bg-[#F7F5EF] shadow-2xl"
          >
            {/* ==================================================
                HEADER
            ================================================== */}

            <div className="flex items-center justify-between border-b border-[#E6E1D8] bg-white px-5 py-5">
              <button
                onClick={() => handleNavigation("/")}
                className="group flex items-center gap-3"
              >
                {/* Logo */}
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E4EBD9] text-[#56663D] transition-transform duration-300 group-hover:scale-105">
                  <Leaf size={23} />
                </div>

                {/* Brand */}
                <div className="text-left">
                  <h2 className="text-base font-semibold tracking-wide text-[#29321F]">
                    ShreeKrishna
                  </h2>

                  <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#9A7B2F]">
                    Organics
                  </p>
                </div>
              </button>

              {/* Close */}
              <motion.button
                whileHover={{ rotate: 90, scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F7F5EF] text-[#29321F] transition-colors hover:bg-[#E4EBD9] hover:text-[#56663D]"
              >
                <X size={22} />
              </motion.button>
            </div>

            {/* ==================================================
                USER SECTION
            ================================================== */}

            <div className="border-b border-[#E6E1D8] px-5 py-5">
              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#56663D] text-white">
                    <User size={21} />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[#29321F]">
                      Hello, {user?.name || "Customer"}
                    </p>

                    <p className="truncate text-xs text-[#777568]">
                      {user?.email || "Welcome back"}
                    </p>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() =>
                    handleNavigation("/login")
                  }
                  className="flex w-full items-center justify-between rounded-xl bg-[#E4EBD9] px-4 py-3 text-left transition-colors hover:bg-[#DDE8D2]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#56663D]">
                      <User size={19} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-[#29321F]">
                        Login / Sign Up
                      </p>

                      <p className="text-xs text-[#777568]">
                        Access your account
                      </p>
                    </div>
                  </div>

                  <ChevronRight
                    size={18}
                    className="text-[#56663D]"
                  />
                </button>
              )}
            </div>

            {/* ==================================================
                NAVIGATION
            ================================================== */}

            <nav className="flex-1 overflow-y-auto px-4 py-5">
              <p className="mb-3 px-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9A7B2F]">
                Explore
              </p>

              <div className="space-y-1">
                {navigationItems.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.path}
                      initial={{
                        opacity: 0,
                        x: 20,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: 0.08 + index * 0.05,
                        duration: 0.3,
                      }}
                    >
                      <NavLink
                        to={item.path}
                        end={item.path === "/"}
                        onClick={onClose}
                        className={({ isActive }) =>
                          `group flex items-center justify-between rounded-xl px-4 py-3.5 transition-all duration-200 ${
                            isActive
                              ? "bg-[#56663D] text-white shadow-md shadow-[#56663D]/10"
                              : "text-[#29321F] hover:bg-[#E4EBD9]"
                          }`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <div className="flex items-center gap-3">
                              <Icon
                                size={19}
                                className={
                                  isActive
                                    ? "text-white"
                                    : "text-[#56663D]"
                                }
                              />

                              <span className="text-sm font-medium">
                                {item.name}
                              </span>
                            </div>

                            <ChevronRight
                              size={17}
                              className={`transition-transform duration-200 ${
                                isActive
                                  ? "text-white"
                                  : "text-[#99978B] group-hover:translate-x-1"
                              }`}
                            />
                          </>
                        )}
                      </NavLink>
                    </motion.div>
                  );
                })}
              </div>

              {/* ==================================================
                  CART
              ================================================== */}

              <div className="mt-7">
                <p className="mb-3 px-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9A7B2F]">
                  Your Basket
                </p>

                <button
                  onClick={() =>
                    handleNavigation("/cart")
                  }
                  className="flex w-full items-center justify-between rounded-xl border border-[#E6E1D8] bg-white px-4 py-4 text-left transition-all hover:border-[#56663D]/30 hover:bg-[#E4EBD9]/40"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#F3E8C8] text-[#9A7B2F]">
                      <ShoppingBag size={19} />

                      {totalItems > 0 && (
                        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#56663D] px-1 text-[10px] font-bold text-white">
                          {totalItems}
                        </span>
                      )}
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-[#29321F]">
                        Shopping Cart
                      </p>

                      <p className="text-xs text-[#777568]">
                        {totalItems === 0
                          ? "Your cart is empty"
                          : `${totalItems} ${
                              totalItems === 1
                                ? "item"
                                : "items"
                            }`}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-semibold text-[#56663D]">
                      ₹{Number(subtotal || 0).toLocaleString(
                        "en-IN"
                      )}
                    </p>

                    <ChevronRight
                      size={16}
                      className="ml-auto mt-1 text-[#99978B]"
                    />
                  </div>
                </button>
              </div>

              {/* ==================================================
                  ADMIN LINK
              ================================================== */}

              {isAuthenticated &&
                user?.role === "ADMIN" && (
                  <div className="mt-5">
                    <button
                      onClick={() =>
                        handleNavigation(
                          "/admin/dashboard"
                        )
                      }
                      className="flex w-full items-center justify-between rounded-xl border border-[#9A7B2F]/20 bg-[#F3E8C8]/50 px-4 py-3.5 text-left transition-colors hover:bg-[#F3E8C8]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-[#9A7B2F]">
                          <Leaf size={17} />
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-[#29321F]">
                            Admin Panel
                          </p>

                          <p className="text-xs text-[#777568]">
                            Manage your store
                          </p>
                        </div>
                      </div>

                      <ChevronRight
                        size={17}
                        className="text-[#9A7B2F]"
                      />
                    </button>
                  </div>
                )}
            </nav>

            {/* ==================================================
                FOOTER
            ================================================== */}

            <div className="border-t border-[#E6E1D8] bg-white px-5 py-5">
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#A6533D]/20 bg-[#A6533D]/5 px-4 py-3 text-sm font-semibold text-[#A6533D] transition-colors hover:bg-[#A6533D]/10"
                >
                  <LogOut size={18} />

                  <span>Logout</span>
                </button>
              ) : (
                <button
                  onClick={() =>
                    handleNavigation("/login")
                  }
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#56663D] px-4 py-3 text-sm font-semibold text-white shadow-md shadow-[#56663D]/15 transition-colors hover:bg-[#465532]"
                >
                  <User size={18} />

                  <span>Login to Your Account</span>
                </button>
              )}

              <p className="mt-4 text-center text-[10px] text-[#99978B]">
                Pure Tradition, Naturally
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;

