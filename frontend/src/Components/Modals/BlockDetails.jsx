import React from 'react';
import '../../Styling/blocks.css'
import moment from 'moment';
import { useModal } from '../../Context/Modal';
import CreateEditBlock from './Create-Edit-Block';
import ConfirmDelete from './ConfirmDelete';

const BlockDetails = ({ currBlock }) => {
  const {showModal} = useModal()

    const styleStrong = {
      color: 'black',
      fontWeight: 'bold',
      margin: '2px',
      fontSize: '20px'

    };
    const styleWeak = {
      color: 'grey',
      margin: '2px',
      fontSize: '20px'
    };

    const openEdit = () => {
      showModal(<CreateEditBlock blockDetails={currBlock} />)
    }

    return (
      <div className='blockDetailsCont'>
        <div className='blockDetailsHeader'>
          <div className='cursive blockDetailsModalTitle'>{currBlock?.title}</div>
        </div>



        <div className='activeOnBar handwriting'>
          <div style={currBlock?.isSunday ? styleStrong : styleWeak} className='handwriting'>Sun</div>
          <div style={currBlock?.isMonday ? styleStrong : styleWeak} className='handwriting'>Mon</div>
          <div style={currBlock?.isTuesday ? styleStrong : styleWeak} className='handwriting'>Tues</div>
          <div style={currBlock?.isWednesday ? styleStrong : styleWeak} className='handwriting'>Wed</div>
          <div style={currBlock?.isThursday ? styleStrong : styleWeak} className='handwriting'>Thur</div>
          <div style={currBlock?.isFriday ? styleStrong : styleWeak} className='handwriting'>Fri</div>
          <div style={currBlock?.isSaturday ? styleStrong : styleWeak} className='handwriting'>Sat</div>

        </div>

        <div className='bdTimeBar'>
            <div className='bdTime'>
                <div className='dbTimeTitle'>Start</div>
                <div className='dbTimeContents'>{moment(currBlock?.startTime, "HH:mm:ss").format('hh:mm A')}</div>
            </div>
            <div className='bdTime'>
                <div className='dbTimeTitle'>End</div>
                <div className='dbTimeContents'>{moment(currBlock?.endTime, "HH:mm:ss").format('hh:mm A')}</div>
            </div>
        </div>

        <div className='bdButtonBar'>
          <div className="bdButton" onClick={()=> showModal(<ConfirmDelete resource={{type: 'block', title: currBlock.title, id: currBlock.id }}/>)}>Delete</div>

            <div className="bdButton" onClick={()=>openEdit()}>Edit</div>

        </div>
      </div>
    );
  };

  export default BlockDetails;
