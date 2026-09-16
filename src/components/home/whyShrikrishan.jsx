import { motion } from "framer-motion";
import {
  BadgeCheck,
  Leaf,
  Sprout,
  Wheat,
} from "lucide-react";

const reasons = [
  {
    icon: Sprout,
    title: "Thoughtful Sourcing",
    text: "We seek ingredients from trusted growing regions and responsible partners.",
  },
  {
    icon: Wheat,
    title: "Traditional Methods",
    text: "Time-tested food traditions inspire how we make our products.",
  },
  {
    icon: BadgeCheck,
    title: "Quality First",
    text: "Every product is selected with consistency, quality and everyday use in mind.",
  },
  {
    icon: Leaf,
    title: "Closer to Nature",
    text: "Simple ingredients and thoughtful processes without unnecessary complexity.",
  },
];

export default function WhySrikrishn() {
  return (
    <section className="section-padding bg-[#59663b] text-white">
      <div className="container-custom">
        <div className="max-w-2xl">
          <div className="w-14 h-0.5 bg-[#d5bd8b] mb-6" />

          <h2 className="text-4xl sm:text-5xl lg:text-6xl">
            Why Srikrishn?
          </h2>

          <p className="text-white/65 mt-5 leading-7">
            Because food can be both rooted in tradition and
            beautifully suited to modern life.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {reasons.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="border-t border-white/20 pt-7"
              >
                <Icon size={30} strokeWidth={1.5} />

                <h3 className="font-serif text-2xl mt-7">
                  {item.title}
                </h3>

                <p className="text-white/60 text-sm leading-7 mt-3">
                  {item.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}