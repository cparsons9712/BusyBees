import { useState } from "react";
import "../../Styling/signIn.css";
import { useModal } from "../../Context/Modal";
import SignUp from "./SignUp";
import SendPWEmail from "./ForgotPW";
import { useLogIn } from "../../Hooks/useUserQueries";
import { useNavigate } from "react-router";

const SignIn = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { mutate } = useLogIn();
  const { showModal } = useModal();
  const [loginError, setLoginError] = useState("");
  const goTo = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(
      { email, password },
      {
        onSuccess: () => {
          console.log("Login successful!");
          goTo("/dash");
        },
        onError: (error) => {
          console.error("Login failed:", error);
          setLoginError("Invalid username or password"); // More specific error handling can be added here
        },
      }
    );
  };

  const signInDemo = () => {
    mutate(
      { email: "demo@email.com", password: "Super5ecret!" },
      {
        onSuccess: () => {
          console.log("Login successful!");
        },
        onError: (error) => {
          console.error("Login failed:", error);
          setLoginError("Invalid username or password"); // More specific error handling can be added here
        },
      }
    );
  };

  const switchToSignUp = () => {
    showModal(<SignUp />, "black");
  };

  const openResetPassword = () => {
    showModal(<SendPWEmail />, "gold");
  };

  return (
    <div className="signUpContainter">
      <div className="modalHeader signIn">
        <img src="./BeeCenterDeco.png" alt="bee" className="beeCentered"></img>
        <h1>Good to See you!</h1>

        {loginError && <div className="signInError">{loginError}</div>}
      </div>

      <form onSubmit={handleSubmit} className="signUpForm" autoComplete="off">
        <div className="formRow">
          <div className="form-group">
            <input
              className="input signUpInput"
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
              className="input signUpInput"
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
      <div
        className="forgotCont"
        onClick={() => {
          openResetPassword();
        }}
      >
        <img
          className="forgotPW"
          src="questionMark.png"
          alt="Forgot Password block"
        />{" "}
        Forgot Password?
      </div>

      <footer className="modalFooter">
        <div className="demoLink" onClick={() => signInDemo()}>
          Click here for Demo
        </div>
        <div>
          Not a member?{" "}
          <span
            className="footerRedirect"
            onClick={() => {
              switchToSignUp();
            }}
          >
            Sign Up
          </span>
        </div>
      </footer>
    </div>
  );
};

export default SignIn;
