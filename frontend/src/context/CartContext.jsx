import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // add item to cart
  const addToCart = (sweet) => {
    setCart((prev) => {
      const exists = prev.find((i) => i._id === sweet._id);

      // if item already in cart
      if (exists) {
        // do not exceed available stock
        if (exists.quantityInCart >= sweet.quantity) {
          return prev;
        }

        return prev.map((i) =>
          i._id === sweet._id
            ? { ...i, quantityInCart: i.quantityInCart + 1 }
            : i
        );
      }

      // add new item
      return [...prev, { ...sweet, quantityInCart: 1 }];
    });
  };

  // update quantity (+1 or -1)
  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i._id === id
            ? { ...i, quantityInCart: i.quantityInCart + delta }
            : i
        )
        .filter((i) => i.quantityInCart > 0)
    );
  };

  // remove item completely
  const removeItem = (id) => {
    setCart((prev) => prev.filter((i) => i._id !== id));
  };

  // clear cart after successful purchase
  const clearCart = () => {
    setCart([]);
  };

  // total price
  const total = cart.reduce(
    (sum, i) => sum + i.price * i.quantityInCart,
    0
  );

  // total items count (for navbar badge)
  const cartCount = cart.reduce(
    (sum, i) => sum + i.quantityInCart,
    0
  );

  // helper
  const isInCart = (id) => cart.some((i) => i._id === id);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQty,
        removeItem,
        clearCart,
        total,
        cartCount,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
