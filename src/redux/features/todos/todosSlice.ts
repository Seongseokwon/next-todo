import {createSlice} from "@reduxjs/toolkit";
import {Todo} from "@/types/Todo";

const initialState: Todo[] = [];

export const todo = createSlice({
    name: 'Todo',
    initialState,
    reducers: {
        addTodo:(state, action) => {
            state.push({
                ...action.payload
            })
        },
        updateTodo: () => {},
        deleteTodo: () => {}
    }
})

export const {addTodo,updateTodo,deleteTodo} = todo.actions
export default todo.reducer
