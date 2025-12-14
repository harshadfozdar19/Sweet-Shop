import { X, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function CartDrawer({ onClose, onCheckout }) {
  const { cart, updateQty, removeItem, total } = useCart();

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-xl p-6">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Your Cart</h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {cart.length === 0 ? (
          <p className="text-gray-500 text-center mt-20">
            Your cart is empty 🛒
          </p>
        ) : (
          <>
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 border-b pb-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded object-cover"
                  />

                  <div className="flex-1">
                    <h4 className="font-bold">{item.name}</h4>
                    <p className="text-pink-600 font-semibold">
                      ₹{item.price}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQty(item._id, -1)}>
                      <Minus size={16} />
                    </button>
                    <span>{item.quantityInCart}</span>
                    <button onClick={() => updateQty(item._id, 1)}>
                      <Plus size={16} />
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item._id)}
                    className="text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t pt-4">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{total}</span>
              </div>

              <button
                onClick={onCheckout}
                className="w-full mt-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-full font-bold"
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
