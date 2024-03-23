
import UserHeader from "./UserHeader";
import GuestHeader from "./GuestHeader";
import { AuthData } from "../../Auth/AuthWrapper";

const Header = () => {
  const { user, logout } = AuthData()


  return <>{user.isAuthenticated ? <UserHeader /> : <GuestHeader />}</>;
};

export default Header;
