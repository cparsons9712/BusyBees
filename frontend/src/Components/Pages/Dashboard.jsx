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

const Dashboard =  () => {
  const [time, setTime] = useState(moment().format('h:mm:ss A'));
  const {user} = AuthData()
  const {currBlock, isError, isLoading, error} = useActiveBlocks()
  const queryClient = useQueryClient();

  useEffect(() => {
    const timerId = setInterval(() => {
      const currentTime = moment();
      setTime(currentTime.format('h:mm:ss A'));

      // Check if the current time is past currBlock.endTime
      if (currBlock && currBlock.endTime) {
        const endTime = moment(currBlock.endTime, 'HH:mm:ss A'); // Ensure this format matches your endTime format
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
    <div>
      <h2>Hello {user.name}! It is currently {time}, Time to {currBlock?.title || 'be free!'}!</h2>

    </div>
  );
};

export default Dashboard;
