import { Edit, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import AdminSidebar from "../admin/adminSidebar";
import { useProducts } from "../../context/ProductContext";
import { formatPrice } from "../../utils/FormatPrice";

export default function Products() {
  const { products, deleteProduct } = useProducts();

  return (
    <div className="min-h-screen bg-[#f7f2e7]">
      <AdminSidebar />

      <main className="lg:ml-64 p-6 sm:p-10">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <h1 className="font-serif text-4xl">
              Products
            </h1>

            <p className="text-[#6f7566] mt-2">
              Manage your product catalogue and prices.
            </p>
          </div>

          <Link
            to="/admin/products/add"
            className="bg-[#59663b] text-white rounded-full px-6 py-3 flex items-center gap-2 justify-center"
          >
            <Plus size={17} />
            Add Product
          </Link>
        </div>

        <div className="bg-white rounded-2xl mt-8 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b bg-[#faf8f2]">
                  <th className="text-left p-5 text-sm">
                    Product
                  </th>

                  <th className="text-left p-5 text-sm">
                    Category
                  </th>

                  <th className="text-left p-5 text-sm">
                    Regular
                  </th>

                  <th className="text-left p-5 text-sm">
                    Selling
                  </th>

                  <th className="text-left p-5 text-sm">
                    Stock
                  </th>

                  <th className="text-right p-5 text-sm">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b last:border-0"
                  >
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />

                        <span className="font-medium">
                          {product.name}
                        </span>
                      </div>
                    </td>

                    <td className="p-5 text-sm">
                      {product.category}
                    </td>

                    <td className="p-5 text-sm">
                      {formatPrice(
                        product.regularPrice
                      )}
                    </td>

                    <td className="p-5 font-semibold">
                      {formatPrice(
                        product.sellingPrice
                      )}
                    </td>

                    <td className="p-5">
                      <span
                        className={`text-xs px-3 py-1 rounded-full ${
                          product.stock
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {product.stock
                          ? "Available"
                          : "Out of stock"}
                      </span>
                    </td>

                    <td className="p-5">
                      <div className="flex justify-end gap-2">
                        <Link
                          to={`/admin/products/edit/${product.id}`}
                          className="w-9 h-9 rounded-lg bg-[#f3efe5] flex items-center justify-center"
                        >
                          <Edit size={16} />
                        </Link>

                        <button
                          onClick={() => {
                            if (
                              window.confirm(
                                "Delete this product?"
                              )
                            ) {
                              deleteProduct(product.id);
                            }
                          }}
                          className="w-9 h-9 rounded-lg bg-red-50 text-red-500 flex items-center justify-center"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}