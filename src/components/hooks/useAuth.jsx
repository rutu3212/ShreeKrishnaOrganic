// ======================================================
// Srikrishn Organics - useAuth Hook
// ======================================================

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// ======================================================
// useAuth
// ======================================================

const useAuth = () => {
  const context = useContext(AuthContext);

  // ----------------------------------------------------
  // Check whether AuthProvider is available
  // ----------------------------------------------------

  if (!context) {
    throw new Error(
      "useAuth must be used inside an AuthProvider"
    );
  }

  return context;
};

export default useAuth;

