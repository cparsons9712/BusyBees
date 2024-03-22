import { useEffect, useState } from "react";
import UserHeader from "./userHeader"
import GuestHeader from "./guestHeader";

const Header = () => {
    const [user, setUser] = useState(true);
    const [auth, setAuth] = useState(false)


    useEffect(()=>{
        if (user) setAuth(true);
        if(!user) setAuth(false)
    },[user])

    return (<>
        {auth ? <UserHeader /> : <GuestHeader />}
    </>)

}

export default Header
