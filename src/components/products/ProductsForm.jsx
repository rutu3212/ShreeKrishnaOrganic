import React, { useEffect, useState } from "react";
import {
  Package,
  Save,
  X,
  Image as ImageIcon,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const ProductForm = ({
  initialData = null,
  categories = [],
  onSubmit,
  onCancel,
  buttonText = "Save Product",
}) => {
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    category: "",
    regularPrice: "",
    sellingPrice: "",
    discount: 0,
    stock: "",
    description: "",
    shortDescription: "",
    image: "",
    weight: "",
    status: "Active",
    featured: false,
  });

  const [imagePreview, setImagePreview] = useState("");
  const [imageError, setImageError] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Load existing product when editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        sku: initialData.sku || "",
        category: initialData.category || "",
        regularPrice: initialData.regularPrice ?? "",
        sellingPrice: initialData.sellingPrice ?? "",
        discount: initialData.discount ?? 0,
        stock: initialData.stock ?? "",
        description: initialData.description || "",
        shortDescription: initialData.shortDescription || "",
        image: initialData.image || "",
        weight: initialData.weight || "",
        status: initialData.status || "Active",
        featured: Boolean(initialData.featured),
      });

      setImagePreview(initialData.image || "");
    }
  }, [initialData]);

  // Automatically calculate discount
  useEffect(() => {
    const regular = Number(formData.regularPrice);
    const selling = Number(formData.sellingPrice);

    if (regular > 0 && selling > 0 && selling < regular) {
      const calculatedDiscount = Math.round(
        ((regular - selling) / regular) * 100
      );

      setFormData((prev) => ({
        ...prev,
        discount: calculatedDiscount,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        discount: 0,
      }));
    }
  }, [formData.regularPrice, formData.sellingPrice]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImageError("");

    if (!file.type.startsWith("image/")) {
      setImageError("Please select a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setImageError("Image size must be less than 5MB.");
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    setImagePreview(previewUrl);

    setFormData((prev) => ({
      ...prev,
      image: previewUrl,
    }));
  };

  const removeImage = () => {
    setImagePreview("");

    setFormData((prev) => ({
      ...prev,
      image: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required.";
    }

    if (!formData.sku.trim()) {
      newErrors.sku = "SKU is required.";
    }

    if (!formData.category) {
      newErrors.category = "Please select a category.";
    }

    if (
      formData.regularPrice === "" ||
      Number(formData.regularPrice) <= 0
    ) {
      newErrors.regularPrice = "Enter a valid regular price.";
    }

    if (
      formData.sellingPrice === "" ||
      Number(formData.sellingPrice) <= 0
    ) {
      newErrors.sellingPrice = "Enter a valid selling price.";
    }

    if (
      Number(formData.sellingPrice) >
      Number(formData.regularPrice)
    ) {
      newErrors.sellingPrice =
        "Selling price cannot be greater than regular price.";
    }

    if (formData.stock === "" || Number(formData.stock) < 0) {
      newErrors.stock = "Enter a valid stock quantity.";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Product description is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    try {
      const productData = {
        ...formData,
        regularPrice: Number(formData.regularPrice),
        sellingPrice: Number(formData.sellingPrice),
        discount: Number(formData.discount),
        stock: Number(formData.stock),
      };

      if (onSubmit) {
        await onSubmit(productData);
      }
    } catch (error) {
      console.error("Error saving product:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (field) =>
    `w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#29321F] outline-none transition
    placeholder:text-[#aaa89e]
    focus:border-[#56663D] focus:ring-2 focus:ring-[#56663D]/10
    ${
      errors[field]
        ? "border-[#A6533D]"
        : "border-[#E6E1D8]"
    }`;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Basic Information */}
      <section className="rounded-2xl border border-[#E6E1D8] bg-white p-5 shadow-sm sm:p-7">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E4EBD9] text-[#56663D]">
            <Package size={22} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#29321F]">
              Basic Information
            </h2>

            <p className="text-sm text-[#777568]">
              Enter the main product details.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {/* Product Name */}
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-[#29321F]">
              Product Name *
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Example: Cold Pressed Groundnut Oil"
              className={inputClass("name")}
            />

            {errors.name && (
              <p className="mt-1 text-xs text-[#A6533D]">
                {errors.name}
              </p>
            )}
          </div>

          {/* SKU */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#29321F]">
              SKU *
            </label>

            <input
              type="text"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              placeholder="Example: SKO-GNO-1L"
              className={inputClass("sku")}
            />

            {errors.sku && (
              <p className="mt-1 text-xs text-[#A6533D]">
                {errors.sku}
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#29321F]">
              Category *
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={inputClass("category")}
            >
              <option value="">Select category</option>

              {categories.map((category) => (
                <option
                  key={category.id || category._id}
                  value={category.name || category.id}
                >
                  {category.name}
                </option>
              ))}
            </select>

            {errors.category && (
              <p className="mt-1 text-xs text-[#A6533D]">
                {errors.category}
              </p>
            )}
          </div>

          {/* Short Description */}
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-[#29321F]">
              Short Description
            </label>

            <input
              type="text"
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              placeholder="Short product description"
              className={inputClass("shortDescription")}
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-[#29321F]">
              Description *
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              placeholder="Describe the product, ingredients, benefits and usage..."
              className={`${inputClass(
                "description"
              )} resize-none`}
            />

            {errors.description && (
              <p className="mt-1 text-xs text-[#A6533D]">
                {errors.description}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="rounded-2xl border border-[#E6E1D8] bg-white p-5 shadow-sm sm:p-7">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-[#29321F]">
            Pricing
          </h2>

          <p className="mt-1 text-sm text-[#777568]">
            Set regular and selling prices. Discount is calculated automatically.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          {/* Regular Price */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#29321F]">
              Regular Price *
            </label>

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#777568]">
                ₹
              </span>

              <input
                type="number"
                name="regularPrice"
                value={formData.regularPrice}
                onChange={handleChange}
                min="0"
                placeholder="0"
                className={`${inputClass(
                  "regularPrice"
                )} pl-9`}
              />
            </div>

            {errors.regularPrice && (
              <p className="mt-1 text-xs text-[#A6533D]">
                {errors.regularPrice}
              </p>
            )}
          </div>

          {/* Selling Price */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#29321F]">
              Selling Price *
            </label>

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#777568]">
                ₹
              </span>

              <input
                type="number"
                name="sellingPrice"
                value={formData.sellingPrice}
                onChange={handleChange}
                min="0"
                placeholder="0"
                className={`${inputClass(
                  "sellingPrice"
                )} pl-9`}
              />
            </div>

            {errors.sellingPrice && (
              <p className="mt-1 text-xs text-[#A6533D]">
                {errors.sellingPrice}
              </p>
            )}
          </div>

          {/* Discount */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#29321F]">
              Discount
            </label>

            <div className="relative">
              <input
                type="number"
                value={formData.discount}
                readOnly
                className={`${inputClass(
                  "discount"
                )} bg-[#F7F5EF] pr-10`}
              />

              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#56663D]">
                %
              </span>
            </div>

            <p className="mt-1 text-xs text-[#777568]">
              Automatically calculated
            </p>
          </div>
        </div>

        {/* Price Preview */}
        {Number(formData.regularPrice) > 0 &&
          Number(formData.sellingPrice) > 0 && (
            <div className="mt-6 rounded-xl bg-[#F7F5EF] p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-[#777568]">
                Price Preview
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-3">
                <span className="text-2xl font-bold text-[#56663D]">
                  ₹{Number(formData.sellingPrice).toLocaleString("en-IN")}
                </span>

                {Number(formData.regularPrice) >
                  Number(formData.sellingPrice) && (
                  <>
                    <span className="text-sm text-[#99958a] line-through">
                      ₹
                      {Number(
                        formData.regularPrice
                      ).toLocaleString("en-IN")}
                    </span>

                    <span className="rounded-full bg-[#E4EBD9] px-3 py-1 text-xs font-semibold text-[#56663D]">
                      {formData.discount}% OFF
                    </span>
                  </>
                )}
              </div>
            </div>
          )}
      </section>

      {/* Inventory */}
      <section className="rounded-2xl border border-[#E6E1D8] bg-white p-5 shadow-sm sm:p-7">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-[#29321F]">
            Inventory & Status
          </h2>

          <p className="mt-1 text-sm text-[#777568]">
            Manage stock availability and product visibility.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {/* Stock */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#29321F]">
              Stock Quantity *
            </label>

            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              min="0"
              placeholder="Example: 100"
              className={inputClass("stock")}
            />

            {errors.stock && (
              <p className="mt-1 text-xs text-[#A6533D]">
                {errors.stock}
              </p>
            )}
          </div>

          {/* Weight */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#29321F]">
              Weight / Size
            </label>

            <input
              type="text"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="Example: 1 L / 500 g"
              className={inputClass("weight")}
            />
          </div>

          {/* Status */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#29321F]">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={inputClass("status")}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Out of Stock">
                Out of Stock
              </option>
            </select>
          </div>

          {/* Featured */}
          <div className="flex items-center rounded-xl border border-[#E6E1D8] bg-[#F7F5EF] px-4">
            <label className="flex cursor-pointer items-center gap-3 py-4">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="h-5 w-5 accent-[#56663D]"
              />

              <div>
                <p className="text-sm font-semibold text-[#29321F]">
                  Featured Product
                </p>

                <p className="text-xs text-[#777568]">
                  Show this product in featured sections.
                </p>
              </div>
            </label>
          </div>
        </div>
      </section>

      {/* Product Image */}
      <section className="rounded-2xl border border-[#E6E1D8] bg-white p-5 shadow-sm sm:p-7">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-[#29321F]">
            Product Image
          </h2>

          <p className="mt-1 text-sm text-[#777568]">
            Upload a product image. Maximum size: 5MB.
          </p>
        </div>

        {!imagePreview ? (
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#D8D4CA] bg-[#F7F5EF] px-6 py-12 text-center transition hover:border-[#56663D] hover:bg-[#F1F3EB]">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#E4EBD9] text-[#56663D]">
              <ImageIcon size={26} />
            </div>

            <p className="font-semibold text-[#29321F]">
              Upload Product Image
            </p>

            <p className="mt-1 text-sm text-[#777568]">
              PNG, JPG, JPEG or WEBP
            </p>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        ) : (
          <div className="relative max-w-md overflow-hidden rounded-2xl border border-[#E6E1D8] bg-[#F7F5EF]">
            <img
              src={imagePreview}
              alt="Product preview"
              className="h-72 w-full object-cover"
            />

            <button
              type="button"
              onClick={removeImage}
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#A6533D] shadow-md transition hover:bg-[#A6533D] hover:text-white"
              aria-label="Remove image"
            >
              <X size={18} />
            </button>
          </div>
        )}

        {imageError && (
          <div className="mt-3 flex items-center gap-2 text-sm text-[#A6533D]">
            <AlertCircle size={16} />
            {imageError}
          </div>
        )}
      </section>

      {/* Actions */}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={submitting}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#D8D4CA] bg-white px-6 py-3 text-sm font-semibold text-[#56663D] transition hover:bg-[#F7F5EF] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={18} />
            Cancel
          </button>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#56663D] px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#465532] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Saving...
            </>
          ) : (
            <>
              <Save size={18} />
              {buttonText}
            </>
          )}
        </button>
      </div>

      {/* Success-style information */}
      <div className="flex items-start gap-3 rounded-xl border border-[#DDE8D2] bg-[#F1F5EC] p-4">
        <CheckCircle
          size={20}
          className="mt-0.5 shrink-0 text-[#56663D]"
        />

        <div>
          <p className="text-sm font-semibold text-[#29321F]">
            Admin Product Management
          </p>

          <p className="mt-1 text-xs leading-5 text-[#777568]">
            Product information is currently stored through your
            frontend product context. When your backend is connected,
            the same form can send this data to your API/database.
          </p>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;

