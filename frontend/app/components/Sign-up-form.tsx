"use client"

import { useEffect, useState} from "react";
import { useAuthStore } from "store/authStore";
import { useNavigate } from "react-router";
import toast, { Toaster } from 'react-hot-toast';

const SignUpForm = () => {
    const [newUser, setUser] = useState({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });
    const {isAuthenticated,checkAuth, signup, error} = useAuthStore()
    const navigate = useNavigate()

    useEffect(() => {
        checkAuth()
        navigate('/')
    },[checkAuth])

    function handleChange(event: any){
        setUser({
          ...newUser,
          [event.target.id]: event.target.value
        })
    }

    async function handleSubmit(e: any){
        e.preventDefault()
        try{
            await signup(newUser.firstName,newUser.lastName,newUser.username,newUser.email,newUser.password)
            navigate('/')
        }
        catch(err: any){
            if(err.response.status === 409){
                navigate('/sign-in')
            } else if(err.response.status === 500) {
                toast.error('Error: All input fields must be filled')
            }
        }
    }

    // if(isAuthenticated && isVerified){
    //     toast.error("User already exists, sign in")
    // }

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
                <button>Sign up</button>
            </form>
            <p className="auth-p"> 
                Already have an account?
                <a href="/sign-up"> Sign in </a>
            </p>
            <Toaster />
        </div>
    )
}

export default SignUpForm;