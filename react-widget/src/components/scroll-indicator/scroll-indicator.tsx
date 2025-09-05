import React from "react";

const ScrollIndicator: React.FC = () => {
  return (
    <div className="flex justify-end p-2">
      <button className="w-8 h-8 bg-widget-green-light rounded-full flex items-center justify-center hover:bg-widget-green transition-colors text-white">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
    </div>
  );
};

export default ScrollIndicator;
