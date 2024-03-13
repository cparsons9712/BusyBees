
import { NavLink} from 'react-router-dom'
import '../Styling/Header.css'

const GuestHeader = () => {
    return (
    <div className="headerBackground">

        <NavLink to='/'className="headerOption">
            Sign In
        </NavLink>

        <NavLink to='/'className="headerLogo">
            <img src ='./logo.png' alt="logo"/>
        </NavLink>

        <NavLink to='/'className="headerOption">
            Sign Up
        </NavLink>


    </div>
)

}

export default GuestHeader
