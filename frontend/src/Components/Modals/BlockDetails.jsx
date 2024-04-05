import React from 'react';
import '../../Styling/blocks.css'
import moment from 'moment';
import { useModal } from '../../Context/Modal';
import CreateEditBlock from './Create-Edit-Block';
import ConfirmDelete from './ConfirmDelete';
import { buildWeekdayBar } from '../Utility/weekDayBar';

const BlockDetails = ({ currBlock }) => {
  const {showModal} = useModal()




    const openEdit = () => {
      showModal(<CreateEditBlock blockDetails={currBlock} />, 'gold')
    }

    return (
      <div className='blockDetailsCont'>
        <div className='blockDetailsHeader'>
          <div className='cursive blockDetailsModalTitle'>{currBlock?.title}</div>
        </div>



        <div className='activeOnBar handwriting'>
            {buildWeekdayBar(currBlock, "black")}
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
          <div className="bdButton" onClick={()=> showModal(<ConfirmDelete resource={{type: 'block', title: currBlock.title, id: currBlock.id }}/>, 'gold')}>Delete</div>

            <div className="bdButton" onClick={()=>openEdit()}>Edit</div>

        </div>
      </div>
    );
  };

  export default BlockDetails;
