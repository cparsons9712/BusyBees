import { useState } from "react";
import "../../Styling/resetPW.css";
import { useModal } from "../../Context/Modal";
import axios from "../../APIs/auth";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");
  const { hideModal } = useModal();

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(email);

    try {
      const response = await axios
        .post("/password-reset", { email }, { withCredentials: true })
        .then((res) => {
          console.log(res);
          setEmail("");
          hideModal();
        });
    } catch (error) {

      setErr(error.response.data.message)
      console.error('ERROR status',error.response.status, ': ', err)
    }
  };

  return (
    <div className="resetPWCont">
      <div className="resetHeader">
        <div onClick={hideModal} className="closeButton">
          X
        </div>
        <h2 className="resetTitle">Reset Password</h2>
      </div>
      <form className="resetBody" onSubmit={(e) => onSubmit(e)}>
        <div>Please enter the email on file for your account</div>
        <div className="form-group">
          <input
            className="input resetInput"
            placeholder="email"
            id="emailPW"
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
        {err && <div className="errorMsg">{err}</div>}
        <div className="submitContReset">
          <button type="submit" id="pwSubmitbtn" className="hexagonSubmitBtn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
