import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Tags,
  Image,
  Tag,
  Home,
  Settings,
  LogOut,
  ChevronDown,
  X,
  ShoppingBag,
  FileText,
  BarChart3,
} from "lucide-react";

const AdminSidebar = ({ isOpen, onClose, onLogout }) => {
  const [productOpen, setProductOpen] = useState(true);
  const [contentOpen, setContentOpen] = useState(false);

  const mainMenu = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Products",
      path: "/admin/products",
      icon: Package,
    },
    {
      name: "Categories",
      path: "/admin/categories",
      icon: Tags,
    },
    {
      name: "Orders",
      path: "/admin/orders",
      icon: ShoppingBag,
    },
    {
      name: "Offers",
      path: "/admin/offers",
      icon: Tag,
    },
  ];

  const contentMenu = [
    {
      name: "Hero Management",
      path: "/admin/hero",
      icon: Home,
    },
    {
      name: "Image Management",
      path: "/admin/images",
      icon: Image,
    },
    {
      name: "Website Content",
      path: "/admin/content",
      icon: FileText,
    },
  ];

  const bottomMenu = [
    {
      name: "Analytics",
      path: "/admin/analytics",
      icon: BarChart3,
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: Settings,
    },
  ];

  const navLinkClass = ({ isActive }) =>
    `group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-[#56663D] text-white shadow-md"
        : "text-[#66675D] hover:bg-[#F1EFE5] hover:text-[#3F4D30]"
    }`;

  const handleLinkClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 z-50
          h-screen w-[270px]
          bg-[#FBFAF6]
          border-r border-[#E6E1D8]
          flex flex-col
          transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* ============================= */}
        {/* LOGO / BRAND */}
        {/* ============================= */}

        <div className="h-[72px] px-5 flex items-center justify-between border-b border-[#E6E1D8]">

          <NavLink
            to="/admin"
            onClick={handleLinkClick}
            className="flex items-center gap-3"
          >
            {/* Logo */}
            <div className="w-10 h-10 rounded-xl bg-[#56663D] text-white flex items-center justify-center shadow-sm">
              <span className="text-lg font-semibold">
                S
              </span>
            </div>

            {/* Brand Name */}
            <div>
              <h1 className="text-lg font-semibold text-[#29321F] leading-none">
                Srikrishn
              </h1>

              <p className="mt-1 text-[9px] uppercase tracking-[0.18em] text-[#8B8A7D]">
                Organics Admin
              </p>
            </div>
          </NavLink>

          {/* Mobile Close */}
          <button
            type="button"
            onClick={onClose}
            className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center text-[#62645A] hover:bg-[#F0EEE5] transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* ============================= */}
        {/* NAVIGATION */}
        {/* ============================= */}

        <div className="flex-1 overflow-y-auto px-4 py-5">

          {/* Main Menu */}
          <div>
            <p className="px-3 mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A19F94]">
              Main Menu
            </p>

            <nav className="space-y-1.5">
              {mainMenu.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === "/admin"}
                    onClick={handleLinkClick}
                    className={navLinkClass}
                  >
                    <Icon
                      size={19}
                      strokeWidth={1.8}
                      className="shrink-0"
                    />

                    <span>{item.name}</span>
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* Product Management */}
          <div className="mt-7">

            <button
              type="button"
              onClick={() => setProductOpen(!productOpen)}
              className="w-full flex items-center justify-between px-3 mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A19F94]"
            >
              <span>Product Management</span>

              <ChevronDown
                size={15}
                className={`transition-transform duration-200 ${
                  productOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {productOpen && (
              <nav className="space-y-1.5">

                <NavLink
                  to="/admin/products"
                  onClick={handleLinkClick}
                  className={navLinkClass}
                >
                  <Package size={19} strokeWidth={1.8} />
                  <span>All Products</span>
                </NavLink>

                <NavLink
                  to="/admin/products/add"
                  onClick={handleLinkClick}
                  className={navLinkClass}
                >
                  <Package size={19} strokeWidth={1.8} />
                  <span>Add Product</span>
                </NavLink>

                <NavLink
                  to="/admin/products/pricing"
                  onClick={handleLinkClick}
                  className={navLinkClass}
                >
                  <Tag size={19} strokeWidth={1.8} />
                  <span>Pricing</span>
                </NavLink>

              </nav>
            )}
          </div>

          {/* Content Management */}
          <div className="mt-7">

            <button
              type="button"
              onClick={() => setContentOpen(!contentOpen)}
              className="w-full flex items-center justify-between px-3 mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A19F94]"
            >
              <span>Content Management</span>

              <ChevronDown
                size={15}
                className={`transition-transform duration-200 ${
                  contentOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {contentOpen && (
              <nav className="space-y-1.5">

                {contentMenu.map((item) => {
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={handleLinkClick}
                      className={navLinkClass}
                    >
                      <Icon
                        size={19}
                        strokeWidth={1.8}
                      />

                      <span>{item.name}</span>
                    </NavLink>
                  );
                })}

              </nav>
            )}
          </div>

          {/* Settings / Analytics */}
          <div className="mt-7">

            <p className="px-3 mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A19F94]">
              System
            </p>

            <nav className="space-y-1.5">
              {bottomMenu.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={handleLinkClick}
                    className={navLinkClass}
                  >
                    <Icon
                      size={19}
                      strokeWidth={1.8}
                    />

                    <span>{item.name}</span>
                  </NavLink>
                );
              })}
            </nav>

          </div>
        </div>

        {/* ============================= */}
        {/* BOTTOM AREA */}
        {/* ============================= */}

        <div className="p-4 border-t border-[#E6E1D8]">

          {/* View Website */}
          <NavLink
            to="/"
            onClick={handleLinkClick}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#59634A] hover:bg-[#F1EFE5] transition"
          >
            <Home size={19} strokeWidth={1.8} />

            <span>View Website</span>
          </NavLink>

          {/* Logout */}
          <button
            type="button"
            onClick={onLogout}
            className="w-full mt-1 flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#8A4B3A] hover:bg-[#FAF0EC] transition"
          >
            <LogOut size={19} strokeWidth={1.8} />

            <span>Logout</span>
          </button>

          {/* Admin Info */}
          <div className="mt-4 p-3 rounded-xl bg-[#F1EFE5]">
            <p className="text-xs font-semibold text-[#4F5D3A]">
              Srikrishn Organics
            </p>

            <p className="mt-1 text-[10px] text-[#8B8A7D]">
              Admin Panel
            </p>
          </div>

        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;

