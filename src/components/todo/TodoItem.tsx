import {PRIORITY, Todo} from "@/types/Todo";
import {FaRegTrashAlt} from "react-icons/fa";
import Circle from "@/components/ui/circle/Circle";

interface TodoItemProps {
    todo: Todo
}


export default function TodoItem({todo}: TodoItemProps) {
    const priorityToString = () => {
        if (todo.priority === PRIORITY.HIGH) return 'high';
        else if (todo.priority === PRIORITY.MEDIUM) return 'medium';
        else return  'low'
    }
    return <div>
        <section>
            <input type="checkbox"/>
        </section>
        <section>
            <div>
                <Circle size={'md'} status={priorityToString()}/>
                <h3>{todo.title}</h3>
            </div>
            <div>
                {todo?.description}
            </div>
        </section>
        <section><button type={'button'}><FaRegTrashAlt /></button></section>
    </div>
}