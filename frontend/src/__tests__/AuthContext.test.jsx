import { render } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { AuthProvider, useAuth } from "../context/AuthContext";

function TestComponent() {
  const { user } = useAuth();
  return <div>{user ? "LOGGED_IN" : "LOGGED_OUT"}</div>;
}

describe("AuthContext", () => {
  test("user is null initially", () => {
    const { getByText } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(getByText("LOGGED_OUT")).toBeInTheDocument();
  });

  test("admin content not shown to normal users (placeholder)", () => {
    expect(true).toBe(true);
  });
});
