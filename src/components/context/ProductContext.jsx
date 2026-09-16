import { createContext, useContext, useEffect, useState } from "react";
import defaultProducts from "../data/product";

export const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("srikrish_products");

    return saved ? JSON.parse(saved) : defaultProducts;
  });

  useEffect(() => {
    localStorage.setItem(
      "srikrish_products",
      JSON.stringify(products)
    );
  }, [products]);

  // ADD PRODUCT
  const addProduct = (product) => {
    setProducts((prev) => [
      ...prev,
      {
        ...product,
        id: crypto.randomUUID(),
      },
    ]);
  };

  // UPDATE PRODUCT
  const updateProduct = (id, updatedProduct) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? {
              ...product,
              ...updatedProduct,
            }
          : product
      )
    );
  };

  // DELETE PRODUCT
  const deleteProduct = (id) => {
    setProducts((prev) =>
      prev.filter((product) => product.id !== id)
    );
  };

  // GET PRODUCT
  const getProduct = (id) => {
    return products.find(
      (product) => product.id === id
    );
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

// CUSTOM HOOK
export function useProducts() {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error(
      "useProducts must be used inside ProductProvider"
    );
  }

  return context;
}