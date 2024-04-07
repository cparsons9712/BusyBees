import '../../Styling/dash.css'
import useGetDashTask from '../../Hooks/getDashTask';
import DashTaskHex from './subTaskCompleted';

const DashTask = () => {
    const taskList = useGetDashTask()



    const formatTask = (task) => {
        if (!task.status){
            return (
                <div className="dashTask">
                    <DashTaskHex task={task} colorClass="whiteHex"/>
                    <div>
                        {task.title}
                    </div>
                </div>
            )
        }else{
            return(
                <div className="dashTask">
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
