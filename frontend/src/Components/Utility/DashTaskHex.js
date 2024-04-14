import { useEffect, useState } from "react";
import { useCompleteTask } from "../../Hooks/useTaskQueries";
import { useGetTaskById } from "../../Hooks/useTaskQueries";

const DashTaskHex = ({ id, colorClass }) => {
  const { mutate } = useCompleteTask();
  const [completed, setCompleted] = useState(0);
  const [total, setTotal] = useState(0);
  const { task, isError, isLoading, error } = useGetTaskById(id);

  useEffect(() => {
    if (task?.subtasks)
      if (task?.subtasks?.length) {
        setTotal(task.subtasks.length);
        let completedCount = 0;
        for (let st of task.subtasks) {
          if (st.status) completedCount++;
        }
        setCompleted(completedCount);
      }
  }, [task]);

  const markComplete = (event) => {
    if (task?.subtasks?.length) {
    } else {
      event.stopPropagation();
      mutate({ id: task.id });
    }
  };

  return (
    <div className={`checkOffDash ${colorClass}`} onClick={markComplete}>
      {task?.subtasks?.length ? `${completed}/${total}` : ""}
    </div>
  );
};

export default DashTaskHex;
