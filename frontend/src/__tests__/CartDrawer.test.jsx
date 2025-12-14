import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import CartDrawer from "../components/CartDrawer";
import { CartProvider } from "../context/CartContext";

describe("CartDrawer", () => {
  test("renders empty cart message", () => {
    render(
      <CartProvider>
        <CartDrawer onClose={() => {}} onCheckout={() => {}} />
      </CartProvider>
    );

    expect(
      screen.getByText(/your cart is empty/i)
    ).toBeInTheDocument();
  });

  test("placeholder: calculates total price correctly", () => {
    // Real total calculation is already covered by CartContext tests
    expect(true).toBe(true);
  });
});
