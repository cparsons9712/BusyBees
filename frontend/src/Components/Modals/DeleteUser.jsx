import Selfie from "./Selfie";
import { useModal } from "../../Context/Modal";
import axios from '../../APIs/users'
import { AuthData } from "../../Auth/AuthWrapper";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DeleteAccount() {
    const {showModal, hideModal} = useModal()
    const {user, checkAuthStatus, deleteUserAccount} = AuthData()
    const [err, setErr] = useState()
    const goTo = useNavigate();


    const handleDelete = async() => {
        deleteUserAccount()
    }

    return (
        <div >
            <h2>Delete Account</h2>
            <p> This action is permanent and cannot be reversed. All of the data associated with your account will be deleted and gone forever. </p>
            <p>Are you sure you want to delete your account for good? </p>
            <button onClick={()=>handleDelete()}>DELETE</button> <button onClick={()=>showModal(<Selfie/>, 'black')}>Think It Over</button>
        </div>
    );
  }
