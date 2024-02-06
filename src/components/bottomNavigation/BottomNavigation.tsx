'use client';

import styles from './BottomNavigation.module.scss';
import { FaHome, FaListUl, FaRegUserCircle, FaChartBar } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import {useRouter} from "next/navigation";
import {useAppDispatch} from "@/redux/hooks";
import useModal from "@/hooks/useModal";
import Button from "@/components/ui/button/Button";
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
        <Button onClick={() => handleRouter('/')}><FaHome /></Button>
        <Button onClick={() => handleRouter('/todo')}><FaListUl /></Button>
        <Button onClick={handleAddTodo}><FiPlusCircle /></Button>
        <Button onClick={() => handleRouter('/rank')}><FaChartBar /></Button>
        <Button onClick={() => handleRouter('/my-page')}><FaRegUserCircle /></Button>
    </nav>
}