import { motion } from "framer-motion";
import { ShoppingBag, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContex";
import { formatPrice } from "../utils/FormatPrice";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="group"
    >
      <div className="relative bg-[#f3eee2] rounded-2xl overflow-hidden">
        {product.badge && (
          <div className="absolute top-4 left-4 z-10 bg-[#59663b] text-white px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider">
            {product.badge}
          </div>
        )}

        {product.discount > 0 && (
          <div className="absolute top-4 right-4 z-10 bg-[#b49358] text-white px-3 py-1.5 rounded-full text-[10px] font-semibold">
            {product.discount}% OFF
          </div>
        )}

        <Link
          to={`/product/${product.id}`}
          className="block aspect-square overflow-hidden"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
          />
        </Link>

        <button
          onClick={() => addToCart(product)}
          className="absolute bottom-4 right-4 w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center text-[#59663b] hover:bg-[#59663b] hover:text-white transition"
        >
          <ShoppingBag size={18} />
        </button>
      </div>

      <div className="pt-4">
        <div className="flex items-center gap-1 text-xs text-[#b49358]">
          <Star size={13} fill="currentColor" />

          <span className="text-[#6f7566]">
            {product.rating} ({product.reviews})
          </span>
        </div>

        <Link to={`/product/${product.id}`}>
          <h3 className="font-serif text-lg mt-2 hover:text-[#59663b] transition">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-2 mt-2">
          <span className="font-semibold">
            {formatPrice(product.sellingPrice)}
          </span>

          {product.regularPrice > product.sellingPrice && (
            <span className="text-sm text-[#999] line-through">
              {formatPrice(product.regularPrice)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}