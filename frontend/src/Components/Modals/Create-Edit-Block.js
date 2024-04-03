import { useState, useEffect } from "react";
import moment from "moment";
import { useEditBlock, useCreateBlock } from "../../Hooks/useBlockQueries";
import { useModal } from "../../Context/Modal";

const CreateEditBlock = ({ blockDetails }) => {
  /*
    State management
  */
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
  const {hideModal} = useModal();


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
    <div className='blockChangeCont'>
      <div className='blockChangeHeader'>
          <div className='cursive blockChangeModalTitle'>{typeForm} a Block </div>
      </div>



      {editIsError && <p className="errorMessageBlock">{editError.message}</p>}
      {createIsError && <p className="errorMessageBlock">{createError.message}</p>}
      <form onSubmit={onSubmit}>
        <div className="form-group blockFormGroup">
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
          <label htmlFor="title" id="blockTitleLabel" className="form-label">
            Title
          </label>
        </div>

        <div className="repeatLabel">Repeat</div>

        <div className="dayCheckboxBar">

          <div className="checkBoxGroup">
            <input
              type="checkbox"
              id="sun"
              checked={isSunday}
              onChange={() => setIsSunday(!isSunday)}
            />
            <label htmlFor="sun">Sun</label>
          </div>

          <div className="checkBoxGroup">
            <input
              type="checkbox"
              id="mon"
              checked={isMonday}
              onChange={() => setIsMonday(!isMonday)}
            />
            <label htmlFor="mon">Mon</label>
          </div>

          <div className="checkBoxGroup">
            <input
              type="checkbox"
              id="tue"
              checked={isTuesday}
              onChange={() => setIsTuesday(!isTuesday)}
            />
            <label htmlFor="tue">Tues</label>
          </div>

          <div className="checkBoxGroup">
            <input
              type="checkbox"
              id="wed"
              checked={isWednesday}
              onChange={() => setIsWednesday(!isWednesday)}
            />
            <label htmlFor="wed">Wed</label>
          </div>

          <div className="checkBoxGroup">
            <input
              type="checkbox"
              id="thu"
              checked={isThursday}
              onChange={() => setIsThursday(!isThursday)}
            />
            <label htmlFor="thu">Thu</label>
          </div>

          <div className="checkBoxGroup">
            <input
              type="checkbox"
              id="fri"
              checked={isFriday}
              onChange={() => setIsFriday(!isFriday)}
            />
            <label htmlFor="fri">Fri</label>
          </div>

          <div className="checkBoxGroup">
            <input
              type="checkbox"
              id="sat"
              checked={isSaturday}
              onChange={() => setIsSaturday(!isSaturday)}
            />
            <label htmlFor="sat">Sat</label>
          </div>

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

        <div className="bdButtonBar">
          <button className="bdButton" onClick={hideModal}>Cancel</button>
          <button className="bdButton" type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};
export default CreateEditBlock;
