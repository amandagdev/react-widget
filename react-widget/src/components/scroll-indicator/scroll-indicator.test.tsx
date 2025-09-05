import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ScrollIndicator from "./scroll-indicator";

describe("ScrollIndicator", () => {
  it("deve renderizar o botão de scroll", () => {
    render(<ScrollIndicator />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("deve ter o ícone de seta para baixo", () => {
    render(<ScrollIndicator />);

    const svg = screen.getByRole("button").querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass("w-4", "h-4");
  });
});
