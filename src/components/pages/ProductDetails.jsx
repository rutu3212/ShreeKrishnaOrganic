import { ArrowLeft, Minus, Plus, Star } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContex";
import { formatPrice } from "../utils/FormatPrice";

export default function ProductDetails() {
  const { id } = useParams();

  const { getProduct } = useProducts();
  const { addToCart } = useCart();

  const product = getProduct(id);

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Product not found.
      </div>
    );
  }

  return (
    <main className="bg-[#f7f2e7] py-16">
      <div className="container-custom">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-sm text-[#59663b]"
        >
          <ArrowLeft size={16} />
          Back to shop
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mt-10">
          <div className="rounded-3xl overflow-hidden bg-[#eee7d8]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full aspect-square object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <div className="text-[#b49358] flex items-center gap-2 text-sm">
              <Star size={16} fill="currentColor" />

              {product.rating} · {product.reviews} reviews
            </div>

            <h1 className="text-5xl mt-4">
              {product.name}
            </h1>

            <p className="text-[#6f7566] leading-8 mt-6">
              {product.description}
            </p>

            <div className="flex items-center gap-3 mt-7">
              <span className="text-3xl font-semibold">
                {formatPrice(product.sellingPrice)}
              </span>

              {product.regularPrice >
                product.sellingPrice && (
                <span className="line-through text-[#999]">
                  {formatPrice(product.regularPrice)}
                </span>
              )}
            </div>

            <div className="flex items-center gap-4 mt-8">
              <div className="flex items-center border border-[#d7cfbf] rounded-full">
                <button
                  onClick={() =>
                    setQuantity((q) => Math.max(1, q - 1))
                  }
                  className="p-3"
                >
                  <Minus size={16} />
                </button>

                <span className="w-8 text-center">
                  {quantity}
                </span>

                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-3"
                >
                  <Plus size={16} />
                </button>
              </div>

              <button
                onClick={() => {
                  for (let i = 0; i < quantity; i++) {
                    addToCart(product);
                  }
                }}
                className="flex-1 bg-[#59663b] text-white rounded-full py-4 hover:bg-[#3f4a29] transition"
              >
                Add to cart
              </button>
            </div>

            <div className="border-t border-[#ded6c6] mt-8 pt-6 text-sm text-[#6f7566]">
              Category: {product.category}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}