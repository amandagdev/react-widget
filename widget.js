(function () {
  "use strict";

  const WIDGET_CONFIG = {
    iframeUrl: "http://localhost:5178",
    buttonColor: "#10B981",
    buttonSize: "60px",
    zIndex: 9999,
  };

  let isOpen = false;
  let iframe = null;
  let button = null;

  function createFloatingButton() {
    button = document.createElement("button");
    button.innerHTML = "💬";
    button.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: ${WIDGET_CONFIG.buttonSize};
      height: ${WIDGET_CONFIG.buttonSize};
      border-radius: 50%;
      background-color: ${WIDGET_CONFIG.buttonColor};
      border: none;
      color: white;
      font-size: 24px;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: ${WIDGET_CONFIG.zIndex};
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

    button.addEventListener("mouseenter", () => {
      button.style.transform = "scale(1.1)";
      button.style.boxShadow = "0 6px 16px rgba(0, 0, 0, 0.2)";
    });

    button.addEventListener("mouseleave", () => {
      button.style.transform = "scale(1)";
      button.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
    });

    button.addEventListener("click", toggleWidget);
    document.body.appendChild(button);
  }

  function createIframe() {
    iframe = document.createElement("iframe");
    iframe.src = WIDGET_CONFIG.iframeUrl;
    iframe.style.cssText = `
      position: fixed;
      bottom: 90px;
      right: 20px;
      width: 320px;
      height: 600px;
      border: none;
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
      z-index: ${WIDGET_CONFIG.zIndex - 1};
      display: none;
      background: white;
    `;

    iframe.addEventListener("load", () => {
      if (window.loggedUserId) {
        iframe.contentWindow.postMessage(
          {
            type: "USER_ID_RESPONSE",
            userId: window.loggedUserId,
          },
          "*"
        );
      }
    });

    window.addEventListener("message", (event) => {
      if (event.data.type === "REQUEST_USER_ID") {
        iframe.contentWindow.postMessage(
          {
            type: "USER_ID_RESPONSE",
            userId: window.loggedUserId || 1,
          },
          "*"
        );
      } else if (event.data.type === "CLOSE_WIDGET") {
        closeWidget();
      }
    });

    document.body.appendChild(iframe);
  }

  function openWidget() {
    if (!iframe) createIframe();

    isOpen = true;
    iframe.style.display = "block";
    button.innerHTML = "✕";
    button.style.transform = "rotate(45deg)";

    iframe.style.opacity = "0";
    iframe.style.transform = "translateY(20px) scale(0.9)";

    setTimeout(() => {
      iframe.style.transition = "all 0.3s ease";
      iframe.style.opacity = "1";
      iframe.style.transform = "translateY(0) scale(1)";
    }, 10);
  }

  function closeWidget() {
    if (!iframe) return;

    isOpen = false;
    iframe.style.transition = "all 0.3s ease";
    iframe.style.opacity = "0";
    iframe.style.transform = "translateY(20px) scale(0.9)";

    setTimeout(() => {
      iframe.style.display = "none";
    }, 300);

    button.innerHTML = "💬";
    button.style.transform = "rotate(0deg)";
  }

  function toggleWidget() {
    if (isOpen) {
      closeWidget();
    } else {
      openWidget();
    }
  }

  function handleClickOutside(event) {
    if (
      isOpen &&
      iframe &&
      !iframe.contains(event.target) &&
      !button.contains(event.target)
    ) {
      closeWidget();
    }
  }

  function init() {
    if (document.getElementById("user-widget-button")) return;

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", init);
      return;
    }

    createFloatingButton();
    document.addEventListener("click", handleClickOutside);

    button.id = "user-widget-button";
  }

  init();

  window.UserWidget = {
    open: openWidget,
    close: closeWidget,
    toggle: toggleWidget,
    isOpen: () => isOpen,
  };
})();
