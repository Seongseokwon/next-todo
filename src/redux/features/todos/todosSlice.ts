import {createSlice} from "@reduxjs/toolkit";

const initialState = {};

export const todo = createSlice({
    name: 'Todo',
    initialState,
    reducers: {
        addTodo:(state, action) => {},
        updateTodo: () => {},
        deleteTodo: () => {}
    }
})

export const {addTodo,updateTodo,deleteTodo} = todo.actions
export default todo.reducer
