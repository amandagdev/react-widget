import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ErrorWidget from "./error-widget";

describe("ErrorWidget", () => {
  it("deve renderizar a mensagem de erro", () => {
    const errorMessage = "Erro ao carregar dados";
    const mockOnRetry = vi.fn();

    render(<ErrorWidget error={errorMessage} onRetry={mockOnRetry} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByText("Tentar novamente")).toBeInTheDocument();
  });

  it("deve chamar onRetry quando o botão for clicado", async () => {
    const userEvent = (
      await import("@testing-library/user-event")
    ).default.setup();

    const errorMessage = "Erro ao carregar dados";
    const mockOnRetry = vi.fn();

    render(<ErrorWidget error={errorMessage} onRetry={mockOnRetry} />);

    const retryButton = screen.getByText("Tentar novamente");
    await userEvent.click(retryButton);

    expect(mockOnRetry).toHaveBeenCalledTimes(1);
  });
});
