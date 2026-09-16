import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Ghee",
    image:
      "https://images.unsplash.com/photo-1633367586346-6a0c1a1e6d75?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Cold Pressed Oils",
    image:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Honey",
    image:
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Superfoods",
    image:
      "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=700&q=85",
  },
];

export default function Categories() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <div className="gold-line mx-auto mb-5" />

          <h2 className="text-4xl sm:text-5xl">
            Explore our goodness
          </h2>

          <p className="text-[#6f7566] mt-4 max-w-xl mx-auto">
            Everyday essentials inspired by India's rich
            food traditions.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={`/shop?category=${encodeURIComponent(
                  category.name
                )}`}
                className="group block"
              >
                <div className="aspect-[4/5] rounded-[80px_80px_16px_16px] overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  />
                </div>

                <div className="flex justify-between items-center mt-4">
                  <h3 className="font-serif text-xl">
                    {category.name}
                  </h3>

                  <span className="text-[#59663b]">
                    →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}