import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {closeModal, openModal} from "@/redux/features/modal/modalSlice";

export default function useModal () {
    const {openModals} = useAppSelector((state) => state.modalReducer);
    const dispatch = useAppDispatch();
    const open  = (modalName: string) => {
        dispatch(openModal(modalName))
    }
    const close = (modalName: string)=> {
        dispatch(closeModal(modalName))
    }

    return {openModals, open, close}
}