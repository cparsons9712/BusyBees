import { useState } from "react";
import { useParams } from "react-router-dom";
import "../../Styling/resetPW.css";
import axios from "../../APIs/auth";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { passwordSchema } from "../../Validations/newPasswordValidation";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [err, setErr] = useState();
  let { token } = useParams();

  const formik = useFormik({
    initialValues: {
      password: "",
      verify: "",
    },
    validationSchema: passwordSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "/password-change",
          { token, password: values.password }, // Use formik.values.password
          { withCredentials: true }
        );

        return navigate("/");
      } catch (error) {
        console.error("Sign up error: ");
        setErr(error.message);
      }
    },
  });

  return (
    <div className="newPasswordBackground">
      <form className="NewPasswordForm" onSubmit={formik.handleSubmit}>
        <div className="newPWTitle">
          <h2>Reset Password</h2>
        </div>
        <div className="passwordRules">
          <h3>Here's a reminder of the rules:</h3>
          <ul>
            <li>It has to be at least 5 characters</li>
            <li>It can't be longer than 50 character</li>
            <li>It has to have at least one uppercase letter</li>
            <li>It has to have at least one lower case letter</li>
            <li>It has to have at least one number</li>
            <li>It has have at least one symbol</li>
          </ul>
        </div>

        <div>
          {Object.keys(formik.errors).map((fieldName, index) => {
            // Check if the field was touched and if there's an error for that field
            if (formik.touched[fieldName] && formik.errors[fieldName]) {
              return (
                <div className="errorMsg" key={index}>
                  {formik.errors[fieldName]}
                </div>
              );
            }
            return null; // Return null if there are no errors to avoid adding empty nodes
          })}
        </div>

        <div className="pwInputs">
          <div className="form-group">
            <input
              className="input"
              placeholder="password"
              id="password"
              type="password"
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            <label htmlFor="passwordNew" className="form-label">
              New Password
            </label>
          </div>

          <div className="form-group">
            <input
              className="input"
              placeholder="verify password"
              id="verify"
              type="password"
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.verify}
            />
            <label htmlFor="passwordVerify" className="form-label">
              Verify Password
            </label>
          </div>
        </div>
        <button type="submit" className="hexagonSubmitBtn">
          Submit
        </button>
      </form>
    </div>
  );
}
