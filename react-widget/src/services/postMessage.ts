export interface PostMessageData {
  type: string;
  userId?: number;
}

export function requestUserId(): void {
  if (window.parent && window.parent !== window) {
    window.parent.postMessage({ type: "REQUEST_USER_ID" }, "*");
  }
}

export function sendCloseMessage(): void {
  if (window.parent && window.parent !== window) {
    window.parent.postMessage({ type: "CLOSE_WIDGET" }, "*");
  }
}

export function listenForUserId(
  callback: (userId: number) => void
): () => void {
  const handleMessage = (event: MessageEvent<PostMessageData>) => {
    if (event.data.type === "USER_ID_RESPONSE" && event.data.userId) {
      callback(event.data.userId);
    }
  };

  window.addEventListener("message", handleMessage);

  return () => {
    window.removeEventListener("message", handleMessage);
  };
}
