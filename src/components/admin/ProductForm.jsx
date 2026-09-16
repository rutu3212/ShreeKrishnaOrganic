import React, { useEffect, useState } from "react";
import {
  Save,
  X,
  Package,
  IndianRupee,
  Percent,
  Upload,
  Image as ImageIcon,
  Star,
} from "lucide-react";

const ProductForm = ({
  initialData = null,
  categories = [],
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    sku: initialData?.sku || "",
    category: initialData?.category || "",
    regularPrice: initialData?.regularPrice || "",
    sellingPrice: initialData?.sellingPrice || "",
    discount: initialData?.discount || 0,
    stock: initialData?.stock || "",
    description: initialData?.description || "",
    image: initialData?.image || "",
    status: initialData?.status || "Active",
    featured: initialData?.featured || false,
  });

  const [preview, setPreview] = useState(initialData?.image || "");
  const [error, setError] = useState("");

  /* --------------------------------
     Calculate Discount Automatically
  -------------------------------- */
  useEffect(() => {
    const regular = Number(formData.regularPrice);
    const selling = Number(formData.sellingPrice);

    if (
      regular > 0 &&
      selling > 0 &&
      selling < regular
    ) {
      const calculatedDiscount = Math.round(
        ((regular - selling) / regular) * 100
      );

      setFormData((prev) => ({
        ...prev,
        discount: calculatedDiscount,
      }));
    } else if (selling >= regular && regular > 0) {
      setFormData((prev) => ({
        ...prev,
        discount: 0,
      }));
    }
  }, [formData.regularPrice, formData.sellingPrice]);

  /* --------------------------------
     Handle Input Changes
  -------------------------------- */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setError("");
  };

  /* --------------------------------
     Handle Image
  -------------------------------- */
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Product image should be less than 5MB.");
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    setPreview(imageUrl);

    setFormData((prev) => ({
      ...prev,
      image: file,
    }));

    setError("");
  };

  /* --------------------------------
     Remove Image
  -------------------------------- */
  const removeImage = () => {
    setPreview("");

    setFormData((prev) => ({
      ...prev,
      image: "",
    }));
  };

  /* --------------------------------
     Validation
  -------------------------------- */
  const validateForm = () => {
    if (!formData.name.trim()) {
      return "Product name is required.";
    }

    if (!formData.category) {
      return "Please select a category.";
    }

    if (!formData.regularPrice) {
      return "Regular price is required.";
    }

    if (Number(formData.regularPrice) <= 0) {
      return "Regular price must be greater than 0.";
    }

    if (!formData.sellingPrice) {
      return "Selling price is required.";
    }

    if (Number(formData.sellingPrice) <= 0) {
      return "Selling price must be greater than 0.";
    }

    if (
      Number(formData.sellingPrice) >
      Number(formData.regularPrice)
    ) {
      return "Selling price cannot be greater than regular price.";
    }

    if (formData.stock === "") {
      return "Stock quantity is required.";
    }

    if (Number(formData.stock) < 0) {
      return "Stock quantity cannot be negative.";
    }

    if (!formData.description.trim()) {
      return "Product description is required.";
    }

    return "";
  };

  /* --------------------------------
     Submit
  -------------------------------- */
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    const productData = {
      ...formData,
      name: formData.name.trim(),
      sku: formData.sku.trim().toUpperCase(),
      regularPrice: Number(formData.regularPrice),
      sellingPrice: Number(formData.sellingPrice),
      discount: Number(formData.discount),
      stock: Number(formData.stock),
      description: formData.description.trim(),
    };

    if (onSubmit) {
      onSubmit(productData);
    } else {
      console.log("Product Data:", productData);
      alert("Product saved successfully!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-white border border-[#E6E1D8] rounded-2xl overflow-hidden"
    >
      {/* ==================================
          Header
      ================================== */}
      <div className="px-5 sm:px-7 py-5 border-b border-[#E6E1D8] bg-[#FBFAF6]">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#E4EBD9] flex items-center justify-center">
              <Package
                size={21}
                className="text-[#56663D]"
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[#29321F]">
                {initialData
                  ? "Edit Product"
                  : "Add New Product"}
              </h2>

              <p className="text-xs text-[#8B8A7D] mt-1">
                {initialData
                  ? "Update product information."
                  : "Add a new product to your store."}
              </p>
            </div>
          </div>

          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-[#777568] hover:bg-[#EEECE4] transition"
              aria-label="Close"
            >
              <X size={19} />
            </button>
          )}
        </div>
      </div>

      {/* ==================================
          Form Body
      ================================== */}
      <div className="p-5 sm:p-7 space-y-7">
        {/* Error */}
        {error && (
          <div className="p-4 rounded-xl bg-[#FAF0EC] border border-[#F0D7CE]">
            <p className="text-sm text-[#8A4B3A]">
              {error}
            </p>
          </div>
        )}

        {/* ==================================
            Basic Information
        ================================== */}
        <div>
          <h3 className="text-sm font-semibold text-[#29321F] mb-4">
            Basic Information
          </h3>

          <div className="space-y-5">
            {/* Product Name */}
            <div>
              <label
                htmlFor="product-name"
                className="block text-sm font-medium text-[#55574D] mb-2"
              >
                Product Name
                <span className="text-[#A6533D] ml-1">
                  *
                </span>
              </label>

              <input
                id="product-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Organic Cold Pressed Groundnut Oil"
                className="w-full px-4 py-3 rounded-xl border border-[#DDD9CF] bg-[#FBFAF6] text-[#29321F] placeholder:text-[#AAA79B] outline-none focus:border-[#56663D] focus:ring-2 focus:ring-[#56663D]/10 transition"
              />
            </div>

            {/* SKU + Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* SKU */}
              <div>
                <label
                  htmlFor="product-sku"
                  className="block text-sm font-medium text-[#55574D] mb-2"
                >
                  SKU
                </label>

                <input
                  id="product-sku"
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                  placeholder="e.g. SK-GNO-001"
                  className="w-full px-4 py-3 rounded-xl border border-[#DDD9CF] bg-[#FBFAF6] text-[#29321F] placeholder:text-[#AAA79B] uppercase outline-none focus:border-[#56663D] focus:ring-2 focus:ring-[#56663D]/10 transition"
                />

                <p className="mt-2 text-xs text-[#99978C]">
                  Unique product code.
                </p>
              </div>

              {/* Category */}
              <div>
                <label
                  htmlFor="product-category"
                  className="block text-sm font-medium text-[#55574D] mb-2"
                >
                  Category
                  <span className="text-[#A6533D] ml-1">
                    *
                  </span>
                </label>

                <select
                  id="product-category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-[#DDD9CF] bg-[#FBFAF6] text-[#29321F] text-sm outline-none focus:border-[#56663D] focus:ring-2 focus:ring-[#56663D]/10 transition"
                >
                  <option value="">
                    Select Category
                  </option>

                  {categories.map((category) => (
                    <option
                      key={category.id || category._id || category.name}
                      value={category.id || category._id || category.name}
                    >
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* ==================================
            Pricing
        ================================== */}
        <div>
          <h3 className="text-sm font-semibold text-[#29321F] mb-4">
            Pricing
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Regular Price */}
            <div>
              <label
                htmlFor="regular-price"
                className="block text-xs font-medium text-[#777568] mb-2"
              >
                Regular Price
                <span className="text-[#A6533D] ml-1">
                  *
                </span>
              </label>

              <div className="relative">
                <IndianRupee
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#777568]"
                />

                <input
                  id="regular-price"
                  type="number"
                  name="regularPrice"
                  value={formData.regularPrice}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  placeholder="999"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#DDD9CF] bg-[#FBFAF6] text-[#29321F] placeholder:text-[#AAA79B] outline-none focus:border-[#56663D] focus:ring-2 focus:ring-[#56663D]/10 transition"
                />
              </div>
            </div>

            {/* Selling Price */}
            <div>
              <label
                htmlFor="selling-price"
                className="block text-xs font-medium text-[#777568] mb-2"
              >
                Selling Price
                <span className="text-[#A6533D] ml-1">
                  *
                </span>
              </label>

              <div className="relative">
                <IndianRupee
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#777568]"
                />

                <input
                  id="selling-price"
                  type="number"
                  name="sellingPrice"
                  value={formData.sellingPrice}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  placeholder="799"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#DDD9CF] bg-[#FBFAF6] text-[#29321F] placeholder:text-[#AAA79B] outline-none focus:border-[#56663D] focus:ring-2 focus:ring-[#56663D]/10 transition"
                />
              </div>
            </div>

            {/* Discount */}
            <div>
              <label
                htmlFor="product-discount"
                className="block text-xs font-medium text-[#777568] mb-2"
              >
                Discount
              </label>

              <div className="relative">
                <Percent
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#777568]"
                />

                <input
                  id="product-discount"
                  type="number"
                  name="discount"
                  value={formData.discount}
                  readOnly
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#DDD9CF] bg-[#F1EFE5] text-[#56663D] font-semibold outline-none"
                />
              </div>

              <p className="mt-2 text-xs text-[#99978C]">
                Automatically calculated.
              </p>
            </div>
          </div>

          {/* Price Preview */}
          {formData.regularPrice &&
            formData.sellingPrice &&
            Number(formData.sellingPrice) <
              Number(formData.regularPrice) && (
              <div className="mt-4 p-4 rounded-xl bg-[#E4EBD9] border border-[#D5DEC9]">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm text-[#777568]">
                    Customer sees:
                  </span>

                  <span className="text-lg font-semibold text-[#29321F]">
                    ₹
                    {Number(
                      formData.sellingPrice
                    ).toLocaleString("en-IN")}
                  </span>

                  <span className="text-sm text-[#99978C] line-through">
                    ₹
                    {Number(
                      formData.regularPrice
                    ).toLocaleString("en-IN")}
                  </span>

                  <span className="px-2.5 py-1 rounded-full bg-[#56663D] text-white text-xs font-medium">
                    {formData.discount}% OFF
                  </span>
                </div>
              </div>
            )}
        </div>

        {/* ==================================
            Stock
        ================================== */}
        <div>
          <h3 className="text-sm font-semibold text-[#29321F] mb-4">
            Inventory
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Stock */}
            <div>
              <label
                htmlFor="product-stock"
                className="block text-sm font-medium text-[#55574D] mb-2"
              >
                Stock Quantity
                <span className="text-[#A6533D] ml-1">
                  *
                </span>
              </label>

              <input
                id="product-stock"
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                min="0"
                placeholder="100"
                className="w-full px-4 py-3 rounded-xl border border-[#DDD9CF] bg-[#FBFAF6] text-[#29321F] placeholder:text-[#AAA79B] outline-none focus:border-[#56663D] focus:ring-2 focus:ring-[#56663D]/10 transition"
              />

              <p className="mt-2 text-xs text-[#99978C]">
                Number of units currently available.
              </p>
            </div>

            {/* Status */}
            <div>
              <label
                htmlFor="product-status"
                className="block text-sm font-medium text-[#55574D] mb-2"
              >
                Status
              </label>

              <select
                id="product-status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-[#DDD9CF] bg-[#FBFAF6] text-[#29321F] outline-none focus:border-[#56663D] focus:ring-2 focus:ring-[#56663D]/10 transition"
              >
                <option value="Active">
                  Active
                </option>

                <option value="Inactive">
                  Inactive
                </option>

                <option value="Out of Stock">
                  Out of Stock
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* ==================================
            Description
        ================================== */}
        <div>
          <label
            htmlFor="product-description"
            className="block text-sm font-medium text-[#55574D] mb-2"
          >
            Product Description
            <span className="text-[#A6533D] ml-1">
              *
            </span>
          </label>

          <textarea
            id="product-description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="5"
            placeholder="Write a clear description of your product..."
            className="w-full px-4 py-3 rounded-xl border border-[#DDD9CF] bg-[#FBFAF6] text-[#29321F] placeholder:text-[#AAA79B] outline-none focus:border-[#56663D] focus:ring-2 focus:ring-[#56663D]/10 transition resize-none"
          />

          <p className="mt-2 text-xs text-[#99978C]">
            Mention ingredients, benefits, processing method,
            quantity and other important information.
          </p>
        </div>

        {/* ==================================
            Product Image
        ================================== */}
        <div>
          <label className="block text-sm font-medium text-[#55574D] mb-2">
            Product Image
          </label>

          {!preview ? (
            <label className="block cursor-pointer">
              <div className="border-2 border-dashed border-[#DCD8CE] rounded-2xl p-8 sm:p-10 text-center bg-[#FBFAF6] hover:border-[#56663D] hover:bg-[#F7F8F2] transition">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-[#E4EBD9] flex items-center justify-center">
                  <Upload
                    size={24}
                    className="text-[#56663D]"
                  />
                </div>

                <p className="mt-4 text-sm font-medium text-[#55574D]">
                  Upload product image
                </p>

                <p className="mt-1 text-xs text-[#99978C]">
                  PNG, JPG or WEBP • Maximum 5MB
                </p>

                <span className="inline-flex items-center gap-2 mt-4 px-4 py-2.5 rounded-xl bg-[#56663D] text-white text-xs sm:text-sm font-medium">
                  <Upload size={16} />
                  Choose Image
                </span>
              </div>

              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          ) : (
            <div className="relative">
              <div className="aspect-[4/3] sm:aspect-[16/7] rounded-2xl overflow-hidden bg-[#F1EFE5] border border-[#E6E1D8]">
                <img
                  src={preview}
                  alt="Product preview"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Remove */}
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-3 right-3 w-9 h-9 rounded-lg bg-white/95 text-[#A6533D] flex items-center justify-center shadow-md hover:bg-white transition"
                aria-label="Remove image"
              >
                <X size={17} />
              </button>

              {/* Change */}
              <label className="absolute bottom-3 left-3 inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/95 text-[#56663D] text-xs font-medium shadow-md cursor-pointer hover:bg-white transition">
                <Upload size={15} />
                Change Image

                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          )}

          <div className="mt-3 flex items-start gap-2 p-3 rounded-xl bg-[#F3E8C8]">
            <ImageIcon
              size={17}
              className="text-[#9A7B2F] shrink-0 mt-0.5"
            />

            <p className="text-xs leading-5 text-[#806B38]">
              Later, this image can be uploaded to Cloudinary.
              The Cloudinary URL can then be stored in your
              database.
            </p>
          </div>
        </div>

        {/* ==================================
            Featured Product
        ================================== */}
        <div className="p-4 rounded-xl border border-[#E6E1D8] bg-[#FBFAF6]">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="mt-1 w-4 h-4 accent-[#56663D]"
            />

            <div>
              <div className="flex items-center gap-2">
                <Star
                  size={17}
                  className="text-[#9A7B2F]"
                />

                <span className="text-sm font-medium text-[#55574D]">
                  Featured Product
                </span>
              </div>

              <p className="mt-1 text-xs text-[#99978C]">
                Show this product in the featured products
                section on the homepage.
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* ==================================
          Footer
      ================================== */}
      <div className="px-5 sm:px-7 py-4 border-t border-[#E6E1D8] bg-[#FBFAF6] flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-3 rounded-xl border border-[#DCD8CE] bg-white text-[#55574D] text-sm font-medium hover:bg-[#F1EFE5] transition"
          >
            Cancel
          </button>
        )}

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#56663D] text-white text-sm font-medium hover:bg-[#465532] transition shadow-sm"
        >
          <Save size={18} />

          {initialData
            ? "Update Product"
            : "Save Product"}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
