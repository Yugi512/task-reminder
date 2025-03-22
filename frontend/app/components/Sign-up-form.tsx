"use client"

import { error } from "console";
import { useState} from "react";

const SignUpForm = () => {
    const [newUser, setUser] = useState({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });

    function handleChange(event: any){
        setUser({
          ...newUser,
          [event.target.id]: event.target.value
        })
    }

    function handleSubmit(e: any){
        e.preventDefault()
        fetch(`http://localhost:5500/api/v1/auth/sign-up`,{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser)
        })
        .catch(error => console.error("Error submitting information, sign in form: ",error))
    }

    return (
        <div className="sign-up-div">
            <h1>Sign Up</h1>
            <form className="auth-form" onSubmit={(e) => handleSubmit(e)}>
                <div className="auth-input">
                    <label>Username</label>
                    <input 
                        type="text"
                        id="username"
                        value={newUser.username}
                        placeholder="username"
                        className="input-text"
                        onChange={handleChange}
                    ></input>
                </div>
                <div className="auth-input">
                    <label>First Name</label>
                    <input 
                        type="text"
                        id="firstName"
                        value={newUser.firstName}
                        placeholder="first name"
                        className="input-text"
                        onChange={handleChange}
                    ></input>
                </div>
                <div className="auth-input">
                    <label>Last Name</label>
                    <input 
                        type="text"
                        id="lastName"
                        value={newUser.lastName}
                        placeholder="last name"
                        className="input-text"
                        onChange={handleChange}
                    ></input>
                </div>
                <div className="auth-input">
                    <label>Email</label>
                    <input 
                        type="text"
                        id="email"
                        value={newUser.email}
                        placeholder="email"
                        className="input-text"
                        onChange={handleChange}
                    ></input>
                </div>
                <br/>
                <div className="sign-up-password">
                    <label>Password</label>
                    <input 
                        type="password"
                        id="password"
                        value={newUser.password}
                        placeholder="password"
                        className="input-text"
                        onChange={handleChange}
                    ></input>
                </div>
                <br />
                <button>login</button>
            </form>
            <p className="auth-p"> 
                Don't have an account?
                <a href="/sign-up"> Sign up </a>
            </p>
        </div>
    )
}

export default SignUpForm;