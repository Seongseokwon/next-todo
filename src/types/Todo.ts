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
    createdAt: string;
    updatedAt: string;
}