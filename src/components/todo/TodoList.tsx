import {useAppSelector} from "@/redux/hooks";
import TodoItem from "@/components/todo/TodoItem";
import {Todo} from "@/types/Todo";

interface TodoListProps {
    selectedDate: Date
    updateTodoStatus: (todo: Todo) => void;
}

export default function TodoList({selectedDate, updateTodoStatus}: TodoListProps) {
    const {todoData} = useAppSelector((state) => state.todoReducer)

    return <div>
        {
            todoData.filter(todos => todos.day === selectedDate.getDate())[0]?.todos
                .map(todo => (
                <TodoItem key={todo.id} todo={todo} updateTodoStatus={updateTodoStatus}/>
                ))
        }
    </div>
}