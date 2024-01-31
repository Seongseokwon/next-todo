'use client';
import {Fragment, useEffect, useState} from "react";
import Calendar from "@/components/calendar/Calendar";
import TodoHeader from "@/components/todo/TodoHeader";
import TodoList from "@/components/todo/TodoList";

type ViewModeType = 'CALENDAR' | 'LIST';
export default function TodoTemplate() {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [viewMode, setViewMode] = useState<ViewModeType>('CALENDAR');
    const getMonthlyData = async () => {
        const monthOfSelectedDate =
            selectedDate.getFullYear() +'-'+ (selectedDate.getMonth()+1).toString().padStart(2, '0') +'-'+ '01'

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todo?selectedDate=${monthOfSelectedDate}`, {
            method: 'GET',
            headers: {
                'Content-type' : 'application/json'
            },
        })

        if(!res.ok) return ;
        console.log(JSON.parse(await res.json()));
    }

    useEffect(() => {
        getMonthlyData();
    },[])

    const handleViewModeChange = () => {
        setViewMode((prev) => prev === 'CALENDAR' ? 'LIST' : 'CALENDAR');
    }

    const handleSelectDateChange = (date: Date) => {
        setSelectedDate(() => date);
    }

    if (viewMode === 'CALENDAR' ) {
        return <Fragment>
            <Calendar selectedDate={selectedDate} changeSelectDate={handleSelectDateChange}/>
            <button type='button' onClick={handleViewModeChange}>리스트 보기</button>
        </Fragment>
    }

    return <Fragment>
        <TodoHeader selectedDate={selectedDate}/>
        <TodoList/>
        <button type='button' onClick={handleViewModeChange}>달력 보기</button>
    </Fragment>
}