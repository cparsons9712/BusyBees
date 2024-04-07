import { useState } from "react";

export const buildWeekdayBar = (currBlock, activeColor) => {
    const strong = {
        color: activeColor,
  

    }
    const weak = {
            color: "grey",
        }


    return (
      <>
        <div
          style={currBlock?.isSunday ? strong : weak}
          className="handwriting"
        >
          Sun
        </div>
        <div
          style={currBlock?.isMonday ? strong : weak}
          className="handwriting"
        >
          Mon
        </div>
        <div
          style={currBlock?.isTuesday ? strong : weak}
          className="handwriting"
        >
          Tues
        </div>
        <div
          style={currBlock?.isWednesday ? strong : weak}
          className="handwriting"
        >
          Wed
        </div>
        <div
          style={currBlock?.isThursday ? strong : weak}
          className="handwriting"
        >
          Thur
        </div>
        <div
          style={currBlock?.isFriday ? strong : weak}
          className="handwriting"
        >
          Fri
        </div>
        <div
          style={currBlock?.isSaturday ? strong : weak}
          className="handwriting"
        >
          Sat
        </div>
      </>
    );


};
