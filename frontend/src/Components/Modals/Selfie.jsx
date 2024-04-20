import ComingSoonPage from "../Pages/ComingSoon";
import "../../Styling/Selfie.css";
import { useModal } from "../../Context/Modal";
import SendPWEmail from "./ForgotPW";
import DeleteAccount from "./DeleteUser";
import EditUser from "./EditUser";
import { useGetUser, useLogout } from "../../Hooks/useUserQueries";


export default function Selfie() {
  const {mutate: logout  } = useLogout();
  const { showModal } = useModal();

  const {user, isLoading} = useGetUser()

  if(isLoading) return <div>Loading ...</div>

  const openResetPassword = () => {
    showModal(<SendPWEmail />, 'gold');
  };

  const openEditProfile = () => {
    showModal(<EditUser />, 'gold');
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
