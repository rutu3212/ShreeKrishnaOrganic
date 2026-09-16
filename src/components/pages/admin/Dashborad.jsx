import { Package, Tag, TrendingUp } from "lucide-react";
import AdminSidebar from "../admin/adminSidebar";
import { useProducts } from "../../context/ProductContext";

export default function Dashboard() {
  const { products } = useProducts();

  const totalProducts = products.length;

  const totalStock = products.filter(
    (product) => product.stock
  ).length;

  return (
    <div className="min-h-screen bg-[#f7f2e7]">
      <AdminSidebar />

      <main className="lg:ml-64 p-6 sm:p-10">
        <h1 className="font-serif text-4xl">
          Dashboard
        </h1>

        <p className="text-[#6f7566] mt-2">
          Welcome back. Here's your store overview.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          <div className="bg-white rounded-2xl p-6">
            <Package className="text-[#59663b]" />

            <div className="text-3xl font-semibold mt-5">
              {totalProducts}
            </div>

            <div className="text-[#6f7566] text-sm mt-1">
              Total Products
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6">
            <TrendingUp className="text-[#b49358]" />

            <div className="text-3xl font-semibold mt-5">
              {totalStock}
            </div>

            <div className="text-[#6f7566] text-sm mt-1">
              Available Products
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6">
            <Tag className="text-[#59663b]" />

            <div className="text-3xl font-semibold mt-5">
              10%
            </div>

            <div className="text-[#6f7566] text-sm mt-1">
              Active Offer
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}