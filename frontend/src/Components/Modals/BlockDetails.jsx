import React from 'react';
import '../../Styling/blocks.css'
import moment from 'moment';
import { useModal } from '../../Context/Modal';
import CreateEditBlock from './Create-Edit-Block';
const BlockDetails = ({ currBlock }) => {
  const {showModal} = useModal()

    const styleStrong = {
      color: 'black',
      fontWeight: 'bold',
      margin: '2px'
    };
    const styleWeak = {
      color: 'grey',
      margin: '2px'
    };

    const openEdit = () => {
      showModal(<CreateEditBlock blockDetails={currBlock} />)
    }

    return (
      <div>
        <h2>{currBlock?.title}</h2>
        <div className='activeOnBar'>
          <div style={currBlock?.isMonday ? styleStrong : styleWeak}>Mon</div>
          <div style={currBlock?.isTuesday ? styleStrong : styleWeak}>Tues</div>
          <div style={currBlock?.isWednesday ? styleStrong : styleWeak}>Wed</div>
          <div style={currBlock?.isThursday ? styleStrong : styleWeak}>Thur</div>
          <div style={currBlock?.isFriday ? styleStrong : styleWeak}>Fri</div>
          <div style={currBlock?.isSaturday ? styleStrong : styleWeak}>Sat</div>
          <div style={currBlock?.isSunday ? styleStrong : styleWeak}>Sun</div>
        </div>

        <div className='bdTimeBar'>
            <div className='bdTime'>
                <div>start</div>
                <div>{moment(currBlock?.startTime, "HH:mm:ss").format('hh:mm A')}</div>
            </div>
            <div>
                <div className='bdTime'>end</div>
                <div>{moment(currBlock?.endTime, "HH:mm:ss").format('hh:mm A')}</div>
            </div>
        </div>

        <div className='bdButtonBar'>
            <button>Delete</button>
            <button onClick={()=>openEdit()}>Edit</button>

        </div>
      </div>
    );
  };

  export default BlockDetails;
