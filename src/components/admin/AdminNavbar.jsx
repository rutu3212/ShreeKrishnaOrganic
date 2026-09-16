import React from "react";
import {
  Menu,
  Bell,
  User,
  LogOut,
  Settings,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

const AdminNavbar = ({ onMenuClick, onLogout }) => {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#E6E1D8]">
      <div className="h-16 sm:h-[72px] px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* LEFT SIDE */}
        <div className="flex items-center gap-3">

          {/* Mobile Menu */}
          <button
            type="button"
            onClick={onMenuClick}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl text-[#4F5D3A] hover:bg-[#F3F1E8] transition"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>

          {/* Brand */}
          <div>
            <h1 className="text-lg sm:text-xl font-semibold text-[#29321F] tracking-tight">
              Srikrishn
            </h1>

            <p className="hidden sm:block text-[10px] uppercase tracking-[0.18em] text-[#8B8A7D]">
              Organics Admin
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-2 sm:gap-4">

          {/* Notification */}
          <button
            type="button"
            className="relative w-10 h-10 flex items-center justify-center rounded-xl text-[#59634A] hover:bg-[#F3F1E8] transition"
            aria-label="Notifications"
          >
            <Bell size={20} strokeWidth={1.8} />

            {/* Notification Dot */}
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#9A7B2F] border-2 border-white"></span>
          </button>

          {/* Divider */}
          <div className="hidden sm:block w-px h-8 bg-[#E6E1D8]"></div>

          {/* Profile */}
          <div className="relative">

            <button
              type="button"
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 sm:gap-3 rounded-xl px-2 py-1.5 hover:bg-[#F7F5EF] transition"
            >

              {/* Avatar */}
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#DDE8D2] text-[#4F5D3A] flex items-center justify-center">
                <User size={19} strokeWidth={1.8} />
              </div>

              {/* User Information */}
              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold text-[#29321F]">
                  Admin
                </p>

                <p className="text-xs text-[#8B8A7D]">
                  Administrator
                </p>
              </div>

              <ChevronDown
                size={16}
                className={`hidden sm:block text-[#777568] transition-transform duration-200 ${
                  profileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* PROFILE DROPDOWN */}
            {profileOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-white border border-[#E6E1D8] rounded-2xl shadow-[0_15px_40px_rgba(60,70,40,0.12)] overflow-hidden">

                {/* Profile Header */}
                <div className="px-4 py-4 bg-[#F7F5EF] border-b border-[#E6E1D8]">
                  <p className="text-sm font-semibold text-[#29321F]">
                    Admin
                  </p>

                  <p className="text-xs text-[#8B8A7D] mt-1">
                    Manage Srikrishn Organics
                  </p>
                </div>

                {/* Settings */}
                <button
                  type="button"
                  onClick={() => setProfileOpen(false)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[#55574D] hover:bg-[#F7F5EF] transition"
                >
                  <Settings size={18} />
                  <span>Settings</span>
                </button>

                {/* Logout */}
                <button
                  type="button"
                  onClick={() => {
                    setProfileOpen(false);

                    if (onLogout) {
                      onLogout();
                    }
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[#8A4B3A] hover:bg-[#FAF0EC] transition border-t border-[#EEEAE2]"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
