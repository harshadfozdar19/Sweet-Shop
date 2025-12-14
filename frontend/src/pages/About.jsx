export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">

      {/* Hero */}
      <section className="pt-24 pb-16 text-center">
        <h1 className="
          text-5xl md:text-6xl font-extrabold
          leading-[1.2] pb-2
          text-transparent bg-clip-text
          bg-gradient-to-r from-pink-500 to-purple-600
        ">
          About Mithai Magic
        </h1>

        <p className="mt-4 text-lg text-gray-600 italic">
          A story of tradition, taste, and timeless sweetness 💜
        </p>
      </section>

      {/* Story */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="bg-white rounded-3xl shadow-xl p-10">

          <h2 className="text-3xl font-bold text-pink-600 mb-4">
            Our Story
          </h2>

          <p className="text-gray-700 text-lg leading-relaxed mb-5">
            Mithai Magic began as a small family-run sweet shop with one simple
            promise — to serve authentic Indian sweets made with love and honesty.
          </p>

          <p className="text-gray-700 text-lg leading-relaxed mb-5">
            Over the years, our recipes have been passed down through generations,
            preserving the same taste that families have trusted for decades.
          </p>

          <p className="text-gray-700 text-lg leading-relaxed">
            Today, Mithai Magic blends tradition with modern convenience,
            delivering handcrafted sweets to your doorstep.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-6 grid gap-8 md:grid-cols-3">

          {/* Value Card */}
          <div className="bg-white rounded-2xl shadow p-6 text-center">
            <h3 className="text-xl font-bold text-purple-600 mb-3">
              Authentic Recipes
            </h3>
            <p className="text-gray-600">
              Every sweet is prepared using time-honored recipes and
              traditional methods.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6 text-center">
            <h3 className="text-xl font-bold text-purple-600 mb-3">
              Quality Ingredients
            </h3>
            <p className="text-gray-600">
              We use only premium ingredients to ensure taste, purity,
              and freshness.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6 text-center">
            <h3 className="text-xl font-bold text-purple-600 mb-3">
              Trusted by Families
            </h3>
            <p className="text-gray-600">
              Loved and trusted by customers across generations.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}
