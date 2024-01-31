import {PRIORITY, Todo} from "@/types/Todo";
import TodoItem from "@/components/todo/TodoItem";

const todos: Todo[] = [
    {
        id: 'asd-asd',
        title: '할일 제목',
        description: '설명 blasdll',
        priority: PRIORITY.MEDIUM,
        completed: false,
        createdAt: '',
        updatedAt: '',
        userId: 1
    },
    {
        id: 'asd-a2xsd',
        title: '할일 제목 2323',
        description: '설명 blasdasdasdasdll',
        priority: PRIORITY.MEDIUM,
        completed: false,
        createdAt: '',
        updatedAt: '',
        userId: 1
    }
];
export default function TodoList() {
    return <div>
        {todos.map(todo => (<TodoItem key={todo.id} todo={todo}/>))}
    </div>
}