import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Upload,
  Image as ImageIcon,
  Trash2,
  Eye,
  X,
  CheckCircle,
  AlertCircle,
  FolderOpen,
  Filter,
  Copy,
  ExternalLink,
  RefreshCw,
} from "lucide-react";

const STORAGE_KEY = "srikrishn_images";

const defaultImages = [
  {
    id: 1,
    name: "Homepage Hero",
    category: "Hero",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80",
    altText: "Fresh organic vegetables",
    status: "Active",
    createdAt: "2026-09-01",
  },
  {
    id: 2,
    name: "Welcome Section",
    category: "Homepage",
    image:
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=80",
    altText: "Healthy organic food",
    status: "Active",
    createdAt: "2026-09-02",
  },
  {
    id: 3,
    name: "Cold Pressed Oils",
    category: "Products",
    image:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=1000&q=80",
    altText: "Cold pressed oil",
    status: "Active",
    createdAt: "2026-09-03",
  },
  {
    id: 4,
    name: "Organic Spices",
    category: "Products",
    image:
      "https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=1000&q=80",
    altText: "Organic spices",
    status: "Active",
    createdAt: "2026-09-04",
  },
];

const ImageManagement = () => {
  const [images, setImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const [deleteImage, setDeleteImage] = useState(null);

  const [uploadData, setUploadData] = useState({
    name: "",
    category: "Products",
    altText: "",
    file: null,
    preview: "",
  });

  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  // --------------------------------------------------
  // LOAD IMAGES
  // --------------------------------------------------

  useEffect(() => {
    const savedImages = localStorage.getItem(STORAGE_KEY);

    if (savedImages) {
      try {
        setImages(JSON.parse(savedImages));
      } catch (error) {
        setImages(defaultImages);
      }
    } else {
      setImages(defaultImages);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultImages));
    }
  }, []);

  // --------------------------------------------------
  // SAVE TO LOCAL STORAGE
  // --------------------------------------------------

  useEffect(() => {
    if (images.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
    }
  }, [images]);

  // --------------------------------------------------
  // MESSAGE
  // --------------------------------------------------

  const showMessage = (type, text) => {
    setMessage({
      type,
      text,
    });

    setTimeout(() => {
      setMessage({
        type: "",
        text: "",
      });
    }, 3000);
  };

  // --------------------------------------------------
  // CATEGORIES
  // --------------------------------------------------

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(images.map((item) => item.category)),
    ];

    return ["All", ...uniqueCategories];
  }, [images]);

  // --------------------------------------------------
  // FILTER IMAGES
  // --------------------------------------------------

  const filteredImages = useMemo(() => {
    return images.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.altText.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        categoryFilter === "All" || item.category === categoryFilter;

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [images, searchTerm, categoryFilter, statusFilter]);

  // --------------------------------------------------
  // HANDLE FILE
  // --------------------------------------------------

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showMessage("error", "Please select a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showMessage("error", "Image size must be less than 5MB.");
      return;
    }

    const preview = URL.createObjectURL(file);

    setUploadData((prev) => ({
      ...prev,
      file,
      preview,
    }));
  };

  // --------------------------------------------------
  // UPLOAD IMAGE
  // --------------------------------------------------

  const handleUpload = (event) => {
    event.preventDefault();

    if (!uploadData.name.trim()) {
      showMessage("error", "Please enter image name.");
      return;
    }

    if (!uploadData.file) {
      showMessage("error", "Please select an image.");
      return;
    }

    const newImage = {
      id: Date.now(),
      name: uploadData.name.trim(),
      category: uploadData.category,
      image: uploadData.preview,
      altText: uploadData.altText.trim() || uploadData.name.trim(),
      status: "Active",
      createdAt: new Date().toISOString().split("T")[0],
    };

    setImages((prev) => [newImage, ...prev]);

    setUploadData({
      name: "",
      category: "Products",
      altText: "",
      file: null,
      preview: "",
    });

    setShowUploadModal(false);

    showMessage("success", "Image uploaded successfully.");
  };

  // --------------------------------------------------
  // DELETE IMAGE
  // --------------------------------------------------

  const handleDelete = () => {
    if (!deleteImage) return;

    setImages((prev) =>
      prev.filter((item) => item.id !== deleteImage.id)
    );

    setDeleteImage(null);

    showMessage("success", "Image deleted successfully.");
  };

  // --------------------------------------------------
  // TOGGLE STATUS
  // --------------------------------------------------

  const toggleStatus = (id) => {
    setImages((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "Active" ? "Inactive" : "Active",
            }
          : item
      )
    );

    showMessage("success", "Image status updated.");
  };

  // --------------------------------------------------
  // COPY IMAGE URL
  // --------------------------------------------------

  const copyImageUrl = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      showMessage("success", "Image URL copied.");
    } catch (error) {
      showMessage("error", "Unable to copy image URL.");
    }
  };

  // --------------------------------------------------
  // RESET DEMO IMAGES
  // --------------------------------------------------

  const resetImages = () => {
    setImages(defaultImages);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultImages));

    showMessage("success", "Demo images restored.");
  };

  return (
    <div className="min-h-screen bg-[#F7F5EF] px-4 py-6 sm:px-6 lg:px-8">

      {/* --------------------------------------------------
          HEADER
      -------------------------------------------------- */}

      <div className="mx-auto max-w-7xl">

        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-[#9A7B2F]">
                <ImageIcon size={17} />
                Media Library
              </div>

              <h1 className="text-2xl font-bold text-[#29321F] sm:text-3xl">
                Image Management
              </h1>

              <p className="mt-1 max-w-2xl text-sm text-[#777568] sm:text-base">
                Upload, manage and organize images used across your
                Srikrishn Organics website.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">

              <button
                type="button"
                onClick={resetImages}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#E6E1D8] bg-white px-4 py-3 text-sm font-semibold text-[#56663D] transition hover:bg-[#E4EBD9]"
              >
                <RefreshCw size={17} />
                Reset Demo
              </button>

              <button
                type="button"
                onClick={() => setShowUploadModal(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#56663D] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#465532]"
              >
                <Upload size={18} />
                Upload Image
              </button>

            </div>
          </div>
        </motion.div>

        {/* --------------------------------------------------
            MESSAGE
        -------------------------------------------------- */}

        <AnimatePresence>
          {message.text && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`mb-5 flex items-center gap-3 rounded-xl border px-4 py-3 text-sm ${
                message.type === "success"
                  ? "border-[#C8D8B8] bg-[#E4EBD9] text-[#465532]"
                  : "border-[#E5C5BB] bg-[#F8E8E3] text-[#8F4534]"
              }`}
            >
              {message.type === "success" ? (
                <CheckCircle size={19} />
              ) : (
                <AlertCircle size={19} />
              )}

              <span>{message.text}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --------------------------------------------------
            STAT CARDS
        -------------------------------------------------- */}

        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">

          <StatCard
            icon={<ImageIcon size={21} />}
            title="Total Images"
            value={images.length}
          />

          <StatCard
            icon={<FolderOpen size={21} />}
            title="Categories"
            value={Math.max(categories.length - 1, 0)}
          />

          <StatCard
            icon={<CheckCircle size={21} />}
            title="Active"
            value={images.filter((item) => item.status === "Active").length}
          />

          <StatCard
            icon={<Eye size={21} />}
            title="Inactive"
            value={images.filter((item) => item.status === "Inactive").length}
          />

        </div>

        {/* --------------------------------------------------
            FILTERS
        -------------------------------------------------- */}

        <div className="mb-6 rounded-2xl border border-[#E6E1D8] bg-white p-4 shadow-sm">

          <div className="grid gap-4 md:grid-cols-3">

            {/* SEARCH */}

            <div className="relative md:col-span-1">

              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#777568]"
              />

              <input
                type="text"
                placeholder="Search images..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="w-full rounded-xl border border-[#E6E1D8] bg-[#F7F5EF] py-3 pl-10 pr-4 text-sm text-[#29321F] outline-none transition focus:border-[#56663D] focus:ring-2 focus:ring-[#E4EBD9]"
              />

            </div>

            {/* CATEGORY */}

            <div className="relative">

              <Filter
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#777568]"
              />

              <select
                value={categoryFilter}
                onChange={(event) => setCategoryFilter(event.target.value)}
                className="w-full appearance-none rounded-xl border border-[#E6E1D8] bg-[#F7F5EF] py-3 pl-10 pr-4 text-sm text-[#29321F] outline-none focus:border-[#56663D]"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "All"
                      ? "All Categories"
                      : category}
                  </option>
                ))}
              </select>

            </div>

            {/* STATUS */}

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="w-full rounded-xl border border-[#E6E1D8] bg-[#F7F5EF] px-4 py-3 text-sm text-[#29321F] outline-none focus:border-[#56663D]"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

          </div>

        </div>

        {/* --------------------------------------------------
            IMAGE GRID
        -------------------------------------------------- */}

        {filteredImages.length === 0 ? (

          <EmptyImages
            onUpload={() => setShowUploadModal(true)}
            searchTerm={searchTerm}
          />

        ) : (

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {filteredImages.map((item, index) => (

              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.04,
                }}
                className="group overflow-hidden rounded-2xl border border-[#E6E1D8] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >

                {/* IMAGE */}

                <div className="relative aspect-[4/3] overflow-hidden bg-[#EEE4D7]">

                  <img
                    src={item.image}
                    alt={item.altText}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  {/* STATUS */}

                  <div className="absolute left-3 top-3">

                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold backdrop-blur-sm ${
                        item.status === "Active"
                          ? "bg-[#E4EBD9]/95 text-[#465532]"
                          : "bg-[#F8E8E3]/95 text-[#8F4534]"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          item.status === "Active"
                            ? "bg-[#56663D]"
                            : "bg-[#A6533D]"
                        }`}
                      />

                      {item.status}
                    </span>

                  </div>

                  {/* HOVER ACTIONS */}

                  <div className="absolute inset-0 flex items-center justify-center gap-2 bg-[#29321F]/50 opacity-0 backdrop-blur-[2px] transition group-hover:opacity-100">

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedImage(item);
                        setShowPreviewModal(true);
                      }}
                      className="rounded-xl bg-white p-3 text-[#56663D] shadow-lg transition hover:scale-105"
                      title="Preview"
                    >
                      <Eye size={19} />
                    </button>

                    <button
                      type="button"
                      onClick={() => copyImageUrl(item.image)}
                      className="rounded-xl bg-white p-3 text-[#56663D] shadow-lg transition hover:scale-105"
                      title="Copy URL"
                    >
                      <Copy size={19} />
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeleteImage(item)}
                      className="rounded-xl bg-white p-3 text-[#A6533D] shadow-lg transition hover:scale-105"
                      title="Delete"
                    >
                      <Trash2 size={19} />
                    </button>

                  </div>

                </div>

                {/* CONTENT */}

                <div className="p-4">

                  <div className="mb-3 flex items-start justify-between gap-3">

                    <div className="min-w-0">

                      <h3 className="truncate text-base font-bold text-[#29321F]">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-xs text-[#777568]">
                        {item.category}
                      </p>

                    </div>

                    <button
                      type="button"
                      onClick={() => toggleStatus(item.id)}
                      className={`shrink-0 rounded-lg p-2 transition ${
                        item.status === "Active"
                          ? "bg-[#E4EBD9] text-[#56663D] hover:bg-[#DDE8D2]"
                          : "bg-[#F8E8E3] text-[#A6533D] hover:bg-[#F2DDD7]"
                      }`}
                      title="Change status"
                    >
                      {item.status === "Active" ? (
                        <Eye size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>

                  </div>

                  <p className="mb-3 truncate text-xs text-[#777568]">
                    {item.altText}
                  </p>

                  <div className="flex items-center justify-between border-t border-[#E6E1D8] pt-3">

                    <span className="text-xs text-[#777568]">
                      {item.createdAt}
                    </span>

                    <button
                      type="button"
                      onClick={() => setDeleteImage(item)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#A6533D] transition hover:text-[#8F4534]"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>

                  </div>

                </div>

              </motion.div>

            ))}

          </div>

        )}

      </div>

      {/* --------------------------------------------------
          UPLOAD MODAL
      -------------------------------------------------- */}

      <AnimatePresence>
        {showUploadModal && (
          <ModalOverlay onClose={() => setShowUploadModal(false)}>

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >

              {/* MODAL HEADER */}

              <div className="flex items-center justify-between border-b border-[#E6E1D8] px-5 py-4 sm:px-6">

                <div>
                  <h2 className="text-lg font-bold text-[#29321F]">
                    Upload Image
                  </h2>

                  <p className="mt-1 text-xs text-[#777568]">
                    Add a new image to your media library.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="rounded-lg p-2 text-[#777568] transition hover:bg-[#F7F5EF] hover:text-[#29321F]"
                >
                  <X size={20} />
                </button>

              </div>

              {/* FORM */}

              <form
                onSubmit={handleUpload}
                className="space-y-5 p-5 sm:p-6"
              >

                {/* IMAGE PREVIEW */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-[#29321F]">
                    Image
                  </label>

                  {uploadData.preview ? (

                    <div className="relative overflow-hidden rounded-2xl border border-[#E6E1D8] bg-[#F7F5EF]">

                      <img
                        src={uploadData.preview}
                        alt="Preview"
                        className="h-56 w-full object-cover sm:h-64"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setUploadData((prev) => ({
                            ...prev,
                            file: null,
                            preview: "",
                          }))
                        }
                        className="absolute right-3 top-3 rounded-xl bg-white p-2 text-[#A6533D] shadow-md"
                      >
                        <X size={17} />
                      </button>

                    </div>

                  ) : (

                    <label className="flex min-h-48 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#D8D4CA] bg-[#F7F5EF] px-4 text-center transition hover:border-[#56663D] hover:bg-[#E4EBD9]/40">

                      <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E4EBD9] text-[#56663D]">
                        <Upload size={24} />
                      </div>

                      <p className="text-sm font-semibold text-[#29321F]">
                        Click to upload an image
                      </p>

                      <p className="mt-1 text-xs text-[#777568]">
                        PNG, JPG, JPEG or WEBP • Max 5MB
                      </p>

                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />

                    </label>

                  )}

                </div>

                {/* NAME */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-[#29321F]">
                    Image Name *
                  </label>

                  <input
                    type="text"
                    value={uploadData.name}
                    onChange={(event) =>
                      setUploadData((prev) => ({
                        ...prev,
                        name: event.target.value,
                      }))
                    }
                    placeholder="Example: Homepage Hero"
                    className="w-full rounded-xl border border-[#E6E1D8] bg-[#F7F5EF] px-4 py-3 text-sm outline-none transition focus:border-[#56663D] focus:ring-2 focus:ring-[#E4EBD9]"
                  />

                </div>

                {/* CATEGORY */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-[#29321F]">
                    Category *
                  </label>

                  <select
                    value={uploadData.category}
                    onChange={(event) =>
                      setUploadData((prev) => ({
                        ...prev,
                        category: event.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-[#E6E1D8] bg-[#F7F5EF] px-4 py-3 text-sm outline-none focus:border-[#56663D]"
                  >
                    <option value="Hero">Hero</option>
                    <option value="Homepage">Homepage</option>
                    <option value="Products">Products</option>
                    <option value="Categories">Categories</option>
                    <option value="Offers">Offers</option>
                    <option value="Testimonials">Testimonials</option>
                    <option value="Banners">Banners</option>
                    <option value="Other">Other</option>
                  </select>

                </div>

                {/* ALT TEXT */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-[#29321F]">
                    Alt Text
                  </label>

                  <input
                    type="text"
                    value={uploadData.altText}
                    onChange={(event) =>
                      setUploadData((prev) => ({
                        ...prev,
                        altText: event.target.value,
                      }))
                    }
                    placeholder="Describe the image"
                    className="w-full rounded-xl border border-[#E6E1D8] bg-[#F7F5EF] px-4 py-3 text-sm outline-none transition focus:border-[#56663D] focus:ring-2 focus:ring-[#E4EBD9]"
                  />

                </div>

                {/* CLOUDINARY NOTE */}

                <div className="rounded-xl border border-[#E6E1D8] bg-[#F7F5EF] p-4">

                  <div className="flex gap-3">

                    <div className="mt-0.5 text-[#9A7B2F]">
                      <ImageIcon size={18} />
                    </div>

                    <div>

                      <p className="text-sm font-semibold text-[#29321F]">
                        Cloudinary ready
                      </p>

                      <p className="mt-1 text-xs leading-5 text-[#777568]">
                        Currently images are stored as local previews.
                        Later, this upload function can be connected to
                        Cloudinary so uploaded images receive permanent
                        URLs.
                      </p>

                    </div>

                  </div>

                </div>

                {/* BUTTONS */}

                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="rounded-xl border border-[#E6E1D8] px-5 py-3 text-sm font-semibold text-[#56663D] transition hover:bg-[#F7F5EF]"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#56663D] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#465532]"
                  >
                    <Upload size={17} />
                    Upload Image
                  </button>

                </div>

              </form>

            </motion.div>

          </ModalOverlay>
        )}
      </AnimatePresence>

      {/* --------------------------------------------------
          PREVIEW MODAL
      -------------------------------------------------- */}

      <AnimatePresence>
        {showPreviewModal && selectedImage && (
          <ModalOverlay onClose={() => setShowPreviewModal(false)}>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >

              <div className="flex items-center justify-between border-b border-[#E6E1D8] px-5 py-4">

                <div>
                  <h2 className="font-bold text-[#29321F]">
                    {selectedImage.name}
                  </h2>

                  <p className="mt-1 text-xs text-[#777568]">
                    {selectedImage.category}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowPreviewModal(false)}
                  className="rounded-lg p-2 text-[#777568] hover:bg-[#F7F5EF]"
                >
                  <X size={20} />
                </button>

              </div>

              <div className="p-5 sm:p-6">

                <div className="overflow-hidden rounded-2xl bg-[#F7F5EF]">
                  <img
                    src={selectedImage.image}
                    alt={selectedImage.altText}
                    className="max-h-[65vh] w-full object-contain"
                  />
                </div>

                <div className="mt-5 rounded-xl border border-[#E6E1D8] bg-[#F7F5EF] p-4">

                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#777568]">
                    Image URL
                  </p>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

                    <p className="min-w-0 flex-1 break-all text-xs text-[#29321F]">
                      {selectedImage.image}
                    </p>

                    <button
                      type="button"
                      onClick={() => copyImageUrl(selectedImage.image)}
                      className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#56663D] px-3 py-2 text-xs font-semibold text-white"
                    >
                      <Copy size={14} />
                      Copy URL
                    </button>

                  </div>

                </div>

              </div>

            </motion.div>

          </ModalOverlay>
        )}
      </AnimatePresence>

      {/* --------------------------------------------------
          DELETE MODAL
      -------------------------------------------------- */}

      <AnimatePresence>
        {deleteImage && (

          <ModalOverlay onClose={() => setDeleteImage(null)}>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F8E8E3] text-[#A6533D]">
                <Trash2 size={22} />
              </div>

              <h2 className="mt-5 text-xl font-bold text-[#29321F]">
                Delete Image?
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#777568]">
                Are you sure you want to delete{" "}
                <strong className="text-[#29321F]">
                  {deleteImage.name}
                </strong>
                ? This action cannot be undone.
              </p>

              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={() => setDeleteImage(null)}
                  className="rounded-xl border border-[#E6E1D8] px-5 py-3 text-sm font-semibold text-[#56663D] hover:bg-[#F7F5EF]"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleDelete}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#A6533D] px-5 py-3 text-sm font-semibold text-white hover:bg-[#8F4534]"
                >
                  <Trash2 size={17} />
                  Delete Image
                </button>

              </div>

            </motion.div>

          </ModalOverlay>

        )}
      </AnimatePresence>

    </div>
  );
};

// ======================================================
// STAT CARD
// ======================================================

const StatCard = ({ icon, title, value }) => {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="rounded-2xl border border-[#E6E1D8] bg-white p-4 shadow-sm"
    >
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#E4EBD9] text-[#56663D]">
        {icon}
      </div>

      <p className="text-xs font-medium text-[#777568]">
        {title}
      </p>

      <p className="mt-1 text-xl font-bold text-[#29321F] sm:text-2xl">
        {value}
      </p>
    </motion.div>
  );
};

// ======================================================
// EMPTY STATE
// ======================================================

const EmptyImages = ({ onUpload, searchTerm }) => {
  return (
    <div className="rounded-2xl border border-[#E6E1D8] bg-white px-6 py-14 text-center shadow-sm">

      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E4EBD9] text-[#56663D]">
        <ImageIcon size={28} />
      </div>

      <h3 className="mt-5 text-lg font-bold text-[#29321F]">
        No images found
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#777568]">
        {searchTerm
          ? "Try changing your search or filter."
          : "Upload your first image to start building your media library."}
      </p>

      {!searchTerm && (
        <button
          type="button"
          onClick={onUpload}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#56663D] px-5 py-3 text-sm font-semibold text-white hover:bg-[#465532]"
        >
          <Upload size={17} />
          Upload Image
        </button>
      )}

    </div>
  );
};

// ======================================================
// MODAL OVERLAY
// ======================================================

const ModalOverlay = ({ children, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#29321F]/55 p-4 backdrop-blur-sm"
    >
      {children}
    </motion.div>
  );
};

export default ImageManagement;

