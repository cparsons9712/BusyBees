
import { NavLink} from 'react-router-dom'
import '../Styling/Header.css'

const UserHeader = () => {
    return (
    <div className="headerBackground">

        <NavLink to='/blocks'className="headerOption">
            Blocks
        </NavLink>

        <NavLink to='/task'className="headerOption" >
            Task
        </NavLink>

        <NavLink to='/'className="headerLogo">
            <img src ='./logo.png' alt="logo"/>
        </NavLink>

        <NavLink to='/dump'className="headerOption">
            Dump
        </NavLink>

        <NavLink to='/profile'className="headerOption">
            Selfie
        </NavLink>


    </div>
)

}

export default UserHeader
