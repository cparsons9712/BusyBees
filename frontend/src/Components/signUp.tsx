
import React, { useEffect, useState } from "react";
import '../Styling/modal.css'
import '../Styling/signUp.css'



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

            <form onSubmit={handleSubmit}>

                <label> Name:</label>
                <input
                type="text"
                required
                value = {name}
                onChange ={(e)=>{setName(e.target.value)}}
                />

                <label> Username:</label>
                <input
                type="text"
                required
                value = {username}
                onChange ={(e)=>{setUsername(e.target.value)}}
                />

                <label>Email:</label>
                <input
                type="text"
                required
                value = {email}
                onChange ={(e)=>{setEmail(e.target.value)}}
                />

                <label>Password:</label>
                <input
                    type="text"
                    required
                    value = {password}
                    onChange ={(e)=>{setPassword(e.target.value)}}
                />

                <button type="submit">Submit</button>

            </form>






        </div>
    );
}

export default SignUp;
