export default function About() {
  return (
    <main>
      <section className="bg-[#f7f2e7] py-24">
        <div className="container-custom text-center max-w-3xl">
          <div className="gold-line mx-auto mb-6" />

          <h1 className="text-5xl sm:text-6xl">
            Food with a sense of place.
          </h1>

          <p className="text-[#6f7566] text-lg leading-8 mt-7">
            Srikrishn celebrates the ingredients, methods and
            stories that make Indian food deeply special.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom grid lg:grid-cols-2 gap-12 items-center">
          <img
            src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=90"
            alt="Natural ingredients"
            className="rounded-3xl aspect-[4/3] object-cover"
          />

          <div>
            <h2 className="text-4xl">
              Rooted in India's food traditions
            </h2>

            <p className="text-[#6f7566] leading-8 mt-6">
              We want everyday food to feel honest, thoughtful
              and connected to where it comes from.
            </p>

            <p className="text-[#6f7566] leading-8 mt-4">
              From carefully selected ingredients to
              traditional-inspired processes, every Srikrishn
              product is created with one simple thought:
              make good food easier to bring home.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}