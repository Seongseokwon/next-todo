import styles from './Calendar.module.scss';
import {ReactNode} from "react";
import Circle from "@/components/ui/circle/Circle";
import {TodoData} from "@/types/Todo";

interface CalendarDayProps {
    day: TodoData;
    week: number;
    selected: boolean
    selectedDateChange: (day: number) => void;
}
export default function CalendarDay({ week, day, selected, selectedDateChange}: CalendarDayProps) {
    const calendarDayClasses = `
        ${styles['calendar-day']} 
        ${day.day === 0 || week === 0 ?  '' : styles['real']}
        ${selected ? styles['selected'] : ''}
    `;
    const selectDate = (day:number) => {
        selectedDateChange(day);
    }

    const circleStatusCheck = (todoData: TodoData) => {
        const today = new Date();
        if(todoData.day > today.getDate() || todoData.total === 0) return 'not-yet';

        if(todoData.day === today.getDate()){
            if (todoData.completed/ todoData.total === 1 ) return 'completed';
            else return 'proceeding';
        }

        if (todoData.completed/ todoData.total === 1 ) return 'completed';

        return 'failed';
    }

    return <div role='presentation' className={calendarDayClasses} onClick={() => {
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