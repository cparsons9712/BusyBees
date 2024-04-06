import ComingSoonPage from "./ComingSoon";
import { useGetUnassignedTask } from "../../Hooks/useTaskQueries";
import { useAllBlocks } from "../../Hooks/useBlockQueries";
import * as moment from 'moment'
import Loading from "./Loading";
import { buildWeekdayBar } from "../Utility/weekDayBar";
import { useModal } from "../../Context/Modal";
import CreateEditTask from "../Modals/Create-Edit-Task";
import TaskDetails from "../Modals/Task-Details";
import '../../Styling/task.css'

export default function Task() {
    const {unassignedTask, isLoading: uaTaskIsLoading, isError: uaTaskIsError, error: uaTaskError} = useGetUnassignedTask();
    const {allBlocks, isError: abIsError, isLoading: abIsLoading, error: abError} = useAllBlocks();
    console.log(allBlocks)
    const {showModal} = useModal();

    if(uaTaskIsLoading || abIsLoading) return <Loading />

    return (
        <div className="taskPageBackground">
            <div className="taskPageCont">

                <div className="taskPageTitle cursive" >
                    Task
                </div>


                <div className="taskBlockRow">
                    <div className="taskBlockInfoCont" id="noBlockAssignedTitle">
                        <div className="tpBlockTitle handwriting" >
                            No Block Assigned
                        </div>

                        <div onClick={()=>showModal(<CreateEditTask/>, 'gold')} className="TPaddTaskButton handwriting"
                        id="noBlockButton">
                            Add task
                        </div>
                    </div>
                    <div className="taskforBlockContainer">
                        {unassignedTask?.map((task)=>{ return (
                            <div className="taskTitle" onClick={()=>
                                showModal(<TaskDetails task={task} />, 'gold')}>
                                    {task.title }
                            </div>)
                        })}
                    </div>


                    </div>











                {allBlocks.map((block)=> {
                    return (
                        <div className="taskBlockRow">


                            <div className="taskBlockInfoCont">

                                <div className="tpBlockTitle handwriting">
                                    {block.title}
                                </div>
                                <div className="taskBlockTime">
                                    {moment(block.startTime, "HH:mm:ss").format('h:mm A')} - {moment(block.endTime, "HH:mm:ss").format('h:mm A')}
                                </div>

                                <div className="taskWeedayBar">
                                    {buildWeekdayBar(block, "rgba(247, 211, 5, 0.758)")}
                                </div>

                                <div onClick={()=>showModal(<CreateEditTask/>, 'gold')} className="TPaddTaskButton handwriting">
                            Add task
                        </div>
                            </div>


                            <div className="taskforBlockContainer">
                            {block.tasks && block.tasks.length > 0 ? (
                                block.tasks.map((task) => (
                                    <div className="taskTitle" onClick={()=> showModal(<TaskDetails task={task} blockTitle={block.title}/>, 'gold')}>{task.title}</div>
                                ))
                            ) : (
                                <div>No assigned task</div>
                            )}
                            </div>



                        </div>
                    )
                })}
            </div>
        </div>
    );
  }
