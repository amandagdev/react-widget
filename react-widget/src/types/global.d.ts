declare global {
  interface Window {
    loggedUserId?: number;
    parent: {
      postMessage: (message: unknown, targetOrigin: string) => void;
    };
  }
}

export {};
