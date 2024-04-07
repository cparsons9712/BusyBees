import React, {useState} from "react";
import { useFormik } from "formik";
import { userSchema } from "../../Validations/UserValidation";
import "../../Styling/signUp.css";
import { AuthData } from "../../Auth/AuthWrapper";
import { useModal } from "../../Context/Modal";
import SignIn from "./SignIn";

const SignUp = () => {
  const [err, setErr] = useState()
  const { signup } = AuthData();
  const {showModal} = useModal()


  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      verifyPassword: "",
    },
    validationSchema: userSchema,
    onSubmit: async (values) => {
      try{
        await signup(values)
      } catch (error){
          console.error("Sign up error: ")
          setErr(error.message)
      }
    },
  });

  const switchToLogin = () => {
    showModal(<SignIn />, 'black')
  }



  return (
    <div className="signUpContainter">
      <div className="modalHeader signUp">
        <img src="./BeeCenterDeco.png" alt="bee" className="beeCentered"></img>
        <h1>Nice to meet you!</h1>
        {err && <div className="errorMsg">{err} </div>}
      </div>

      <form
        onSubmit={formik.handleSubmit}
        className="signUpForm"
        autoComplete="off"
      >
        <div className="formRow">
          <div className="form-group">
            <input
              className="input"
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              placeholder="Name"
            />
            <label htmlFor="name" className="form-label">
              First Name
            </label>
            <div >
              {formik.touched.name && formik.errors.name ? (
                <div className="errorMsg">{formik.errors.name}</div>
              ) : null}
            </div>
          </div>

          <div className="form-group">
            <input
              className="input"
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder="Email"
            />
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <div >
              {formik.touched.email && formik.errors.email ? (
                <div className="errorMsg">{formik.errors.email}</div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="formRow">
          <div className="form-group">
            <input
              className="input"
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              placeholder="Password"
            />
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div >
              {formik.touched.password && formik.errors.password ? (
                <div className="errorMsg">{formik.errors.password}</div>
              ) : null}
            </div>
          </div>

          <div className="form-group">
            <input
              className="input"
              id="verifyPassword"
              name="verifyPassword"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.verifyPassword}
              placeholder="Confirm Password"
            />
            <label htmlFor="verifyPassword" className="form-label">
              Password Verify
            </label>
            <div className="signUpErr">
              {formik.touched.verifyPassword && formik.errors.verifyPassword ? (
                <div className="errorMsg signUpErr">{formik.errors.verifyPassword}</div>
              ) : null}
            </div>
          </div>
        </div>

        <button type="submit" className="hexagonSubmitBtn">
          Submit
        </button>
      </form>

      <footer className="modalFooter">
        Already a member?{" "}
        <span className="footerRedirect" onClick={()=>{switchToLogin()}}>
          Log In
        </span>
      </footer>
    </div>
  );
};

export default SignUp;
