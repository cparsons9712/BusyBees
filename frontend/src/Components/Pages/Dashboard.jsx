import "../../Styling/dash.css";
import { useCompleteTask } from "../../Hooks/useTaskQueries";
import Clock from "../Utility/Clock";
import DashTask from "../Utility/DashTask";


const Dashboard = () => {


  return (
    <div className="dashCont">
      <Clock />
      <DashTask />
    </div>
  );
};

export default Dashboard;
