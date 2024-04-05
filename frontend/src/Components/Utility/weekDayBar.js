import { useState } from "react";

export const buildWeekdayBar = (currBlock, activeColor) => {
    const strong = {
        color: activeColor,
        fontWeight: "bold",
        margin: "2px",
        fontSize: "20px",
    }
    const weak = {
            color: "grey",
            margin: "2px",
            fontSize: "20px",
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
