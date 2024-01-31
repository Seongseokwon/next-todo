interface TodoHeaderProps {
    selectedDate: Date
}
export default function TodoHeader({selectedDate}: TodoHeaderProps) {
    return <div>
        <h1>{selectedDate.toLocaleDateString()}</h1>
    </div>
}