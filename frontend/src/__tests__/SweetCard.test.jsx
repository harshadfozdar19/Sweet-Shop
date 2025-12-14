import { render } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import CartDrawer from "../components/CartDrawer";
import { CartProvider } from "../context/CartContext";

describe("CartDrawer", () => {
  test("renders empty cart", () => {
    const { getByText } = render(
      <CartProvider>
        <CartDrawer onClose={() => {}} onCheckout={() => {}} />
      </CartProvider>
    );

    expect(getByText(/your cart is empty/i)).toBeInTheDocument();
  });

  test("placeholder for total calculation", () => {
    expect(true).toBe(true);
  });
});
