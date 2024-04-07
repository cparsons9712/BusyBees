import { useFormik } from "formik";
import { userSchema } from "../../Validations/UserValidation";
import { useState } from "react";
import axios from "../../APIs/users";
import { useModal } from "../../Context/Modal";
import Selfie from "./Selfie";
import "../../Styling/editProfile.css";
import { AuthData } from "../../Auth/AuthWrapper";

export default function EditProfile() {
  const [err, setErr] = useState();
  const { showModal } = useModal();
  const { user, checkAuthStatus } = AuthData();
  const defaultImage = "https://i.imgur.com/XhNphUJ.png";

  const formik = useFormik({
    initialValues: {
      name: user.name,
      email: user.email,
      profilePicUrl: user.profilePicUrl,
    },
    //validationSchema: userSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.put(
          `${user.id}`,
          {
            name: values.name,
            email: values.email,
            profilePicUrl: values.profilePicUrl || defaultImage,
          },
          { withCredentials: true }
        );

        checkAuthStatus();
        showModal(<Selfie />, "black");
      } catch (error) {
        console.error("Edit Profile error: ");
        setErr(error.message);
      }
    },
  });

  return (
    <div className="editProfileCont">
      <div className="editProfileInputs">
        <div>
          <div className="editProfileTitle">Edit Profile</div>
        </div>

        <form className="EditUserForm" onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <input
              className="input"
              placeholder="name"
              id="name"
              type="string"
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
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
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
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
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.profilePicUrl}
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
          src={formik.values.profilePicUrl || defaultImage}
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
}
