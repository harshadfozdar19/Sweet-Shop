import { useCart } from "../context/CartContext";

export default function SweetCard({ sweet }) {
  const { addToCart, cart } = useCart();

  const isOutOfStock = sweet.quantity === 0;

  // check how many of this item are already in cart
  const itemInCart = cart.find((i) => i._id === sweet._id);
  const reachedMaxStock =
    itemInCart && itemInCart.quantityInCart >= sweet.quantity;

  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden">

      {/* Image */}
      <div className="h-56 overflow-hidden">
        <img
          src={sweet.image}
          alt={sweet.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3">
        <h3 className="text-xl font-bold text-gray-800">
          {sweet.name}
        </h3>

        <p className="text-sm text-gray-500">
          {sweet.category}
        </p>

        <div className="flex items-center justify-between mt-2">
          <span className="text-lg font-semibold text-pink-600">
            ₹{sweet.price} / kg
          </span>

          <span
            className={`text-sm font-semibold ${
              isOutOfStock ? "text-red-500" : "text-green-600"
            }`}
          >
            {isOutOfStock
              ? "Out of stock"
              : `Stock: ${sweet.quantity}`}
          </span>
        </div>

        {/* Add to Cart Button */}
        <button
          disabled={isOutOfStock || reachedMaxStock}
          onClick={() => addToCart(sweet)}
          className={`mt-3 py-2 rounded-full font-bold transition ${
            isOutOfStock || reachedMaxStock
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:scale-105"
          }`}
        >
          {isOutOfStock
            ? "Out of Stock"
            : reachedMaxStock
            ? "Max Stock Reached"
            : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
