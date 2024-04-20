import { nav } from "../../Navigation/Routes";
import { Link } from "react-router-dom";
import { useGetUser } from "../../Hooks/useUserQueries";
import { useModal } from "../../Context/Modal";
import { useNavigate } from "react-router-dom";
import '../../Styling/Header.css'
import Loading from "../Pages/Loading";
import { useEffect } from "react";


const Header = () => {
  const goTo = useNavigate()
  const { showModal } = useModal();
  const { user, isLoading } = useGetUser()

  useEffect(() => {
    console.log("User state changed", user);
    // You can add more logic here if needed, when user state changes
  }, [user]);

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

  if(isLoading) return <Loading />
  return (
    <div className="headerBackground">
    {nav.map((r, i) => {

        const shouldDisplay =  user ? r.isPrivate : !r.isPrivate;

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
