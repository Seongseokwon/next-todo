import {createPortal} from "react-dom";
import {ReactNode} from "react";
import {FaTimes} from "react-icons/fa";
import useModal from "@/hooks/useModal";

interface ModalProps {
    children: ReactNode,
    modalInfo: {
        title: string;
        name: string;
    },
}
export default function Modal ({children, modalInfo}: ModalProps) {
    const {close} = useModal();
    const closeModal = ( ) => {
        close(modalInfo.name);
    }
    return createPortal(
        <>
            <header>
                <h2>{modalInfo.title}</h2>
                <button type='button' onClick={closeModal}><FaTimes/></button>
            </header>
            <main>{children}</main>
        </>,
        document.getElementById('root-modal')!
    )
}