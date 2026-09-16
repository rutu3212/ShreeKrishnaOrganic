import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  X,
  RotateCcw,
  Search,
  Tag,
  PackageCheck,
  Star,
} from "lucide-react";

const ProductFilter = ({
  categories = [],
  filters = {},
  onFilterChange,
  onClearFilters,
  onSortChange,
  sortBy = "featured",
  mobile = false,
}) => {
  // --------------------------------------------------
  // DEFAULT FILTERS
  // --------------------------------------------------

  const defaultFilters = {
    category: "all",
    minPrice: "",
    maxPrice: "",
    availability: "all",
    featured: false,
    search: "",
  };

  const currentFilters = {
    ...defaultFilters,
    ...filters,
  };

  // --------------------------------------------------
  // OPEN / CLOSE FILTER SECTIONS
  // --------------------------------------------------

  const [openSections, setOpenSections] = useState({
    category: true,
    price: true,
    availability: true,
    featured: true,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // --------------------------------------------------
  // FILTER CHANGE
  // --------------------------------------------------

  const handleFilterChange = (name, value) => {
    if (onFilterChange) {
      onFilterChange({
        ...currentFilters,
        [name]: value,
      });
    }
  };

  // --------------------------------------------------
  // PRICE CHANGE
  // --------------------------------------------------

  const handlePriceChange = (name, value) => {
    // Only allow numbers
    if (value !== "" && !/^\d*$/.test(value)) {
      return;
    }

    handleFilterChange(name, value);
  };

  // --------------------------------------------------
  // CLEAR
  // --------------------------------------------------

  const handleClear = () => {
    if (onClearFilters) {
      onClearFilters();
    } else if (onFilterChange) {
      onFilterChange(defaultFilters);
    }
  };

  // --------------------------------------------------
  // ACTIVE FILTER COUNT
  // --------------------------------------------------

  const activeFilterCount = [
    currentFilters.category !== "all",
    currentFilters.minPrice !== "",
    currentFilters.maxPrice !== "",
    currentFilters.availability !== "all",
    currentFilters.featured === true,
    currentFilters.search !== "",
  ].filter(Boolean).length;

  // --------------------------------------------------
  // SORT OPTIONS
  // --------------------------------------------------

  const sortOptions = [
    {
      value: "featured",
      label: "Featured",
    },
    {
      value: "newest",
      label: "Newest",
    },
    {
      value: "price-low-high",
      label: "Price: Low to High",
    },
    {
      value: "price-high-low",
      label: "Price: High to Low",
    },
    {
      value: "name-a-z",
      label: "Name: A to Z",
    },
    {
      value: "name-z-a",
      label: "Name: Z to A",
    },
    {
      value: "discount",
      label: "Best Discount",
    },
    {
      value: "rating",
      label: "Top Rated",
    },
  ];

  return (
    <div className="w-full">

      {/* ==================================================
          MOBILE HEADER
      ================================================== */}

      {mobile && (
        <div className="mb-4 flex items-center justify-between">

          <div className="flex items-center gap-2">

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E4EBD9] text-[#56663D]">
              <SlidersHorizontal size={18} />
            </div>

            <div>
              <h3 className="text-sm font-bold text-[#29321F]">
                Filters
              </h3>

              {activeFilterCount > 0 && (
                <p className="text-[11px] text-[#777568]">
                  {activeFilterCount} active
                </p>
              )}
            </div>

          </div>

          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={handleClear}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#A6533D]"
            >
              <RotateCcw size={14} />
              Clear
            </button>
          )}

        </div>
      )}

      {/* ==================================================
          DESKTOP FILTER HEADER
      ================================================== */}

      {!mobile && (
        <div className="mb-4 flex items-center justify-between">

          <div className="flex items-center gap-2">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E4EBD9] text-[#56663D]">
              <SlidersHorizontal size={19} />
            </div>

            <div>
              <h3 className="text-sm font-bold text-[#29321F]">
                Filters
              </h3>

              <p className="text-xs text-[#777568]">
                Refine your products
              </p>
            </div>

          </div>

          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={handleClear}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#A6533D] transition hover:text-[#8F4534]"
            >
              <RotateCcw size={14} />
              Clear All
            </button>
          )}

        </div>
      )}

      {/* ==================================================
          SEARCH
      ================================================== */}

      <div className="mb-4">

        <div className="relative">

          <Search
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#777568]"
          />

          <input
            type="text"
            value={currentFilters.search}
            onChange={(event) =>
              handleFilterChange("search", event.target.value)
            }
            placeholder="Search products..."
            className="w-full rounded-xl border border-[#E6E1D8] bg-[#F7F5EF] py-3 pl-10 pr-9 text-sm text-[#29321F] outline-none transition placeholder:text-[#99958A] focus:border-[#56663D] focus:bg-white focus:ring-2 focus:ring-[#E4EBD9]"
          />

          {currentFilters.search && (
            <button
              type="button"
              onClick={() =>
                handleFilterChange("search", "")
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#777568] hover:text-[#29321F]"
            >
              <X size={16} />
            </button>
          )}

        </div>

      </div>

      {/* ==================================================
          SORT
      ================================================== */}

      <div className="mb-5">

        <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#777568]">
          Sort By
        </label>

        <select
          value={sortBy}
          onChange={(event) =>
            onSortChange && onSortChange(event.target.value)
          }
          className="w-full appearance-none rounded-xl border border-[#E6E1D8] bg-[#F7F5EF] px-3 py-3 text-sm text-[#29321F] outline-none transition focus:border-[#56663D] focus:bg-white"
        >
          {sortOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>

      </div>

      {/* ==================================================
          CATEGORY
      ================================================== */}

      <FilterSection
        title="Category"
        icon={<Tag size={16} />}
        isOpen={openSections.category}
        onToggle={() => toggleSection("category")}
      >

        <div className="space-y-2">

          {/* ALL */}

          <FilterRadio
            label="All Products"
            value="all"
            checked={currentFilters.category === "all"}
            onChange={() =>
              handleFilterChange("category", "all")
            }
          />

          {/* CATEGORIES */}

          {categories.map((category) => {

            const categoryValue =
              typeof category === "string"
                ? category
                : category.slug || category.id;

            const categoryName =
              typeof category === "string"
                ? category
                : category.name;

            return (
              <FilterRadio
                key={categoryValue}
                label={categoryName}
                value={categoryValue}
                checked={
                  currentFilters.category === categoryValue
                }
                onChange={() =>
                  handleFilterChange(
                    "category",
                    categoryValue
                  )
                }
              />
            );
          })}

        </div>

      </FilterSection>

      {/* ==================================================
          PRICE
      ================================================== */}

      <FilterSection
        title="Price Range"
        icon={<Tag size={16} />}
        isOpen={openSections.price}
        onToggle={() => toggleSection("price")}
      >

        <div className="grid grid-cols-2 gap-3">

          <div>

            <label className="mb-1.5 block text-[11px] font-medium text-[#777568]">
              Minimum
            </label>

            <div className="relative">

              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#777568]">
                ₹
              </span>

              <input
                type="text"
                inputMode="numeric"
                value={currentFilters.minPrice}
                onChange={(event) =>
                  handlePriceChange(
                    "minPrice",
                    event.target.value
                  )
                }
                placeholder="0"
                className="w-full rounded-xl border border-[#E6E1D8] bg-[#F7F5EF] py-2.5 pl-7 pr-2 text-sm outline-none focus:border-[#56663D] focus:bg-white"
              />

            </div>

          </div>

          <div>

            <label className="mb-1.5 block text-[11px] font-medium text-[#777568]">
              Maximum
            </label>

            <div className="relative">

              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#777568]">
                ₹
              </span>

              <input
                type="text"
                inputMode="numeric"
                value={currentFilters.maxPrice}
                onChange={(event) =>
                  handlePriceChange(
                    "maxPrice",
                    event.target.value
                  )
                }
                placeholder="5000"
                className="w-full rounded-xl border border-[#E6E1D8] bg-[#F7F5EF] py-2.5 pl-7 pr-2 text-sm outline-none focus:border-[#56663D] focus:bg-white"
              />

            </div>

          </div>

        </div>

        {/* QUICK PRICE OPTIONS */}

        <div className="mt-4 flex flex-wrap gap-2">

          <QuickPrice
            label="Under ₹500"
            onClick={() => {
              handleFilterChange("minPrice", "");
              handleFilterChange("maxPrice", "500");
            }}
          />

          <QuickPrice
            label="₹500 - ₹1000"
            onClick={() => {
              handleFilterChange("minPrice", "500");
              handleFilterChange("maxPrice", "1000");
            }}
          />

          <QuickPrice
            label="₹1000+"
            onClick={() => {
              handleFilterChange("minPrice", "1000");
              handleFilterChange("maxPrice", "");
            }}
          />

        </div>

      </FilterSection>

      {/* ==================================================
          AVAILABILITY
      ================================================== */}

      <FilterSection
        title="Availability"
        icon={<PackageCheck size={16} />}
        isOpen={openSections.availability}
        onToggle={() =>
          toggleSection("availability")
        }
      >

        <div className="space-y-2">

          <FilterRadio
            label="All Products"
            value="all"
            checked={
              currentFilters.availability === "all"
            }
            onChange={() =>
              handleFilterChange(
                "availability",
                "all"
              )
            }
          />

          <FilterRadio
            label="In Stock"
            value="in-stock"
            checked={
              currentFilters.availability === "in-stock"
            }
            onChange={() =>
              handleFilterChange(
                "availability",
                "in-stock"
              )
            }
          />

          <FilterRadio
            label="Out of Stock"
            value="out-of-stock"
            checked={
              currentFilters.availability === "out-of-stock"
            }
            onChange={() =>
              handleFilterChange(
                "availability",
                "out-of-stock"
              )
            }
          />

        </div>

      </FilterSection>

      {/* ==================================================
          FEATURED
      ================================================== */}

      <FilterSection
        title="Special"
        icon={<Star size={16} />}
        isOpen={openSections.featured}
        onToggle={() => toggleSection("featured")}
      >

        <label className="flex cursor-pointer items-center justify-between rounded-xl border border-[#E6E1D8] bg-[#F7F5EF] p-3 transition hover:border-[#C8D8B8]">

          <div className="flex items-center gap-3">

            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F3E8C8] text-[#9A7B2F]">
              <Star size={15} />
            </div>

            <div>

              <p className="text-xs font-semibold text-[#29321F]">
                Featured Products
              </p>

              <p className="mt-0.5 text-[10px] text-[#777568]">
                Show only featured items
              </p>

            </div>

          </div>

          <input
            type="checkbox"
            checked={currentFilters.featured}
            onChange={(event) =>
              handleFilterChange(
                "featured",
                event.target.checked
              )
            }
            className="h-4 w-4 cursor-pointer accent-[#56663D]"
          />

        </label>

      </FilterSection>

      {/* ==================================================
          ACTIVE FILTERS
      ================================================== */}

      {activeFilterCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 border-t border-[#E6E1D8] pt-5"
        >

          <div className="mb-2 flex items-center justify-between">

            <p className="text-xs font-bold text-[#29321F]">
              Active Filters
            </p>

            <span className="rounded-full bg-[#E4EBD9] px-2 py-0.5 text-[10px] font-bold text-[#56663D]">
              {activeFilterCount}
            </span>

          </div>

          <div className="flex flex-wrap gap-2">

            {currentFilters.category !== "all" && (
              <FilterTag
                label={getCategoryName(
                  categories,
                  currentFilters.category
                )}
                onRemove={() =>
                  handleFilterChange(
                    "category",
                    "all"
                  )
                }
              />
            )}

            {(currentFilters.minPrice !== "" ||
              currentFilters.maxPrice !== "") && (
              <FilterTag
                label={getPriceLabel(currentFilters)}
                onRemove={() => {
                  handleFilterChange(
                    "minPrice",
                    ""
                  );
                  handleFilterChange(
                    "maxPrice",
                    ""
                  );
                }}
              />
            )}

            {currentFilters.availability !== "all" && (
              <FilterTag
                label={
                  currentFilters.availability ===
                  "in-stock"
                    ? "In Stock"
                    : "Out of Stock"
                }
                onRemove={() =>
                  handleFilterChange(
                    "availability",
                    "all"
                  )
                }
              />
            )}

            {currentFilters.featured && (
              <FilterTag
                label="Featured"
                onRemove={() =>
                  handleFilterChange(
                    "featured",
                    false
                  )
                }
              />
            )}

            {currentFilters.search && (
              <FilterTag
                label={`Search: ${currentFilters.search}`}
                onRemove={() =>
                  handleFilterChange(
                    "search",
                    ""
                  )
                }
              />
            )}

          </div>

        </motion.div>
      )}

    </div>
  );
};

/* ======================================================
   FILTER SECTION
====================================================== */

const FilterSection = ({
  title,
  icon,
  isOpen,
  onToggle,
  children,
}) => {
  return (
    <div className="border-t border-[#E6E1D8] py-4">

      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between"
      >

        <div className="flex items-center gap-2">

          <span className="text-[#9A7B2F]">
            {icon}
          </span>

          <span className="text-sm font-bold text-[#29321F]">
            {title}
          </span>

        </div>

        <span className="text-[#777568]">
          {isOpen ? (
            <ChevronUp size={17} />
          ) : (
            <ChevronDown size={17} />
          )}
        </span>

      </button>

      <AnimatePresence initial={false}>

        {isOpen && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
            }}
            className="overflow-hidden"
          >
            <div className="pt-4">
              {children}
            </div>
          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
};

/* ======================================================
   RADIO FILTER
====================================================== */

const FilterRadio = ({
  label,
  value,
  checked,
  onChange,
}) => {
  return (
    <label className="group flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 transition hover:bg-[#F7F5EF]">

      <span
        className={`flex h-4 w-4 items-center justify-center rounded-full border ${
          checked
            ? "border-[#56663D]"
            : "border-[#C8C4BA]"
        }`}
      >

        {checked && (
          <span className="h-2 w-2 rounded-full bg-[#56663D]" />
        )}

      </span>

      <input
        type="radio"
        name="product-filter"
        value={value}
        checked={checked}
        onChange={onChange}
        className="hidden"
      />

      <span
        className={`text-xs transition ${
          checked
            ? "font-semibold text-[#56663D]"
            : "text-[#777568] group-hover:text-[#29321F]"
        }`}
      >
        {label}
      </span>

    </label>
  );
};

/* ======================================================
   QUICK PRICE
====================================================== */

const QuickPrice = ({
  label,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-lg border border-[#E6E1D8] bg-white px-2.5 py-1.5 text-[10px] font-medium text-[#777568] transition hover:border-[#56663D] hover:bg-[#E4EBD9] hover:text-[#56663D]"
    >
      {label}
    </button>
  );
};

/* ======================================================
   FILTER TAG
====================================================== */

const FilterTag = ({
  label,
  onRemove,
}) => {
  return (
    <span className="inline-flex max-w-full items-center gap-1 rounded-full bg-[#E4EBD9] px-2.5 py-1.5 text-[10px] font-semibold text-[#56663D]">

      <span className="max-w-[150px] truncate">
        {label}
      </span>

      <button
        type="button"
        onClick={onRemove}
        className="shrink-0 rounded-full hover:bg-[#DDE8D2]"
        aria-label={`Remove ${label}`}
      >
        <X size={12} />
      </button>

    </span>
  );
};

/* ======================================================
   CATEGORY NAME
====================================================== */

const getCategoryName = (
  categories,
  categoryValue
) => {
  const category = categories.find((item) => {

    if (typeof item === "string") {
      return item === categoryValue;
    }

    return (
      item.slug === categoryValue ||
      item.id === categoryValue
    );
  });

  if (!category) {
    return categoryValue;
  }

  return typeof category === "string"
    ? category
    : category.name;
};

/* ======================================================
   PRICE LABEL
====================================================== */

const getPriceLabel = (filters) => {
  const min = filters.minPrice;
  const max = filters.maxPrice;

  if (min && max) {
    return `₹${Number(min).toLocaleString(
      "en-IN"
    )} - ₹${Number(max).toLocaleString(
      "en-IN"
    )}`;
  }

  if (min) {
    return `₹${Number(min).toLocaleString(
      "en-IN"
    )}+`;
  }

  if (max) {
    return `Under ₹${Number(max).toLocaleString(
      "en-IN"
    )}`;
  }

  return "Price";
};

export default ProductFilter;







