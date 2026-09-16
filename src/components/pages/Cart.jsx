import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContex";
import { formatPrice } from "../utils/FormatPrice";

export default function Cart() {
  const {
    cart,
    subtotal,
    removeFromCart,
    updateQuantity,
  } = useCart();

  if (!cart.length) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center text-center">
        <div>
          <h1 className="text-4xl">Your cart is empty</h1>

          <p className="text-[#6f7566] mt-4">
            Add something good to your kitchen.
          </p>

          <Link
            to="/shop"
            className="inline-block bg-[#59663b] text-white rounded-full px-7 py-3 mt-7"
          >
            Explore products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#f7f2e7] min-h-screen py-16">
      <div className="container-custom">
        <h1 className="text-5xl">Your cart</h1>

        <div className="grid lg:grid-cols-[1fr_360px] gap-8 mt-10">
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-4 flex gap-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 rounded-xl object-cover"
                />

                <div className="flex-1">
                  <h3 className="font-serif text-xl">
                    {item.name}
                  </h3>

                  <div className="mt-2">
                    {formatPrice(item.sellingPrice)}
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border rounded-full">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.quantity - 1
                          )
                        }
                        className="p-2"
                      >
                        <Minus size={14} />
                      </button>

                      <span className="px-2">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.quantity + 1
                          )
                        }
                        className="p-2"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-7 h-fit">
            <h2 className="font-serif text-2xl">
              Order summary
            </h2>

            <div className="flex justify-between mt-7">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            <div className="flex justify-between mt-3 text-sm text-[#6f7566]">
              <span>Shipping</span>
              <span>
                {subtotal >= 999 ? "Free" : "Calculated later"}
              </span>
            </div>

            <div className="border-t mt-5 pt-5 flex justify-between font-semibold">
              <span>Total</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            <button className="w-full mt-7 bg-[#59663b] text-white rounded-full py-4">
              Proceed to checkout
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}