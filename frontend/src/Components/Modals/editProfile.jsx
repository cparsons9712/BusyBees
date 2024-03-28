import { useFormik } from "formik";
import { userSchema } from "../../Validations/UserValidation";
import { useState } from "react";
import axios from "../../APIs/auth";
import { useModal } from "../../Context/Modal";
import Selfie from "./Selfie";
import '../../Styling/editProfile.css'

export default function EditProfile() {
        const [err, setErr] = useState();
        const {showModal} = useModal();
        const defaultImage = 'https://i.imgur.com/XhNphUJ.png'


        const formik = useFormik({
          initialValues: {
            name: "",
            email: "",
            url: "",
          },
          //validationSchema: userSchema,
          onSubmit: async (values) => {
            try{
                // const response = await axios.post(
                //     "/edit-profile",
                //     {   name: values.name,
                //         email: values.email,
                //         password: values.password
                //     },
                //     { withCredentials: true }
                //   );
                  console.log({   name: values.name,
                 email: values.email,
                url: values.url || defaultImage
                  })
                 showModal(<Selfie />)


            } catch (error){
                console.error("Sign up error: ")
                setErr(error.message)
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
                        id="url"
                        type="url"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.url}
                        />
                        <label htmlFor="url" className="form-label">
                        Profile Image URL
                        </label>
                    </div>
                    <button type="submit" className="blackRectangleButton">Save Profile</button>
                </form>

            </div>
            <div className="previewImg">
                <img
                    className="selfieIMGPreview"
                    src={formik.values.url || defaultImage}
                    alt="Bee smiling or uploaded pic"
                />
                <button className="yellowRectangleButton">Cancel</button>

            </div>


        </div>
    );

}
