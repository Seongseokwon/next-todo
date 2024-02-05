import {createSlice} from "@reduxjs/toolkit";
import {TodoData} from "@/types/Todo";

const initialState: {todoData :TodoData[]} = {
    todoData: []
};
export const todo = createSlice({
    name: 'Todo',
    initialState,
    reducers: {
        setTodos: (state, action) => {
            state.todoData = action.payload;
        },
        addTodo:(state, action) => {
            console.log(state);
        },
        updateTodo: () => {},
        deleteTodo: () => {}
    }
})

export const {
    setTodos,
    addTodo,
    updateTodo,
    deleteTodo} = todo.actions
export default todo.reducer
