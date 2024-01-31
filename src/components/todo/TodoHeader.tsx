
interface TodoHeaderProps {
    selectedDate: Date
}
export default function TodoHeader({selectedDate}: TodoHeaderProps) {
    const formatSelectDate = selectedDate.getFullYear() + '년 ' + (selectedDate.getMonth() + 1)+ '월 ' + selectedDate.getDate() + '일 '
    return <div>
        <h1>{formatSelectDate}</h1>
    </div>
}