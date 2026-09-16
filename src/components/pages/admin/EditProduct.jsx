import { useParams } from "react-router-dom";
import AdminSidebar from "../../admin/AdminSidebar";
import ProductForm from "../../admin/ProductForm";
import { useProducts } from "../../context/ProductContext";

export default function EditProduct() {
  const { id } = useParams();

  const { getProduct, updateProduct } =
    useProducts();

  const product = getProduct(id);

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="min-h-screen bg-[#f7f2e7]">
      <AdminSidebar />

      <main className="lg:ml-64 p-6 sm:p-10">
        <h1 className="font-serif text-4xl">
          Edit Product
        </h1>

        <p className="text-[#6f7566] mt-2 mb-8">
          Update product information or pricing.
        </p>

        <ProductForm
          initialData={product}
          onSubmit={(data) =>
            updateProduct(id, data)
          }
          buttonText="Update Product"
        />
      </main>
    </div>
  );
}