import styles from './Button.module.scss';
import {ReactNode} from "react";

interface ButtonStyleProps {
    size?: 'xsm' | 'sm' | 'md' | 'lg' | 'xlg';
    color?: 'default' | 'primary' | 'warning' | 'error'
    borderStyle?: 'none'
}

interface ButtonProps extends ButtonStyleProps {
    children: ReactNode;
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
}

export default function Button(
    {
        children,
        size = 'md',
        type = 'button',
        color = 'default',
        borderStyle,
        onClick}: ButtonProps) {
    const buttonClasses = `
    ${styles['btn']} 
    ${styles[size]}
    ${styles[color]} 
    ${borderStyle ? styles[borderStyle] : ''}`
    return <button type={type} className={buttonClasses} onClick={onClick}>
        {children}
    </button>
}