import React from "react";
import {
  Routes,
  Route,
} from "react-router-dom";

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

// Admin management pages
import Offers from "../pages/admin/offers";
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
      {/* Announcement Bar */}
      <AnnouncementBar />

      {/* Navbar */}
      <Navbar />

      {/* Customer Pages */}
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/shop"
          element={<Shop />}
        />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        {/* Customer 404 */}
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>

      {/* Footer */}
      <Footer />
    </>
  );
}

// =========================================
// MAIN APP ROUTES
// =========================================

export default function AppRoutes() {
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

        {/* Dashboard */}
        <Route
          path="/admin/dashboard"
          element={<Dashboard />}
        />

        {/* Products */}
        <Route
          path="/admin/products"
          element={<Products />}
        />

        {/* Add Product */}
        <Route
          path="/admin/products/add"
          element={<AddProduct />}
        />

        {/* Edit Product */}
        <Route
          path="/admin/products/edit/:id"
          element={<EditProduct />}
        />

        {/* Categories */}
        <Route
          path="/admin/categories"
          element={<Categories />}
        />

        {/* Offers */}
        <Route
          path="/admin/offers"
          element={<Offers />}
        />

        {/* Homepage Hero Management */}
        <Route
          path="/admin/hero"
          element={<HeroManagement />}
        />

        {/* Image Management */}
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


