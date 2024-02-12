'use client';
import {Fragment, useEffect, useState} from "react";
import Calendar from "@/components/calendar/Calendar";
import TodoHeader from "@/components/todo/TodoHeader";
import TodoList from "@/components/todo/TodoList";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {setTodos} from "@/redux/features/todos/todosSlice";
import Modal from "@/components/modal/Modal";
import TodoCreateModal from "@/components/modal/todo/TodoCreateModal";
import useModal from "@/hooks/useModal";
import styles from './Todo.module.scss';
import Button from "@/components/ui/button/Button";
import {Todo} from "@/types/Todo";
import {useSession} from "next-auth/react";

type ViewModeType = 'CALENDAR' | 'LIST';
export default function TodoTemplate() {
    const [date, setDate] = useState<Date>(new Date());
    const [viewMode, setViewMode] = useState<ViewModeType>('CALENDAR');
    const {openModals} = useAppSelector((state) => state.modalReducer);
    const dispatch = useAppDispatch();
    const {update} = useSession();
    const {close} = useModal();
    const getMonthlyData = async (curDate: Date = date) => {
        const month = (curDate.getMonth() + 1).toString()

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todo?month=${month}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            },
        })

        if (!res.ok) return;
        dispatch(setTodos(JSON.parse(await res.json())));
    }
    const handleViewModeChange = () => {
        setViewMode((prev) => prev === 'CALENDAR' ? 'LIST' : 'CALENDAR');
    }

    const handleDateChange = (d: Date) => {
        setDate(() => d);
    }

    const handleCalendarChange = (updateMonth: Date) => {
        getMonthlyData(updateMonth);
    }

    const addTodoSuccess = (type: string) => {
        if (type !== 'success') return;
        close('TodoCreate');
        getMonthlyData();
    }

    const updateTodoStatus = async (todo: Todo) => {
        console.log(todo);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todo`,{
            method: 'PATCH',
            headers: {
                'Content-Type'  : 'application/json'
            },
            body: JSON.stringify(todo)
        });
        if (!res.ok) return;
        await update();
        console.log(await res.json());
    }

    useEffect(() => {
        getMonthlyData();
    }, []);


    if (viewMode === 'CALENDAR') {
        return <div className={styles['todo-container']}>
            <Calendar date={date} changeMonth={handleCalendarChange} changeDate={handleDateChange}/>
            <Button onClick={handleViewModeChange}>리스트 보기</Button>
            {
                openModals.filter(modal =>
                    modal.name === 'TodoCreate')[0]?.isOpen ?
                    <Modal
                        children={<TodoCreateModal selectedDate={date} callback={addTodoSuccess}/>}
                        modalInfo={{title: '할일 등록', name: 'TodoCreate'}}
                    /> : ''
            }
        </div>
    }

    return <div className={styles['todo-container']}>
        <TodoHeader selectedDate={date}/>
        <TodoList selectedDate={date} updateTodoStatus={updateTodoStatus}/>
        <Button onClick={handleViewModeChange}>달력 보기</Button>
        {
            openModals.filter(modal =>
                modal.name === 'TodoCreate')[0]?.isOpen ?
                <Modal
                    children={<TodoCreateModal selectedDate={date} callback={addTodoSuccess}/>}
                    modalInfo={{title: '할일 등록', name: 'TodoCreate'}}
                /> : ''
        }
    </div>
}