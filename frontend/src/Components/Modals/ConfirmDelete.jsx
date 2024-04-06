import { useDeleteBlock } from "../../Hooks/useBlockQueries";
import { useModal } from "../../Context/Modal";
import "../../Styling/confirmDelete.css";
import { useDeleteTask } from "../../Hooks/useTaskQueries";

const ConfirmDelete = ({ resource }) => {
  const {
    mutate: deleteBlock,
    isError: blockIsError,
    error: blockError,
  } = useDeleteBlock();
  const {
    mutate: deleteTask,
    isError: taskIsError,
    error: taskError,
  } = useDeleteTask();
  const { hideModal } = useModal();

  const handleDelete = () => {
    switch (resource.type) {
      case "block":
        deleteBlock({ id: +resource.id });
        break;
      case "task":
        deleteTask({ id: +resource.id });
        break;
      default:
        break;
    }
  };

  return (
    <div className="confirmDelete">
      <h2 className="cursive caution">Caution!!!</h2>
      <p className="handwriting deleteText">
        Deleting this {resource.type} is permanent and can not be reversed.{" "}
      </p>
      <div className="handwriting deleteText">
        Are you sure you want to delete the {resource.type} "{resource.title}"?{" "}
      </div>
      <div className="deleteBtnBar">
        <button
          onClick={hideModal}
          className="handwriting deleteText deleteBtn"
        >
          Keep it
        </button>
        <button
          onClick={() => {
            handleDelete();
          }}
          className="handwriting deleteText deleteBtn"
        >
          Delete it
        </button>
      </div>
      {blockIsError && <div> {blockError.message} </div>}
      {taskIsError && <div> {taskError.message} </div>}
    </div>
  );
};

export default ConfirmDelete;
