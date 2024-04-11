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
        <div className="confirmDelete">
            <div className="caution">Delete Account</div>
            <p className="deleteText"> This action is permanent and cannot be reversed. All of the data associated with your account will be deleted and gone forever. </p>
            <p className="deleteText">Are you sure you want to delete your account for good? </p>
            <div className="deleteBtnBar">
                <button onClick={()=>handleDelete()} className="deleteBtn accountDeleteBtn">
                    DELETE
                </button>
                <button onClick={()=>showModal(<Selfie/>, 'black')} className="deleteBtn accountDeleteBtn">
                    Think It Over
                </button>
            </div>
        </div>
    );
  }
