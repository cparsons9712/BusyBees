import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import axios from '../../APIs/blocks'
import moment from 'moment'
import { AuthData } from '../../Auth/AuthWrapper';
import { useState , useEffect} from 'react';
import { useActiveBlocks } from '../../Hooks/useBlockQueries';
import '../../Styling/dash.css'

const Dashboard =  () => {
  const [time, setTime] = useState(moment().format('h:mm:ss A'));
  const {user} = AuthData()
  const {currBlock, isError, isLoading, error} = useActiveBlocks()
  const queryClient = useQueryClient();

  useEffect(() => {
    const timerId = setInterval(() => {
      const currentTime = moment();
      setTime(currentTime.format('h:mm A'));

      // Check if the current time is past currBlock.endTime
      if (currBlock && currBlock.endTime) {
        const endTime = moment(currBlock.endTime, 'HH:mm A'); // Ensure this format matches your endTime format
        if (currentTime.isAfter(endTime)) {
          // Invalidate the 'activeBlocks' query to refetch the current block
          queryClient.invalidateQueries(['activeBlocks']);
        }
      }
    }, 1000); // This runs every second

    // Cleanup the interval on component unmount
    return () => clearInterval(timerId);
  }, [currBlock, queryClient]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;


  return (
    <div className='dashCont'>
      <div className='dashTop'>


      <div class="hexContainer">

      <div className='hexText'>
              <div className=' handwriting small'>Hey </div>
              <div className='cursive big'>{user.name}!</div>
              <div className=' handwriting small'>It's {time},</div>
              <div className=' handwriting small'>Time to ... </div>
              <div className='cursive big'>
                {currBlock?.title || 'be free!'}
              </div>
      </div>
        <div class="hexCenter"></div>
        <div className='hexLeft'></div>
        <div className='hexLeftBorder'></div>
        <div className='hexright'></div>
        <div className='hexrightBorder'></div>
      </div>



        <div className='dashTextCont'>


        </div>
      </div>


      <div className='dashBottom'>
        <div className='dashSeperator handwriting'>
          You should ...
        </div>

        <div className='dashTaskCont'>

          <div className='dashTask handwriting'>
            Clean the bathroom
          </div>
        </div>


      </div>
    </div>
  );
};

export default Dashboard;
