import React, { useState } from "react";
import {
  Save,
  X,
  Tags,
  Image as ImageIcon,
  Upload,
} from "lucide-react";

const CategoryForm = ({
  initialData = null,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    image: initialData?.image || "",
    status: initialData?.status || "Active",
  });

  const [preview, setPreview] = useState(
    initialData?.image || ""
  );

  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Check file type
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    // Check file size - 5MB
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB.");
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

  // Remove selected image
  const removeImage = () => {
    setPreview("");

    setFormData((prev) => ({
      ...prev,
      image: "",
    }));
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setError("Category name is required.");
      return;
    }

    if (!formData.description.trim()) {
      setError("Category description is required.");
      return;
    }

    const categoryData = {
      ...formData,
      name: formData.name.trim(),
      description: formData.description.trim(),
    };

    if (onSubmit) {
      onSubmit(categoryData);
    } else {
      console.log("Category Data:", categoryData);
      alert("Category saved successfully!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-[#E6E1D8] rounded-2xl overflow-hidden"
    >
      {/* ============================== */}
      {/* FORM HEADER */}
      {/* ============================== */}

      <div className="px-5 sm:px-7 py-5 border-b border-[#E6E1D8] bg-[#FBFAF6]">
        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-xl bg-[#E4EBD9] flex items-center justify-center">
              <Tags
                size={21}
                className="text-[#56663D]"
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[#29321F]">
                {initialData
                  ? "Edit Category"
                  : "Add Category"}
              </h2>

              <p className="text-xs text-[#8B8A7D] mt-1">
                {initialData
                  ? "Update category information."
                  : "Create a new product category."}
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

      {/* ============================== */}
      {/* FORM BODY */}
      {/* ============================== */}

      <div className="p-5 sm:p-7 space-y-6">

        {/* Error */}
        {error && (
          <div className="p-4 rounded-xl bg-[#FAF0EC] border border-[#F0D7CE] text-sm text-[#8A4B3A]">
            {error}
          </div>
        )}

        {/* Category Name */}
        <div>

          <label
            htmlFor="category-name"
            className="block text-sm font-medium text-[#55574D] mb-2"
          >
            Category Name
            <span className="text-[#A6533D] ml-1">
              *
            </span>
          </label>

          <input
            id="category-name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Organic Oils"
            className="w-full px-4 py-3 rounded-xl border border-[#DDD9CF] bg-[#FBFAF6] text-[#29321F] placeholder:text-[#AAA79B] outline-none focus:border-[#56663D] focus:ring-2 focus:ring-[#56663D]/10 transition"
          />

        </div>

        {/* Description */}
        <div>

          <label
            htmlFor="category-description"
            className="block text-sm font-medium text-[#55574D] mb-2"
          >
            Description
            <span className="text-[#A6533D] ml-1">
              *
            </span>
          </label>

          <textarea
            id="category-description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            placeholder="Write a short description for this category..."
            className="w-full px-4 py-3 rounded-xl border border-[#DDD9CF] bg-[#FBFAF6] text-[#29321F] placeholder:text-[#AAA79B] outline-none focus:border-[#56663D] focus:ring-2 focus:ring-[#56663D]/10 transition resize-none"
          />

          <p className="mt-2 text-xs text-[#99978C]">
            Keep the description short and clear.
          </p>

        </div>

        {/* Status */}
        <div>

          <label
            htmlFor="category-status"
            className="block text-sm font-medium text-[#55574D] mb-2"
          >
            Status
          </label>

          <select
            id="category-status"
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
          </select>

        </div>

        {/* ============================== */}
        {/* IMAGE */}
        {/* ============================== */}

        <div>

          <label className="block text-sm font-medium text-[#55574D] mb-2">
            Category Image
          </label>

          {!preview ? (
            <label className="block cursor-pointer">

              <div className="border-2 border-dashed border-[#DCD8CE] rounded-2xl p-8 text-center hover:border-[#56663D] hover:bg-[#FBFAF6] transition">

                <div className="w-12 h-12 mx-auto rounded-xl bg-[#E4EBD9] flex items-center justify-center">
                  <Upload
                    size={22}
                    className="text-[#56663D]"
                  />
                </div>

                <p className="mt-4 text-sm font-medium text-[#55574D]">
                  Upload category image
                </p>

                <p className="mt-1 text-xs text-[#99978C]">
                  PNG, JPG or WEBP • Maximum 5MB
                </p>

                <span className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-lg bg-[#F1EFE5] text-[#56663D] text-xs font-medium">
                  <Upload size={15} />
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

              <div className="aspect-[16/7] rounded-2xl overflow-hidden bg-[#F1EFE5] border border-[#E6E1D8]">

                <img
                  src={preview}
                  alt="Category preview"
                  className="w-full h-full object-cover"
                />

              </div>

              <button
                type="button"
                onClick={removeImage}
                className="absolute top-3 right-3 w-9 h-9 rounded-lg bg-white/95 text-[#8A4B3A] flex items-center justify-center shadow-md hover:bg-white transition"
                aria-label="Remove image"
              >
                <X size={17} />
              </button>

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

            <p className="text-xs text-[#806B38]">
              Later, this image can be uploaded to Cloudinary and
              the returned URL can be stored in your database.
            </p>

          </div>

        </div>

      </div>

      {/* ============================== */}
      {/* FOOTER */}
      {/* ============================== */}

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
            ? "Update Category"
            : "Save Category"}
        </button>

      </div>

    </form>
  );
};
