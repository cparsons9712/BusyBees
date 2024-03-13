
import UserHeader from "./userHeader"
import GuestHeader from "./guestHeader";

const Header = () => {
    let user = false;

    return (<>
        {user ? <UserHeader /> : <GuestHeader />}
    </>)

}

export default Header
