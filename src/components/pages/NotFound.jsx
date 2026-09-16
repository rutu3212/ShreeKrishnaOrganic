import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center text-center px-5">
      <div>
        <div className="text-8xl font-serif text-[#59663b]">
          404
        </div>

        <h1 className="text-3xl mt-4">
          Page not found
        </h1>

        <Link
          to="/"
          className="inline-block bg-[#59663b] text-white rounded-full px-7 py-3 mt-7"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}