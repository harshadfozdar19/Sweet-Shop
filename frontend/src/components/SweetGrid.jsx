import { useState } from "react";
import SweetCard from "./SweetCard";

export default function SweetGrid({ sweets }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // unique categories
  const categories = [...new Set(sweets.map((s) => s.category))];

  // apply filters
  const filteredSweets = sweets.filter((s) => {
    const matchName = s.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "" || s.category === category;
    const matchPrice =
      maxPrice === "" || Number(s.price) <= Number(maxPrice);

    return matchName && matchCategory && matchPrice;
  });

  return (
    <section id="sweets" className="py-20">
      <div className="max-w-7xl mx-auto px-4">

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow p-4 mb-10 flex flex-wrap gap-4 items-center">
          <input
            className="input flex-1"
            placeholder="Search sweets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <input
            type="number"
            className="input w-40"
            placeholder="Max price ₹"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />

          <button
            onClick={() => {
              setSearch("");
              setCategory("");
              setMaxPrice("");
            }}
            className="px-4 py-2 bg-gray-200 rounded-lg font-semibold"
          >
            Reset
          </button>
        </div>

        {/* Grid */}
        {filteredSweets.length === 0 ? (
          <p className="text-center text-gray-500 text-xl mt-20">
            No sweets found 🍭
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredSweets.map((sweet) => (
              <SweetCard
                key={sweet._id}
                sweet={sweet}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
