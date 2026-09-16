import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";

export default function Hero() {
  return (
    <section className="hero-gradient overflow-hidden">
      <div className="container-custom">
        <div className="min-h-[680px] lg:min-h-[720px] grid lg:grid-cols-2 items-center gap-12 py-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 text-[#59663b] text-sm font-semibold uppercase tracking-[0.2em]">
              <Leaf size={17} />
              Rooted in Tradition
            </div>

            <h1 className="mt-6 text-5xl sm:text-6xl lg:text-7xl leading-[1.05]">
              Nature's goodness,
              <span className="block text-[#59663b] italic">
                brought home.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-[#6f7566] text-base sm:text-lg leading-8">
              Thoughtfully crafted everyday essentials made
              with authentic ingredients, traditional methods
              and a deep respect for nature.
            </p>

            <div className="flex flex-wrap gap-4 mt-9">
              <Link
                to="/shop"
                className="group bg-[#59663b] text-white px-7 py-4 rounded-full flex items-center gap-3 hover:bg-[#3f4a29] transition"
              >
                Explore Products

                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition"
                />
              </Link>

              <Link
                to="/about"
                className="px-7 py-4 rounded-full border border-[#59663b] text-[#59663b] hover:bg-[#59663b] hover:text-white transition"
              >
                Our Story
              </Link>
            </div>

            <div className="flex gap-8 mt-12 pt-8 border-t border-[#dcd4c4]">
              <div>
                <div className="font-serif text-2xl">
                  100%
                </div>
                <div className="text-xs text-[#6f7566]">
                  Honest ingredients
                </div>
              </div>

              <div>
                <div className="font-serif text-2xl">
                  25+
                </div>
                <div className="text-xs text-[#6f7566]">
                  Traditional products
                </div>
              </div>

              <div>
                <div className="font-serif text-2xl">
                  4.9/5
                </div>
                <div className="text-xs text-[#6f7566]">
                  Customer love
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="absolute -top-10 -right-5 w-32 h-32 rounded-full border border-[#b49358]/40" />

            <div className="rounded-[180px_180px_25px_25px] overflow-hidden aspect-[4/5] shadow-[0_30px_80px_rgba(60,65,45,0.18)]">
              <img
                src="https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=90"
                alt="Traditional food"
                className="w-full h-full object-cover"
              />
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                repeat: Infinity,
                duration: 4,
              }}
              className="absolute bottom-8 -left-6 sm:-left-10 bg-white p-5 rounded-2xl shadow-xl max-w-[210px]"
            >
              <div className="text-[#b49358] text-sm">
                ✦ From our farms
              </div>

              <div className="font-serif text-lg mt-1">
                Pure. Simple. Real.
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}