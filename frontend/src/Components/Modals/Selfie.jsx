import ComingSoonPage from "../Pages/ComingSoon";
import { AuthData } from "../../Auth/AuthWrapper";
import { useEffect} from "react";
import "../../Styling/Selfie.css";
import { useModal } from "../../Context/Modal";
import SendPWEmail from "./ForgotPW";
import EditProfile from "./EditProfile";
import DeleteAccount from "./DeleteUser";


export default function Selfie() {
  const { user, logout, checkAuthStatus  } = AuthData();
  const { showModal } = useModal();

  useEffect(()=>{
    checkAuthStatus()
  },[])


  const openResetPassword = () => {
    showModal(<SendPWEmail />);
  };

  const openEditProfile = () => {
    showModal(<EditProfile />);
  };

  return (
    <div className="selfie_container">
      <div className="selfieImgCont">
        <img
          className="selfieIMG"
          src={user.profilePicUrl || "embarresedBee.png"}
          alt="Bee smiling or uploaded pic"
        />
      </div>
      <div className="nameBar">
        <div>{user.name}</div>
        <div>{user.email}</div>
      </div>

      <div className="optionsBar">
        <div className="selfieBtn" onClick={()=>showModal(<DeleteAccount />)}>Delete Account</div>
        <div className="selfieBtn" onClick={openEditProfile}>
          Edit Profile
        </div>
        <div className="selfieBtn" onClick={openResetPassword}>
          Reset Password
        </div>
        <div className="selfieBtn" onClick={logout}>
          Logout
        </div>
      </div>
    </div>
  );
}
