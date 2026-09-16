import React from "react";
import { motion } from "framer-motion";
import { PackageSearch } from "lucide-react";

import ProductCard from "./ProductCard";
import Loader from "../common/Loader";
import EmptyState from "../common/EmptyState";

const ProductGrid = ({
  products = [],
  loading = false,
  emptyTitle = "No Products Found",
  emptyDescription = "We couldn't find any products matching your selection.",
  emptyActionText = "",
  onEmptyAction,
  columns = "4",
  showWishlist = true,
  showQuickView = true,
  showAddToCart = true,
}) => {
  /* -----------------------------------------
     Loading State
  ----------------------------------------- */
  if (loading) {
    return (
      <div className="w-full py-16">
        <Loader
          size="large"
          text="Loading products..."
          showText={true}
        />
      </div>
    );
  }

  /* -----------------------------------------
     Empty State
  ----------------------------------------- */
  if (!products || products.length === 0) {
    return (
      <div className="w-full py-10">
        <EmptyState
          icon={PackageSearch}
          title={emptyTitle}
          description={emptyDescription}
          actionText={emptyActionText}
          onAction={onEmptyAction}
        />
      </div>
    );
  }

  /* -----------------------------------------
     Responsive Grid Columns
  ----------------------------------------- */
  const gridColumns = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
    5: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
  };

  const selectedColumns = gridColumns[columns] || gridColumns[4];

  return (
    <div className="w-full">
      {/* -----------------------------------------
          Product Count
      ----------------------------------------- */}
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-[#777568]">
          Showing{" "}
          <span className="font-semibold text-[#29321F]">
            {products.length}
          </span>{" "}
          {products.length === 1 ? "product" : "products"}
        </p>

        <div className="hidden sm:flex items-center gap-2 text-xs text-[#777568]">
          <span className="h-2 w-2 rounded-full bg-[#56663D]" />
          Fresh &amp; naturally sourced
        </div>
      </div>

      {/* -----------------------------------------
          Product Grid
      ----------------------------------------- */}
      <div className={`grid ${selectedColumns} gap-5 md:gap-6`}>
        {products.map((product, index) => (
          <motion.div
            key={product.id || product._id || index}
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.1,
            }}
            transition={{
              duration: 0.45,
              delay: Math.min(index * 0.06, 0.35),
              ease: "easeOut",
            }}
          >
            <ProductCard
              product={product}
              showWishlist={showWishlist}
              showQuickView={showQuickView}
              showAddToCart={showAddToCart}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;

