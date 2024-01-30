'use client';
import {Fragment, useState} from "react";
import Calendar from "@/components/calendar/Calendar";
import TodoHeader from "@/components/todo/TodoHeader";
import TodoList from "@/components/todo/TodoList";

type ViewModeType = 'CALENDAR' | 'LIST';
export default function TodoTemplate() {
    const [viewMode, setViewMode] = useState<ViewModeType>('CALENDAR');

    const handleViewModeChange = () => {
        setViewMode((prev) => prev === 'CALENDAR' ? 'LIST' : 'CALENDAR');
    }

    if (viewMode === 'CALENDAR' ) {
        return <Fragment>
            <Calendar />
            <button type='button' onClick={handleViewModeChange}>리스트 보기</button>
        </Fragment>
    }

    return <Fragment>
        <TodoHeader/>
        <TodoList/>
        <button type='button' onClick={handleViewModeChange}>달력 보기</button>
    </Fragment>
}