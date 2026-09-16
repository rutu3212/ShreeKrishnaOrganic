export default function Contact() {
  return (
    <main className="bg-[#f7f2e7] min-h-screen py-20">
      <div className="container-custom">
        <div className="max-w-2xl">
          <div className="gold-line mb-5" />

          <h1 className="text-5xl">
            We'd love to hear from you.
          </h1>

          <p className="text-[#6f7566] mt-5 leading-7">
            Questions about products, orders or partnerships?
            Send us a message.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mt-12">
          <form className="bg-white rounded-3xl p-7 sm:p-10">
            <div className="grid sm:grid-cols-2 gap-5">
              <input
                placeholder="Your name"
                className="border border-[#ded7c9] rounded-xl px-4 py-3 outline-none focus:border-[#59663b]"
              />

              <input
                placeholder="Email"
                type="email"
                className="border border-[#ded7c9] rounded-xl px-4 py-3 outline-none focus:border-[#59663b]"
              />
            </div>

            <input
              placeholder="Subject"
              className="w-full border border-[#ded7c9] rounded-xl px-4 py-3 outline-none mt-5 focus:border-[#59663b]"
            />

            <textarea
              placeholder="Tell us how we can help..."
              rows="6"
              className="w-full border border-[#ded7c9] rounded-xl px-4 py-3 outline-none mt-5 focus:border-[#59663b]"
            />

            <button className="bg-[#59663b] text-white rounded-full px-8 py-4 mt-5">
              Send message
            </button>
          </form>

          <div>
            <div className="bg-[#59663b] text-white rounded-3xl p-8">
              <h2 className="font-serif text-3xl">
                Contact
              </h2>

              <div className="mt-8 space-y-5 text-white/70">
                <p>hello@srikrishn.com</p>
                <p>+91 98765 43210</p>
                <p>Monday – Saturday, 10 AM – 6 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}