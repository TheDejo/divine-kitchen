import React from 'react';
import classNames from 'classnames';
import { BUTTON_VARIANT } from '../../utils/types';
import styles from './Button.module.css';

type ButtonVariant = BUTTON_VARIANT;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = BUTTON_VARIANT.PRIMARY,
    className,
    style,
    ...props
}) => {
    const buttonClass = classNames(
        styles.button,
        {
            [styles.primary]: variant === BUTTON_VARIANT.PRIMARY,
            [styles.secondary]: variant === BUTTON_VARIANT.SECONDARY,
            [styles.danger]: variant === BUTTON_VARIANT.DANGER,
        },
        className
    );

    return (
        <button className={buttonClass} style={style} {...props}>
            {children}
        </button>
    );
};