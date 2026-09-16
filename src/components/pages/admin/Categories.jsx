import AdminSidebar from "../admin/adminSidebar";
import { useProducts } from "../../context/ProductContext";

export default function Categories() {
  const { products } = useProducts();

  const categories = [
    ...new Set(products.map((p) => p.category)),
  ];

  return (
    <div className="min-h-screen bg-[#f7f2e7]">
      <AdminSidebar />

      <main className="lg:ml-64 p-6 sm:p-10">
        <h1 className="font-serif text-4xl">
          Categories
        </h1>

        <p className="text-[#6f7566] mt-2">
          Product categories currently used in your store.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          {categories.map((category) => {
            const count = products.filter(
              (p) => p.category === category
            ).length;

            return (
              <div
                key={category}
                className="bg-white rounded-2xl p-6"
              >
                <h2 className="font-serif text-2xl">
                  {category}
                </h2>

                <p className="text-[#6f7566] mt-3">
                  {count} products
                </p>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}