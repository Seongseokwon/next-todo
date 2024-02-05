import {configureStore} from "@reduxjs/toolkit";
import todoReducer from './features/todos/todosSlice'
import modalReducer from './features/modal/modalSlice';

export const makeStore = () => {
    return configureStore({
        reducer: {
            todoReducer,
            modalReducer
        }
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
