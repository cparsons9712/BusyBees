import ComingSoonPage from "../Pages/ComingSoon";
import { AuthData } from "../../Auth/AuthWrapper";
import { useState } from "react";
import "../../Styling/Selfie.css";

export default function Selfie() {
  const { user, logout } = AuthData();

  return (
    <div className="selfie_container">
      <div className="selfieImgCont">
        <img
          className="selfieIMG"
          src="embarresedBee.png"
          alt="Bee smiling or uploaded pic"
        />
      </div>
      <div className="nameBar">
        <div>{user.name}</div>
        <div>{user.email}</div>
      </div>

      <div className="optionsBar">
        <div className="selfieBtn">Delete Account</div>
        <div className="selfieBtn">Edit Profile</div>
        <div className="selfieBtn">Reset Password</div>
        <div className="selfieBtn" onClick={logout}>
          Logout
        </div>
      </div>
    </div>
  );
}
