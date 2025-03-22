"use client"

import { useState} from "react";

const SignInForm = () => {
    const [newUser, setUser] = useState({
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
        fetch(`http://localhost:5173/api/v1/auth/sign-in`,{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser)
        })
        .catch(error => console.error("Error submitting information, sign in form: ",error))
    }

    return (
        <div className="auth-div">
            <h1>Sign in</h1>
            <form className="auth-form" onSubmit={(e) => handleSubmit(e)}>
                <div className="auth-email">
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
                <div className="auth-password">
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

export default SignInForm;