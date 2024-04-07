import { useState } from "react";
import { useCreateSubtask } from "../../Hooks/useSubtaskQueries";

const SubtaskList = ({ task }) => {
  const [showSubtask, setShowSubtask] = useState(false);
  const [showAddST, setShowAddST] = useState(false);
  const [title, setTitle] = useState("");
  const { mutate } = useCreateSubtask();

  const onSubmit = (e) => {
    e.preventDefault();
    const payload = { title, taskId: +task.id };
    
    mutate({ payload });
    setShowAddST(false);
  };
  const onCancel = () => {
    setTitle("");
    setShowAddST(false);
  };

  const showAddSubtask = () => {
    if (showAddST) {
      return (
        <form className="addStForm" onSubmit={onSubmit}>
          <div className="addStTitleLabel">Title</div>
          <textarea
            placeholder="Subtask Title"
            maxLength="60"
            minLength={"3"}
            className="stTitleInput"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="STButtonBar">
            <div className="STButton" onClick={() => onCancel()}>
              Cancel
            </div>
            {title.length < 3 ? (
              <div className="disabledButton"> Save </div>
            ) : (
              <div
                className="STButton"
                type="submit"
                onClick={(e) => onSubmit(e)}
              >
                Save
              </div>
            )}
          </div>
        </form>
      );
    }
  };

  const getSubtask = () => {
    return task?.subtasks?.length ? (
      task.subtasks.map((st) => <div className="stTitle">{st.title}</div>)
    ) : (
      <div className="stTitle">No subtask to display </div>
    );
  };

  const showSubtaskList = () => {
    if (showSubtask) {
      return (
        <div className="tdSubtaskList">
          {getSubtask()}

          {showAddST ? (
            showAddSubtask()
          ) : (
            <div className="addSTButton" onClick={() => setShowAddST(true)}>
              +
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <div className="tdSubtaskcont">
      <div
        className="tdToggleSubtask"
        onClick={() => setShowSubtask(!showSubtask)}
      >
        <div></div>
        <div>Subtask</div>
        <div>{showSubtask ? "-" : "+"} </div>
      </div>

      {showSubtaskList()}
    </div>
  );
};

export default SubtaskList;
