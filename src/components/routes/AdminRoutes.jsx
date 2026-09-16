import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ShieldAlert } from "lucide-react";

import useAuth from "../hooks/useAuth";
import Loader from "../common/Loader";

const AdminRoute = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // -----------------------------------------
  // Check Authentication Loading
  // -----------------------------------------
  if (loading) {
    return (
      <Loader
        fullScreen
        size="large"
        text="Checking administrator access..."
        showText={true}
      />
    );
  }

  // -----------------------------------------
  // User Not Logged In
  // -----------------------------------------
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location,
          message: "Please login to access the admin panel.",
        }}
      />
    );
  }

  // -----------------------------------------
  // Check Admin Role
  // -----------------------------------------
  const userRole = user?.role?.toLowerCase();

  const isAdmin =
    userRole === "admin" ||
    userRole === "administrator";

  // -----------------------------------------
  // Logged In But Not Admin
  // -----------------------------------------
  if (!isAdmin) {
    return <AccessDenied />;
  }

  // -----------------------------------------
  // Admin Access Granted
  // -----------------------------------------
  return <Outlet />;
};

// =========================================
// ACCESS DENIED COMPONENT
// =========================================

const AccessDenied = () => {
  return (
    <div className="min-h-screen bg-[#F7F5EF] px-4 py-16">
      <div className="mx-auto flex min-h-[70vh] max-w-2xl items-center justify-center">
        <div className="w-full rounded-3xl border border-[#E6E1D8] bg-white p-8 text-center shadow-sm sm:p-12">

          {/* Icon */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#EEE4D7]">
            <ShieldAlert
              size={40}
              className="text-[#A6533D]"
            />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-[#29321F] sm:text-3xl">
            Access Denied
          </h1>

          {/* Description */}
          <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#777568] sm:text-base">
            You do not have administrator permission to access
            this section. Please contact the website administrator
            if you believe this is a mistake.
          </p>

          {/* Back Button */}
          <button
            type="button"
            onClick={() => window.history.back()}
            className="mt-8 inline-flex items-center justify-center rounded-xl bg-[#56663D] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#465532] hover:shadow-md"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminRoute;
