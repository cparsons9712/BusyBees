import Lottie from 'react-lottie';
import animationData from '../../Media/BeesFlying.json'
import { useEffect } from 'react';


export default function Loading() {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      }
      useEffect(() => {
        const timer = setTimeout(() => {
        }, 5000); // 5000 milliseconds = 5 seconds

        // Cleanup function to clear the timeout if the component unmounts
        return () => clearTimeout(timer);
      }, []);


    return (
        <div className="loading" >
    
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>
    );
  }
