import {Fragment, ReactNode} from "react";
import styles from './Circle.module.scss';

interface CircleStylesProps {
    size: 'xsm' | 'sm' | 'md' | 'lg' | 'xlg';
    status: 'high'| 'medium'| 'low' | 'completed' | 'failed' |  'proceeding' |'not-yet' | 'default';

}
interface CircleProps extends CircleStylesProps{
    children?: ReactNode
}
export default function Circle({children, size = 'sm', status='default'}: CircleProps) {

    const circleClasses = `${styles['circle']} ${styles[size]} ${styles[status]}`
    return <div className={`${styles['circle-container']}`}>
        <div className={circleClasses} />
        {children ? <p>{children}</p>: ''}
    </div>
}