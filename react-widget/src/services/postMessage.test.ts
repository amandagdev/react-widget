import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  listenForUserId,
  requestUserId,
  sendCloseMessage,
} from "./postMessage";

describe("PostMessage Functions", () => {
  const mockPostMessage = vi.fn();
  const mockAddEventListener = vi.fn();
  const mockRemoveEventListener = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    Object.defineProperty(window, "parent", {
      value: {
        postMessage: mockPostMessage,
      },
      writable: true,
    });

    Object.defineProperty(window, "addEventListener", {
      value: mockAddEventListener,
      writable: true,
    });

    Object.defineProperty(window, "removeEventListener", {
      value: mockRemoveEventListener,
      writable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("requestUserId", () => {
    it("deve enviar mensagem para window.parent quando em iframe", () => {
      requestUserId();

      expect(mockPostMessage).toHaveBeenCalledWith(
        { type: "REQUEST_USER_ID" },
        "*"
      );
    });
  });

  describe("sendCloseMessage", () => {
    it("deve enviar mensagem de fechar para window.parent", () => {
      sendCloseMessage();

      expect(mockPostMessage).toHaveBeenCalledWith(
        { type: "CLOSE_WIDGET" },
        "*"
      );
    });
  });

  describe("listenForUserId", () => {
    it("deve adicionar listener para mensagens e retornar função de cleanup", () => {
      const callback = vi.fn();
      const removeListener = listenForUserId(callback);

      expect(mockAddEventListener).toHaveBeenCalledWith(
        "message",
        expect.any(Function)
      );
      expect(typeof removeListener).toBe("function");
    });

    it("deve chamar callback quando receber USER_ID_RESPONSE", () => {
      const callback = vi.fn();
      let messageHandler: (event: MessageEvent) => void;

      mockAddEventListener.mockImplementation((event, handler) => {
        if (event === "message") {
          messageHandler = handler;
        }
      });

      listenForUserId(callback);

      const mockEvent = {
        data: {
          type: "USER_ID_RESPONSE",
          userId: 123,
        },
      } as MessageEvent;

      messageHandler!(mockEvent);

      expect(callback).toHaveBeenCalledWith(123);
    });

    it("não deve chamar callback para outros tipos de mensagem", () => {
      const callback = vi.fn();
      let messageHandler: (event: MessageEvent) => void;

      mockAddEventListener.mockImplementation((event, handler) => {
        if (event === "message") {
          messageHandler = handler;
        }
      });

      listenForUserId(callback);

      const mockEvent = {
        data: {
          type: "OTHER_MESSAGE",
          userId: 123,
        },
      } as MessageEvent;

      messageHandler!(mockEvent);

      expect(callback).not.toHaveBeenCalled();
    });

    it("deve remover listener quando cleanup for chamado", () => {
      const callback = vi.fn();
      const removeListener = listenForUserId(callback);

      removeListener();

      expect(mockRemoveEventListener).toHaveBeenCalledWith(
        "message",
        expect.any(Function)
      );
    });
  });
});
