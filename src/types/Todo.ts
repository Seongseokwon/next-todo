export const enum PRIORITY {
    LOW ='LOW',
    MEDIUM='MEDIUM',
    HIGH='HIGH'
}

export interface Todo {
    id:string;
    title: string;
    description?: string;
    priority: PRIORITY;
    completed: boolean;
}

export interface TodoData {
    day: number;
    todos: Todo[];
    total: number;
    completed: number;
}