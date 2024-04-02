import React ,{ useState } from "react";
import moment from "moment"; // Import Moment.js
import { useBlocksByDay } from "../../Hooks/useBlockQueries";
import "../../Styling/blocks.css";
import { useModal } from "../../Context/Modal";
import BlockDetails from "../Modals/BlockDetails";
import CreateEditBlock from "../Modals/Create-Edit-Block";

function Blocks() {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const [dayNum, setDayNum] = useState(moment().day());
  const { blocks, isError, isLoading, error } = useBlocksByDay(dayNum);
  const {showModal} = useModal()

  const handlePreviousDay = () => {
    setDayNum(dayNum => (dayNum - 1 + days.length) % days.length);
  };

  const handleNextDay = () => {
    setDayNum(dayNum => (dayNum + 1) % days.length);
  };

  const handleToday = () => {
    setDayNum(moment().day());
  };

  const showBlockDetails = (currBlock) => {
    showModal(<BlockDetails currBlock={currBlock} />)
  }

  const openNewBlockForm = () => {
    showModal(< CreateEditBlock />)
  }



  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;


  const timeBlocks = Array.from({ length: 24 }, (_, index) => ({
    startTime: moment({ hour: index }).format("ha"),
    endTime: moment({ hour: index + 1 }).format("ha"),
  }));


  const getMinutesFromMidnight = (timeString) => {
    const hourNum = moment(timeString, "HH:mm:ss").hours();
    const minNum = moment(timeString, "HH:mm:ss").minutes();
    return hourNum * 60 + minNum;
  };

  const buildAgenda = () => {
    return blocks.map((currBlock, index) => {
      const top = getMinutesFromMidnight(currBlock.startTime);
      const bottom = getMinutesFromMidnight(currBlock.endTime);
      const height = bottom - top;
      // Adjust the style as needed, using `top` and `height` to position your blocks
      return (
        <div
          className="blockBoxTitle"
          key={index}
          style={{
            top: `${top}px`,
            height: `${height}px`,
          }}
          onClick={() => showBlockDetails(currBlock)}
        >
          {currBlock.title}
        </div>
      );
    });
  };



  return (
    <div className="blockPageContainer">
      <div className="blockHeader">
        <h2><span>{days[dayNum]}'s</span> Blocks of Time</h2>
        <button onClick={openNewBlockForm}>New</button>
      </div>


  <div className="blockPageNav">
        <div className="dayOfWeek" onClick={handlePreviousDay}>{days[(dayNum - 1 + days.length) % days.length]}</div>
        <div className="dayOfWeek" onClick={handleToday}>Today</div>
        <div className="dayOfWeek" onClick={handleNextDay}>{days[(dayNum + 1) % days.length]}</div>
      </div>

      <div style={{ position: "relative", height: "100%" }} className="timeTable">
        <div className="timeColumn">
          {timeBlocks.map((block, index) => (
            <div
              key={index}
              className="timeBox"
            >
              {block.startTime} - {block.endTime}
            </div>
          ))}
        </div>

        <div className="blockColumn"></div>
        {blocks && blocks.length > 0 ? (
          buildAgenda()
        ) : (
          <div> Nothing to display</div>
        )}
      </div>
    </div>
  );
}

export default Blocks;
