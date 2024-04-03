import React, { useState } from "react";
import moment from "moment"; // Import Moment.js
import { useBlocksByDay } from "../../Hooks/useBlockQueries";
import "../../Styling/blocks.css";
import { useModal } from "../../Context/Modal";
import BlockDetails from "../Modals/BlockDetails";
import CreateEditBlock from "../Modals/Create-Edit-Block";

function Blocks() {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [dayNum, setDayNum] = useState(moment().day());
  const { blocks, isError, isLoading, error } = useBlocksByDay(dayNum);
  const { showModal } = useModal();

  const handlePreviousDay = () => {
    setDayNum((dayNum) => (dayNum - 1 + days.length) % days.length);
  };

  const handleNextDay = () => {
    setDayNum((dayNum) => (dayNum + 1) % days.length);
  };

  const handleToday = () => {
    setDayNum(moment().day());
  };

  const showBlockDetails = (event, currBlock) => {
    event.stopPropagation();
    showModal(<BlockDetails currBlock={currBlock} />);
  };

  const openNewBlockForm = () => {
    showModal(<CreateEditBlock />);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  const timeBlocks = Array.from({ length: 24 }, (_, index) => ({
    startTime: moment({ hour: index }).format("h:mm a"),
    endTime: moment({ hour: index + 1 }).format("h:mm a"),
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
      return (
        <div
          className="blockBoxTitle handwriting"
          key={index}
          style={{
            top: `${top}px`,
            height: `${height}px`,
          }}
          onClick={(event) => showBlockDetails(event, currBlock)}
        >
          {currBlock.title}
        </div>
      );
    });
  };

  const handleTimeTableClick = (event) => {
    let targetElement = event.target;

    // Check immediately if the click is within excluded elements
    if (targetElement.classList.contains("blockHeader") || targetElement.classList.contains("blockPageNav")) {
      return; // Stop the function from proceeding further
    }

    while (targetElement && targetElement !== event.currentTarget) {
      // Check if the targetElement or any of its parents is a blockBoxTitle
      if (targetElement.classList.contains("blockBoxTitle")) {
        const blockId = targetElement.dataset.blockId; // Assuming blocks have an ID and it's stored here
        const currBlock = blocks.find((block) => block.id === blockId);
        if (currBlock) {
          showBlockDetails(event, currBlock);
          return; // Stop further processing
        }
      } else if (targetElement.classList.contains("blockHeader") || targetElement.classList.contains("blockPageNav")) {
        // If the click is on the header/nav or their child, do nothing
        return;
      }
      targetElement = targetElement.parentNode; // Move up in the DOM tree
    }

    // If the loop completes without finding a blockBoxTitle or excluded areas, the click was outside, so open the new block form
    openNewBlockForm();
  };

  return (
    <div className="blockPageBackground">
      <div className="blockPageContainer" onClick={handleTimeTableClick}>
        <div className="blockHeader">
          <div className="blockTitle">
            <h2 className="cursive">{days[dayNum]}'s Blocks of Time</h2>
          </div>
        </div>

        <div className="blockPageNav">
          <div className="dayOfWeek handwriting" onClick={handlePreviousDay}>
            {days[(dayNum - 1 + days.length) % days.length]}
          </div>
          <div className="dayOfWeek handwriting" onClick={handleToday}>
            Today
          </div>
          <div className="dayOfWeek handwriting" onClick={handleNextDay}>
            {days[(dayNum + 1) % days.length]}
          </div>
        </div>

        <div
          style={{ position: "relative", height: "100%" }}
          className="timeTable"

        >
          <div className="timeColumn">
            {timeBlocks.map((block, index) => (
              <div key={index} className="timeBox">
                <div className="timeDisplay handwriting">
                  {" "}
                  {block.startTime} - {block.endTime}
                </div>
              </div>
            ))}
          </div>

          <div className="blockColumn"></div>
          {blocks && blocks.length > 0 ? (
            buildAgenda()
          ) : (
            <div className="handwriting"> Nothing to display</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Blocks;
