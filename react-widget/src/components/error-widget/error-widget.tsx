import React from "react";

interface ErrorWidgetProps {
  error: string;
  onRetry: () => void;
}

const ErrorWidget: React.FC<ErrorWidgetProps> = ({ error, onRetry }) => {
  return (
    <div className="w-80 h-[600px] bg-widget-green-dark rounded-lg flex items-center justify-center p-4">
      <div className="text-white text-center">
        <p className="text-red-300 mb-4">{error}</p>
        <button
          onClick={onRetry}
          className="bg-widget-green-light text-white px-4 py-2 rounded-lg hover:bg-widget-green transition-colors"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  );
};

export default ErrorWidget;
