import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import LoadingWidget from "./loading-widget";

describe("LoadingWidget", () => {
  it("deve renderizar o texto de carregamento", () => {
    render(<LoadingWidget />);

    expect(screen.getByText("Carregando...")).toBeInTheDocument();
  });

  it("deve ter o spinner de loading", () => {
    render(<LoadingWidget />);

    const spinner = screen.getByText("Carregando...").previousElementSibling;
    expect(spinner).toBeInTheDocument();
  });
});
