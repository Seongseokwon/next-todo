import styles from './Calendar.module.scss';
import {ReactNode} from "react";
import Circle from "@/components/ui/circle/Circle";

interface CalendarDayProps {
    day: number;
    week: number;
    selectedDateChange: (day: number) => void;
}
export default function CalendarDay({ week, day, selectedDateChange}: CalendarDayProps) {

    const selectDate = () => {
        selectedDateChange(day);
    }

    return <div role='presentation' className={styles['calendar-day']} onClick={selectDate}>
        {day}
        {
            week !== 0 ? <Circle size={'xsm'} /> : ''
        }

    </div>
}