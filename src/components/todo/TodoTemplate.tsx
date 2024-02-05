'use client';
import {Fragment, useEffect, useState} from "react";
import Calendar from "@/components/calendar/Calendar";
import TodoHeader from "@/components/todo/TodoHeader";
import TodoList from "@/components/todo/TodoList";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {setTodos} from "@/redux/features/todos/todosSlice";
import {useSelector} from "react-redux";
import Modal from "@/components/modal/Modal";
import TodoCreateModal from "@/components/modal/todo/TodoCreateModal";

type ViewModeType = 'CALENDAR' | 'LIST';
export default function TodoTemplate() {
    const [date, setDate] = useState<Date>(new Date());
    const [viewMode, setViewMode] = useState<ViewModeType>('CALENDAR');
    const {openModals} = useAppSelector((state) => state.modalReducer);
    const dispatch = useAppDispatch();

    const getMonthlyData = async (curDate:Date = date) => {
        const month  = (curDate.getMonth()+1).toString()

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todo?month=${month}`, {
            method: 'GET',
            headers: {
                'Content-type' : 'application/json'
            },
        })

        if(!res.ok) return ;
        dispatch(setTodos(JSON.parse(await res.json())));
    }
    const handleViewModeChange = () => {
        setViewMode((prev) => prev === 'CALENDAR' ? 'LIST' : 'CALENDAR');
    }

    const handleDateChange = (d: Date) => {
        setDate(() => d);
    }

    const handleCalendarChange = async  (updateMonth: Date) => {
        await getMonthlyData(updateMonth);
    }

    useEffect(() => {
        getMonthlyData();
    }, []);

    console.log('Open Modals', openModals);

    if (viewMode === 'CALENDAR' ) {
        return <Fragment>
            <Calendar date={date} changeMonth={handleCalendarChange} changeDate={handleDateChange}/>
            <button type='button' onClick={handleViewModeChange}>리스트 보기</button>
            {
                openModals.filter(modal =>
                    modal.name === 'TodoCreate')[0]?.isOpen ?
                    <Modal children={<TodoCreateModal />}/> : ''
            }
        </Fragment>
    }

    return <Fragment>
        <TodoHeader selectedDate={date}/>
        <TodoList selectedDate={date}/>
        <button type='button' onClick={handleViewModeChange}>달력 보기</button>
        {
            openModals.filter(modal =>
                modal.name === 'TodoCreate')[0]?.isOpen ?
                <Modal children={<TodoCreateModal />}/> : ''
        }
    </Fragment>
}