import { nav } from "../../Navigation/Routes";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Auth/AuthWrapper";
import { useModal } from "../../Context/Modal";
import { useNavigate } from "react-router-dom";
import '../../Styling/Header.css'


const Header = () => {
  const goTo = useNavigate()
  const { showModal } = useModal();
  const { user } = useContext(AuthContext)

  const MenuItem = ({r}) => {
    return (
            <div className="headerOption" onClick={()=>goTo(r.path)}>{r.name}</div> // this is the template
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
