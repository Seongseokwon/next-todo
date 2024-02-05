'use client';

import {useInput} from "@/hooks/useInput";
import {FormEvent, useState} from "react";
import {PRIORITY} from "@/types/Todo";
import styles from './TodoModal.module.scss';
import { FaTimes } from "react-icons/fa";
import useModal from "@/hooks/useModal";


export default function TodoCreateModal () {
    const todoRegisterInputs = useInput({
        title: '',
        description: ''
    })
    const [priority, setPriority] = useState<PRIORITY>(PRIORITY.MEDIUM)
    const {close} = useModal();
    const closeModal = ( ) => {
        close('TodoCreate');
    }
    const handleSubmit = async (e: FormEvent<HTMLFormElement>)=> {
        e.preventDefault();

        const registerData = {...todoRegisterInputs.value, priority}

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todo`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(registerData)
        })
        if (!res.ok) return;
        console.log(res.json());
    }

    return <form className={styles['todo-register']} onSubmit={handleSubmit}>
        <header className={styles['todo-register__header']}>
            <h2>할 일 등록</h2>
            <button type='button' onClick={closeModal}><FaTimes /></button>
        </header>
        <div className={styles['todo-register__title-box']}>
            <input type='text' name='title' value={todoRegisterInputs.value.title}
                   onChange={todoRegisterInputs.onChange}/>
        </div>
        <div className={styles['todo-register__description-box']}>
                <textarea name="description" value={todoRegisterInputs.value.description}
                          onChange={todoRegisterInputs.onChange}/>
        </div>
        <div className={styles['todo-register__priority-box']}>
            <button type="button" onClick={() => setPriority(() => PRIORITY.LOW)}>LOW</button>
            <button type="button" onClick={() => setPriority(() => PRIORITY.MEDIUM)}>MEDIUM</button>
            <button type="button" onClick={() => setPriority(() => PRIORITY.HIGH)}>HIGH</button>
        </div>
        <button type="submit">등록</button>
    </form>
}