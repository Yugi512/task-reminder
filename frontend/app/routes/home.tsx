import { useState, useEffect } from "react"
import { Navigate } from "react-router"
import Background from "~/components/background"
import axios from 'axios'
import { useAuthStore } from "store/authStore"
import { useNavigate } from "react-router";

axios.defaults.withCredentials = true

export default function Home (){
    const { isAuthenticated, user, isCheckingAuth, checkAuth } = useAuthStore();
	const navigate = useNavigate();
    
    useEffect( () => {
        if (!isAuthenticated) {
            navigate('/sign-in')
        }
        checkAuth()
    },[checkAuth])   


    if (isCheckingAuth) return <p>Loading...</p>;
    console.log(user)
    return (
        <div className="root-home">
            <div className="home-div">
                <div className="nav-bar"> 
                    <h1 className="h-button">home button far left</h1> 
                    <div className="user-buttons">
                        <h1 className="prof-button">profile button far right ,</h1> 
                        <h1 className="log-button">login-logout button to the left of the profile icon </h1> 
                    </div>
                    
                </div>
                <div className="p-t-container">
                    <div className="project-tab">
                    <h1>project tab</h1>
                    <div>
                        <h1>all uncompleted works, will be displayed here in the form of a list with no dots but when you hover over it it will glow and when you click on it you can edit it, the project properties will have a add task button to it once you click it and the project info div pops up </h1>
                    </div>
                    </div>
                    <div className="task-tab">
                        <h1>tasks tab</h1>
                        <div>
                            all uncompleted tasks, same as the project one but when you open it up, when you add a project it will be a drop down button and then you select which project you want to add 
                        </div>
                </div>
                </div>
                <div className="calendar-div">
                    <h1>Calandar div</h1>
                    on the right side of the calander there will be a little tasklist sidebar that will basically display all tasks due and their time if they have one, 
                </div>
            </div>
            <Background />
        </div>
    )
}