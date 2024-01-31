'use client';

import styles from './BottomNavigation.module.scss';
import { FaHome, FaListUl, FaRegUserCircle, FaChartBar } from "react-icons/fa";
import {useRouter} from "next/navigation";
export default function BottomNavigation() {
    const router = useRouter();

    const handleRouter = (des: string) => {
        router.push(des);
    }

    return <nav className={styles['bottom-navigation']}>
        <button type="button" onClick={() => handleRouter('/')}><FaHome /></button>
        <button type="button" onClick={() => handleRouter('/todo')}><FaListUl /></button>
        <button type="button" onClick={() => handleRouter('/rank')}><FaChartBar /></button>
        <button type="button" onClick={() => handleRouter('/my-page')}><FaRegUserCircle /></button>
    </nav>
}