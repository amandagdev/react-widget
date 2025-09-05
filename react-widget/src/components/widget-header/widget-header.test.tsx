import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { mockUser } from "../../data/mock-data";
import WidgetHeader from "./widget-header";

describe("WidgetHeader", () => {
  it("deve renderizar o nome e email do usuário", () => {
    const mockOnClose = vi.fn();

    render(<WidgetHeader user={mockUser} onClose={mockOnClose} />);

    expect(screen.getByText(`Nome: ${mockUser.name}`)).toBeInTheDocument();
    expect(screen.getByText(`E-mail: ${mockUser.email}`)).toBeInTheDocument();
  });

  it("deve renderizar o botão de fechar", () => {
    const mockOnClose = vi.fn();

    render(<WidgetHeader user={mockUser} onClose={mockOnClose} />);

    const closeButton = screen.getByText("×");
    expect(closeButton).toBeInTheDocument();
  });

  it("deve chamar onClose quando o botão de fechar for clicado", async () => {
    const userEvent = (
      await import("@testing-library/user-event")
    ).default.setup();

    const mockOnClose = vi.fn();

    render(<WidgetHeader user={mockUser} onClose={mockOnClose} />);

    const closeButton = screen.getByText("×");
    await userEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
