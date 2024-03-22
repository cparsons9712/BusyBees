import { useEffect, useState } from "react";
import UserHeader from "./UserHeader";
import GuestHeader from "./GuestHeader";

const Header = () => {
  const [user, setUser] = useState(false);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (user) setAuth(true);
    if (!user) setAuth(false);
  }, [user]);

  return <>{auth ? <UserHeader /> : <GuestHeader />}</>;
};

export default Header;
