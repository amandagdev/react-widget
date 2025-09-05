import "@testing-library/jest-dom";
import { vi } from "vitest";

Object.defineProperty(window, "parent", {
  value: {
    postMessage: vi.fn(),
  },
  writable: true,
});

Object.defineProperty(globalThis, "fetch", {
  value: vi.fn(),
  writable: true,
});

const mockAddEventListener = vi.fn();
const mockRemoveEventListener = vi.fn();

Object.defineProperty(window, "addEventListener", {
  value: mockAddEventListener,
  writable: true,
});

Object.defineProperty(window, "removeEventListener", {
  value: mockRemoveEventListener,
  writable: true,
});
