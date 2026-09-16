import React, { useRef, useState } from "react";
import {
  Upload,
  X,
  Image as ImageIcon,
  RefreshCw,
} from "lucide-react";

const ImageUploader = ({
  value = "",
  onUpload,
  onRemove,
  label = "Upload Image",
  helperText = "PNG, JPG or WEBP • Maximum 5MB",
  accept = "image/png,image/jpeg,image/webp",
  maxSize = 5,
  aspectRatio = "aspect-[16/9]",
}) => {
  const inputRef = useRef(null);

  const [preview, setPreview] = useState(value || "");
  const [error, setError] = useState("");

  /* --------------------------------
     Handle File Selection
  -------------------------------- */
  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setError("");

    // Check image type
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      event.target.value = "";
      return;
    }

    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`Image size should be less than ${maxSize}MB.`);
      event.target.value = "";
      return;
    }

    // Create preview
    const imageUrl = URL.createObjectURL(file);

    setPreview(imageUrl);

    // Send file to parent component
    if (onUpload) {
      onUpload(file);
    }
  };

  /* --------------------------------
     Remove Image
  -------------------------------- */
  const handleRemove = () => {
    setPreview("");
    setError("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }

    if (onRemove) {
      onRemove();
    }
  };

  /* --------------------------------
     Open File Picker
  -------------------------------- */
  const openFilePicker = () => {
    inputRef.current?.click();
  };

  return (
    <div className="w-full">
      {/* Label */}
      <div className="flex items-center justify-between gap-3 mb-2">
        <label className="block text-sm font-medium text-[#55574D]">
          {label}
        </label>

        {preview && (
          <span className="text-xs text-[#56663D] font-medium">
            Image selected
          </span>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="mb-3 p-3 rounded-xl bg-[#FAF0EC] border border-[#F0D7CE]">
          <p className="text-xs sm:text-sm text-[#8A4B3A]">
            {error}
          </p>
        </div>
      )}

      {/* --------------------------------
          Empty Upload Area
      -------------------------------- */}
      {!preview ? (
        <div
          onClick={openFilePicker}
          className="group cursor-pointer border-2 border-dashed border-[#DCD8CE] rounded-2xl p-7 sm:p-10 text-center bg-[#FBFAF6] hover:border-[#56663D] hover:bg-[#F7F8F2] transition duration-300"
        >
          <div className="w-14 h-14 mx-auto rounded-2xl bg-[#E4EBD9] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <Upload
              size={25}
              className="text-[#56663D]"
              strokeWidth={1.8}
            />
          </div>

          <h3 className="mt-5 text-sm sm:text-base font-semibold text-[#55574D]">
            {label}
          </h3>

          <p className="mt-2 text-xs text-[#99978C]">
            Drag & drop your image here or click to browse
          </p>

          <span className="inline-flex items-center gap-2 mt-5 px-4 py-2.5 rounded-xl bg-[#56663D] text-white text-xs sm:text-sm font-medium hover:bg-[#465532] transition">
            <Upload size={16} />
            Choose Image
          </span>

          <p className="mt-4 text-[11px] sm:text-xs text-[#AAA79B]">
            {helperText}
          </p>
        </div>
      ) : (
        /* --------------------------------
           Image Preview
        -------------------------------- */
        <div className="relative">
          <div
            className={`${aspectRatio} rounded-2xl overflow-hidden bg-[#F1EFE5] border border-[#E6E1D8]`}
          >
            <img
              src={preview}
              alt="Selected preview"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 rounded-2xl bg-[#29321F]/0 hover:bg-[#29321F]/35 transition duration-300 group">
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={openFilePicker}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-[#56663D] text-xs sm:text-sm font-medium shadow-lg hover:bg-[#F7F5EF] transition"
                >
                  <RefreshCw size={16} />
                  Change
                </button>

                <button
                  type="button"
                  onClick={handleRemove}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#A6533D] text-white text-xs sm:text-sm font-medium shadow-lg hover:bg-[#8F4534] transition"
                >
                  <X size={16} />
                  Remove
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Buttons */}
          <div className="flex sm:hidden gap-2 mt-3">
            <button
              type="button"
              onClick={openFilePicker}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#E4EBD9] text-[#56663D] text-sm font-medium"
            >
              <RefreshCw size={16} />
              Change
            </button>

            <button
              type="button"
              onClick={handleRemove}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#FAE9E4] text-[#A6533D] text-sm font-medium"
            >
              <X size={16} />
              Remove
            </button>
          </div>

          {/* Image Info */}
          <div className="mt-3 flex items-start gap-2 p-3 rounded-xl bg-[#F3E8C8]">
            <ImageIcon
              size={17}
              className="text-[#9A7B2F] shrink-0 mt-0.5"
            />

            <p className="text-xs leading-5 text-[#806B38]">
              This image is currently shown as a local preview. When
              Cloudinary is connected, the selected image can be uploaded
              and its URL can be saved in your database.
            </p>
          </div>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default ImageUploader;

