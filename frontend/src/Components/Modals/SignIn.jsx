import React, { useEffect, useState } from "react";
import "../../Styling/signIn.css";
import axios from "../../APIs/auth";
import useAxiosFunction from "../../Hooks/useAxiosFunction";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../Context/Modal";
import { AuthData } from "../../Auth/AuthWrapper";


const SignIn = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { login } = AuthData()
  const goTo = useNavigate();
  const { hideModal } = useModal();
  const [loginError, setLoginError] = useState("");

//   useEffect(() => {
//     if (error) {
//       setLoginError(
//         "Failed to log in. Please check your credentials and try again."
//       );
//       console.error("Log in Error: ", error);
//     }
//   }, [error]);



const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
 // Redirect on success
    } catch (error) {
      // Handle login failure, e.g., showing an error message
      console.error("Login failed:", error);
      setLoginError(error)
    }
  };

  return (
    <div className="signUpContainter">
      <div className="modalHeader signIn">
        <img src="./BeeCenterDeco.png" alt="bee" className="beeCentered"></img>
        <h1>Nice to meet you!</h1>

        {loginError && <div className="errorMsg">{loginError}</div>}
      </div>

      <form onSubmit={handleSubmit} className="signUpForm" autoComplete="off">
        <div className="formRow">
          <div className="form-group">
            <input
              className="input"
              placeholder="email"
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <label htmlFor="email" className="form-label">
              Email
            </label>
          </div>

          <div className="form-group">
            <input
              placeholder="password"
              className="input"
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <label htmlFor="password" className="form-label">
              Password
            </label>
          </div>
        </div>

        <button type="submit" className="hexagonSubmitBtn">
          Submit
        </button>
      </form>

      <footer className="modalFooter">
        <div className="demoLink">Click here for Demo</div>
        <div>
          Not a member?{" "}
          <a className="footerRedirect" href="/signUp">
            {" "}
            Sign Up
          </a>
        </div>
      </footer>
    </div>
  );
};

export default SignIn;
