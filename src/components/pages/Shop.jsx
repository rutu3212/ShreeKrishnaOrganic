import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../products/ProductCard";
import { useProducts } from "../context/ProductContext";

export default function Shop() {
  const { products } = useProducts();

  const [searchParams, setSearchParams] = useSearchParams();

  // Get search text from URL
  const searchQuery = searchParams.get("search") || "";

  // Get category from URL
  const initialCategory = searchParams.get("category") || "All";

  const [category, setCategory] = useState(initialCategory);

  // Update category when URL category changes
  useEffect(() => {
    setCategory(searchParams.get("category") || "All");
  }, [searchParams]);

  // Create unique categories
  const categories = [
    "All",
    ...new Set(
      products
        .map((product) => product.category)
        .filter(Boolean)
    ),
  ];

  // Filter products using SEARCH + CATEGORY
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // -----------------------------
    // SEARCH FILTER
    // -----------------------------
    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();

      result = result.filter((product) => {
        const name = product.name?.toLowerCase() || "";
        const categoryName =
          product.category?.toLowerCase() || "";
        const description =
          product.description?.toLowerCase() || "";
        const shortDescription =
          product.shortDescription?.toLowerCase() || "";
        const badge =
          product.badge?.toLowerCase() || "";

        return (
          name.includes(query) ||
          categoryName.includes(query) ||
          description.includes(query) ||
          shortDescription.includes(query) ||
          badge.includes(query)
        );
      });
    }

    // -----------------------------
    // CATEGORY FILTER
    // -----------------------------
    if (category !== "All") {
      result = result.filter(
        (product) => product.category === category
      );
    }

    return result;
  }, [products, searchQuery, category]);

  // Handle category click
  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);

    const params = new URLSearchParams(searchParams);

    if (selectedCategory === "All") {
      params.delete("category");
    } else {
      params.set("category", selectedCategory);
    }

    setSearchParams(params);
  };

  // Clear search
  const clearSearch = () => {
    const params = new URLSearchParams(searchParams);

    params.delete("search");

    setSearchParams(params);
  };

  return (
    <main className="min-h-screen bg-[#f7f2e7] py-16">
      <div className="container-custom">

        {/* ========================= */}
        {/* PAGE HEADER */}
        {/* ========================= */}

        <div className="text-center max-w-2xl mx-auto">
          <div className="gold-line mx-auto mb-5" />

          <h1 className="text-5xl">
            Shop our collection
          </h1>

          <p className="text-[#6f7566] mt-4">
            Discover products made for everyday goodness.
          </p>
        </div>

        {/* ========================= */}
        {/* SEARCH RESULT */}
        {/* ========================= */}

        {searchQuery && (
          <div className="mt-10 mx-auto max-w-2xl rounded-2xl border border-[#d8d0c0] bg-white/70 px-5 py-4">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

              <div>
                <p className="text-sm text-[#6f7566]">
                  Search results for
                </p>

                <p className="font-semibold text-[#29321F]">
                  "{searchQuery}"
                </p>
              </div>

              <button
                type="button"
                onClick={clearSearch}
                className="rounded-full bg-[#59663b] px-5 py-2 text-sm text-white transition hover:bg-[#465532]"
              >
                Clear Search
              </button>

            </div>

          </div>
        )}

        {/* ========================= */}
        {/* CATEGORY FILTER */}
        {/* ========================= */}

        <div className="flex gap-2 overflow-x-auto no-scrollbar mt-12 pb-3">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => handleCategoryChange(item)}
              className={`whitespace-nowrap px-5 py-2.5 rounded-full border text-sm transition ${
                category === item
                  ? "bg-[#59663b] border-[#59663b] text-white"
                  : "border-[#d8d0c0] hover:border-[#59663b]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* ========================= */}
        {/* PRODUCT GRID */}
        {/* ========================= */}

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-12 mt-10">

            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}

          </div>
        ) : (
          /* ========================= */
          /* NO PRODUCTS */
          /* ========================= */

          <div className="text-center py-20">

            <div className="text-5xl mb-5">
              🌿
            </div>

            <h2 className="text-2xl font-semibold text-[#29321F]">
              No products found
            </h2>

            <p className="text-[#6f7566] mt-3">
              {searchQuery
                ? `We couldn't find any products matching "${searchQuery}".`
                : "No products are available in this category."}
            </p>

            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="mt-6 rounded-full bg-[#59663b] px-6 py-3 text-white transition hover:bg-[#465532]"
              >
                View All Products
              </button>
            )}

          </div>
        )}

      </div>
    </main>
  );
}
