import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import ProductCard from "../products/ProductCard";

export default function FeaturedProducts() {
  const { products } = useProducts();

  return (
    <section className="section-padding bg-[#f7f2e7]">
      <div className="container-custom">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-5 mb-12">
          <div>
            <div className="gold-line mb-5" />

            <h2 className="text-4xl sm:text-5xl">
              Our favourites
            </h2>

            <p className="text-[#6f7566] mt-4">
              The products our community keeps coming back
              for.
            </p>
          </div>

          <Link
            to="/shop"
            className="text-[#59663b] font-semibold text-sm"
          >
            View all products →
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-10">
          {products.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </section>
  );
}