import React, { ReactNode } from 'react';

// Define the prop types
interface CustomButtonProps {
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
    isLoading?: boolean;
    text?: string;
    children?: ReactNode;
    textCondition?: boolean;
    type?: any;
}

const CustomButton: React.FC<CustomButtonProps> = ({
    className = '',
    onClick,
    disabled = false,
    isLoading = false, 
    text = '',
    children,
    textCondition,
    type = 'button'
}) => {
    // Determine button text
    // const buttonText = isLoading ? 'Loading' : (textCondition !== undefined ? (textCondition ? text : '') : text);
    return (
        <button
            type={type} 
            className={className} 
            onClick={onClick} 
            disabled={disabled || isLoading}
        >
            {text}
            {children}
        </button>
    );
};

export default CustomButton;
