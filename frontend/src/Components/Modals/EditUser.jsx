import { useEffect, useRef, useState } from "react";
import { AuthData } from "../../Auth/AuthWrapper";
import { useEditUserProfile } from "../../Hooks/useUserQueries";
import { useModal } from "../../Context/Modal";
import Selfie from "./Selfie";
import { useGetUser } from "../../Hooks/useUserQueries";
import "../../Styling/editProfile.css";

const EditUser = () => {
  const { logout } = AuthData();
  const { user } = useGetUser();
  const { mutate } = useEditUserProfile();
  const { showModal, hideModal } = useModal();
  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.name);
  const [profilePicUrl, setProfilePicUrl] = useState(user.profilePicUrl);
  const [emailErr, setEmailErr] = useState();
  const [picErr, setPicErr] = useState();

  const [validData, setValidData] = useState(false);

  const defaultImage = "https://i.imgur.com/XhNphUJ.png";

  useEffect(() => {
    let nameValid = name?.length <= 20; // Assuming you want to include names that are exactly 20 characters
    let emailValid;
    if (email)
      emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        email
      );

    if (!emailValid) setEmailErr("Please enter a valid email");

    let picEnding;
    if (profilePicUrl)picEnding = profilePicUrl?.match(/\.(jpeg|jpg|gif|png)$/);
    
    const picValid = !profilePicUrl || (profilePicUrl && picEnding);
    if (!picValid)
      setPicErr("Please enter a url ending in jpeg, jpg, gif, or png");

    setValidData(nameValid && emailValid && picValid);
  }, [name, email, profilePicUrl]);

  const onSubmit = (e) => {
    e.preventDefault();

    const emailChanged = user.email !== email;
    try {
      const payload = {
        name,
        email,
        profilePicUrl: profilePicUrl || defaultImage,
      };
      mutate({ id: +user.id, payload });

      if (emailChanged) {
        // If the email has changed, log out the user
        alert(
          "NOTICE: Editing email changes your login credentials. You will be logged out and prompted to log in again. Please use the new email to log in."
        );
        hideModal();
        logout();
      } else {
        // If only the name or profile pic has changed, show the selfie modal
        showModal(<Selfie />, "black");
      }
    } catch (error) {
      console.error("Edit Profile Error");
    }
  };

  return (
    <div className="editProfileCont">
      <div className="editProfileInputs">
        <div>
          <div className="editProfileTitle">Edit Profile</div>
        </div>

        <form className="EditUserForm" onSubmit={onSubmit}>
          <div className="form-group">
            <input
              className="input"
              placeholder="name"
              id="name"
              type="string"
              required
              maxLength={20}
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <label htmlFor="name" className="form-label">
              Name
            </label>
          </div>

          <div className="form-group">
            <input
              className="input"
              placeholder="email"
              id="email"
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <label htmlFor="email" className="form-label">
              Email
            </label>
            {emailErr && <div className="error">{emailErr}</div>}
          </div>

          <div className="form-group">
            <input
              className="input"
              placeholder="url"
              id="profilePicUrl"
              type="url"
              onChange={(e) => {
                setProfilePicUrl(e.target.value);
              }}
              value={profilePicUrl}
            />
            <label htmlFor="profilePicUrl" className="form-label">
              Profile Image URL
            </label>
            {picErr && <div className="error">{picErr} </div>}
          </div>

          <button
            type="submit"
            className="blackRectangleButton"
            disabled={!validData}
          >
            Save Profile
          </button>
        </form>
      </div>
      <div className="previewImg">
        <img
          className="selfieIMGPreview"
          src={profilePicUrl || defaultImage}
          alt="Bee smiling or uploaded pic"
        />
        <button
          className="yellowRectangleButton"
          onClick={() => showModal(<Selfie />, "black")}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
export default EditUser;
