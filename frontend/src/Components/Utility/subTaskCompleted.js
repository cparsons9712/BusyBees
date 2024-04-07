import { useEffect, useState } from "react";
import { useCompleteTask } from "../../Hooks/useTaskQueries";

// Assuming `subtasks` is an array of objects where each subtask has a boolean `completed` property
const DashTaskHex = ({ task, colorClass }) => {
    const { mutate } = useCompleteTask();
    const [completed, setCompleted] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {

        if(task?.subtasks?.length){
            setTotal(task.subtasks.length);
            const completedCount = task.subtasks.reduce((acc, curr) => acc + (curr.completed ? 1 : 0), 0);
            setCompleted(completedCount);
        }

    }, [task]); // Depend on `subtasks` to recalculate when they change

    const markComplete = () => {
        if(task?.subtasks?.length){
            alert('THERE IS SUBTASK')
            console.log(task.id)
        //    mutate({ id: task.id });
        }else{
            alert('NO SUBTASK')
            mutate({ id: task.id });
        }

    };

    return (
        <div
        className={`checkOffDash ${colorClass}`}
        onClick={markComplete}>
            {task?.subtasks.length ? `${completed}/${total}` : ' '}

        </div>
    );
}

export default DashTaskHex;
