import React from "react";
import { Routes, Route } from "react-router-dom";

// =========================================
// CUSTOMER LAYOUT COMPONENTS
// =========================================

import AnnouncementBar from "../layout/AnnouncementBar";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footbar";

// =========================================
// CUSTOMER PAGES
// =========================================

import Home from "../pages/Home";
import Shop from "../pages/Shop";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import About from "../pages/About";
import Contact from "../pages/Conatact";
import NotFound from "../pages/NotFound";

// =========================================
// ADMIN PAGES
// =========================================

import AdminLogin from "../pages/admin/AdminLogin";
import Dashboard from "../pages/admin/Dashborad";
import Products from "../pages/admin/Product";
import AddProduct from "../pages/admin/AddProduct";
import EditProduct from "../pages/admin/EditProduct";
import Categories from "../pages/admin/Categories";

// =========================================
// ADMIN MANAGEMENT PAGES
// =========================================

import Offers from "../pages/admin/Offers";
import HeroManagement from "../pages/admin/HeroManagement";
import ImageManagement from "../pages/admin/ImageManagement";

// =========================================
// ROUTE PROTECTION
// =========================================

import AdminRoute from "./AdminRoutes";

// =========================================
// CUSTOMER LAYOUT
// =========================================

function CustomerLayout() {
  return (
    <>
      <AnnouncementBar />

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/shop" element={<Shop />} />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        <Route path="/cart" element={<Cart />} />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}

// =========================================
// MAIN APP ROUTES
// =========================================

function AppRoutes() {
  return (
    <Routes>
      {/* =====================================
          ADMIN LOGIN
      ===================================== */}

      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />

      {/* =====================================
          PROTECTED ADMIN ROUTES
      ===================================== */}

      <Route element={<AdminRoute />}>
        <Route
          path="/admin/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/admin/products"
          element={<Products />}
        />

        <Route
          path="/admin/products/add"
          element={<AddProduct />}
        />

        <Route
          path="/admin/products/edit/:id"
          element={<EditProduct />}
        />

        <Route
          path="/admin/categories"
          element={<Categories />}
        />

        <Route
          path="/admin/offers"
          element={<Offers />}
        />

        <Route
          path="/admin/hero"
          element={<HeroManagement />}
        />

        <Route
          path="/admin/images"
          element={<ImageManagement />}
        />
      </Route>

      {/* =====================================
          CUSTOMER WEBSITE
      ===================================== */}

      <Route
        path="/*"
        element={<CustomerLayout />}
      />
    </Routes>
  );
}

export default AppRoutes;
