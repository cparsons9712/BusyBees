import "../../Styling/dash.css";
import { useCompleteTask } from "../../Hooks/useTaskQueries";
import Clock from "../Utility/Clock";
import DashTask from "../Utility/DashTask";
import hexagonBackground from '../../Media/hexagonBackground.png'

const Dashboard = () => {


  return (
    <div className="dashCont" style={{ backgroundImage: `url(${hexagonBackground})` }}>
      <Clock />
      <DashTask />
    </div>
  );
};

export default Dashboard;
