import {Todo} from "@/types/Todo";
import { FaRegTrashAlt } from "react-icons/fa";
import Circle from "@/components/ui/circle/Circle";

interface TodoItemProps {
    todo: Todo
}
export default function TodoItem({todo}: TodoItemProps) {
    console.log(todo);
    return <div>
        <section>
            <input type="checkbox"/>
        </section>
        <section>
            <div>
                <Circle size={'md'} status={todo.completed ? 'completed' : 'failed'}/>
                <h3>{todo.title}</h3>
            </div>
            <div>
                {todo?.description}
            </div>
        </section>
        <section><button type={'button'}><FaRegTrashAlt /></button></section>
    </div>
}