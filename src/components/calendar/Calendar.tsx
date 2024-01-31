import {useEffect, useState} from "react";
import {SlArrowLeft, SlArrowRight} from "react-icons/sl";
import Circle from "@/components/ui/circle/Circle";

import styles from './Calendar.module.scss';
import CalendarDay from "@/components/calendar/CalendarDay";

interface CalendarProps {
    selectedDate: Date;
    changeSelectDate: (date: Date) => void;
}

const dayOfWeek = [
    '일', '월', '화', '수', '목', '금', '토',
]
export default function Calendar({selectedDate, changeSelectDate}: CalendarProps) {
    const [calendar, setCalendar] = useState<any[][]>([]);
    const [calendarLoad, setCalendarLoad] = useState<boolean>(false);
    const [displayMonth, setDisplayMonth] = useState<Date>(selectedDate)

    const selectDateChange = (day: number) => {
        changeSelectDate(new Date(displayMonth.getFullYear(), displayMonth.getMonth(), day));
    }

    const generateCalendar = () => {
        const calendarData = [];
        const temp = [];

        const year = displayMonth.getFullYear();
        const month = displayMonth.getMonth();

        const startDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < startDay; i++) {
            temp.push(0);
        }

        for (let i = 1; i <= lastDate; i++) {
            temp.push(i);
        }

        while (temp.length > 0) {
            calendarData.push(temp.splice(0, 7));
        }
        const result = [[...dayOfWeek], ...calendarData];
        setCalendar(() => result);
        setCalendarLoad(true);
    }

    useEffect(() => {
        generateCalendar();
    }, []);
    const showMonth = displayMonth.getFullYear() + '년 ' + (displayMonth.getMonth() + 1) + '월'

    return <div className={styles['calendar']}>
        <header className={styles['calendar__header']}>
            <button type="button"><SlArrowLeft/></button>
            <h2>{showMonth}</h2>
            <button type="button"><SlArrowRight/></button>
        </header>
        <main className={styles['calendar__content']}>
            {/*캘린더 요일*/}
            {calendarLoad ?
                <section className={styles['calendar__content__day-section']}>
                    {calendar.map((week, i) =>
                        week.map((day, j) => (
                            <CalendarDay key={j} week={i}>{day}</CalendarDay>
                        ))
                    )}
                </section>
                :
                <section className={styles['calendar__content__skeleton']}>
                    스켈레톤
                </section>
            }
            {/* Todo 진행 현황 요약   */}
            <section className={styles['calendar__content__summary']}>
                <div className={styles['calendar__content__summary__item']}>
                    <Circle size={'sm'}>
                        완료
                    </Circle>
                </div>
                <div className={styles['calendar__content__summary__item']}>
                    <Circle size={'sm'}>
                        미완료
                    </Circle>
                </div>
            </section>
        </main>
    </div>
}