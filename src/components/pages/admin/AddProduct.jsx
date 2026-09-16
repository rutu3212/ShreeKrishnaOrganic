import React from "react";

import AdminSidebar from "../admin/adminSidebar";
import ProductForm from "../../products/ProductsForm";
import useProduct from "../../hooks/useProducts";

export default function AddProduct() {
  const { addProduct } = useProduct();

  return (
    <div className="min-h-screen bg-[#f7f2e7]">
      <AdminSidebar />

      <main className="lg:ml-64 p-6 sm:p-10">
        <h1 className="font-serif text-4xl text-[#29321F]">
          Add Product
        </h1>

        <p className="mt-2 mb-8 text-[#6f7566]">
          Add a new product to your Srikrishn store.
        </p>

        <ProductForm
          onSubmit={addProduct}
          buttonText="Add Product"
        />
      </main>
    </div>
  );
}