import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Header } from "@/components/layout/Header";

describe("Header mobile menu toggle", () => {
  it("starts with aria-expanded=false and the menu hidden", () => {
    render(<Header />);
    const toggle = screen.getByRole("button", { name: "メニューを開閉する" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("flips aria-expanded to true when clicked", () => {
    render(<Header />);
    const toggle = screen.getByRole("button", { name: "メニューを開閉する" });

    fireEvent.click(toggle);

    expect(toggle).toHaveAttribute("aria-expanded", "true");
  });

  it("flips back to false when clicked again", () => {
    render(<Header />);
    const toggle = screen.getByRole("button", { name: "メニューを開閉する" });

    fireEvent.click(toggle);
    fireEvent.click(toggle);

    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("shows both desktop and mobile nav links once the menu opens", () => {
    render(<Header />);
    const toggle = screen.getByRole("button", { name: "メニューを開閉する" });

    expect(screen.getAllByRole("link", { name: "Blog" })).toHaveLength(1);

    fireEvent.click(toggle);

    expect(screen.getAllByRole("link", { name: "Blog" })).toHaveLength(2);
  });
});
