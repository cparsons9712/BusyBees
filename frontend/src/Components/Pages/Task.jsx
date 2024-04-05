import ComingSoonPage from "./ComingSoon";
import { useGetUnassignedTask } from "../../Hooks/useTaskQueries";
import { useAllBlocks } from "../../Hooks/useBlockQueries";
import * as moment from 'moment'
import Loading from "./Loading";
import { buildWeekdayBar } from "../Utility/weekDayBar";

export default function Task() {
    const {unassignedTask, isLoading: uaTaskIsLoading, isError: uaTaskIsError, error: uaTaskError} = useGetUnassignedTask();
    const {allBlocks, isError: abIsError, isLoading: abIsLoading, error: abError} = useAllBlocks();
    console.log(allBlocks)

    if(uaTaskIsLoading || abIsLoading) return <Loading />

    return (
        <div >
            <div className="taskBlockInfoCont">
                <h2>Task Management</h2>
                <h3>No Block Assigned</h3>
                <button>Add Task</button>

                {unassignedTask?.map((task)=>{
                return (<div className="taskTitle"> {task.title }</div>)
                })}
            </div>
             {allBlocks.map((block)=> {
                return (
                    <>
                        <div className="taskBlockInfoCont">
                            <h3>{block.title}</h3>
                            <div>{moment(block.startTime, "HH:mm:ss").format('h:mm A')} - {moment(block.endTime, "HH:mm:ss").format('h:mm A')}</div>
                            <div className="taskWeedayBar"> {buildWeekdayBar(block, "gold")}</div>
                            <button>Add Task</button>
                        </div>
                        {block.tasks && block.tasks.length > 0 ? (
                            block.tasks.map((task) => (
                                <div className="taskTitle">{task.title}</div>
                            ))
                        ) : (
                            <div>No assigned task</div>
                        )}
                    </>
                )
            })}
        </div>
    );
  }
