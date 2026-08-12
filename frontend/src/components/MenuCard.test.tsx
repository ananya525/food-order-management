import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MenuCard } from "./MenuCard";

describe("MenuCard", () => {
  it("renders menu details and add button", () => {
    render(<MenuCard item={{
      id: "1", name: "Pizza", description: "Cheesy pizza", price: 299, image: "pizza.jpg"
    }} onAdd={vi.fn()} />);
    expect(screen.getByText("Pizza")).toBeInTheDocument();
    expect(screen.getByText("Cheesy pizza")).toBeInTheDocument();
    expect(screen.getByText("₹299")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add to cart" })).toBeInTheDocument();
  });
});
