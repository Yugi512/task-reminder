"use client"

import { useState, useEffect} from "react";
import { useNavigate } from "react-router";

import { useAuthStore } from "store/authStore";
import toast, { Toaster } from 'react-hot-toast';

const SignInForm = () => {
    const [newUser, setUser] = useState({
        email: "",
        password: ""
    });
    const {signin, isLoading, isAuthenticated,checkAuth} = useAuthStore()

    const navigate = useNavigate()


    function handleChange(event: any){
        setUser({
          ...newUser,
          [event.target.id]: event.target.value
        })
    }

    async function handleSubmit(e: any){
        e.preventDefault()
        try{
            await signin(newUser.email, newUser.password)
        }
        catch(error){
            toast.error('Please make sure to sign in a valid account')
        }
        
    }
    if(isLoading) return <p>Loading...</p>

    useEffect(() => {
            checkAuth()
            navigate('/')
    },[checkAuth])

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
            <Toaster />
        </div>
    )
}

export default SignInForm;