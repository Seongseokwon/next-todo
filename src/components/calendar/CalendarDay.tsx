import styles from './Calendar.module.scss';
import {ReactNode} from "react";
import Circle from "@/components/ui/circle/Circle";

interface CalendarDayProps {
    children: ReactNode;
    week: number;
}
export default function CalendarDay({children, week}: CalendarDayProps) {
    return <div className={styles['calendar-day']}>
        {children}
        {
            week !== 0 ? <Circle size={'xsm'} /> : ''
        }

    </div>
}