import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SweetCard from "../components/SweetCard";
import Navbar from "../components/Navbar";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "../context/CartContext";
import { AuthProvider } from "../context/AuthContext";

test("adding item increases cart count", async () => {
  const user = userEvent.setup();

  render(
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Navbar />
          <SweetCard sweet={{
            _id: "1",
            name: "Barfi",
            category: "Indian",
            price: 200,
            quantity: 10,
            image: "x.jpg"
          }} />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );

  await user.click(screen.getByText(/Add to Cart/i));
  expect(screen.getByText("1")).toBeInTheDocument();
});
