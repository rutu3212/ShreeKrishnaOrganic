import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CategoryContext = createContext(null);

// Demo categories
// Later these can come from your backend/API.
const initialCategories = [
  {
    id: 1,
    name: "Cold Pressed Oils",
    description:
      "Traditional wood pressed oils made from naturally sourced seeds.",
    image: "",
    status: "Active",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: "A2 Ghee",
    description:
      "Pure traditional A2 ghee prepared using traditional methods.",
    image: "",
    status: "Active",
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Spices",
    description:
      "Authentic spices carefully sourced for rich natural flavour.",
    image: "",
    status: "Active",
    createdAt: new Date().toISOString(),
  },
];

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState(() => {
    try {
      const savedCategories = localStorage.getItem("srikrishn_categories");

      return savedCategories
        ? JSON.parse(savedCategories)
        : initialCategories;
    } catch (error) {
      console.error("Failed to load categories:", error);
      return initialCategories;
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Save categories locally
  // This is temporary frontend storage.
  // Later replace this with API calls.
  useEffect(() => {
    try {
      localStorage.setItem(
        "srikrishn_categories",
        JSON.stringify(categories)
      );
    } catch (error) {
      console.error("Failed to save categories:", error);
    }
  }, [categories]);

  // Get all categories
  const getCategories = async () => {
    try {
      setLoading(true);
      setError("");

      // TODO:
      // Replace with API call later.
      //
      // const response = await api.get("/categories");
      // setCategories(response.data);

      return categories;
    } catch (err) {
      console.error("Get categories error:", err);
      setError("Unable to load categories.");
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Get category by ID
  const getCategoryById = (id) => {
    return categories.find(
      (category) => String(category.id) === String(id)
    );
  };

  // Add category
  const addCategory = async (categoryData) => {
    try {
      setLoading(true);
      setError("");

      const newCategory = {
        id: Date.now(),
        name: categoryData.name?.trim() || "",
        description: categoryData.description?.trim() || "",
        image: categoryData.image || "",
        status: categoryData.status || "Active",
        createdAt: new Date().toISOString(),
      };

      // TODO:
      // Later send this data to backend:
      //
      // const response = await api.post("/categories", categoryData);
      // const newCategory = response.data;

      setCategories((prevCategories) => [
        ...prevCategories,
        newCategory,
      ]);

      return {
        success: true,
        data: newCategory,
        message: "Category added successfully.",
      };
    } catch (err) {
      console.error("Add category error:", err);

      setError("Unable to add category.");

      return {
        success: false,
        message: "Unable to add category.",
      };
    } finally {
      setLoading(false);
    }
  };

  // Update category
  const updateCategory = async (id, categoryData) => {
    try {
      setLoading(true);
      setError("");

      let updatedCategory = null;

      setCategories((prevCategories) =>
        prevCategories.map((category) => {
          if (String(category.id) !== String(id)) {
            return category;
          }

          updatedCategory = {
            ...category,
            ...categoryData,
            name:
              categoryData.name !== undefined
                ? categoryData.name.trim()
                : category.name,
            description:
              categoryData.description !== undefined
                ? categoryData.description.trim()
                : category.description,
            updatedAt: new Date().toISOString(),
          };

          return updatedCategory;
        })
      );

      // TODO:
      // Later:
      //
      // const response = await api.put(
      //   `/categories/${id}`,
      //   categoryData
      // );

      return {
        success: true,
        data: updatedCategory,
        message: "Category updated successfully.",
      };
    } catch (err) {
      console.error("Update category error:", err);

      setError("Unable to update category.");

      return {
        success: false,
        message: "Unable to update category.",
      };
    } finally {
      setLoading(false);
    }
  };

  // Delete category
  const deleteCategory = async (id) => {
    try {
      setLoading(true);
      setError("");

      setCategories((prevCategories) =>
        prevCategories.filter(
          (category) => String(category.id) !== String(id)
        )
      );

      // TODO:
      // Later:
      //
      // await api.delete(`/categories/${id}`);

      return {
        success: true,
        message: "Category deleted successfully.",
      };
    } catch (err) {
      console.error("Delete category error:", err);

      setError("Unable to delete category.");

      return {
        success: false,
        message: "Unable to delete category.",
      };
    } finally {
      setLoading(false);
    }
  };

  // Toggle Active / Inactive
  const toggleCategoryStatus = async (id) => {
    try {
      setCategories((prevCategories) =>
        prevCategories.map((category) => {
          if (String(category.id) !== String(id)) {
            return category;
          }

          return {
            ...category,
            status:
              category.status === "Active"
                ? "Inactive"
                : "Active",
            updatedAt: new Date().toISOString(),
          };
        })
      );

      // TODO:
      // Later update status through API.

      return {
        success: true,
        message: "Category status updated.",
      };
    } catch (err) {
      console.error("Toggle category status error:", err);

      return {
        success: false,
        message: "Unable to update category status.",
      };
    }
  };

  // Search categories
  const searchCategories = (searchTerm = "") => {
    const search = searchTerm.toLowerCase().trim();

    if (!search) {
      return categories;
    }

    return categories.filter(
      (category) =>
        category.name.toLowerCase().includes(search) ||
        category.description.toLowerCase().includes(search)
    );
  };

  // Active categories
  const activeCategories = useMemo(() => {
    return categories.filter(
      (category) => category.status === "Active"
    );
  }, [categories]);

  // Inactive categories
  const inactiveCategories = useMemo(() => {
    return categories.filter(
      (category) => category.status === "Inactive"
    );
  }, [categories]);

  const value = {
    // Data
    categories,
    activeCategories,
    inactiveCategories,

    // State
    loading,
    error,

    // CRUD
    getCategories,
    getCategoryById,
    addCategory,
    updateCategory,
    deleteCategory,

    // Status
    toggleCategoryStatus,

    // Search
    searchCategories,

    // Direct setter if needed
    setCategories,
  };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};

// Custom hook
export const useCategory = () => {
  const context = useContext(CategoryContext);

  if (!context) {
    throw new Error(
      "useCategory must be used inside CategoryProvider"
    );
  }

  return context;
};

export default CategoryContext;