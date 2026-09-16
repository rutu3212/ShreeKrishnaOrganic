import { AnimatePresence, motion } from "framer-motion";
import {
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
} from "lucide-react";
import {
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContex";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const { totalItems } = useCart();
  const { user } = useAuth();

  const links = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Our Story", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  // =====================================
  // SEARCH FUNCTION
  // =====================================

  const handleSearch = (e) => {
    e.preventDefault();

    const query = searchQuery.trim();

    if (!query) {
      navigate("/shop");
      setSearchOpen(false);
      return;
    }

    navigate(
      `/shop?search=${encodeURIComponent(query)}`
    );

    setSearchOpen(false);
    setSearchQuery("");
    setMenuOpen(false);
  };

  // =====================================
  // OPEN SEARCH
  // =====================================

  const openSearch = () => {
    setSearchOpen(true);
  };

  // =====================================
  // CLOSE SEARCH
  // =====================================

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchQuery("");
  };

  return (
    <>
      {/* ========================================= */}
      {/* NAVBAR */}
      {/* ========================================= */}

      <header className="sticky top-0 z-50 border-b border-[#e3dccd] bg-[#fcfaf5]/95 backdrop-blur-md">

        <div className="container-custom">

          <div className="relative flex h-20 items-center justify-between">

            {/* ================================= */}
            {/* LOGO */}
            {/* ================================= */}

            <Link
              to="/"
              className="flex items-center gap-3"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#59663b] text-white">
                <span className="font-serif text-xl">
                  S
                </span>
              </div>

              <div>
                <div className="font-serif text-xl font-semibold sm:text-2xl">
                  Srikrishn
                </div>

                <div className="text-[10px] uppercase tracking-[0.25em] text-[#6f7566]">
                  Pure Tradition
                </div>
              </div>
            </Link>

            {/* ================================= */}
            {/* DESKTOP NAVIGATION */}
            {/* ================================= */}

            <nav className="hidden items-center gap-8 lg:flex">
              {links.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-sm font-medium transition ${
                      isActive
                        ? "text-[#59663b]"
                        : "text-[#27301d] hover:text-[#59663b]"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            {/* ================================= */}
            {/* RIGHT ACTIONS */}
            {/* ================================= */}

            <div className="flex items-center gap-2 sm:gap-4">

              {/* =============================== */}
              {/* SEARCH */}
              {/* =============================== */}

              <button
                type="button"
                onClick={openSearch}
                className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-[#f1ecdf]"
                aria-label="Search"
              >
                <Search size={19} />
              </button>

              {/* =============================== */}
              {/* USER */}
              {/* =============================== */}

              <Link
                to={
                  user
                    ? "/admin/dashboard"
                    : "/admin/login"
                }
                className="hidden h-10 w-10 items-center justify-center rounded-full transition hover:bg-[#f1ecdf] sm:flex"
                aria-label="Account"
              >
                <User size={19} />
              </Link>

              {/* =============================== */}
              {/* CART */}
              {/* =============================== */}

              <Link
                to="/cart"
                className="relative flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-[#f1ecdf]"
                aria-label="Shopping Cart"
              >
                <ShoppingBag size={19} />

                {totalItems > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#59663b] text-[10px] text-white">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* =============================== */}
              {/* MOBILE MENU */}
              {/* =============================== */}

              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                className="flex h-10 w-10 items-center justify-center lg:hidden"
                aria-label="Open menu"
              >
                <Menu />
              </button>

            </div>
          </div>

          {/* ========================================= */}
          {/* SEARCH BOX */}
          {/* ========================================= */}

          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{
                  opacity: 0,
                  height: 0,
                }}
                animate={{
                  opacity: 1,
                  height: "auto",
                }}
                exit={{
                  opacity: 0,
                  height: 0,
                }}
                transition={{
                  duration: 0.25,
                }}
                className="overflow-hidden"
              >
                <form
                  onSubmit={handleSearch}
                  className="flex items-center gap-2 border-t border-[#e3dccd] py-4"
                >

                  {/* Search Input */}

                  <div className="flex flex-1 items-center rounded-full border border-[#d8d0c0] bg-white px-4">

                    <Search
                      size={18}
                      className="shrink-0 text-[#777568]"
                    />

                    <input
                      type="text"
                      autoFocus
                      value={searchQuery}
                      onChange={(e) =>
                        setSearchQuery(e.target.value)
                      }
                      placeholder="Search ghee, oil, honey, atta..."
                      className="w-full bg-transparent px-3 py-3 text-sm text-[#29321F] outline-none placeholder:text-[#999]"
                    />

                    {/* Clear Input */}

                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() =>
                          setSearchQuery("")
                        }
                        className="text-[#777568] hover:text-[#29321F]"
                        aria-label="Clear search"
                      >
                        <X size={17} />
                      </button>
                    )}

                  </div>

                  {/* Search Button */}

                  <button
                    type="submit"
                    className="rounded-full bg-[#59663b] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#465532]"
                  >
                    Search
                  </button>

                  {/* Close */}

                  <button
                    type="button"
                    onClick={closeSearch}
                    className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-[#f1ecdf]"
                    aria-label="Close search"
                  >
                    <X size={20} />
                  </button>

                </form>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </header>

      {/* ========================================= */}
      {/* MOBILE MENU */}
      {/* ========================================= */}

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[100] bg-[#fcfaf5] lg:hidden"
          >

            <div className="container-custom">

              {/* MOBILE HEADER */}

              <div className="flex h-20 items-center justify-between">

                <div className="font-serif text-2xl">
                  Srikrishn
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setMenuOpen(false)
                  }
                  aria-label="Close menu"
                >
                  <X />
                </button>

              </div>

              {/* MOBILE SEARCH */}

              <form
                onSubmit={handleSearch}
                className="mb-5 flex items-center rounded-full border border-[#d8d0c0] bg-white px-4"
              >

                <Search
                  size={18}
                  className="text-[#777568]"
                />

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) =>
                    setSearchQuery(e.target.value)
                  }
                  placeholder="Search products..."
                  className="w-full bg-transparent px-3 py-3 text-sm outline-none"
                />

                <button
                  type="submit"
                  className="rounded-full bg-[#59663b] px-4 py-2 text-xs font-semibold text-white"
                >
                  Search
                </button>

              </form>

              {/* MOBILE NAVIGATION */}

              <nav className="mt-5 flex flex-col">

                {links.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() =>
                      setMenuOpen(false)
                    }
                    className="border-b border-[#e3dccd] py-5 font-serif text-xl"
                  >
                    {link.name}
                  </Link>
                ))}

                <Link
                  to={
                    user
                      ? "/admin/dashboard"
                      : "/admin/login"
                  }
                  onClick={() =>
                    setMenuOpen(false)
                  }
                  className="py-5 font-serif text-xl"
                >
                  {user ? "Admin Dashboard" : "Admin"}
                </Link>

              </nav>

            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
