import React, { ReactNode, MouseEvent } from 'react';

interface ButtonProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  color: 'white' | 'blue';
  icon?: string;
  children: ReactNode;
  isFormComplete: Boolean
}

const ButtonAdmin: React.FC<ButtonProps> = ({ onClick, color, icon, children, isFormComplete }) => {
  // Define tailwind classes based on the color prop
  const getButtonColor = () => {
    switch (color) {
      case 'white':
        return 'bg-white text-black';
      case 'blue':
        return 'bg-gradient-to-r from-[#1e3c72] to-[#295095] text-white ';
      default:
        return 'bg-gray-300 text-black';
    }
  };

  // Define tailwind classes for the icon (if provided)
  const getIconClasses = () => {
    return icon ? 'mr-2' : '';
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center px-4 py-2 rounded-md hover:opacity-90 duration-200 ease-in-out transition-all shadow ${getButtonColor()} ${isFormComplete ? "" : "opacity-50 pointer-events-none disabled"}`}
    >
      {icon && <span className={`${getIconClasses()} material-icons`}>{icon}</span>}
      {children}
    </button>
  );
};

export default ButtonAdmin;
