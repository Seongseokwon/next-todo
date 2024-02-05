import {PRIORITY, Todo} from "@/types/Todo";
import {FaRegTrashAlt} from "react-icons/fa";
import Circle from "@/components/ui/circle/Circle";
import styles from './Todo.module.scss';

interface TodoItemProps {
    todo: Todo
}


export default function TodoItem({todo}: TodoItemProps) {
    const priorityToString = () => {
        if (todo.priority === PRIORITY.HIGH) return 'high';
        else if (todo.priority === PRIORITY.MEDIUM) return 'medium';
        else return  'low'
    }
    return <div className={`${styles['todo-item']}`}>
        <section className={styles['todo-item__checkbox']}>
            <input type="checkbox"/>
        </section>
        <section className={styles['todo-item__todo-info']}>
            <div className={styles['todo-item__todo-info__title']}>
                <Circle size={'sm'} status={priorityToString()}/>
                <h3 title={todo.title}>{todo.title}</h3>
            </div>
            <div title={todo?.description} className={styles['todo-item__todo-info__description']}>
                {todo?.description}
            </div>
        </section>
        <section className={styles['todo-item__control-box']}>
            <button className={styles['todo-item__control-box__delete-btn']} type={'button'}><FaRegTrashAlt /></button>
        </section>
    </div>
}