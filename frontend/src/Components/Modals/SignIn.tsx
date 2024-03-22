import React, {  useState } from "react";
import '../../Styling/signIn.css'
// import '../Styling/modal.css'



const SignIn= () => {
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const payload = {email, password}
        console.log(payload)
    }

    return (
        <div className='signUpContainter'>
            <div className='modalHeader signIn'>
                <img src="./BeeCenterDeco.png" alt="bee" className='beeCentered'></img>
                <h1>Nice to meet you!</h1>
            </div>

            <form onSubmit={handleSubmit} className="signUpForm" autoComplete="off">

                <div className="formRow">
                    <div className="form-group">
                        <input
                        className="input"
                        placeholder="email"
                        id="email"
                        type="text"
                        required
                        value = {email}
                        onChange ={(e)=>{setEmail(e.target.value)}}
                        />
                        <label htmlFor="email" className="form-label">Email</label>
                    </div>

                    <div className="form-group">
                        <input
                        placeholder="password"
                        className="input"
                        id="password"
                        type="password"
                        required
                        value = {password}
                        onChange ={(e)=>{setPassword(e.target.value)}}
                        />
                        <label htmlFor="password" className="form-label">Password</label>
                    </div>
                </div>

                <button type="submit" className="hexagonSubmitBtn">Submit</button>

            </form>

            <footer className="modalFooter">
                <div className="demoLink">Click here for Demo</div>
                <div>
                    Not a member?  <a className="footerRedirect" href="/signUp"> Sign Up</a>
                </div>
            </footer>

        </div>
    );
}

export default SignIn;
