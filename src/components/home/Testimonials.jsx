import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Priya S.",
    city: "Pune",
    text: "The ghee has such a beautiful aroma. It feels like something from home.",
  },
  {
    name: "Amit R.",
    city: "Mumbai",
    text: "Beautiful packaging, great quality and the ordering experience is very smooth.",
  },
  {
    name: "Sneha K.",
    city: "Bengaluru",
    text: "I love the simple ingredient-first approach. Definitely ordering again.",
  },
];

export default function Testimonials() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center">
          <div className="gold-line mx-auto mb-5" />

          <h2 className="text-4xl sm:text-5xl">
            Loved by everyday kitchens
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-14">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="bg-[#f7f2e7] rounded-2xl p-7"
            >
              <div className="flex gap-1 text-[#b49358]">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={15}
                    fill="currentColor"
                  />
                ))}
              </div>

              <p className="font-serif text-xl leading-8 mt-6">
                “{item.text}”
              </p>

              <div className="mt-7 text-sm">
                <div className="font-semibold">
                  {item.name}
                </div>

                <div className="text-[#6f7566] mt-1">
                  {item.city}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}