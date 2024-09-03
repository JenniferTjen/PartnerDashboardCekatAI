import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';


interface CustomWarningProps {
  message: string;
  date: string;
  className?: string;
  onClick?: () => void;
  type: 'error' | 'warning' | 'info';
}

const CustomWarning: React.FC<CustomWarningProps> = ({ message, date, className = '', onClick, type }) => {
  let bgColor, borderColor, hoverBgColor, textColor, hoverTextColor;

  switch (type) {
    case 'error':
      bgColor = 'bg-red-500';
      borderColor = 'border-red-500';
      hoverBgColor = 'hover:bg-red-500';
      textColor = 'text-red-500';
      hoverTextColor = 'hover:text-white';
      break;
    case 'warning':
      bgColor = 'bg-yellow-500';
      borderColor = 'border-yellow-500';
      hoverBgColor = 'hover:bg-yellow-500';
      textColor = 'text-yellow-500';
      hoverTextColor = 'hover:text-white';
      break;
    case 'info':
      bgColor = 'bg-blue-500';
      borderColor = 'border-blue-500';
      hoverBgColor = 'hover:bg-blue-500';
      textColor = 'text-blue-500';
      hoverTextColor = 'hover:text-white';
      break;
    default:
      bgColor = 'bg-gray-500';
      borderColor = 'border-gray-500';
      hoverBgColor = 'hover:bg-gray-500';
      textColor = 'text-gray-500';
      hoverTextColor = 'hover:text-white';
      break;
  }

  const baseStyles = 'flex items-center px-4 py-2 rounded-md transition-colors duration-150';
  const nonClickableStyles = `${bgColor} text-white`;
  const clickableStyles = `border ${borderColor} ${textColor} bg-white ${hoverBgColor} ${hoverTextColor} cursor-pointer`;

  return (
    <div
      className={`${baseStyles} ${onClick ? clickableStyles : nonClickableStyles} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyPress={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
        {onClick? "":<FontAwesomeIcon icon={faCircleExclamation} className="mr-2 w-4 "  />}
      <span>{message} <strong>{date}</strong></span>
    </div>
  );
};

export default CustomWarning;
