import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#27301d] pt-20 pb-8 text-white">
      <div className="container-custom">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <div className="mb-4 font-serif text-3xl">
              Srikrishn
            </div>

            <p className="text-sm leading-7 text-white/65">
              Bringing India's traditional food wisdom to
              modern homes through honest ingredients and
              thoughtful craftsmanship.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex gap-3">

              {/* Instagram */}
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition hover:bg-white hover:text-[#27301d]"
              >
                <span className="text-xs font-bold">
                  IG
                </span>
              </a>

              {/* Facebook */}
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition hover:bg-white hover:text-[#27301d]"
              >
                <span className="text-lg font-bold">
                  f
                </span>
              </a>

              {/* YouTube */}
              <a
                href="#"
                aria-label="YouTube"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition hover:bg-white hover:text-[#27301d]"
              >
                <span className="text-xs font-bold">
                  YT
                </span>
              </a>

            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="mb-5 font-serif text-xl">
              Explore
            </h3>

            <div className="flex flex-col gap-3 text-sm text-white/65">

              <Link
                to="/shop"
                className="transition hover:text-white"
              >
                All Products
              </Link>

              <Link
                to="/shop"
                className="transition hover:text-white"
              >
                Ghee
              </Link>

              <Link
                to="/shop"
                className="transition hover:text-white"
              >
                Cold Pressed Oils
              </Link>

              <Link
                to="/shop"
                className="transition hover:text-white"
              >
                Honey
              </Link>

              <Link
                to="/shop"
                className="transition hover:text-white"
              >
                Superfoods
              </Link>

            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-5 font-serif text-xl">
              Company
            </h3>

            <div className="flex flex-col gap-3 text-sm text-white/65">

              <Link
                to="/about"
                className="transition hover:text-white"
              >
                Our Story
              </Link>

              <Link
                to="/contact"
                className="transition hover:text-white"
              >
                Contact
              </Link>

              <Link
                to="/admin/login"
                className="transition hover:text-white"
              >
                Admin
              </Link>

            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-5 font-serif text-xl">
              Stay Connected
            </h3>

            <p className="mb-5 text-sm leading-6 text-white/65">
              Get seasonal stories, new product launches
              and special offers.
            </p>

            <div className="flex overflow-hidden rounded-full border border-white/20">

              <input
                type="email"
                placeholder="Your email"
                className="w-full bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-white/40"
              />

              <button
                type="button"
                aria-label="Subscribe"
                className="px-4 transition hover:bg-white/10"
              >
                <ArrowUpRight size={19} />
              </button>

            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row">
          <span>
            © 2026 Srikrishn Organics
          </span>

          <span>
            Pure Tradition. Naturally.
          </span>
        </div>
      </div>
    </footer>
  );
}

