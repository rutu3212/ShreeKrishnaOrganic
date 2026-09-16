import React, { useState } from "react";
import {
  Save,
  X,
  Tag,
  Upload,
  Image as ImageIcon,
  CalendarDays,
  Percent,
  IndianRupee,
} from "lucide-react";

const OfferForm = ({
  initialData = null,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    code: initialData?.code || "",
    discountType: initialData?.discountType || "Percentage",
    discountValue: initialData?.discountValue || "",
    minimumOrder: initialData?.minimumOrder || "",
    maximumDiscount: initialData?.maximumDiscount || "",
    startDate: initialData?.startDate || "",
    endDate: initialData?.endDate || "",
    image: initialData?.image || "",
    status: initialData?.status || "Active",
  });

  const [preview, setPreview] = useState(initialData?.image || "");
  const [error, setError] = useState("");

  /* --------------------------------
     Handle Input Changes
  -------------------------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
      setError("Offer image should be less than 5MB.");
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
    if (!formData.title.trim()) {
      return "Offer title is required.";
    }

    if (!formData.description.trim()) {
      return "Offer description is required.";
    }

    if (!formData.discountValue) {
      return "Discount value is required.";
    }

    if (Number(formData.discountValue) <= 0) {
      return "Discount value must be greater than 0.";
    }

    if (
      formData.discountType === "Percentage" &&
      Number(formData.discountValue) > 100
    ) {
      return "Percentage discount cannot be greater than 100%.";
    }

    if (formData.startDate && formData.endDate) {
      if (
        new Date(formData.endDate) <
        new Date(formData.startDate)
      ) {
        return "End date cannot be before start date.";
      }
    }

    if (
      formData.minimumOrder &&
      Number(formData.minimumOrder) < 0
    ) {
      return "Minimum order cannot be negative.";
    }

    if (
      formData.maximumDiscount &&
      Number(formData.maximumDiscount) < 0
    ) {
      return "Maximum discount cannot be negative.";
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

    const offerData = {
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim(),
      code: formData.code.trim().toUpperCase(),
      discountValue: Number(formData.discountValue),
      minimumOrder: formData.minimumOrder
        ? Number(formData.minimumOrder)
        : 0,
      maximumDiscount: formData.maximumDiscount
        ? Number(formData.maximumDiscount)
        : 0,
    };

    if (onSubmit) {
      onSubmit(offerData);
    } else {
      console.log("Offer Data:", offerData);
      alert("Offer saved successfully!");
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
            <div className="w-11 h-11 rounded-xl bg-[#F3E8C8] flex items-center justify-center">
              <Tag
                size={21}
                className="text-[#9A7B2F]"
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[#29321F]">
                {initialData
                  ? "Edit Offer"
                  : "Add New Offer"}
              </h2>

              <p className="text-xs text-[#8B8A7D] mt-1">
                {initialData
                  ? "Update your promotional offer."
                  : "Create a new promotional offer."}
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
      <div className="p-5 sm:p-7 space-y-6">
        {/* Error */}
        {error && (
          <div className="p-4 rounded-xl bg-[#FAF0EC] border border-[#F0D7CE]">
            <p className="text-sm text-[#8A4B3A]">
              {error}
            </p>
          </div>
        )}

        {/* ==================================
            Title
        ================================== */}
        <div>
          <label
            htmlFor="offer-title"
            className="block text-sm font-medium text-[#55574D] mb-2"
          >
            Offer Title
            <span className="text-[#A6533D] ml-1">
              *
            </span>
          </label>

          <input
            id="offer-title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Festive Season Offer"
            className="w-full px-4 py-3 rounded-xl border border-[#DDD9CF] bg-[#FBFAF6] text-[#29321F] placeholder:text-[#AAA79B] outline-none focus:border-[#56663D] focus:ring-2 focus:ring-[#56663D]/10 transition"
          />
        </div>

        {/* ==================================
            Description
        ================================== */}
        <div>
          <label
            htmlFor="offer-description"
            className="block text-sm font-medium text-[#55574D] mb-2"
          >
            Description
            <span className="text-[#A6533D] ml-1">
              *
            </span>
          </label>

          <textarea
            id="offer-description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            placeholder="Describe the offer..."
            className="w-full px-4 py-3 rounded-xl border border-[#DDD9CF] bg-[#FBFAF6] text-[#29321F] placeholder:text-[#AAA79B] outline-none focus:border-[#56663D] focus:ring-2 focus:ring-[#56663D]/10 transition resize-none"
          />
        </div>

        {/* ==================================
            Coupon Code
        ================================== */}
        <div>
          <label
            htmlFor="offer-code"
            className="block text-sm font-medium text-[#55574D] mb-2"
          >
            Coupon Code
          </label>

          <input
            id="offer-code"
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            placeholder="e.g. SHREEKRISHNA10"
            className="w-full px-4 py-3 rounded-xl border border-[#DDD9CF] bg-[#FBFAF6] text-[#29321F] placeholder:text-[#AAA79B] uppercase outline-none focus:border-[#56663D] focus:ring-2 focus:ring-[#56663D]/10 transition"
          />

          <p className="mt-2 text-xs text-[#99978C]">
            Customers can use this code during checkout.
          </p>
        </div>

        {/* ==================================
            Discount Section
        ================================== */}
        <div>
          <h3 className="text-sm font-semibold text-[#29321F] mb-4">
            Discount Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Discount Type */}
            <div>
              <label
                htmlFor="discount-type"
                className="block text-xs font-medium text-[#777568] mb-2"
              >
                Discount Type
              </label>

              <select
                id="discount-type"
                name="discountType"
                value={formData.discountType}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-[#DDD9CF] bg-[#FBFAF6] text-[#29321F] outline-none focus:border-[#56663D] focus:ring-2 focus:ring-[#56663D]/10 transition"
              >
                <option value="Percentage">
                  Percentage
                </option>
                <option value="Fixed">
                  Fixed Amount
                </option>
              </select>
            </div>

            {/* Discount Value */}
            <div>
              <label
                htmlFor="discount-value"
                className="block text-xs font-medium text-[#777568] mb-2"
              >
                Discount Value
                <span className="text-[#A6533D] ml-1">
                  *
                </span>
              </label>

              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#777568]">
                  {formData.discountType ===
                  "Percentage" ? (
                    <Percent size={17} />
                  ) : (
                    <IndianRupee size={17} />
                  )}
                </div>

                <input
                  id="discount-value"
                  type="number"
                  name="discountValue"
                  value={formData.discountValue}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  placeholder="10"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#DDD9CF] bg-[#FBFAF6] text-[#29321F] placeholder:text-[#AAA79B] outline-none focus:border-[#56663D] focus:ring-2 focus:ring-[#56663D]/10 transition"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ==================================
            Order Conditions
        ================================== */}
        <div>
          <h3 className="text-sm font-semibold text-[#29321F] mb-4">
            Order Conditions
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Minimum Order */}
            <div>
              <label
                htmlFor="minimum-order"
                className="block text-xs font-medium text-[#777568] mb-2"
              >
                Minimum Order Value
              </label>

              <div className="relative">
                <IndianRupee
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#777568]"
                />

                <input
                  id="minimum-order"
                  type="number"
                  name="minimumOrder"
                  value={formData.minimumOrder}
                  onChange={handleChange}
                  min="0"
                  placeholder="999"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#DDD9CF] bg-[#FBFAF6] text-[#29321F] placeholder:text-[#AAA79B] outline-none focus:border-[#56663D] focus:ring-2 focus:ring-[#56663D]/10 transition"
                />
              </div>
            </div>

            {/* Maximum Discount */}
            <div>
              <label
                htmlFor="maximum-discount"
                className="block text-xs font-medium text-[#777568] mb-2"
              >
                Maximum Discount
              </label>

              <div className="relative">
                <IndianRupee
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#777568]"
                />

                <input
                  id="maximum-discount"
                  type="number"
                  name="maximumDiscount"
                  value={formData.maximumDiscount}
                  onChange={handleChange}
                  min="0"
                  placeholder="500"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#DDD9CF] bg-[#FBFAF6] text-[#29321F] placeholder:text-[#AAA79B] outline-none focus:border-[#56663D] focus:ring-2 focus:ring-[#56663D]/10 transition"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ==================================
            Date Section
        ================================== */}
        <div>
          <h3 className="text-sm font-semibold text-[#29321F] mb-4">
            Offer Duration
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Start Date */}
            <div>
              <label
                htmlFor="start-date"
                className="block text-xs font-medium text-[#777568] mb-2"
              >
                Start Date
              </label>

              <div className="relative">
                <CalendarDays
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#777568]"
                />

                <input
                  id="start-date"
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#DDD9CF] bg-[#FBFAF6] text-[#29321F] outline-none focus:border-[#56663D] focus:ring-2 focus:ring-[#56663D]/10 transition"
                />
              </div>
            </div>

            {/* End Date */}
            <div>
              <label
                htmlFor="end-date"
                className="block text-xs font-medium text-[#777568] mb-2"
              >
                End Date
              </label>

              <div className="relative">
                <CalendarDays
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#777568]"
                />

                <input
                  id="end-date"
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#DDD9CF] bg-[#FBFAF6] text-[#29321F] outline-none focus:border-[#56663D] focus:ring-2 focus:ring-[#56663D]/10 transition"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ==================================
            Status
        ================================== */}
        <div>
          <label
            htmlFor="offer-status"
            className="block text-sm font-medium text-[#55574D] mb-2"
          >
            Status
          </label>

          <select
            id="offer-status"
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

            <option value="Scheduled">
              Scheduled
            </option>

            <option value="Expired">
              Expired
            </option>
          </select>
        </div>

        {/* ==================================
            Offer Image
        ================================== */}
        <div>
          <label className="block text-sm font-medium text-[#55574D] mb-2">
            Offer Banner Image
          </label>

          {!preview ? (
            <label className="block cursor-pointer">
              <div className="border-2 border-dashed border-[#DCD8CE] rounded-2xl p-8 text-center bg-[#FBFAF6] hover:border-[#56663D] hover:bg-[#F7F8F2] transition">
                <div className="w-12 h-12 mx-auto rounded-xl bg-[#E4EBD9] flex items-center justify-center">
                  <Upload
                    size={22}
                    className="text-[#56663D]"
                  />
                </div>

                <p className="mt-4 text-sm font-medium text-[#55574D]">
                  Upload offer banner
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
              <div className="aspect-[16/6] rounded-2xl overflow-hidden bg-[#F1EFE5] border border-[#E6E1D8]">
                <img
                  src={preview}
                  alt="Offer preview"
                  className="w-full h-full object-cover"
                />
              </div>

              <button
                type="button"
                onClick={removeImage}
                className="absolute top-3 right-3 w-9 h-9 rounded-lg bg-white/95 text-[#A6533D] flex items-center justify-center shadow-md hover:bg-white transition"
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

            <p className="text-xs leading-5 text-[#806B38]">
              Later, this image can be uploaded to Cloudinary and
              the returned URL can be saved in your database.
            </p>
          </div>
        </div>
      </div>

      {/* ==================================
          Footer Buttons
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
            ? "Update Offer"
            : "Save Offer"}
        </button>
      </div>
    </form>
  );
};

export default OfferForm;

