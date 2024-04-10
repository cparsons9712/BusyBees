import "../../Styling/dash.css";
import { useState, useEffect } from "react";
import * as moment from "moment";
import { useActiveBlocks } from "../../Hooks/useBlockQueries";
import { useQueryClient } from "@tanstack/react-query";
import { AuthData } from "../../Auth/AuthWrapper";

const Clock = () => {
  const [time, setTime] = useState(moment().format("h:mm:ss A"));
  const { currBlock, isError, isLoading, error } = useActiveBlocks();
  const queryClient = useQueryClient();
  const { user } = AuthData();

  useEffect(() => {
    const timerId = setInterval(() => {
      const currentTime = moment();
      setTime(currentTime.format("h:mm A"));

      // Check if the current time is past currBlock.endTime
      if (currBlock && currBlock.endTime) {
        const endTime = moment(currBlock.endTime, "HH:mm A"); // Ensure this format matches your endTime format
        if (currentTime.isAfter(endTime)) {
          // Invalidate the 'activeBlocks' query to refetch the current block
          queryClient.invalidateQueries(["activeBlocks"]);
        }
      }
    }, 1000); // This runs every second

    // Cleanup the interval on component unmount
    return () => clearInterval(timerId);
  }, [currBlock, queryClient]);
  return (
    <div className="dashTop">
      <div class="hexContainer">
        <div className="hexText">
          <div className=" handwriting small">Hey </div>
          <div className="cursive big">{user.name}!</div>
          <div className=" handwriting small">It's {time},</div>
          <div className=" handwriting small">Time to ... </div>
          <div className="cursive big activeBlock">{currBlock?.title || "be free!"}</div>
        </div>

        <div class="hexCenter"></div>
        <div class="hexborder"></div>
      </div>

      <div className="dashTextCont"></div>
    </div>
  );
};

export default Clock;
