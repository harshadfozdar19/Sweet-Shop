import { render, screen } from "@testing-library/react";
import Navbar from "../components/Navbar";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";

const renderNavbar = () =>
  render(
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Navbar />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );

test("renders Mithai Magic logo", () => {
  renderNavbar();
  expect(screen.getByText(/Mithai Magic/i)).toBeInTheDocument();
});

test("shows Login / Register button", () => {
  renderNavbar();
  expect(screen.getByText(/Login \/ Register/i)).toBeInTheDocument();
});
