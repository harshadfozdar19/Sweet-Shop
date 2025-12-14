import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // add item to cart
  const addToCart = (sweet) => {
    setCart((prev) => {
      const exists = prev.find((i) => i._id === sweet._id);

      if (exists) {
        return prev.map((i) =>
          i._id === sweet._id
            ? { ...i, quantityInCart: i.quantityInCart + 1 }
            : i
        );
      }

      return [...prev, { ...sweet, quantityInCart: 1 }];
    });
  };

  // update quantity
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

  // remove item
  const removeItem = (id) => {
    setCart((prev) => prev.filter((i) => i._id !== id));
  };

  // clear cart
  const clearCart = () => setCart([]);

  // total price
  const total = cart.reduce(
    (sum, i) => sum + i.price * i.quantityInCart,
    0
  );

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQty, removeItem, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
