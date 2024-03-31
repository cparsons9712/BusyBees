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

const Dashboard =  () => {
  const [time, setTime] = useState(moment().format('HH:mm:ss'));
  const [currBlock, setCurrBlock] = useState('Be Free')
  const {user} = AuthData()
  const getBlocks = async() => {
    const res = await axios.get('/active', { withCredentials: true });
    console.log(res.data)
    setCurrBlock(res.data)
  }
  const query = useQuery({ queryKey: ['blocks'], queryFn: getBlocks})


  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(moment().format('HH:mm:ss'));
    }, 1000);
    return () => clearInterval(timerId);
  }, []);


  return (
    <div>
      <h2>Hello {user.name}! It is currently {time}, Time to {currBlock.title}!</h2>

    </div>
  );
};

export default Dashboard;
