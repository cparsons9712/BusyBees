import React from 'react';
import '../../Styling/blocks.css'
import moment from 'moment';
const BlockDetails = ({ currBlock }) => {
    // Inline style definitions
    const styleStrong = {
      color: 'black',
      fontWeight: 'bold',
      margin: '2px'
    };
    const styleWeak = {
      color: 'lightgrey',
      margin: '2px'
    };

    return (
      <div>
        <h2>{currBlock.title}</h2>
        <div className='activeOnBar'>
          <div style={currBlock.isMonday ? styleStrong : styleWeak}>Mon</div>
          <div style={currBlock.isTuesday ? styleStrong : styleWeak}>Tues</div>
          <div style={currBlock.isWednesday ? styleStrong : styleWeak}>Wed</div>
          <div style={currBlock.isThursday ? styleStrong : styleWeak}>Thur</div>
          <div style={currBlock.isFriday ? styleStrong : styleWeak}>Fri</div>
          <div style={currBlock.isSaturday ? styleStrong : styleWeak}>Sat</div>
          <div style={currBlock.isSunday ? styleStrong : styleWeak}>Sun</div>
        </div>

        <div className='bdTimeBar'>
            <div className='bdTime'>
                <div>start</div>
                <div>{moment(currBlock.startTime, "HH:mm:ss").format('HH:mm:ss A')}</div>
            </div>
            <div>
                <div className='bdTime'>end</div>
                <div>{moment(currBlock.endTime, "HH:mm:ss").format('HH:mm:ss A')}</div>
            </div>
        </div>

        <div className='bdButtonBar'>
            <button>Delete</button>
            <button>Edit</button>

        </div>
      </div>
    );
  };

  export default BlockDetails;
