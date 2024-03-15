
import React, { useEffect, useState } from "react";
import '../Styling/modal.css'
import '../Styling/signUp.css'
import { NavLink } from "react-router-dom";



const SignUp= () => {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const payload = {name, username, email, password}
        console.log(payload)
    }

    return (
        <div className='signUpContainter'>
            <div className='modalHeader signUp'>
                <img src="./BeeCenterDeco.png" alt="bee" className='beeCentered'></img>
                <h1>Nice to meet you!</h1>
            </div>

            <form onSubmit={handleSubmit} className="signUpForm">

                <div className="formRow">
                    <div className="form-group">
                        <input
                        className="input"
                        placeholder="name"
                        id="name"
                        type="text"
                        required
                        value = {name}
                        onChange ={(e)=>{setName(e.target.value)}}
                        />
                        <label htmlFor="name" className="form-label">First Name</label>
                    </div>

                    <div className="form-group">
                        <input
                        placeholder="username"
                        className="input"
                        id="username"
                        type="text"
                        required
                        value = {username}
                        onChange ={(e)=>{setUsername(e.target.value)}}
                        />
                        <label htmlFor="username" className="form-label">Username</label>
                    </div>

                </div>


                <div className="formRow">
                    <div className="form-group">
                        <input
                        placeholder="email"
                        className="input"
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
                        type="text"
                        required
                        value = {password}
                        onChange ={(e)=>{setPassword(e.target.value)}}
                        />
                        <label htmlFor="password" className="form-label ">Password</label>
                    </div>
                </div>

                <button type="submit" className="hexagonSubmitBtn">Submit</button>

            </form>
            <footer className="modalFooter">
                Already a member?  <span className="footerRedirect"> Log In</span>
            </footer>





        </div>
    );
}

export default SignUp;
