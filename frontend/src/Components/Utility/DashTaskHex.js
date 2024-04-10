import { useEffect, useState } from "react";
import { useCompleteTask } from "../../Hooks/useTaskQueries";


const DashTaskHex = ({ task, colorClass }) => {
    const { mutate } = useCompleteTask();
    const [completed, setCompleted] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if(task?.subtasks?.length){
            setTotal(task.subtasks.length);
            let completedCount = 0
            for(let st of task.subtasks){
                console.log(st.status)
                if(st.status) completedCount++;
            }
            setCompleted(completedCount);
        }
    }, [task]);

    const markComplete = (event) => {

        if(task?.subtasks?.length){

        }else{
            event.stopPropagation()
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
