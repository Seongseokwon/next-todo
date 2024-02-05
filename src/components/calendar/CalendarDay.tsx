import styles from './Calendar.module.scss';
import {ReactNode} from "react";
import Circle from "@/components/ui/circle/Circle";
import {TodoData} from "@/types/Todo";

interface CalendarDayProps {
    day: TodoData;
    week: number;
    selectedDateChange: (day: number) => void;
}
export default function CalendarDay({ week, day, selectedDateChange}: CalendarDayProps) {

    const selectDate = (day:number) => {
        selectedDateChange(day);
    }

    const circleStatusCheck = (todoData: TodoData) => {
        const today = new Date();
        if(todoData.day > today.getDate()) return 'not-yet';
        if(todoData.total === 0) return 'not-yet';

        return todoData.completed/ todoData.total === 1 ? 'completed' : 'failed'
    }

    return <div role='presentation' className={styles['calendar-day']} onClick={() => {
        if (week === 0) return;
        selectDate(day.day);
    }}>
        {
            week === 0 ?
                <>{day.day}</>:

                day.day !== 0 ? <>
                    {day.day}
                    <Circle size={'xsm'} status={circleStatusCheck(day)} />
                </> : ''
        }

    </div>
}