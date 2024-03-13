
import { NavLink} from 'react-router-dom'

import SignUp from './signUp'
import { useState } from 'react'

const GuestHeader = () => {
    const [openModal, setOpenModal] = useState(false)


    return (
    <div className="headerBackground">

        <div  className="headerOption">
            Sign In
        </div>

        <div  className="headerLogo">
            <img src ='./logo.png' alt="logo"/>
        </div>

        <div onClick={()=>{setOpenModal(true)}} className="headerOption">
            Sign Up
        </div>
        { openModal && <SignUp closeModal ={setOpenModal} />}


    </div>
)

}

export default GuestHeader
