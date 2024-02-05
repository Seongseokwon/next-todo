import {TodoData} from "@/types/Todo";
import CalendarDay from "@/components/calendar/CalendarDay";
import styles from './Calendar.module.scss';

interface CalendarWeekProps {
    idx: number;
    week: TodoData[];
    displayMonth: Date;
    selectDate: Date;
    selectedDateChange: (day: number) => void;
}
export default function CalendarWeek({idx, week, displayMonth, selectDate, selectedDateChange}:CalendarWeekProps) {
    const selectedCheck = (day: number) => {
        return (selectDate.getFullYear() + selectDate.getMonth()) === (displayMonth.getFullYear() + displayMonth.getMonth()) && selectDate.getDate() === day
    }
    return <div className={styles['calendar-week']}>
        {week.map((day, j) => (
            <CalendarDay
                key={j}
                selectedDateChange={selectedDateChange}
                selected={selectedCheck(day.day)}
                week={idx}
                day={day}/>
        ))}
    </div>
}

