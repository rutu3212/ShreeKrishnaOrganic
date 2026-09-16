import { motion } from "framer-motion";

export default function StorySection() {
  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="container-custom grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="gold-line mb-5" />

          <p className="uppercase tracking-[0.2em] text-[#59663b] text-xs font-semibold">
            The Srikrishn way
          </p>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl mt-5 leading-tight">
            From the soil,
            <br />
            <span className="italic text-[#59663b]">
              with care.
            </span>
          </h2>

          <p className="text-[#6f7566] leading-8 mt-7">
            We believe good food should be simple. That is
            why we work around honest ingredients, thoughtful
            sourcing and traditional methods that preserve
            the character of every ingredient.
          </p>

          <p className="text-[#6f7566] leading-8 mt-4">
            Srikrishn is our journey to make everyday food
            feel closer to its roots.
          </p>

          <button className="mt-7 border-b border-[#59663b] pb-2 text-[#59663b] font-semibold">
            Discover our story →
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=90"
            alt="Fresh natural ingredients"
            className="rounded-[20px_120px_20px_20px] w-full aspect-[4/5] object-cover"
          />

          <div className="absolute -bottom-7 -left-7 bg-[#59663b] text-white rounded-2xl p-6 max-w-[230px]">
            <div className="font-serif text-2xl">
              Honest
            </div>

            <p className="text-sm text-white/70 mt-2">
              Ingredients you can feel good about.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}