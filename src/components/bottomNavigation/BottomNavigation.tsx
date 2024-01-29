import { FaHome, FaListUl, FaRegUserCircle, FaChartBar } from "react-icons/fa";
export default function BottomNavigation() {
    return <nav>
        <button type="button"><FaHome /></button>
        <button type="button"><FaListUl /></button>
        <button type="button"><FaChartBar /></button>
        <button type="button"><FaRegUserCircle /></button>
    </nav>
}