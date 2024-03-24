import ComingSoonPage from "../Pages/ComingSoon";
import { AuthData } from "../../Auth/AuthWrapper";
import { useState } from "react"
import "../../Styling/Selfie.css"


export default function Selfie() {
    const { user, logout } = AuthData()

    return (
        <div >
            <div className="selfieHeader">
                <div className="selfieTitle">Hi {user.name}!</div>
                <div>{user.email}</div>
            </div>
            <div>
                <div className="selfieSectionTitle">Things you could do: </div>
                <div className="selfieBtn">Change Email</div>
                <div className="selfieBtn">Change Password</div>
                <div className="selfieBtn" onClick={logout}>Logout</div>
            </div>



        </div>
    );
  }
