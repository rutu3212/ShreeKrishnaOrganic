import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Truck,
  ShieldCheck,
  Leaf,
  Tag,
  ShoppingCart,
} from "lucide-react";

import useCart from "../hooks/useCart";

const Cart = () => {
  const navigate = useNavigate();

  const {
    cartItems = [],
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal = 0,
  } = useCart();

  /*
    ------------------------------------------------
    SHIPPING
    ------------------------------------------------

    Free shipping above ₹999
    Otherwise ₹99
  */

  const FREE_SHIPPING_LIMIT = 999;
  const SHIPPING_CHARGE = 99;

  const shipping =
    subtotal >= FREE_SHIPPING_LIMIT || subtotal === 0
      ? 0
      : SHIPPING_CHARGE;

  const total = subtotal + shipping;

  /*
    ------------------------------------------------
    EMPTY CART
    ------------------------------------------------
  */

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#F7F5EF]">

        {/* Empty Cart */}

        <div className="mx-auto flex min-h-[75vh] max-w-4xl items-center justify-center px-4 py-16 sm:px-6">

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full rounded-3xl border border-[#E6E1D8] bg-white px-6 py-12 text-center shadow-sm sm:px-10"
          >

            {/* Icon */}

            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
              className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#E4EBD9] text-[#56663D]"
            >
              <ShoppingBag size={42} strokeWidth={1.5} />
            </motion.div>

            <h1 className="mt-7 text-2xl font-bold text-[#29321F] sm:text-3xl">
              Your Cart is Empty
            </h1>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#777568] sm:text-base">
              Looks like you haven't added anything to your cart yet.
              Explore our natural and traditionally crafted products.
            </p>

            <Link
              to="/shop"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#56663D] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#465532]"
            >
              <ShoppingBag size={18} />
              Continue Shopping
              <ArrowRight size={17} />
            </Link>

            {/* Trust */}

            <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-4 border-t border-[#E6E1D8] pt-8 sm:grid-cols-3">

              <TrustItem
                icon={<Leaf size={19} />}
                title="Natural Products"
                text="Carefully sourced"
              />

              <TrustItem
                icon={<Truck size={19} />}
                title="Free Shipping"
                text="On orders ₹999+"
              />

              <TrustItem
                icon={<ShieldCheck size={19} />}
                title="Secure Shopping"
                text="Safe & reliable"
              />

            </div>

          </motion.div>

        </div>
      </div>
    );
  }

  /*
    ------------------------------------------------
    MAIN CART
    ------------------------------------------------
  */

  return (
    <div className="min-h-screen bg-[#F7F5EF]">

      {/* ================================================
          PAGE HEADER
      ================================================= */}

      <section className="border-b border-[#E6E1D8] bg-[#EEE4D7]/60">

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
          >

            <div className="flex items-center gap-2 text-sm text-[#777568]">
              <Link
                to="/"
                className="transition hover:text-[#56663D]"
              >
                Home
              </Link>

              <span>/</span>

              <span className="font-medium text-[#56663D]">
                Cart
              </span>
            </div>

            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">

              <div>
                <h1 className="text-3xl font-bold text-[#29321F] sm:text-4xl">
                  Your Cart
                </h1>

                <p className="mt-1 text-sm text-[#777568]">
                  Review your selected products before checkout.
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm font-medium text-[#56663D]">
                <ShoppingCart size={18} />
                {cartItems.length}{" "}
                {cartItems.length === 1 ? "item" : "items"}
              </div>

            </div>

          </motion.div>

        </div>

      </section>

      {/* ================================================
          CART CONTENT
      ================================================= */}

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        <div className="grid gap-7 lg:grid-cols-[1fr_380px]">

          {/* ============================================
              LEFT - CART ITEMS
          ============================================ */}

          <div>

            {/* Cart Header */}

            <div className="mb-4 flex items-center justify-between">

              <div>
                <h2 className="text-lg font-bold text-[#29321F]">
                  Cart Items
                </h2>

                <p className="mt-1 text-xs text-[#777568]">
                  {cartItems.length}{" "}
                  {cartItems.length === 1 ? "product" : "products"} selected
                </p>
              </div>

              <button
                type="button"
                onClick={clearCart}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#A6533D] transition hover:text-[#8F4534]"
              >
                <Trash2 size={15} />
                Clear Cart
              </button>

            </div>

            {/* Items */}

            <div className="space-y-4">

              {cartItems.map((item, index) => (

                <CartItem
                  key={item.id || item._id || index}
                  item={item}
                  index={index}
                  onRemove={removeFromCart}
                  onUpdateQuantity={updateQuantity}
                />

              ))}

            </div>

            {/* Continue Shopping */}

            <div className="mt-6">

              <Link
                to="/shop"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#56663D] transition hover:text-[#465532]"
              >
                <ArrowLeft size={17} />
                Continue Shopping
              </Link>

            </div>

          </div>

          {/* ============================================
              RIGHT - ORDER SUMMARY
          ============================================ */}

          <aside>

            <div className="sticky top-24 rounded-2xl border border-[#E6E1D8] bg-white p-5 shadow-sm sm:p-6">

              <h2 className="text-xl font-bold text-[#29321F]">
                Order Summary
              </h2>

              {/* Free Shipping Progress */}

              {subtotal < FREE_SHIPPING_LIMIT && (

                <div className="mt-5 rounded-xl bg-[#E4EBD9] p-4">

                  <div className="flex items-start gap-3">

                    <Truck
                      size={19}
                      className="mt-0.5 shrink-0 text-[#56663D]"
                    />

                    <div className="flex-1">

                      <p className="text-xs font-semibold text-[#465532]">
                        Add ₹
                        {Math.max(
                          0,
                          FREE_SHIPPING_LIMIT - subtotal
                        ).toFixed(0)}{" "}
                        more for FREE shipping
                      </p>

                      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white">

                        <div
                          className="h-full rounded-full bg-[#56663D] transition-all"
                          style={{
                            width: `${Math.min(
                              (subtotal / FREE_SHIPPING_LIMIT) * 100,
                              100
                            )}%`,
                          }}
                        />

                      </div>

                    </div>

                  </div>

                </div>

              )}

              {subtotal >= FREE_SHIPPING_LIMIT && (

                <div className="mt-5 flex items-center gap-2 rounded-xl bg-[#E4EBD9] p-4 text-xs font-semibold text-[#465532]">
                  <Truck size={18} />
                  Congratulations! You get FREE shipping.
                </div>

              )}

              {/* Price Details */}

              <div className="mt-6 space-y-4">

                <SummaryRow
                  label="Subtotal"
                  value={`₹${subtotal.toLocaleString("en-IN")}`}
                />

                <SummaryRow
                  label="Shipping"
                  value={
                    shipping === 0
                      ? "FREE"
                      : `₹${shipping.toLocaleString("en-IN")}`
                  }
                  valueClass={
                    shipping === 0
                      ? "text-[#56663D]"
                      : "text-[#29321F]"
                  }
                />

              </div>

              {/* Coupon */}

              <div className="mt-5 border-t border-[#E6E1D8] pt-5">

                <div className="flex items-center gap-2 text-sm font-semibold text-[#29321F]">
                  <Tag size={17} className="text-[#9A7B2F]" />
                  Have a coupon?
                </div>

                <div className="mt-3 flex gap-2">

                  <input
                    type="text"
                    placeholder="Coupon code"
                    className="min-w-0 flex-1 rounded-xl border border-[#E6E1D8] bg-[#F7F5EF] px-3 py-3 text-xs uppercase outline-none focus:border-[#56663D] focus:ring-2 focus:ring-[#E4EBD9]"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      alert(
                        "Coupon functionality will be connected to the backend."
                      )
                    }
                    className="rounded-xl border border-[#56663D] px-4 py-3 text-xs font-semibold text-[#56663D] transition hover:bg-[#E4EBD9]"
                  >
                    Apply
                  </button>

                </div>

              </div>

              {/* Total */}

              <div className="mt-6 border-t border-[#E6E1D8] pt-5">

                <div className="flex items-center justify-between">

                  <span className="text-base font-semibold text-[#29321F]">
                    Total
                  </span>

                  <span className="text-2xl font-bold text-[#56663D]">
                    ₹{total.toLocaleString("en-IN")}
                  </span>

                </div>

              </div>

              {/* Checkout */}

              <button
                type="button"
                onClick={() => navigate("/checkout")}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#56663D] px-5 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-[#465532]"
              >
                Proceed to Checkout
                <ArrowRight size={18} />
              </button>

              {/* Secure */}

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#777568]">
                <ShieldCheck size={15} />
                Secure & safe checkout
              </div>

            </div>

          </aside>

        </div>

      </main>

    </div>
  );
};

/* ======================================================
   CART ITEM
====================================================== */

const CartItem = ({
  item,
  index,
  onRemove,
  onUpdateQuantity,
}) => {

  const productName =
    item.name || item.productName || "Product";

  const productImage =
    item.image ||
    item.images?.[0] ||
    "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=500&q=80";

  const price = Number(
    item.sellingPrice ??
      item.price ??
      0
  );

  const regularPrice = Number(
    item.regularPrice ??
      item.originalPrice ??
      price
  );

  const quantity = Number(item.quantity || 1);

  const itemTotal = price * quantity;

  const discount =
    regularPrice > price
      ? Math.round(
          ((regularPrice - price) / regularPrice) * 100
        )
      : 0;

  const handleDecrease = () => {
    if (quantity <= 1) {
      onRemove(item.id || item._id);
      return;
    }

    onUpdateQuantity(
      item.id || item._id,
      quantity - 1
    );
  };

  const handleIncrease = () => {
    onUpdateQuantity(
      item.id || item._id,
      quantity + 1
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: index * 0.05,
      }}
      className="rounded-2xl border border-[#E6E1D8] bg-white p-4 shadow-sm sm:p-5"
    >

      <div className="flex gap-4">

        {/* IMAGE */}

        <Link
          to={`/product/${item.slug || item.id || item._id}`}
          className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[#EEE4D7] sm:h-32 sm:w-32"
        >

          <img
            src={productImage}
            alt={productName}
            className="h-full w-full object-cover transition duration-300 hover:scale-105"
          />

        </Link>

        {/* DETAILS */}

        <div className="min-w-0 flex-1">

          <div className="flex items-start justify-between gap-3">

            <div className="min-w-0">

              <Link
                to={`/product/${item.slug || item.id || item._id}`}
                className="line-clamp-2 text-sm font-bold text-[#29321F] transition hover:text-[#56663D] sm:text-base"
              >
                {productName}
              </Link>

              {item.weight && (
                <p className="mt-1 text-xs text-[#777568]">
                  {item.weight}
                </p>
              )}

              {discount > 0 && (
                <span className="mt-2 inline-flex rounded-full bg-[#F3E8C8] px-2 py-1 text-[10px] font-bold text-[#765A3A]">
                  {discount}% OFF
                </span>
              )}

            </div>

            {/* REMOVE */}

            <button
              type="button"
              onClick={() =>
                onRemove(item.id || item._id)
              }
              className="shrink-0 rounded-lg p-2 text-[#A6533D] transition hover:bg-[#F8E8E3]"
              title="Remove product"
            >
              <Trash2 size={17} />
            </button>

          </div>

          {/* PRICE + QUANTITY */}

          <div className="mt-5 flex flex-wrap items-end justify-between gap-4">

            {/* PRICE */}

            <div>

              <div className="flex items-center gap-2">

                <span className="text-base font-bold text-[#56663D]">
                  ₹{price.toLocaleString("en-IN")}
                </span>

                {regularPrice > price && (
                  <del className="text-xs text-[#99958A]">
                    ₹{regularPrice.toLocaleString("en-IN")}
                  </del>
                )}

              </div>

              <p className="mt-1 text-xs text-[#777568]">
                ₹{itemTotal.toLocaleString("en-IN")} total
              </p>

            </div>

            {/* QUANTITY */}

            <div className="flex items-center rounded-xl border border-[#E6E1D8] bg-[#F7F5EF]">

              <button
                type="button"
                onClick={handleDecrease}
                className="flex h-9 w-9 items-center justify-center text-[#56663D] transition hover:bg-[#E4EBD9]"
                aria-label="Decrease quantity"
              >
                <Minus size={15} />
              </button>

              <span className="flex h-9 min-w-9 items-center justify-center border-x border-[#E6E1D8] text-sm font-bold text-[#29321F]">
                {quantity}
              </span>

              <button
                type="button"
                onClick={handleIncrease}
                className="flex h-9 w-9 items-center justify-center text-[#56663D] transition hover:bg-[#E4EBD9]"
                aria-label="Increase quantity"
              >
                <Plus size={15} />
              </button>

            </div>

          </div>

        </div>

      </div>

    </motion.div>
  );
};

/* ======================================================
   SUMMARY ROW
====================================================== */

const SummaryRow = ({
  label,
  value,
  valueClass = "text-[#29321F]",
}) => {
  return (
    <div className="flex items-center justify-between text-sm">

      <span className="text-[#777568]">
        {label}
      </span>

      <span className={`font-semibold ${valueClass}`}>
        {value}
      </span>

    </div>
  );
};

/* ======================================================
   TRUST ITEM
====================================================== */

const TrustItem = ({
  icon,
  title,
  text,
}) => {
  return (
    <div className="flex items-center justify-center gap-3 sm:flex-col">

      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E4EBD9] text-[#56663D]">
        {icon}
      </div>

      <div className="text-left sm:text-center">

        <p className="text-xs font-bold text-[#29321F]">
          {title}
        </p>

        <p className="mt-0.5 text-[11px] text-[#777568]">
          {text}
        </p>

      </div>

    </div>
  );
};

export default Cart;
