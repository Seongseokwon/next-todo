import {configureStore} from "@reduxjs/toolkit";
import todoReducer from './features/todos/todosSlice'
export const makeStore = () => {
    return configureStore({
        reducer: {
            todoReducer
        }
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']