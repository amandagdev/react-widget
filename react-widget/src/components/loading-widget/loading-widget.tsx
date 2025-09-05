import React from "react";

const LoadingWidget: React.FC = () => {
  return (
    <div className="w-80 h-[600px] bg-widget-green-dark rounded-lg flex items-center justify-center">
      <div className="text-white text-center">
        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p>Carregando...</p>
      </div>
    </div>
  );
};

export default LoadingWidget;
