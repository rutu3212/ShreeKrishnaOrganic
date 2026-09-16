// ======================================================
// Srikrishn Organics - useCart Hook
// ======================================================

import { useContext } from "react";
import { CartContext } from "../context/CartContext";

// ======================================================
// useCart
// ======================================================

const useCart = () => {
  const context = useContext(CartContext);

  // ----------------------------------------------------
  // Make sure hook is used inside CartProvider
  // ----------------------------------------------------

  if (!context) {
    throw new Error(
      "useCart must be used inside a CartProvider"
    );
  }

  return context;
};

export default useCart;

