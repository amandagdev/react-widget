import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import WidgetHeader from "./widget-header";

const mockUser = {
  id: 1,
  name: "Leanne Graham",
  email: "Sincere@april.biz",
  username: "Bret",
  phone: "1-770-736-8031 x56442",
  website: "hildegard.org",
  address: {
    street: "Kulas Light",
    suite: "Apt. 556",
    city: "Gwenborough",
    zipcode: "92998-3874",
    geo: {
      lat: "-37.3159",
      lng: "81.1496",
    },
  },
  company: {
    name: "Romaguera-Crona",
    catchPhrase: "Multi-layered client-server neural-net",
    bs: "harness real-time e-markets",
  },
};

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
