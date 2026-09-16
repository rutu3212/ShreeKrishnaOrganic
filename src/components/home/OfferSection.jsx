import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function OffersSection() {
  return (
    <section className="section-padding bg-[#f7f2e7]">
      <div className="container-custom">
        <div className="relative overflow-hidden rounded-[30px] bg-[#b49358] min-h-[400px] flex items-center">
          <img
            src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1500&q=90"
            alt="Fresh ingredients"
            className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-35"
          />

          <div className="relative z-10 p-8 sm:p-12 lg:p-20 max-w-2xl text-white">
            <p className="uppercase tracking-[0.25em] text-xs font-semibold">
              A little goodness for you
            </p>

            <h2 className="text-4xl sm:text-5xl mt-4">
              Bring home
              <br />
              something pure.
            </h2>

            <p className="mt-5 text-white/80 leading-7">
              Enjoy special introductory offers across
              selected Srikrishn favourites.
            </p>

            <Link
              to="/shop"
              className="inline-flex items-center gap-3 bg-white text-[#59663b] px-6 py-3 rounded-full mt-7 font-semibold"
            >
              Shop the offer
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}