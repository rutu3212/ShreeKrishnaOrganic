// ======================================================
// Srikrishn Organics - useProduct Hook
// ======================================================

import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

// ======================================================
// useProduct
// ======================================================

const useProduct = () => {
  const context = useContext(ProductContext);

  // Make sure hook is used inside ProductProvider
  if (!context) {
    throw new Error(
      "useProduct must be used inside a ProductProvider"
    );
  }

  return context;
};

export default useProduct;