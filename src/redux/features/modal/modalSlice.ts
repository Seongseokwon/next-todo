import {createSlice} from "@reduxjs/toolkit";

interface ModalState  {
    openModals : {isOpen: boolean, name: string}[]
}

const initialState:ModalState = {
    openModals : [
        {isOpen: false, name: 'TodoCreate'}
    ]
}
export const modal = createSlice({
    name: 'Modal',
    initialState,
    reducers: {
        openModal: (state,action) => {
            state.openModals = state.openModals.map(modal => modal.name === action.payload ? ({...modal, isOpen: true}): modal)
        },
        closeModal: (state,action) => {
            state.openModals = state.openModals.map(modal => modal.name === action.payload ? ({...modal, isOpen: false}): modal)
        }
    }
})


export const {
    openModal,
    closeModal
}
    = modal.actions;

export default modal.reducer;
