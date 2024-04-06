import { useState, useEffect } from "react";
import { useAllBlocks } from "../../Hooks/useBlockQueries";
import { useModal } from "../../Context/Modal";
import { useCreateTask } from "../../Hooks/useTaskQueries";
import { useEditTask } from "../../Hooks/useTaskQueries";
import '../../Styling/task.css'

const CreateEditTask = ({ taskDetails, blockId: initialBlockId }) => {
  const [typeForm, setTypeForm] = useState("Create");
  const [title, setTitle] = useState("");
  const [blockId, setBlockId] = useState(initialBlockId || null);
  const [repeatFrequency, setRepeatFrequency] = useState();
  const [timeUnit, setTimeUnit] = useState();
  const { allBlocks } = useAllBlocks();
  const { hideModal } = useModal();
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

  useEffect(() => {
    if (taskDetails) {
      setTypeForm("Edit");
      setTitle(taskDetails.title);
      setBlockId(taskDetails.blockId);
      setRepeatFrequency(taskDetails.repeatFrequency);
      setTimeUnit(taskDetails.timeUnit);
    }
  }, [taskDetails]);

  useEffect(() => {
    if (initialBlockId) {
      setBlockId(initialBlockId);
    }
  }, [initialBlockId]);

  const onSubmit = (e) => {
    e.preventDefault();
    const payload = { title, blockId : +blockId , repeatFrequency, timeUnit };
    if (typeForm === "Create") {
      createMutate({ payload });
    } else {
      editMutate({ id: taskDetails.id, payload });
    }
  };


  return (
    <div className="ceContainer">

      <div className="ceHeader">
        <div className="ceTitle cursive">{typeForm} a Task</div>
      </div>

      <form onSubmit={onSubmit}>
        {error.length > 0 && (
          <ul>
            {error.map((err, index) => (
              <li key={index}>{err.message}</li>
            ))}
          </ul>
        )}

        <div
        className="form-group taskFormGroup"
        >
          <input
            className="input"
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
            className="form-label"
          >
            Title
          </label>
        </div>
        {/* Block Selection input */}
        <div class="select-group cursive blockSelect">
            <div className="ceTaskBlockLabel">Block</div>

          <select value={blockId} onChange={(e) =>
            setBlockId(e.target.value === "0" ? null : e.target.value)}>

                  <option value="0">
                    None
                  </option>

                {allBlocks?.map((block) => (

                  <option key={`BLOCK-OPTION-${block.id}`}value={block.id}>
                    {block.title}
                  </option>

              ))}

          </select>
        </div>



        {/* Repeat Frequency Selection input */}
        <div className="ceTaskReapeatBar">
          <div className="ceRepeatLabel">
            Repeat Every
          </div>

          <div>
            <input
              type="number"
              className="ceRepeatInput"
              value={repeatFrequency}
              onChange={(e) => {
                setRepeatFrequency(e.target.value);
            }}/>
          </div>

          <div className="select-group timeUnitSelect">
            <select

              value={timeUnit}
              onChange={(e) => setTimeUnit(e.target.value)}
            >
              <option value="0"> Never </option>
              <option value="1"> Day(s) </option>
              <option value="7"> Week(s) </option>
              <option value="30"> Month(s) </option>
              <option value="91"> Quarter(s)</option>
            </select>
          </div>


        </div>


        <div className="buttonBar">
          <div onClick={hideModal} className="ceButton">Cancel</div>
          <div onClick={onSubmit} className="ceButton">Submit</div>
        </div>
      </form>
    </div>
  );
};

export default CreateEditTask;
