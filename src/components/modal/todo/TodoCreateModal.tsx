import {useInput} from "@/hooks/useInput";
import {FormEvent, useState} from "react";
import {PRIORITY} from "@/types/Todo";
import styles from './TodoModal.module.scss';

interface TodoCreateModalProps {
    callback: (type: string) => void;
}

export default function TodoCreateModal({callback}: TodoCreateModalProps) {
    const todoRegisterInputs = useInput({
        title: '',
        description: ''
    })
    const [priority, setPriority] = useState<PRIORITY>(PRIORITY.MEDIUM)


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
        todoRegisterInputs.resetValue();
        callback('success');

    }

    return <form className={styles['todo-register']} onSubmit={handleSubmit}>
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