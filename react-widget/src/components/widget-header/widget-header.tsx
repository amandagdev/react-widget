import React from "react";
import type { User } from "../../services/api";

interface WidgetHeaderProps {
  user: User;
  onClose: () => void;
}

const WidgetHeader: React.FC<WidgetHeaderProps> = ({ user, onClose }) => {
  return (
    <div className="bg-widget-green-light p-4 flex justify-between items-center">
      <div className="text-white">
        <p className="font-medium mb-1">Nome: {user.name}</p>
        <p className="text-sm opacity-90">E-mail: {user.email}</p>
      </div>
      <button
        onClick={onClose}
        className="w-6 h-6 bg-widget-green-light rounded-full flex items-center justify-center hover:bg-widget-green transition-colors text-white text-sm font-bold"
      >
        ×
      </button>
    </div>
  );
};

export default WidgetHeader;
