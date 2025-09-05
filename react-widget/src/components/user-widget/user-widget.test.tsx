import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import UserWidget from "./user-widget";

const mockPostMessage = vi.fn();
Object.defineProperty(window, "parent", {
  value: {
    postMessage: mockPostMessage,
  },
  writable: true,
});

describe("UserWidget", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("deve exibir loading inicial", () => {
    render(<UserWidget />);

    expect(screen.getByText("Carregando...")).toBeInTheDocument();
  });

  it("deve solicitar ID do usuário via postMessage", () => {
    render(<UserWidget />);

    expect(mockPostMessage).toHaveBeenCalledWith(
      { type: "REQUEST_USER_ID" },
      "*"
    );
  });

  it("deve renderizar o componente sem erros", () => {
    const { container } = render(<UserWidget />);

    expect(container.firstChild).toBeInTheDocument();
  });

  it("deve ter a estrutura básica do widget", () => {
    render(<UserWidget />);

    // Verifica se o container principal está presente
    const container = screen.getByText("Carregando...").closest("div");
    expect(container).toBeInTheDocument();
  });
});
