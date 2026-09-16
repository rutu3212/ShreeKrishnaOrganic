import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Save,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Upload,
  X,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Leaf,
  Smartphone,
  Monitor,
  RotateCcw,
} from "lucide-react";

import homePageData from "../../data/homepage";

// ======================================================
// Hero Management
// Srikrishn Organics Admin Panel
// ======================================================

const HeroManagement = () => {
  // =====================================================
  // State
  // =====================================================

  const [hero, setHero] = useState(() => {
    try {
      const savedContent = localStorage.getItem(
        "srikrishn_homepage_content"
      );

      if (savedContent) {
        const parsedContent = JSON.parse(savedContent);

        return {
          ...homePageData.hero,
          ...parsedContent.hero,
          primaryButton: {
            ...homePageData.hero.primaryButton,
            ...(parsedContent.hero?.primaryButton || {}),
          },
          secondaryButton: {
            ...homePageData.hero.secondaryButton,
            ...(parsedContent.hero?.secondaryButton || {}),
          },
          badge: {
            ...homePageData.hero.badge,
            ...(parsedContent.hero?.badge || {}),
          },
        };
      }

      return homePageData.hero;
    } catch (error) {
      console.error(
        "Unable to load hero content:",
        error
      );

      return homePageData.hero;
    }
  });

  const [desktopPreview, setDesktopPreview] =
    useState(null);

  const [mobilePreview, setMobilePreview] =
    useState(null);

  const [activePreview, setActivePreview] =
    useState("desktop");

  const [saved, setSaved] = useState(false);

  const [error, setError] = useState("");

  const [saving, setSaving] = useState(false);

  // =====================================================
  // Update Hero Field
  // =====================================================

  const updateField = (field, value) => {
    setHero((prev) => ({
      ...prev,
      [field]: value,
    }));

    setSaved(false);
    setError("");
  };

  // =====================================================
  // Update Nested Field
  // =====================================================

  const updateNestedField = (
    parent,
    field,
    value
  ) => {
    setHero((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value,
      },
    }));

    setSaved(false);
    setError("");
  };

  // =====================================================
  // Validate Image
  // =====================================================

  const validateImage = (file) => {
    if (!file) {
      return false;
    }

    if (!file.type.startsWith("image/")) {
      setError(
        "Please select a valid image file."
      );

      return false;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError(
        "Image size must be less than 5MB."
      );

      return false;
    }

    return true;
  };

  // =====================================================
  // Desktop Image Upload
  // =====================================================

  const handleDesktopImage = (e) => {
    const file = e.target.files?.[0];

    if (!validateImage(file)) {
      return;
    }

    const previewUrl =
      URL.createObjectURL(file);

    setDesktopPreview(previewUrl);

    /*
     * Demo only:
     * Object URL is used for preview.
     *
     * Production:
     * Upload file to Cloudinary.
     * Save returned secure_url in backend/database.
     */

    updateField("image", previewUrl);
  };

  // =====================================================
  // Mobile Image Upload
  // =====================================================

  const handleMobileImage = (e) => {
    const file = e.target.files?.[0];

    if (!validateImage(file)) {
      return;
    }

    const previewUrl =
      URL.createObjectURL(file);

    setMobilePreview(previewUrl);

    /*
     * Demo only:
     * Object URL is used for preview.
     *
     * Production:
     * Upload file to Cloudinary.
     */

    updateField(
      "mobileImage",
      previewUrl
    );
  };

  // =====================================================
  // Remove Desktop Image
  // =====================================================

  const removeDesktopImage = () => {
    setDesktopPreview(null);

    updateField("image", "");
  };

  // =====================================================
  // Remove Mobile Image
  // =====================================================

  const removeMobileImage = () => {
    setMobilePreview(null);

    updateField(
      "mobileImage",
      ""
    );
  };

  // =====================================================
  // Save Hero
  // =====================================================

  const handleSave = () => {
    try {
      setSaving(true);
      setError("");

      const savedContent =
        localStorage.getItem(
          "srikrishn_homepage_content"
        );

      const existingContent = savedContent
        ? JSON.parse(savedContent)
        : homePageData;

      const updatedContent = {
        ...existingContent,
        hero,
      };

      localStorage.setItem(
        "srikrishn_homepage_content",
        JSON.stringify(updatedContent)
      );

      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 3000);
    } catch (err) {
      console.error(
        "Unable to save hero:",
        err
      );

      setError(
        "Unable to save hero content. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // Reset Hero
  // =====================================================

  const handleReset = () => {
    const confirmed = window.confirm(
      "Are you sure you want to reset the Hero section to the default content?"
    );

    if (!confirmed) {
      return;
    }

    setHero(homePageData.hero);

    setDesktopPreview(null);

    setMobilePreview(null);

    setSaved(false);

    setError("");
  };

  // =====================================================
  // Toggle Hero
  // =====================================================

  const toggleHero = () => {
    updateField(
      "enabled",
      !hero.enabled
    );
  };

  // =====================================================
  // Image Source
  // =====================================================

  const getDesktopImage =
    desktopPreview || hero.image;

  const getMobileImage =
    mobilePreview ||
    hero.mobileImage ||
    hero.image;

  // =====================================================
  // Image Uploader Component
  // =====================================================

  const ImageUploader = ({
    type,
    image,
    onUpload,
    onRemove,
  }) => {
    const isDesktop =
      type === "desktop";

    return (
      <div className="overflow-hidden rounded-2xl border border-[#E6E1D8] bg-white">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-[#E6E1D8] bg-[#F7F5EF] px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E4EBD9] text-[#56663D]">
              {isDesktop ? (
                <Monitor size={18} />
              ) : (
                <Smartphone size={18} />
              )}
            </div>

            <div>
              <p className="text-sm font-semibold text-[#29321F]">
                {isDesktop
                  ? "Desktop Image"
                  : "Mobile Image"}
              </p>

              <p className="text-[11px] text-[#777568]">
                {isDesktop
                  ? "Recommended: 1920 × 900px"
                  : "Recommended: 900 × 1200px"}
              </p>
            </div>
          </div>
        </div>

        {/* Preview */}

        {image ? (
          <div className="relative">
            <img
              src={image}
              alt={
                isDesktop
                  ? "Desktop hero"
                  : "Mobile hero"
              }
              className={`w-full object-cover ${
                isDesktop
                  ? "h-64"
                  : "h-80"
              }`}
            />

            {/* Image Overlay */}

            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-[#29321F]/75 px-4 py-3">

              <span className="text-xs text-white">
                Current image
              </span>

              <div className="flex gap-2">

                <label className="cursor-pointer rounded-lg bg-white px-3 py-2 text-xs font-semibold text-[#56663D] transition hover:bg-[#F3E8C8]">
                  Change

                  <input
                    type="file"
                    accept="image/*"
                    onChange={onUpload}
                    className="hidden"
                  />
                </label>

                <button
                  type="button"
                  onClick={onRemove}
                  className="flex items-center gap-1 rounded-lg bg-[#A6533D] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#8F4534]"
                >
                  <X size={14} />

                  Remove
                </button>
              </div>
            </div>
          </div>
        ) : (
          <label className="flex h-64 cursor-pointer flex-col items-center justify-center px-6 text-center">

            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#E4EBD9] text-[#56663D]">
              <Upload size={23} />
            </div>

            <p className="text-sm font-semibold text-[#29321F]">
              Upload Hero Image
            </p>

            <p className="mt-1 max-w-xs text-xs leading-5 text-[#777568]">
              JPG, PNG or WEBP.
              Maximum file size 5MB.
            </p>

            <span className="mt-4 rounded-lg bg-[#56663D] px-4 py-2.5 text-xs font-semibold text-white">
              Choose Image
            </span>

            <input
              type="file"
              accept="image/*"
              onChange={onUpload}
              className="hidden"
            />
          </label>
        )}

        {/* Cloudinary Note */}

        <div className="border-t border-[#E6E1D8] bg-[#F7F5EF] px-4 py-3">
          <p className="text-[11px] leading-5 text-[#777568]">
            <span className="font-semibold text-[#56663D]">
              Image storage:
            </span>{" "}
            Currently using local preview.
            Connect Cloudinary later for
            permanent image storage.
          </p>
        </div>
      </div>
    );
  };

  // =====================================================
  // Input Component
  // =====================================================

  const InputField = ({
    label,
    value,
    onChange,
    placeholder,
    type = "text",
  }) => {
    return (
      <div>
        <label className="mb-2 block text-sm font-medium text-[#29321F]">
          {label}
        </label>

        <input
          type={type}
          value={value || ""}
          onChange={(e) =>
            onChange(e.target.value)
          }
          placeholder={placeholder}
          className="w-full rounded-xl border border-[#E6E1D8] bg-white px-4 py-3 text-sm text-[#29321F] outline-none transition placeholder:text-[#AAA79B] focus:border-[#56663D] focus:ring-4 focus:ring-[#56663D]/10"
        />
      </div>
    );
  };

  // =====================================================
  // Textarea Component
  // =====================================================

  const TextareaField = ({
    label,
    value,
    onChange,
    placeholder,
    rows = 5,
  }) => {
    return (
      <div>
        <label className="mb-2 block text-sm font-medium text-[#29321F]">
          {label}
        </label>

        <textarea
          value={value || ""}
          onChange={(e) =>
            onChange(e.target.value)
          }
          placeholder={placeholder}
          rows={rows}
          className="w-full resize-none rounded-xl border border-[#E6E1D8] bg-white px-4 py-3 text-sm leading-6 text-[#29321F] outline-none transition placeholder:text-[#AAA79B] focus:border-[#56663D] focus:ring-4 focus:ring-[#56663D]/10"
        />
      </div>
    );
  };

  // =====================================================
  // Section Card
  // =====================================================

  const SectionCard = ({
    title,
    description,
    children,
  }) => {
    return (
      <div className="rounded-2xl border border-[#E6E1D8] bg-white shadow-sm">

        <div className="border-b border-[#E6E1D8] px-5 py-5 sm:px-6">
          <h2 className="text-lg font-semibold text-[#29321F]">
            {title}
          </h2>

          <p className="mt-1 text-sm leading-6 text-[#777568]">
            {description}
          </p>
        </div>

        <div className="space-y-5 p-5 sm:p-6">
          {children}
        </div>
      </div>
    );
  };

  // =====================================================
  // JSX
  // =====================================================

  return (
    <div className="min-h-screen bg-[#F7F5EF]">

      {/* ==================================================
          PAGE HEADER
      ================================================== */}

      <header className="border-b border-[#E6E1D8] bg-white">
        <div className="mx-auto max-w-[1500px] px-4 py-5 sm:px-6 lg:px-8">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            {/* Title */}

            <div>
              <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#9A7B2F]">
                <Leaf size={14} />

                Admin Panel
              </div>

              <h1 className="text-2xl font-semibold text-[#29321F] sm:text-3xl">
                Hero Management
              </h1>

              <p className="mt-1 max-w-2xl text-sm text-[#777568]">
                Manage your homepage hero image,
                headline, description, buttons and
                promotional badge.
              </p>
            </div>

            {/* Actions */}

            <div className="flex flex-wrap gap-3">

              <button
                type="button"
                onClick={handleReset}
                className="flex items-center justify-center gap-2 rounded-xl border border-[#E6E1D8] bg-white px-4 py-3 text-sm font-semibold text-[#765A3A] transition hover:bg-[#EEE4D7]"
              >
                <RotateCcw size={17} />

                Reset
              </button>

              <button
                type="button"
                onClick={() =>
                  window.open(
                    "/",
                    "_blank"
                  )
                }
                className="flex items-center justify-center gap-2 rounded-xl border border-[#56663D]/20 bg-[#E4EBD9] px-4 py-3 text-sm font-semibold text-[#56663D] transition hover:bg-[#DDE8D2]"
              >
                <Eye size={17} />

                Preview
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#56663D] px-5 py-3 text-sm font-semibold text-white shadow-md shadow-[#56663D]/10 transition hover:bg-[#465532] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {saving ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={17} />

                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ==================================================
          STATUS
      ================================================== */}

      <div className="mx-auto max-w-[1500px] px-4 pt-5 sm:px-6 lg:px-8">

        {saved && (
          <motion.div
            initial={{
              opacity: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="flex items-center gap-3 rounded-xl border border-[#56663D]/20 bg-[#E4EBD9] px-4 py-3 text-sm text-[#56663D]"
          >
            <CheckCircle size={18} />

            Hero content saved successfully.
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{
              opacity: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="mt-3 flex items-center gap-3 rounded-xl border border-[#A6533D]/20 bg-[#A6533D]/5 px-4 py-3 text-sm text-[#A6533D]"
          >
            <AlertCircle size={18} />

            {error}
          </motion.div>
        )}
      </div>

      {/* ==================================================
          MAIN
      ================================================== */}

      <main className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8">

        <div className="grid gap-6 xl:grid-cols-[1fr_380px]">

          {/* =================================================
              LEFT CONTENT
          ================================================= */}

          <div className="space-y-6">

            {/* =================================================
                HERO STATUS
            ================================================= */}

            <SectionCard
              title="Hero Section Status"
              description="Control whether the hero section is visible on your homepage."
            >
              <div className="flex flex-col gap-4 rounded-2xl border border-[#E6E1D8] bg-[#F7F5EF] p-5 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex items-center gap-4">

                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full ${
                      hero.enabled
                        ? "bg-[#E4EBD9] text-[#56663D]"
                        : "bg-[#EEE4D7] text-[#765A3A]"
                    }`}
                  >
                    {hero.enabled ? (
                      <Eye size={22} />
                    ) : (
                      <EyeOff size={22} />
                    )}
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[#29321F]">
                      Hero Section
                    </p>

                    <p className="mt-1 text-xs text-[#777568]">
                      {hero.enabled
                        ? "The hero is currently visible on the homepage."
                        : "The hero is currently hidden from the homepage."}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={toggleHero}
                  className={`relative h-7 w-12 rounded-full transition-colors ${
                    hero.enabled
                      ? "bg-[#56663D]"
                      : "bg-[#C8C3B8]"
                  }`}
                >
                  <span
                    className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                      hero.enabled
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </SectionCard>

            {/* =================================================
                HERO TEXT
            ================================================= */}

            <SectionCard
              title="Hero Content"
              description="Update the main message visitors see when they arrive at your website."
            >
              <InputField
                label="Eyebrow Text"
                value={hero.eyebrow}
                placeholder="PURE • NATURAL • TRADITIONAL"
                onChange={(value) =>
                  updateField(
                    "eyebrow",
                    value
                  )
                }
              />

              <div className="grid gap-5 sm:grid-cols-2">

                <InputField
                  label="Main Title"
                  value={hero.title}
                  placeholder="Goodness of Nature,"
                  onChange={(value) =>
                    updateField(
                      "title",
                      value
                    )
                  }
                />

                <InputField
                  label="Highlight Title"
                  value={
                    hero.highlightTitle
                  }
                  placeholder="Rooted in Tradition"
                  onChange={(value) =>
                    updateField(
                      "highlightTitle",
                      value
                    )
                  }
                />
              </div>

              <TextareaField
                label="Hero Description"
                value={hero.description}
                placeholder="Enter your hero description..."
                rows={5}
                onChange={(value) =>
                  updateField(
                    "description",
                    value
                  )
                }
              />
            </SectionCard>

            {/* =================================================
                BUTTONS
            ================================================= */}

            <SectionCard
              title="Hero Buttons"
              description="Manage the call-to-action buttons displayed in the hero section."
            >
              <div className="grid gap-6 lg:grid-cols-2">

                {/* Primary */}

                <div className="rounded-2xl border border-[#E6E1D8] bg-[#F7F5EF] p-5">

                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#56663D] text-white">
                      <ArrowRight size={17} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-[#29321F]">
                        Primary Button
                      </p>

                      <p className="text-[11px] text-[#777568]">
                        Main call to action
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">

                    <InputField
                      label="Button Text"
                      value={
                        hero.primaryButton
                          ?.text
                      }
                      placeholder="Shop Now"
                      onChange={(value) =>
                        updateNestedField(
                          "primaryButton",
                          "text",
                          value
                        )
                      }
                    />

                    <InputField
                      label="Button Link"
                      value={
                        hero.primaryButton
                          ?.link
                      }
                      placeholder="/shop"
                      onChange={(value) =>
                        updateNestedField(
                          "primaryButton",
                          "link",
                          value
                        )
                      }
                    />
                  </div>
                </div>

                {/* Secondary */}

                <div className="rounded-2xl border border-[#E6E1D8] bg-[#F7F5EF] p-5">

                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F3E8C8] text-[#9A7B2F]">
                      <ArrowRight size={17} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-[#29321F]">
                        Secondary Button
                      </p>

                      <p className="text-[11px] text-[#777568]">
                        Supporting call to action
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">

                    <InputField
                      label="Button Text"
                      value={
                        hero.secondaryButton
                          ?.text
                      }
                      placeholder="Explore Our Story"
                      onChange={(value) =>
                        updateNestedField(
                          "secondaryButton",
                          "text",
                          value
                        )
                      }
                    />

                    <InputField
                      label="Button Link"
                      value={
                        hero.secondaryButton
                          ?.link
                      }
                      placeholder="/about"
                      onChange={(value) =>
                        updateNestedField(
                          "secondaryButton",
                          "link",
                          value
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* =================================================
                BADGE
            ================================================= */}

            <SectionCard
              title="Hero Badge"
              description="Manage the small trust badge displayed over the hero image."
            >
              <div className="flex items-center justify-between rounded-xl border border-[#E6E1D8] bg-[#F7F5EF] p-4">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3E8C8] text-[#9A7B2F]">
                    <CheckCircle size={19} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[#29321F]">
                      Show Hero Badge
                    </p>

                    <p className="text-xs text-[#777568]">
                      Display trust information over
                      the hero image.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    updateNestedField(
                      "badge",
                      "enabled",
                      !hero.badge?.enabled
                    )
                  }
                  className={`relative h-7 w-12 rounded-full transition-colors ${
                    hero.badge?.enabled
                      ? "bg-[#56663D]"
                      : "bg-[#C8C3B8]"
                  }`}
                >
                  <span
                    className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                      hero.badge?.enabled
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {hero.badge?.enabled && (
                <div className="grid gap-5 sm:grid-cols-2">
                  <InputField
                    label="Badge Title"
                    value={
                      hero.badge?.title
                    }
                    placeholder="100% Natural"
                    onChange={(value) =>
                      updateNestedField(
                        "badge",
                        "title",
                        value
                      )
                    }
                  />

                  <InputField
                    label="Badge Subtitle"
                    value={
                      hero.badge?.subtitle
                    }
                    placeholder="Carefully sourced ingredients"
                    onChange={(value) =>
                      updateNestedField(
                        "badge",
                        "subtitle",
                        value
                      )
                    }
                  />
                </div>
              )}
            </SectionCard>

            {/* =================================================
                IMAGES
            ================================================= */}

            <SectionCard
              title="Hero Images"
              description="Upload separate images for desktop and mobile devices for better responsive performance."
            >

              <div className="grid gap-5 lg:grid-cols-2">

                <ImageUploader
                  type="desktop"
                  image={getDesktopImage}
                  onUpload={
                    handleDesktopImage
                  }
                  onRemove={
                    removeDesktopImage
                  }
                />

                <ImageUploader
                  type="mobile"
                  image={getMobileImage}
                  onUpload={
                    handleMobileImage
                  }
                  onRemove={
                    removeMobileImage
                  }
                />

              </div>
            </SectionCard>

          </div>

          {/* =================================================
              RIGHT - PREVIEW
          ================================================= */}

          <aside className="h-fit xl:sticky xl:top-6">

            <div className="overflow-hidden rounded-2xl border border-[#E6E1D8] bg-white shadow-sm">

              {/* Preview Header */}

              <div className="border-b border-[#E6E1D8] p-5">

                <div className="flex items-center justify-between">

                  <div>
                    <h2 className="text-lg font-semibold text-[#29321F]">
                      Live Preview
                    </h2>

                    <p className="mt-1 text-xs text-[#777568]">
                      Preview how your hero section
                      will look.
                    </p>
                  </div>

                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E4EBD9] text-[#56663D]">
                    <Eye size={18} />
                  </div>

                </div>

                {/* Device Switch */}

                <div className="mt-5 flex rounded-xl bg-[#F7F5EF] p-1">

                  <button
                    type="button"
                    onClick={() =>
                      setActivePreview(
                        "desktop"
                      )
                    }
                    className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-xs font-semibold transition ${
                      activePreview ===
                      "desktop"
                        ? "bg-white text-[#56663D] shadow-sm"
                        : "text-[#777568]"
                    }`}
                  >
                    <Monitor size={15} />

                    Desktop
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setActivePreview(
                        "mobile"
                      )
                    }
                    className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-xs font-semibold transition ${
                      activePreview ===
                      "mobile"
                        ? "bg-white text-[#56663D] shadow-sm"
                        : "text-[#777568]"
                    }`}
                  >
                    <Smartphone size={15} />

                    Mobile
                  </button>

                </div>
              </div>

              {/* Preview */}

              <div className="bg-[#F7F5EF] p-4">

                <div
                  className={`relative overflow-hidden rounded-2xl bg-[#56663D] shadow-lg ${
                    activePreview ===
                    "mobile"
                      ? "mx-auto max-w-[280px]"
                      : ""
                  }`}
                >

                  {/* Background Image */}

                  {(activePreview ===
                    "desktop"
                    ? getDesktopImage
                    : getMobileImage) && (
                    <img
                      src={
                        activePreview ===
                        "desktop"
                          ? getDesktopImage
                          : getMobileImage
                      }
                      alt="Hero preview"
                      className={`absolute inset-0 h-full w-full object-cover ${
                        activePreview ===
                        "mobile"
                          ? "aspect-[3/4]"
                          : "aspect-[16/10]"
                      }`}
                    />
                  )}

                  {/* Overlay */}

                  <div className="absolute inset-0 bg-[#29321F]/45" />

                  {/* Content */}

                  <div
                    className={`relative z-10 flex flex-col justify-center ${
                      activePreview ===
                      "mobile"
                        ? "aspect-[3/4] p-5"
                        : "aspect-[16/10] p-7"
                    }`}
                  >

                    {/* Eyebrow */}

                    <div className="mb-3 flex items-center gap-2">
                      <span className="h-px w-5 bg-[#F3E8C8]" />

                      <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-[#F3E8C8]">
                        {hero.eyebrow ||
                          "PURE • NATURAL • TRADITIONAL"}
                      </p>
                    </div>

                    {/* Title */}

                    <h3
                      className={`font-semibold leading-tight text-white ${
                        activePreview ===
                        "mobile"
                          ? "text-2xl"
                          : "text-3xl"
                      }`}
                    >
                      {hero.title ||
                        "Goodness of Nature,"}

                      <span className="block text-[#F3E8C8]">
                        {hero.highlightTitle ||
                          "Rooted in Tradition"}
                      </span>
                    </h3>

                    {/* Description */}

                    <p
                      className={`mt-3 max-w-md leading-5 text-white/75 ${
                        activePreview ===
                        "mobile"
                          ? "text-[9px]"
                          : "text-[10px]"
                      }`}
                    >
                      {hero.description ||
                        "Experience authentic organic goodness crafted with carefully sourced ingredients and traditional methods."}
                    </p>

                    {/* Buttons */}

                    <div className="mt-5 flex flex-wrap gap-2">

                      <span className="rounded-lg bg-white px-3 py-2 text-[9px] font-semibold text-[#56663D]">
                        {hero.primaryButton
                          ?.text ||
                          "Shop Now"}
                      </span>

                      <span className="rounded-lg border border-white/40 bg-white/10 px-3 py-2 text-[9px] font-semibold text-white backdrop-blur-sm">
                        {hero.secondaryButton
                          ?.text ||
                          "Explore Our Story"}
                      </span>

                    </div>

                    {/* Badge */}

                    {hero.badge?.enabled && (
                      <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-xl border border-white/20 bg-white/90 px-3 py-2 shadow-lg backdrop-blur-sm">

                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#E4EBD9] text-[#56663D]">
                          <Leaf size={13} />
                        </div>

                        <div>
                          <p className="text-[8px] font-bold text-[#29321F]">
                            {hero.badge
                              ?.title ||
                              "100% Natural"}
                          </p>

                          <p className="text-[6px] text-[#777568]">
                            {hero.badge
                              ?.subtitle ||
                              "Carefully sourced ingredients"}
                          </p>
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              </div>

              {/* Preview Footer */}

              <div className="border-t border-[#E6E1D8] bg-white p-4">

                <div className="flex items-start gap-3">

                  <ImageIcon
                    size={17}
                    className="mt-0.5 shrink-0 text-[#56663D]"
                  />

                  <div>
                    <p className="text-xs font-semibold text-[#29321F]">
                      Responsive Hero
                    </p>

                    <p className="mt-1 text-[11px] leading-5 text-[#777568]">
                      Desktop and mobile images can
                      be managed separately for the
                      best visual experience.
                    </p>
                  </div>

                </div>
              </div>
            </div>

          </aside>
        </div>

        {/* ==================================================
            BOTTOM SAVE BAR
        ================================================== */}

        <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-[#E6E1D8] bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">

          <div>
            <p className="text-sm font-semibold text-[#29321F]">
              Ready to publish your hero changes?
            </p>

            <p className="mt-1 text-xs text-[#777568]">
              Save your changes after editing the
              hero section.
            </p>
          </div>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#56663D] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#465532] disabled:opacity-70"
          >
            <Save size={17} />

            {saving
              ? "Saving..."
              : "Save Hero Changes"}
          </button>

        </div>

      </main>
    </div>
  );
};

export default HeroManagement;

