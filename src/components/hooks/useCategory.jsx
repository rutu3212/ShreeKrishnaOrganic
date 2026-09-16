// ======================================================
// Srikrishn Organics - useCategory Hook
// ======================================================

import { useContext } from "react";
import { CategoryContext } from "../context/CategoryContext";

// ======================================================
// useCategory
// ======================================================

const useCategory = () => {
  const context = useContext(CategoryContext);

  // ----------------------------------------------------
  // Make sure hook is used inside CategoryProvider
  // ----------------------------------------------------

  if (!context) {
    throw new Error(
      "useCategory must be used inside a CategoryProvider"
    );
  }

  return context;
};

export default useCategory;
