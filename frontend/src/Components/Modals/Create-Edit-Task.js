import { useState, useEffect } from "react";
import { useAllBlocks } from "../../Hooks/useBlockQueries";
import { useModal } from "../../Context/Modal";
import { useCreateTask } from "../../Hooks/useTaskQueries";
import { useEditTask } from "../../Hooks/useTaskQueries";

const CreateEditTask = ({ taskDetails, blockId: initialBlockId }) => {
  /* set which type of form (will override if edit)*/
  const [typeForm, setTypeForm] = useState("Create");
  /* Payload data */
  const [title, setTitle] = useState("");
  const [blockId, setBlockId] = useState(initialBlockId || null);
  const [repeatFrequency, setRepeatFrequency] = useState();
  const [timeUnit, setTimeUnit] = useState();
  /* get the blocks to render in the select field*/
  const { allBlocks } = useAllBlocks();
  /* Ability to close the modal on submit*/
  const { hideModal } = useModal();
  /* hooks to create and edit task */
  const {
    mutate: editMutate,
    isError: editIsError,
    error: editError,
  } = useEditTask();
  const {
    mutate: createMutate,
    isError: createIsError,
    error: createError,
  } = useCreateTask();
  const [error, setError] = useState([]);

  useEffect(() => {
    if (createIsError && createError) {
      setError((prevErrors) => [...prevErrors, createError]);
    }
  }, [createIsError, createError]);

  /* set data for editing */
  useEffect(() => {
    if (taskDetails) {
      setTypeForm("Edit");
      setTitle(taskDetails.title);
      setBlockId(taskDetails.blockId);
      setRepeatFrequency(taskDetails.repeatFrequency);
      setTimeUnit(taskDetails.timeUnit);
    }
    // Removed BlockDetails from dependency array as it seems to be a component, not a state variable.
  }, [taskDetails]);

  useEffect(() => {
    if (initialBlockId) {
      setBlockId(initialBlockId);
    }
  }, [initialBlockId]);

  const onSubmit = (e) => {
    e.preventDefault();
    const payload = { title, blockId, repeatFrequency, timeUnit };
    if (typeForm === "Create") {
      createMutate({ payload });
    } else {
      editMutate({ id: taskDetails.id, payload });
    }

    // Form submission logic here
  };
  return (
    <div className="ceContainer">
      <div className="ceHeader">
        <div className="ceTitle">{typeForm} a Task</div>
      </div>

      <form onSubmit={onSubmit}>
        {error.length > 0 && (
          <ul>
            {error.map((err, index) => (
              <li key={index}>{err.message}</li> // Assuming error objects have a 'message' property
            ))}
          </ul>
        )}

        {/* Title input field */}
        <div
        // className="form-group blockFormGroup"
        >
          <input
            // className="input"
            placeholder="Title"
            id="title"
            type="text"
            required
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <label
            htmlFor="title"
            id="blockTitleLabel"
            // className="form-label"
          >
            Title
          </label>
        </div>
        {/* Block Selection input */}
        <div
        // className="form-group blockFormGroup"
        >
          <select value={blockId} onChange={(e) => setBlockId(e.target.value)}>
            <option value="0">None</option>
            {allBlocks?.map((block) => (
              <option value={block.id}>{block.title}</option>
            ))}
          </select>
        </div>
        {/* Repeat Frequency Selection input */}
        <div className="ceTaskReapeatBar">
          <div className="ceRepeatLabel">Repeat Every</div>
          <input
            type="number"
            value={repeatFrequency}
            onChange={(e) => {
              setRepeatFrequency(e.target.value);
            }}
          />
          <select
            value={timeUnit}
            onChange={(e) => setTimeUnit(e.target.value)}
          >
            <option value="0"> None </option>
            <option value="1"> Day </option>
            <option value="7"> Week </option>
            <option value="30"> Month </option>
            <option value="91"> Quarter</option>
          </select>
        </div>
        <div className="buttonBar">
          <div onClick={hideModal}>Cancel</div>
          <div onClick={onSubmit}>Submit</div>
        </div>
      </form>
    </div>
  );
};

export default CreateEditTask;
