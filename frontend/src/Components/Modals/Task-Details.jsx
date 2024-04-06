import { useModal } from "../../Context/Modal";
import CreateEditTask from "./Create-Edit-Task";
import ConfirmDelete from "./ConfirmDelete";

const TaskDetails = ({ task, blockTitle }) => {
  const { showModal } = useModal();
  const timeUnitConversion = {
    1: "day",
    7: "week",
    30: "month",
    91: "quarter",
  };

  return (
    <div className="taskDetailsCont">
      <div className="taskDetailHeader">{task.title}</div>

      <div className="taskBody">
        <div className="taskBlockLabel">Block</div>
        <div className="taskBlockTitle">{blockTitle ? blockTitle : "None"}</div>

        <div className="taskRepeatRow">
          <div className="taskRepeatLabel">Repeat</div>
          <div className="taskRepeatValues">
            {task.repeatFrequency
              ? `Every ${task.repeatFrequency} ${
                  timeUnitConversion[task.timeUnit]
                }`
              : "One time only"}
          </div>
          <div className="taskStatusLabel">Status</div>
          <div className="taskStatusValues">
            {task.status ? "Done" : "To-Do"}
          </div>
        </div>
        <div>{/* This is space for subtask */}</div>
        <div className="taskBtnBar">
          <button
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
