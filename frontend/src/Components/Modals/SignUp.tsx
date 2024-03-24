import React from "react";
import { useFormik } from "formik";
import { userSchema } from "../../Validations/UserValidation";
import '../../Styling/signUp.css'

const SignUp = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      verifyPassword: "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      // Submit your form values to the server or handle them as needed
    },
  });

  return (
    <div className="signUpContainter">
      <div className="modalHeader signUp">
        <img src="./BeeCenterDeco.png" alt="bee" className="beeCentered"></img>
        <h1>Nice to meet you!</h1>
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
            <div className="errorMsg">
              {formik.touched.name && formik.errors.name ? (
                <div>{formik.errors.name}</div>
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
            <div className="errorMsg">
              {formik.touched.email && formik.errors.email ? (
                <div>{formik.errors.email}</div>
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
            <div className="errorMsg">
              {formik.touched.password && formik.errors.password ? (
                <div>{formik.errors.password}</div>
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
              Confirm Password
            </label>
            <div className="errorMsg">
              {formik.touched.verifyPassword && formik.errors.verifyPassword ? (
                <div>{formik.errors.verifyPassword}</div>
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
        <a className="footerRedirect" href="/Login">
          Log In
        </a>
      </footer>
    </div>
  );
};

export default SignUp;
