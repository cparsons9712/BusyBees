
import UserHeader from "./UserHeader";
import GuestHeader from "./GuestHeader";
import { AuthData } from "../../Auth/AuthWrapper";
import { nav } from "./navigationContents";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../Auth/AuthWrapper";
import { useModal } from "../../Context/Modal";




const Header = () => {
  const { showModal } = useModal();
  const { user } = useContext(AuthContext)

  const MenuItem = ({r}) => {
    return (
            <div className="headerOption"><Link to={r.path}>{r.name}</Link></div> // this is the template
       )
  }

  const ModalItem = ({r}) => {
    return (
      <div className="headerOption" onClick={()=>{showModal(r.element)}}>{r.name}</div>
    )
  }
  return (
    <div className="headerBackground">
    {nav.map((r, i) => {
        const shouldDisplay = user.isAuthenticated ? r.isPrivate : !r.isPrivate;

        if (!shouldDisplay) return null; // Return null to render nothing for this iteration
        if (r.path === '/' || r.path === '/dash'){
          return(<div><Link to={r.path}>{r.name}</Link></div>)
        }
        if (r.isModal) {
          return <ModalItem key={i} r={r} />; // Return the ModalItem component
        } else {
          return <MenuItem key={i} r={r} />; // Return the MenuItem component
        }
      })
    }
  </div>
  )
}
export default Header
