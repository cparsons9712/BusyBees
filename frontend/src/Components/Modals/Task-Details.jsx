import { useModal } from "../../Context/Modal";
import CreateEditTask from "./Create-Edit-Task";
import ConfirmDelete from "./ConfirmDelete";
import { useState, useEffect } from "react";
import "../../Styling/subtask.css"

const TaskDetails = ({ task, blockTitle }) => {
  const [statusColor, setStatusColor] = useState();
  const { showModal } = useModal();
  const timeUnitConversion = {
    1: "day",
    7: "week",
    30: "month",
    91: "quarter",
  };
  useEffect(() => {

    if (task.status) {
      setStatusColor("gold");
    } else {
      setStatusColor("grey");
    }
  }, [task.status]);

  const getSubtask = () => {
    return task?.subtasks?.length ? (
      task.subtasks.map((st) => (
        <div className="stTitle">
          {st.title}
        </div>
      ))
    ) : (
      <div className="stTitle">No subtask to display ⋮</div>
    );
  }

  return (
    <div className="ceContainer">
      <div className="tdHeader">

        <div className={`tdStatusHexagon ${statusColor}`}>

          <div className="tdstatusText">
            {task.status ? "Done" : "To-Do"}
          </div>

        </div>

        <div className="tdTitle cursive">
          {task.title}
        </div>

      </div>

      <div className="taskBody">

        <div className="taskBlockLabel">
          Block
        </div>

        <div className="taskBlockTitle">
          {blockTitle ? blockTitle : "None"}
        </div>

        <div className="taskBlockLabel">
          Repeat
        </div>

        <div className="taskBlockTitle">
          {task.repeatFrequency ?
            `Every ${task.repeatFrequency} ${timeUnitConversion[task.timeUnit]}`
              :
            "Never"
          }
        </div>

        <div className="tdSubtaskcont">
          <div className="tdToggleSubtask">
            Subtask
          </div>

          <div className="tdSubtaskList">

              {getSubtask()}

              <div className="addSTButton">
                +
              </div>
          </div>

        </div>

        <div className="taskBtnBar">
          <button className="tdButton">Mark Complete</button>
          <button
            className="tdButton"
            onClick={() =>
              showModal(
                <ConfirmDelete
                  resource={{
                    type: "task",
                    title: task.title,
                    id: task.id,
                  }}
                />
              )
            }
          >
            Delete
          </button>
          <button
            className="tdButton"
            onClick={() =>
              showModal(<CreateEditTask taskDetails={task} />, "gold")
            }
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};
export default TaskDetails;
