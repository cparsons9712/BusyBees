import '../../Styling/dash.css'
import useGetDashTask from '../../Hooks/getDashTask';
import DashTaskHex from './DashTaskHex';
import { useModal } from '../../Context/Modal';
import TaskDetails from '../Modals/Task-Details';
import { useActiveBlocks } from '../../Hooks/useBlockQueries';

const DashTask = () => {
    const taskList = useGetDashTask()
    const {currBlock} = useActiveBlocks()
    const {showModal} = useModal()

    const showTaskDetails = (task) => {


        showModal(<TaskDetails task={task} blockTitle={currBlock.title}/>)
    }



    const formatTask = (task) => {
        if (!task.status){
            return (
                <div className="dashTask" onClick={() => showTaskDetails(task)}>
                    <DashTaskHex task={task} colorClass="whiteHex"/>
                    <div>
                        {task.title}
                    </div>
                </div>
            )
        }else{
            return(
                <div className="dashTask" onClick={() => showTaskDetails(task)}>
                    <div style={{textDecoration: "line-through"}}>
                        {task.title}
                    </div>
                </div>
            )

        }

    }


    return (
    <div className="dashBottom">

        <div className="dashSeperator handwriting">
            You should ...
        </div>

        <div className="dashTaskCont">
            {taskList?.map((task)=>formatTask(task))}
        </div>

    </div>
)}
export default DashTask
