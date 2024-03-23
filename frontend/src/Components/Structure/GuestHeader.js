import { NavLink } from "react-router-dom";
import '../../Styling/Header.css'
import SignUp from "../Modals/SignUp";
import SignIn from "../Modals/SignIn";
import { useState } from "react";
import Modal from "../Modals/Modal";

const GuestHeader = () => {
  const [openSignUp, setOpenSignUp] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);

  return (
    <div className="headerBackground">


      <div onClick={() => setOpenSignIn(!openSignIn)} className="headerOption">
        Sign In
      </div>



      <div className="headerLogo">
        <img src="./logo.png" alt="logo" />
      </div>

      <div onClick={() => setOpenSignUp(!openSignUp)} className="headerOption">
        Sign Up
      </div>

      <Modal isOpen={openSignUp} onClose={() => setOpenSignUp(false)}>
        <SignUp />
      </Modal>
      <Modal isOpen={openSignIn} onClose={() => setOpenSignIn(false)}>
        <SignIn />
      </Modal>
    </div>
  );
};

export default GuestHeader;
