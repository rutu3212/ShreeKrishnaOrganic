import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Save,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Type,
  Megaphone,
  Home,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  Upload,
  Link as LinkIcon,
} from "lucide-react";

import homePageData from "../../data/homePageData";

// ======================================================
// Content Management
// Srikrishn Organics Admin Panel
// ======================================================

const ContentManagement = () => {
  // =====================================================
  // State
  // =====================================================

  const [activeSection, setActiveSection] = useState("announcement");

  const [content, setContent] = useState(() => {
    try {
      const savedContent = localStorage.getItem(
        "srikrishn_homepage_content"
      );

      return savedContent
        ? JSON.parse(savedContent)
        : homePageData;
    } catch (error) {
      console.error("Unable to load saved content:", error);

      return homePageData;
    }
  });

  const [saved, setSaved] = useState(false);

  const [error, setError] = useState("");

  const [previewImage, setPreviewImage] = useState("");

  // =====================================================
  // Sections
  // =====================================================

  const sections = [
    {
      id: "announcement",
      title: "Announcement Bar",
      description: "Manage your top promotional message",
      icon: Megaphone,
    },
    {
      id: "hero",
      title: "Hero Section",
      description: "Manage homepage hero content",
      icon: Home,
    },
    {
      id: "welcome",
      title: "Welcome Section",
      description: "Manage welcome content",
      icon: Type,
    },
    {
      id: "categories",
      title: "Categories",
      description: "Manage category section",
      icon: Home,
    },
    {
      id: "featuredProducts",
      title: "Best Sellers",
      description: "Manage featured products section",
      icon: Type,
    },
    {
      id: "whyChooseUs",
      title: "Why Choose Us",
      description: "Manage trust features",
      icon: CheckCircle,
    },
    {
      id: "ingredients",
      title: "Ingredients",
      description: "Manage ingredient section",
      icon: ImageIcon,
    },
    {
      id: "oilSection",
      title: "Cold Pressed Oils",
      description: "Manage oil section",
      icon: ImageIcon,
    },
    {
      id: "gheeSection",
      title: "A2 Ghee",
      description: "Manage ghee section",
      icon: ImageIcon,
    },
    {
      id: "offers",
      title: "Offers",
      description: "Manage offers section",
      icon: Megaphone,
    },
    {
      id: "comboPacks",
      title: "Combo Packs",
      description: "Manage combo pack section",
      icon: Home,
    },
    {
      id: "testimonials",
      title: "Testimonials",
      description: "Manage customer reviews",
      icon: Type,
    },
    {
      id: "newsletter",
      title: "Newsletter",
      description: "Manage newsletter section",
      icon: Type,
    },
    {
      id: "trustStats",
      title: "Trust Statistics",
      description: "Manage trust numbers",
      icon: CheckCircle,
    },
  ];

  // =====================================================
  // Save Content
  // =====================================================

  const handleSave = () => {
    try {
      localStorage.setItem(
        "srikrishn_homepage_content",
        JSON.stringify(content)
      );

      setSaved(true);
      setError("");

      setTimeout(() => {
        setSaved(false);
      }, 3000);
    } catch (err) {
      console.error(err);

      setError(
        "Unable to save content. Please try again."
      );
    }
  };

  // =====================================================
  // Reset Content
  // =====================================================

  const handleReset = () => {
    const confirmed = window.confirm(
      "Are you sure you want to reset all homepage content to the default content?"
    );

    if (!confirmed) {
      return;
    }

    setContent(homePageData);

    localStorage.setItem(
      "srikrishn_homepage_content",
      JSON.stringify(homePageData)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  // =====================================================
  // Update Simple Field
  // =====================================================

  const updateField = (
    section,
    field,
    value
  ) => {
    setContent((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  // =====================================================
  // Update Nested Field
  // =====================================================

  const updateNestedField = (
    section,
    parent,
    field,
    value
  ) => {
    setContent((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [parent]: {
          ...prev[section][parent],
          [field]: value,
        },
      },
    }));
  };

  // =====================================================
  // Update Image
  // =====================================================

  const handleImageChange = (
    section,
    field,
    e
  ) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB.");
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    setPreviewImage(imageUrl);

    /*
     * Frontend demo:
     * Store preview URL.
     *
     * In production:
     * Upload the file to Cloudinary and
     * store the returned secure_url.
     */

    updateField(section, field, imageUrl);

    setError("");
  };

  // =====================================================
  // Toggle Section
  // =====================================================

  const toggleSection = (section) => {
    setContent((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        enabled: !prev[section].enabled,
      },
    }));
  };

  // =====================================================
  // Common Input
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
          className="w-full rounded-xl border border-[#E6E1D8] bg-white px-4 py-3 text-sm text-[#29321F] outline-none transition focus:border-[#56663D] focus:ring-4 focus:ring-[#56663D]/10"
        />
      </div>
    );
  };

  // =====================================================
  // Textarea
  // =====================================================

  const TextareaField = ({
    label,
    value,
    onChange,
    placeholder,
    rows = 4,
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
          className="w-full resize-none rounded-xl border border-[#E6E1D8] bg-white px-4 py-3 text-sm leading-6 text-[#29321F] outline-none transition focus:border-[#56663D] focus:ring-4 focus:ring-[#56663D]/10"
        />
      </div>
    );
  };

  // =====================================================
  // Section Visibility
  // =====================================================

  const VisibilityToggle = ({
    section,
  }) => {
    const enabled =
      content[section]?.enabled;

    return (
      <button
        type="button"
        onClick={() =>
          toggleSection(section)
        }
        className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition ${
          enabled
            ? "bg-[#E4EBD9] text-[#56663D]"
            : "bg-[#EEE4D7] text-[#765A3A]"
        }`}
      >
        {enabled ? (
          <>
            <Eye size={15} />
            Visible
          </>
        ) : (
          <>
            <EyeOff size={15} />
            Hidden
          </>
        )}
      </button>
    );
  };

  // =====================================================
  // Image Upload
  // =====================================================

  const ImageUpload = ({
    section,
    field,
    label = "Section Image",
  }) => {
    const image =
      content[section]?.[field];

    return (
      <div>
        <label className="mb-2 block text-sm font-medium text-[#29321F]">
          {label}
        </label>

        <div className="overflow-hidden rounded-2xl border border-dashed border-[#CFC9BD] bg-[#F7F5EF]">
          {image ? (
            <div className="relative">
              <img
                src={image}
                alt={label}
                className="h-56 w-full object-cover"
              />

              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-[#29321F]/75 px-4 py-3">
                <span className="text-xs text-white">
                  Current image
                </span>

                <label className="cursor-pointer rounded-lg bg-white px-3 py-2 text-xs font-semibold text-[#56663D]">
                  Change

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleImageChange(
                        section,
                        field,
                        e
                      )
                    }
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          ) : (
            <label className="flex cursor-pointer flex-col items-center justify-center px-6 py-10 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#E4EBD9] text-[#56663D]">
                <Upload size={21} />
              </div>

              <p className="text-sm font-semibold text-[#29321F]">
                Upload Image
              </p>

              <p className="mt-1 text-xs text-[#777568]">
                PNG, JPG or WEBP • Max 5MB
              </p>

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleImageChange(
                    section,
                    field,
                    e
                  )
                }
                className="hidden"
              />
            </label>
          )}
        </div>

        <p className="mt-2 text-xs text-[#99978B]">
          Cloudinary can be connected here later for
          permanent image storage.
        </p>
      </div>
    );
  };

  // =====================================================
  // Announcement Section
  // =====================================================

  const renderAnnouncement = () => {
    const data = content.announcement;

    return (
      <ContentCard
        title="Announcement Bar"
        description="Control the promotional message displayed at the top of your website."
        section="announcement"
      >
        <InputField
          label="Announcement Text"
          value={data.text}
          placeholder="Free Shipping on orders above ₹999"
          onChange={(value) =>
            updateField(
              "announcement",
              "text",
              value
            )
          }
        />

        <InputField
          label="Highlight Text"
          value={data.highlight}
          placeholder="Use code SHREEKRISHNA10 for 10% Off"
          onChange={(value) =>
            updateField(
              "announcement",
              "highlight",
              value
            )
          }
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <InputField
            label="Button Text"
            value={data.linkText}
            placeholder="Shop Now"
            onChange={(value) =>
              updateField(
                "announcement",
                "linkText",
                value
              )
            }
          />

          <InputField
            label="Button Link"
            value={data.link}
            placeholder="/shop"
            onChange={(value) =>
              updateField(
                "announcement",
                "link",
                value
              )
            }
          />
        </div>
      </ContentCard>
    );
  };

  // =====================================================
  // Hero Section
  // =====================================================

  const renderHero = () => {
    const data = content.hero;

    return (
      <ContentCard
        title="Hero Section"
        description="Manage the main visual and message displayed on your homepage."
        section="hero"
      >
        <InputField
          label="Eyebrow Text"
          value={data.eyebrow}
          placeholder="PURE • NATURAL • TRADITIONAL"
          onChange={(value) =>
            updateField(
              "hero",
              "eyebrow",
              value
            )
          }
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <InputField
            label="Main Title"
            value={data.title}
            placeholder="Goodness of Nature,"
            onChange={(value) =>
              updateField(
                "hero",
                "title",
                value
              )
            }
          />

          <InputField
            label="Highlight Title"
            value={data.highlightTitle}
            placeholder="Rooted in Tradition"
            onChange={(value) =>
              updateField(
                "hero",
                "highlightTitle",
                value
              )
            }
          />
        </div>

        <TextareaField
          label="Description"
          value={data.description}
          placeholder="Enter hero description..."
          onChange={(value) =>
            updateField(
              "hero",
              "description",
              value
            )
          }
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <InputField
            label="Primary Button Text"
            value={data.primaryButton?.text}
            placeholder="Shop Now"
            onChange={(value) =>
              updateNestedField(
                "hero",
                "primaryButton",
                "text",
                value
              )
            }
          />

          <InputField
            label="Primary Button Link"
            value={data.primaryButton?.link}
            placeholder="/shop"
            onChange={(value) =>
              updateNestedField(
                "hero",
                "primaryButton",
                "link",
                value
              )
            }
          />

          <InputField
            label="Secondary Button Text"
            value={data.secondaryButton?.text}
            placeholder="Explore Our Story"
            onChange={(value) =>
              updateNestedField(
                "hero",
                "secondaryButton",
                "text",
                value
              )
            }
          />

          <InputField
            label="Secondary Button Link"
            value={data.secondaryButton?.link}
            placeholder="/about"
            onChange={(value) =>
              updateNestedField(
                "hero",
                "secondaryButton",
                "link",
                value
              )
            }
          />
        </div>

        <ImageUpload
          section="hero"
          field="image"
          label="Desktop Hero Image"
        />

        <InputField
          label="Mobile Image URL"
          value={data.mobileImage}
          placeholder="https://..."
          onChange={(value) =>
            updateField(
              "hero",
              "mobileImage",
              value
            )
          }
        />

        {/* Badge */}

        <div className="rounded-2xl border border-[#E6E1D8] bg-[#F7F5EF] p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h4 className="text-sm font-semibold text-[#29321F]">
                Hero Badge
              </h4>

              <p className="mt-1 text-xs text-[#777568]">
                Small trust badge shown on the hero.
              </p>
            </div>

            <label className="flex cursor-pointer items-center gap-2 text-xs text-[#777568]">
              <input
                type="checkbox"
                checked={
                  data.badge?.enabled || false
                }
                onChange={(e) =>
                  updateNestedField(
                    "hero",
                    "badge",
                    "enabled",
                    e.target.checked
                  )
                }
                className="h-4 w-4 accent-[#56663D]"
              />

              Enabled
            </label>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <InputField
              label="Badge Title"
              value={data.badge?.title}
              placeholder="100% Natural"
              onChange={(value) =>
                updateNestedField(
                  "hero",
                  "badge",
                  "title",
                  value
                )
              }
            />

            <InputField
              label="Badge Subtitle"
              value={data.badge?.subtitle}
              placeholder="Carefully sourced ingredients"
              onChange={(value) =>
                updateNestedField(
                  "hero",
                  "badge",
                  "subtitle",
                  value
                )
              }
            />
          </div>
        </div>
      </ContentCard>
    );
  };

  // =====================================================
  // Welcome Section
  // =====================================================

  const renderWelcome = () => {
    const data = content.welcome;

    return (
      <ContentCard
        title="Welcome Section"
        description="Manage the introductory section shown below the hero."
        section="welcome"
      >
        <InputField
          label="Eyebrow"
          value={data.eyebrow}
          onChange={(value) =>
            updateField(
              "welcome",
              "eyebrow",
              value
            )
          }
        />

        <InputField
          label="Title"
          value={data.title}
          onChange={(value) =>
            updateField(
              "welcome",
              "title",
              value
            )
          }
        />

        <TextareaField
          label="Description"
          value={data.description}
          onChange={(value) =>
            updateField(
              "welcome",
              "description",
              value
            )
          }
        />

        <TextareaField
          label="Secondary Description"
          value={data.secondaryDescription}
          onChange={(value) =>
            updateField(
              "welcome",
              "secondaryDescription",
              value
            )
          }
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <InputField
            label="Button Text"
            value={data.button?.text}
            onChange={(value) =>
              updateNestedField(
                "welcome",
                "button",
                "text",
                value
              )
            }
          />

          <InputField
            label="Button Link"
            value={data.button?.link}
            onChange={(value) =>
              updateNestedField(
                "welcome",
                "button",
                "link",
                value
              )
            }
          />
        </div>

        <ImageUpload
          section="welcome"
          field="image"
          label="Welcome Image"
        />
      </ContentCard>
    );
  };

  // =====================================================
  // Generic Text Section
  // =====================================================

  const renderGenericSection = (
    sectionName
  ) => {
    const data = content[sectionName];

    return (
      <ContentCard
        title={
          sections.find(
            (item) => item.id === sectionName
          )?.title
        }
        description={
          sections.find(
            (item) => item.id === sectionName
          )?.description
        }
        section={sectionName}
      >
        <InputField
          label="Eyebrow"
          value={data?.eyebrow}
          onChange={(value) =>
            updateField(
              sectionName,
              "eyebrow",
              value
            )
          }
        />

        <InputField
          label="Title"
          value={data?.title}
          onChange={(value) =>
            updateField(
              sectionName,
              "title",
              value
            )
          }
        />

        <TextareaField
          label="Description"
          value={data?.description}
          onChange={(value) =>
            updateField(
              sectionName,
              "description",
              value
            )
          }
        />

        {data?.image && (
          <ImageUpload
            section={sectionName}
            field="image"
          />
        )}

        {data?.bannerImage && (
          <ImageUpload
            section={sectionName}
            field="bannerImage"
            label="Banner Image"
          />
        )}

        {data?.button && (
          <div className="grid gap-5 sm:grid-cols-2">
            <InputField
              label="Button Text"
              value={data.button.text}
              onChange={(value) =>
                updateNestedField(
                  sectionName,
                  "button",
                  "text",
                  value
                )
              }
            />

            <InputField
              label="Button Link"
              value={data.button.link}
              onChange={(value) =>
                updateNestedField(
                  sectionName,
                  "button",
                  "link",
                  value
                )
              }
            />
          </div>
        )}
      </ContentCard>
    );
  };

  // =====================================================
  // Oil / Ghee Sections
  // =====================================================

  const renderProductStorySection = (
    sectionName
  ) => {
    const data = content[sectionName];

    return (
      <ContentCard
        title={
          sectionName === "oilSection"
            ? "Cold Pressed Oils"
            : "A2 Ghee"
        }
        description="Manage product story content, image, points and CTA."
        section={sectionName}
      >
        <InputField
          label="Eyebrow"
          value={data.eyebrow}
          onChange={(value) =>
            updateField(
              sectionName,
              "eyebrow",
              value
            )
          }
        />

        <InputField
          label="Title"
          value={data.title}
          onChange={(value) =>
            updateField(
              sectionName,
              "title",
              value
            )
          }
        />

        <TextareaField
          label="Description"
          value={data.description}
          onChange={(value) =>
            updateField(
              sectionName,
              "description",
              value
            )
          }
        />

        <ImageUpload
          section={sectionName}
          field="image"
        />

        {/* Points */}

        <div>
          <label className="mb-3 block text-sm font-medium text-[#29321F]">
            Product Highlights
          </label>

          <div className="space-y-3">
            {(data.points || []).map(
              (point, index) => (
                <div
                  key={index}
                  className="flex gap-3"
                >
                  <input
                    value={point}
                    onChange={(e) => {
                      const updatedPoints = [
                        ...(data.points || []),
                      ];

                      updatedPoints[index] =
                        e.target.value;

                      setContent((prev) => ({
                        ...prev,
                        [sectionName]: {
                          ...prev[sectionName],
                          points: updatedPoints,
                        },
                      }));
                    }}
                    className="flex-1 rounded-xl border border-[#E6E1D8] bg-white px-4 py-3 text-sm outline-none focus:border-[#56663D] focus:ring-4 focus:ring-[#56663D]/10"
                  />

                  <button
                    type="button"
                    onClick={() => {
                      const updatedPoints =
                        data.points.filter(
                          (_, i) => i !== index
                        );

                      setContent((prev) => ({
                        ...prev,
                        [sectionName]: {
                          ...prev[sectionName],
                          points: updatedPoints,
                        },
                      }));
                    }}
                    className="rounded-xl border border-[#A6533D]/20 px-4 text-xs font-semibold text-[#A6533D] hover:bg-[#A6533D]/5"
                  >
                    Remove
                  </button>
                </div>
              )
            )}
          </div>

          <button
            type="button"
            onClick={() => {
              setContent((prev) => ({
                ...prev,
                [sectionName]: {
                  ...prev[sectionName],
                  points: [
                    ...(prev[sectionName].points ||
                      []),
                    "New highlight",
                  ],
                },
              }));
            }}
            className="mt-3 rounded-xl bg-[#E4EBD9] px-4 py-2.5 text-xs font-semibold text-[#56663D] transition hover:bg-[#DDE8D2]"
          >
            + Add Highlight
          </button>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <InputField
            label="Button Text"
            value={data.button?.text}
            onChange={(value) =>
              updateNestedField(
                sectionName,
                "button",
                "text",
                value
              )
            }
          />

          <InputField
            label="Button Link"
            value={data.button?.link}
            onChange={(value) =>
              updateNestedField(
                sectionName,
                "button",
                "link",
                value
              )
            }
          />
        </div>
      </ContentCard>
    );
  };

  // =====================================================
  // Why Choose Us
  // =====================================================

  const renderWhyChooseUs = () => {
    const data = content.whyChooseUs;

    return (
      <ContentCard
        title="Why Choose Us"
        description="Manage the trust and quality points displayed on the homepage."
        section="whyChooseUs"
      >
        <InputField
          label="Eyebrow"
          value={data.eyebrow}
          onChange={(value) =>
            updateField(
              "whyChooseUs",
              "eyebrow",
              value
            )
          }
        />

        <InputField
          label="Title"
          value={data.title}
          onChange={(value) =>
            updateField(
              "whyChooseUs",
              "title",
              value
            )
          }
        />

        <TextareaField
          label="Description"
          value={data.description}
          onChange={(value) =>
            updateField(
              "whyChooseUs",
              "description",
              value
            )
          }
        />

        <div className="space-y-4">
          {(data.features || []).map(
            (feature, index) => (
              <div
                key={feature.id || index}
                className="rounded-2xl border border-[#E6E1D8] bg-[#F7F5EF] p-5"
              >
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm font-semibold text-[#29321F]">
                    Feature {index + 1}
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      const updatedFeatures =
                        data.features.filter(
                          (_, i) => i !== index
                        );

                      setContent((prev) => ({
                        ...prev,
                        whyChooseUs: {
                          ...prev.whyChooseUs,
                          features:
                            updatedFeatures,
                        },
                      }));
                    }}
                    className="text-xs font-semibold text-[#A6533D]"
                  >
                    Remove
                  </button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <InputField
                    label="Title"
                    value={feature.title}
                    onChange={(value) => {
                      const updatedFeatures =
                        [...data.features];

                      updatedFeatures[index] = {
                        ...updatedFeatures[index],
                        title: value,
                      };

                      setContent((prev) => ({
                        ...prev,
                        whyChooseUs: {
                          ...prev.whyChooseUs,
                          features:
                            updatedFeatures,
                        },
                      }));
                    }}
                  />

                  <InputField
                    label="Icon Name"
                    value={feature.icon}
                    onChange={(value) => {
                      const updatedFeatures =
                        [...data.features];

                      updatedFeatures[index] = {
                        ...updatedFeatures[index],
                        icon: value,
                      };

                      setContent((prev) => ({
                        ...prev,
                        whyChooseUs: {
                          ...prev.whyChooseUs,
                          features:
                            updatedFeatures,
                        },
                      }));
                    }}
                  />
                </div>

                <div className="mt-4">
                  <TextareaField
                    label="Description"
                    value={feature.description}
                    rows={3}
                    onChange={(value) => {
                      const updatedFeatures =
                        [...data.features];

                      updatedFeatures[index] = {
                        ...updatedFeatures[index],
                        description: value,
                      };

                      setContent((prev) => ({
                        ...prev,
                        whyChooseUs: {
                          ...prev.whyChooseUs,
                          features:
                            updatedFeatures,
                        },
                      }));
                    }}
                  />
                </div>
              </div>
            )
          )}
        </div>

        <button
          type="button"
          onClick={() => {
            setContent((prev) => ({
              ...prev,
              whyChooseUs: {
                ...prev.whyChooseUs,
                features: [
                  ...(prev.whyChooseUs
                    .features || []),
                  {
                    id: Date.now(),
                    title: "New Feature",
                    description:
                      "Enter feature description.",
                    icon: "Leaf",
                  },
                ],
              },
            }));
          }}
          className="rounded-xl bg-[#E4EBD9] px-4 py-3 text-sm font-semibold text-[#56663D] hover:bg-[#DDE8D2]"
        >
          + Add Feature
        </button>
      </ContentCard>
    );
  };

  // =====================================================
  // Ingredients
  // =====================================================

  const renderIngredients = () => {
    const data = content.ingredients;

    return (
      <ContentCard
        title="Ingredients"
        description="Manage the ingredients story section."
        section="ingredients"
      >
        <InputField
          label="Eyebrow"
          value={data.eyebrow}
          onChange={(value) =>
            updateField(
              "ingredients",
              "eyebrow",
              value
            )
          }
        />

        <InputField
          label="Title"
          value={data.title}
          onChange={(value) =>
            updateField(
              "ingredients",
              "title",
              value
            )
          }
        />

        <TextareaField
          label="Description"
          value={data.description}
          onChange={(value) =>
            updateField(
              "ingredients",
              "description",
              value
            )
          }
        />

        <ImageUpload
          section="ingredients"
          field="image"
        />

        <div className="space-y-4">
          {(data.items || []).map(
            (item, index) => (
              <div
                key={item.id || index}
                className="rounded-2xl border border-[#E6E1D8] bg-[#F7F5EF] p-5"
              >
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm font-semibold text-[#29321F]">
                    Ingredient {index + 1}
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      const updatedItems =
                        data.items.filter(
                          (_, i) => i !== index
                        );

                      setContent((prev) => ({
                        ...prev,
                        ingredients: {
                          ...prev.ingredients,
                          items: updatedItems,
                        },
                      }));
                    }}
                    className="text-xs font-semibold text-[#A6533D]"
                  >
                    Remove
                  </button>
                </div>

                <InputField
                  label="Name"
                  value={item.name}
                  onChange={(value) => {
                    const updatedItems =
                      [...data.items];

                    updatedItems[index] = {
                      ...updatedItems[index],
                      name: value,
                    };

                    setContent((prev) => ({
                      ...prev,
                      ingredients: {
                        ...prev.ingredients,
                        items: updatedItems,
                      },
                    }));
                  }}
                />

                <div className="mt-4">
                  <TextareaField
                    label="Description"
                    value={item.description}
                    rows={3}
                    onChange={(value) => {
                      const updatedItems =
                        [...data.items];

                      updatedItems[index] = {
                        ...updatedItems[index],
                        description: value,
                      };

                      setContent((prev) => ({
                        ...prev,
                        ingredients: {
                          ...prev.ingredients,
                          items: updatedItems,
                        },
                      }));
                    }}
                  />
                </div>
              </div>
            )
          )}
        </div>

        <button
          type="button"
          onClick={() => {
            setContent((prev) => ({
              ...prev,
              ingredients: {
                ...prev.ingredients,
                items: [
                  ...(prev.ingredients.items ||
                    []),
                  {
                    id: Date.now(),
                    name: "New Ingredient",
                    description:
                      "Enter ingredient description.",
                  },
                ],
              },
            }));
          }}
          className="rounded-xl bg-[#E4EBD9] px-4 py-3 text-sm font-semibold text-[#56663D] hover:bg-[#DDE8D2]"
        >
          + Add Ingredient
        </button>
      </ContentCard>
    );
  };

  // =====================================================
  // Testimonials
  // =====================================================

  const renderTestimonials = () => {
    const data = content.testimonials;

    return (
      <ContentCard
        title="Testimonials"
        description="Manage customer testimonials displayed on the homepage."
        section="testimonials"
      >
        <InputField
          label="Eyebrow"
          value={data.eyebrow}
          onChange={(value) =>
            updateField(
              "testimonials",
              "eyebrow",
              value
            )
          }
        />

        <InputField
          label="Title"
          value={data.title}
          onChange={(value) =>
            updateField(
              "testimonials",
              "title",
              value
            )
          }
        />

        <TextareaField
          label="Description"
          value={data.description}
          onChange={(value) =>
            updateField(
              "testimonials",
              "description",
              value
            )
          }
        />

        <div className="space-y-4">
          {(data.items || []).map(
            (item, index) => (
              <div
                key={item.id || index}
                className="rounded-2xl border border-[#E6E1D8] bg-[#F7F5EF] p-5"
              >
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm font-semibold text-[#29321F]">
                    Testimonial {index + 1}
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      const updatedItems =
                        data.items.filter(
                          (_, i) => i !== index
                        );

                      setContent((prev) => ({
                        ...prev,
                        testimonials: {
                          ...prev.testimonials,
                          items: updatedItems,
                        },
                      }));
                    }}
                    className="text-xs font-semibold text-[#A6533D]"
                  >
                    Remove
                  </button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <InputField
                    label="Customer Name"
                    value={item.name}
                    onChange={(value) => {
                      const updatedItems =
                        [...data.items];

                      updatedItems[index] = {
                        ...updatedItems[index],
                        name: value,
                      };

                      setContent((prev) => ({
                        ...prev,
                        testimonials: {
                          ...prev.testimonials,
                          items: updatedItems,
                        },
                      }));
                    }}
                  />

                  <InputField
                    label="Location"
                    value={item.location}
                    onChange={(value) => {
                      const updatedItems =
                        [...data.items];

                      updatedItems[index] = {
                        ...updatedItems[index],
                        location: value,
                      };

                      setContent((prev) => ({
                        ...prev,
                        testimonials: {
                          ...prev.testimonials,
                          items: updatedItems,
                        },
                      }));
                    }}
                  />
                </div>

                <div className="mt-4">
                  <TextareaField
                    label="Customer Message"
                    value={item.message}
                    rows={3}
                    onChange={(value) => {
                      const updatedItems =
                        [...data.items];

                      updatedItems[index] = {
                        ...updatedItems[index],
                        message: value,
                      };

                      setContent((prev) => ({
                        ...prev,
                        testimonials: {
                          ...prev.testimonials,
                          items: updatedItems,
                        },
                      }));
                    }}
                  />
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <InputField
                    label="Rating"
                    type="number"
                    value={item.rating}
                    onChange={(value) => {
                      const updatedItems =
                        [...data.items];

                      updatedItems[index] = {
                        ...updatedItems[index],
                        rating: Number(value),
                      };

                      setContent((prev) => ({
                        ...prev,
                        testimonials: {
                          ...prev.testimonials,
                          items: updatedItems,
                        },
                      }));
                    }}
                  />

                  <label className="flex items-center gap-2 self-end pb-3 text-sm text-[#777568]">
                    <input
                      type="checkbox"
                      checked={
                        item.featured || false
                      }
                      onChange={(e) => {
                        const updatedItems =
                          [...data.items];

                        updatedItems[index] = {
                          ...updatedItems[index],
                          featured:
                            e.target.checked,
                        };

                        setContent((prev) => ({
                          ...prev,
                          testimonials: {
                            ...prev.testimonials,
                            items: updatedItems,
                          },
                        }));
                      }}
                      className="h-4 w-4 accent-[#56663D]"
                    />

                    Featured testimonial
                  </label>
                </div>
              </div>
            )
          )}
        </div>

        <button
          type="button"
          onClick={() => {
            setContent((prev) => ({
              ...prev,
              testimonials: {
                ...prev.testimonials,
                items: [
                  ...(prev.testimonials.items ||
                    []),
                  {
                    id: Date.now(),
                    name: "New Customer",
                    location: "India",
                    rating: 5,
                    message:
                      "Enter customer testimonial.",
                    image: "",
                    featured: false,
                  },
                ],
              },
            }));
          }}
          className="rounded-xl bg-[#E4EBD9] px-4 py-3 text-sm font-semibold text-[#56663D] hover:bg-[#DDE8D2]"
        >
          + Add Testimonial
        </button>
      </ContentCard>
    );
  };

  // =====================================================
  // Newsletter
  // =====================================================

  const renderNewsletter = () => {
    const data = content.newsletter;

    return (
      <ContentCard
        title="Newsletter"
        description="Manage the newsletter subscription section."
        section="newsletter"
      >
        <InputField
          label="Eyebrow"
          value={data.eyebrow}
          onChange={(value) =>
            updateField(
              "newsletter",
              "eyebrow",
              value
            )
          }
        />

        <InputField
          label="Title"
          value={data.title}
          onChange={(value) =>
            updateField(
              "newsletter",
              "title",
              value
            )
          }
        />

        <TextareaField
          label="Description"
          value={data.description}
          onChange={(value) =>
            updateField(
              "newsletter",
              "description",
              value
            )
          }
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <InputField
            label="Input Placeholder"
            value={data.placeholder}
            onChange={(value) =>
              updateField(
                "newsletter",
                "placeholder",
                value
              )
            }
          />

          <InputField
            label="Button Text"
            value={data.buttonText}
            onChange={(value) =>
              updateField(
                "newsletter",
                "buttonText",
                value
              )
            }
          />
        </div>

        <TextareaField
          label="Success Message"
          value={data.successMessage}
          onChange={(value) =>
            updateField(
              "newsletter",
              "successMessage",
              value
            )
          }
        />
      </ContentCard>
    );
  };

  // =====================================================
  // Trust Stats
  // =====================================================

  const renderTrustStats = () => {
    const data = content.trustStats;

    return (
      <ContentCard
        title="Trust Statistics"
        description="Manage the statistics displayed near the bottom of the homepage."
        section="trustStats"
      >
        <div className="space-y-4">
          {(data.items || []).map(
            (item, index) => (
              <div
                key={item.id || index}
                className="grid gap-4 rounded-2xl border border-[#E6E1D8] bg-[#F7F5EF] p-5 sm:grid-cols-2"
              >
                <InputField
                  label="Value"
                  value={item.value}
                  onChange={(value) => {
                    const updatedItems =
                      [...data.items];

                    updatedItems[index] = {
                      ...updatedItems[index],
                      value,
                    };

                    setContent((prev) => ({
                      ...prev,
                      trustStats: {
                        ...prev.trustStats,
                        items: updatedItems,
                      },
                    }));
                  }}
                />

                <InputField
                  label="Label"
                  value={item.label}
                  onChange={(value) => {
                    const updatedItems =
                      [...data.items];

                    updatedItems[index] = {
                      ...updatedItems[index],
                      label: value,
                    };

                    setContent((prev) => ({
                      ...prev,
                      trustStats: {
                        ...prev.trustStats,
                        items: updatedItems,
                      },
                    }));
                  }}
                />

                <button
                  type="button"
                  onClick={() => {
                    const updatedItems =
                      data.items.filter(
                        (_, i) => i !== index
                      );

                    setContent((prev) => ({
                      ...prev,
                      trustStats: {
                        ...prev.trustStats,
                        items: updatedItems,
                      },
                    }));
                  }}
                  className="w-fit rounded-lg px-3 py-2 text-xs font-semibold text-[#A6533D] hover:bg-[#A6533D]/5"
                >
                  Remove Statistic
                </button>
              </div>
            )
          )}
        </div>

        <button
          type="button"
          onClick={() => {
            setContent((prev) => ({
              ...prev,
              trustStats: {
                ...prev.trustStats,
                items: [
                  ...(prev.trustStats.items ||
                    []),
                  {
                    id: Date.now(),
                    value: "100+",
                    label: "New Statistic",
                  },
                ],
              },
            }));
          }}
          className="rounded-xl bg-[#E4EBD9] px-4 py-3 text-sm font-semibold text-[#56663D] hover:bg-[#DDE8D2]"
        >
          + Add Statistic
        </button>
      </ContentCard>
    );
  };

  // =====================================================
  // Content Card
  // =====================================================

  const ContentCard = ({
    title,
    description,
    section,
    children,
  }) => {
    return (
      <motion.div
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.35,
        }}
        className="rounded-2xl border border-[#E6E1D8] bg-white shadow-sm"
      >
        {/* Header */}

        <div className="flex flex-col gap-4 border-b border-[#E6E1D8] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <h2 className="text-lg font-semibold text-[#29321F]">
              {title}
            </h2>

            <p className="mt-1 max-w-2xl text-sm leading-6 text-[#777568]">
              {description}
            </p>
          </div>

          <VisibilityToggle
            section={section}
          />
        </div>

        {/* Content */}

        <div className="space-y-5 p-5 sm:p-6">
          {children}
        </div>
      </motion.div>
    );
  };

  // =====================================================
  // Render Active Section
  // =====================================================

  const renderActiveSection = () => {
    switch (activeSection) {
      case "announcement":
        return renderAnnouncement();

      case "hero":
        return renderHero();

      case "welcome":
        return renderWelcome();

      case "whyChooseUs":
        return renderWhyChooseUs();

      case "ingredients":
        return renderIngredients();

      case "oilSection":
      case "gheeSection":
        return renderProductStorySection(
          activeSection
        );

      case "testimonials":
        return renderTestimonials();

      case "newsletter":
        return renderNewsletter();

      case "trustStats":
        return renderTrustStats();

      default:
        return renderGenericSection(
          activeSection
        );
    }
  };

  // =====================================================
  // JSX
  // =====================================================

  return (
    <div className="min-h-screen bg-[#F7F5EF]">

      {/* ==================================================
          PAGE HEADER
      ================================================== */}

      <div className="border-b border-[#E6E1D8] bg-white">
        <div className="mx-auto max-w-[1600px] px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#9A7B2F]">
                <Home size={14} />
                Admin Panel
              </div>

              <h1 className="text-2xl font-semibold text-[#29321F] sm:text-3xl">
                Content Management
              </h1>

              <p className="mt-1 text-sm text-[#777568]">
                Manage your homepage content, images,
                promotional sections and visibility.
              </p>
            </div>

            {/* Actions */}

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center justify-center gap-2 rounded-xl border border-[#E6E1D8] bg-white px-4 py-3 text-sm font-semibold text-[#765A3A] transition hover:bg-[#EEE4D7]"
              >
                <RefreshCw size={17} />

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
                className="flex items-center justify-center gap-2 rounded-xl bg-[#56663D] px-5 py-3 text-sm font-semibold text-white shadow-md shadow-[#56663D]/10 transition hover:bg-[#465532]"
              >
                <Save size={17} />

                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ==================================================
          STATUS MESSAGE
      ================================================== */}

      <div className="mx-auto max-w-[1600px] px-4 pt-5 sm:px-6 lg:px-8">
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

            Homepage content saved successfully.
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
          MAIN CONTENT
      ================================================== */}

      <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">

          {/* ==================================================
              SIDEBAR
          ================================================== */}

          <aside className="h-fit rounded-2xl border border-[#E6E1D8] bg-white p-3 shadow-sm lg:sticky lg:top-6">

            <div className="mb-3 px-3 py-2">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9A7B2F]">
                Homepage Sections
              </p>
            </div>

            <div className="space-y-1">
              {sections.map((section) => {
                const Icon = section.icon;

                const isActive =
                  activeSection ===
                  section.id;

                const isEnabled =
                  content[
                    section.id
                  ]?.enabled;

                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() =>
                      setActiveSection(
                        section.id
                      )
                    }
                    className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all ${
                      isActive
                        ? "bg-[#56663D] text-white shadow-md"
                        : "text-[#29321F] hover:bg-[#E4EBD9]"
                    }`}
                  >
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                        isActive
                          ? "bg-white/10"
                          : "bg-[#F7F5EF]"
                      }`}
                    >
                      <Icon
                        size={17}
                        className={
                          isActive
                            ? "text-white"
                            : "text-[#56663D]"
                        }
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p
                        className={`truncate text-xs font-semibold ${
                          isActive
                            ? "text-white"
                            : "text-[#29321F]"
                        }`}
                      >
                        {section.title}
                      </p>

                      <p
                        className={`mt-0.5 truncate text-[10px] ${
                          isActive
                            ? "text-white/60"
                            : "text-[#99978B]"
                        }`}
                      >
                        {section.description}
                      </p>
                    </div>

                    {isEnabled !==
                      undefined && (
                      <span
                        className={`h-2 w-2 shrink-0 rounded-full ${
                          isEnabled
                            ? isActive
                              ? "bg-[#F3E8C8]"
                              : "bg-[#56663D]"
                            : "bg-[#C8C3B8]"
                        }`}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </aside>

          {/* ==================================================
              CONTENT
          ================================================== */}

          <main className="min-w-0">
            {renderActiveSection()}

            {/* ==================================================
                BOTTOM SAVE BAR
            ================================================== */}

            <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-[#E6E1D8] bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-[#29321F]">
                  Ready to publish your changes?
                </p>

                <p className="mt-1 text-xs text-[#777568]">
                  Save your changes to update the
                  homepage content.
                </p>
              </div>

              <button
                type="button"
                onClick={handleSave}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#56663D] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#465532]"
              >
                <Save size={17} />

                Save Changes
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ContentManagement;

