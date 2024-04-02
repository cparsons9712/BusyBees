import { useState, useEffect } from "react";
import moment from "moment";
import { useEditBlock, useCreateBlock } from "../../Hooks/useBlockQueries";
import { useModal } from "../../Context/Modal";

const CreateEditBlock = ({ blockDetails }) => {
  const [typeForm, setTypeForm] = useState("Create");
  const [title, setTitle] = useState();
  const [isSunday, setIsSunday] = useState(true);
  const [isMonday, setIsMonday] = useState(true);
  const [isTuesday, setIsTuesday] = useState(true);
  const [isWednesday, setIsWednesday] = useState(true);
  const [isThursday, setIsThursday] = useState(true);
  const [isFriday, setIsFriday] = useState(true);
  const [isSaturday, setIsSaturday] = useState(true);
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const { mutate: editMutate, isError: editIsError, error: editError } = useEditBlock();
  const {mutate: createMutate, isError: createIsError, error: createError} = useCreateBlock()


  useEffect(() => {
    if (blockDetails) {
      setTypeForm("Edit");
      setTitle(blockDetails.title);
      setStartTime(blockDetails.startTime);
      setEndTime(blockDetails.endTime);
      setIsSunday(blockDetails.isSunday);
      setIsMonday(blockDetails.isMonday);
      setIsTuesday(blockDetails.isTuesday);
      setIsWednesday(blockDetails.isWednesday);
      setIsThursday(blockDetails.isThursday);
      setIsFriday(blockDetails.isFriday);
      setIsSaturday(blockDetails.isSaturday);
    }
  }, [blockDetails]);

  const onSubmit = (e) => {
    e.preventDefault();

    const formattedStart = moment(startTime, "HH:mm:ss").format("HH:mm");
    const formattedEnd = moment(endTime, "HH:mm:ss").format("HH:mm");

    let payload = {
      title,
      isSunday,
      isMonday,
      isTuesday,
      isWednesday,
      isThursday,
      isFriday,
      isSaturday,
      startTime: formattedStart,
      endTime: formattedEnd,
    };

    try {
      if (typeForm === "Edit" && blockDetails?.id) {
        editMutate({ id: blockDetails.id, payload });
      }else{
        createMutate({payload});
      }

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>{typeForm} a Block </h2>
      {editIsError && <p>{editError.message}</p>}
      {createIsError && <p>{createError.message}</p>}
      <form onSubmit={onSubmit}>
        <div className="form-group">
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
          <label htmlFor="title" className="form-label">
            Title
          </label>
        </div>

        <div>Repeat</div>

        <div className="dayCheckboxBar">
          <input
            type="checkbox"
            id="sun"
            checked={isSunday}
            onChange={() => setIsSunday(!isSunday)}
          />
          <label htmlFor="sun">Sun</label>

          <input
            type="checkbox"
            id="mon"
            checked={isMonday}
            onChange={() => setIsMonday(!isMonday)}
          />
          <label htmlFor="mon">Mon</label>

          <input
            type="checkbox"
            id="tue"
            checked={isTuesday}
            onChange={() => setIsTuesday(!isTuesday)}
          />
          <label htmlFor="tue">Tues</label>

          <input
            type="checkbox"
            id="wed"
            checked={isWednesday}
            onChange={() => setIsWednesday(!isWednesday)}
          />
          <label htmlFor="wed">Wed</label>

          <input
            type="checkbox"
            id="thu"
            checked={isThursday}
            onChange={() => setIsThursday(!isThursday)}
          />
          <label htmlFor="thu">Thu</label>

          <input
            type="checkbox"
            id="fri"
            checked={isFriday}
            onChange={() => setIsFriday(!isFriday)}
          />
          <label htmlFor="fri">Fri</label>

          <input
            type="checkbox"
            id="sat"
            checked={isSaturday}
            onChange={() => setIsSaturday(!isSaturday)}
          />
          <label htmlFor="sat">Sat</label>
        </div>

        <div className="ebTimeBar">
          <div className="form-group">
            <input
              className="input"
              placeholder="Start Time (hh:mm)"
              id="startTime"
              type="time" // This will ensure users can only enter valid times
              required
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
            <label htmlFor="startTime" className="form-label">
              Start Time
            </label>
          </div>

          <div className="form-group">
            <input
              className="input"
              placeholder="End Time (hh:mm)"
              id="endTime"
              type="time"
              required
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
            <label htmlFor="endTime" className="form-label">
              End Time
            </label>
          </div>
        </div>

        <div className="buttonBar">
          <button>Cancel</button>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};
export default CreateEditBlock;
