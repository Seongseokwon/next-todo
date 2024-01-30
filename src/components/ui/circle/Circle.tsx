import {Fragment, ReactNode} from "react";
import styles from './Circle.module.scss';

interface CircleStylesProps {
    size: 'xsm' | 'sm' | 'md' | 'lg' | 'xlg'
}
interface CircleProps extends CircleStylesProps{
    children?: ReactNode
}
export default function Circle({children, size = 'sm'}: CircleProps) {

    const circleClasses = `${styles['circle']} ${styles[size]}`
    return <div className={`${styles['circle-container']}`}>
        <div className={circleClasses} />
        {children ? <p>{children}</p>: ''}
    </div>
}