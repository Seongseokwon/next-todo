import {createPortal} from "react-dom";
import {ReactNode} from "react";

interface ModalProps {
    children: ReactNode
}
export default function Modal ({children}: ModalProps) {
    return createPortal(
        <>
            <div>모달 오픈 해보기 </div>
            <main>{children}</main>
        </>,
        document.getElementById('root-modal')!
    )
}