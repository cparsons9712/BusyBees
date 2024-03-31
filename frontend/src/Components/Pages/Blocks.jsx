import React from "react";
import moment from "moment"; // Import Moment.js
import { useAllBlocks } from "../../Hooks/useBlockQueries";
import "../../Styling/blocks.css";

function Blocks() {
  const { allBlocks, isError, isLoading, error } = useAllBlocks(); // Your custom hook to fetch activities

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
    return allBlocks.map((currBlock, index) => {
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
        >
          {currBlock.title}
        </div>
      );
    });
  };

  const days = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thurday', 'Friday', 'Saturday']

  const dayNum = moment().day()
  return (
    <div className="blockPageContainer">


      <div className="blockPageNav">
          <div>

          </div>

          <div>
            {days[dayNum]}
          </div>

          <div>

          </div>
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
        {allBlocks && allBlocks.length > 0 ? (
          buildAgenda()
        ) : (
          <div> Nothing to display</div>
        )}
      </div>
    </div>
  );
}

export default Blocks;
