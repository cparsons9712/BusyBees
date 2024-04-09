import { useEffect, useRef, useState } from "react";
import { AuthData } from "../../Auth/AuthWrapper";
import { useEditUserProfile } from "../../Hooks/useUserQueries";
import { useModal } from "../../Context/Modal";
import Selfie from "./Selfie";
import { useGetUser } from "../../Hooks/useUserQueries";

const EditUser = () => {
  const { logout } = AuthData();
  const {user} = useGetUser()
  const { mutate } = useEditUserProfile();
  const { showModal, hideModal } = useModal();
  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.name);
  const [profilePicUrl, setProfilePicUrl] = useState(user.profilePicUrl);

  const defaultImage = "https://i.imgur.com/XhNphUJ.png";


  const onSubmit = (e) => {
    e.preventDefault();

    const emailChanged = user.email !== email;
    const nameOrPicChanged =
      user.name !== name || user.profilePicUrl !== profilePicUrl;

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
      } else if (nameOrPicChanged) {
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
          </div>
          <button type="submit" className="blackRectangleButton">
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
