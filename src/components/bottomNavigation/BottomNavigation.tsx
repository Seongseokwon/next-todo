'use client';

import styles from './BottomNavigation.module.scss';
import { FaHome, FaListUl, FaRegUserCircle, FaChartBar } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import {useRouter} from "next/navigation";
import {useAppDispatch} from "@/redux/hooks";
import useModal from "@/hooks/useModal";
export default function BottomNavigation() {
    const router = useRouter();
    const {open} = useModal();
    const handleRouter = (des: string) => {
        router.push(des);
    }

    const handleAddTodo = () => {
        open('TodoCreate');
    }
    return <nav className={styles['bottom-navigation']}>
        <button type="button" onClick={() => handleRouter('/')}><FaHome /></button>
        <button type="button" onClick={() => handleRouter('/todo')}><FaListUl /></button>
        <button type="button" onClick={handleAddTodo}><FiPlusCircle /></button>
        <button type="button" onClick={() => handleRouter('/rank')}><FaChartBar /></button>
        <button type="button" onClick={() => handleRouter('/my-page')}><FaRegUserCircle /></button>
    </nav>
}