import { useCart } from "../context/CartContext";
import api from "../api/api";

export default function CartModal({ onClose, onSuccess }) {
  const { cart, updateQty, clearCart } = useCart();

  const total = cart.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  const handleConfirm = async () => {
    try {
      for (const item of cart) {
        await api.post(`/sweets/${item._id}/purchase`, {
          amount: item.quantity,
        });
      }
      clearCart();
      onSuccess();
      alert("Purchase successful 🎉");
    } catch {
      alert("Purchase failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

        {cart.length === 0 ? (
          <p className="text-gray-500">Cart is empty</p>
        ) : (
          <>
            {cart.map((i) => (
              <div key={i._id} className="flex justify-between mb-3">
                <span>{i.name}</span>
                <input
                  type="number"
                  value={i.quantity}
                  min={1}
                  onChange={(e) =>
                    updateQty(i._id, Number(e.target.value))
                  }
                  className="w-16 border rounded"
                />
              </div>
            ))}

            <div className="font-bold mt-4">Total: ₹{total}</div>

            <button
              onClick={handleConfirm}
              className="mt-4 w-full bg-pink-500 text-white py-2 rounded"
            >
              Confirm Purchase
            </button>
          </>
        )}

        <button
          onClick={onClose}
          className="mt-4 w-full bg-gray-200 py-2 rounded"
        >
            
          Close
        </button>
      </div>
    </div>
  );
}
