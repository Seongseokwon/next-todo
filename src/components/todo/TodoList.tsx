import {useAppSelector} from "@/redux/hooks";
import TodoItem from "@/components/todo/TodoItem";

interface TodoListProps {
    selectedDate: Date
}

export default function TodoList({selectedDate}: TodoListProps) {
    const {todoData} = useAppSelector((state) => state.todoReducer)

    return <div>
        {
            todoData.filter(todos => todos.day === selectedDate.getDate())[0]?.todos
                .map(todo => (
                <TodoItem key={todo.id} todo={todo}/>
                ))
        }
    </div>
}