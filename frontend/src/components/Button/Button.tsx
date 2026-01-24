import React from 'react';
import { BUTTON_VARIANT } from '../../utils/types';

type ButtonVariant = BUTTON_VARIANT;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = BUTTON_VARIANT.PRIMARY,
    style,
    ...props
}) => {
    const getBackgroundColor = () => {
        switch (variant) {
            case BUTTON_VARIANT.DANGER: return '#ff4444';
            case BUTTON_VARIANT.SECONDARY: return '#6c757d';
            case BUTTON_VARIANT.PRIMARY:
            default: return '#4CAF50';
        }
    };

    const baseStyle: React.CSSProperties = {
        padding: '10px 20px',
        backgroundColor: getBackgroundColor(),
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: props.disabled ? 'not-allowed' : 'pointer',
        opacity: props.disabled ? 0.7 : 1,
        transition: 'background-color 0.2s',
        ...style,
    };

    return (
        <button style={baseStyle} {...props}>
            {children}
        </button>
    );
};