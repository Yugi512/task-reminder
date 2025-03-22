import { useState, useEffect } from "react"
import Background from "~/components/background"

export default function Home (){
    const [activeUser, setActiveUser] = useState<any>()

  // in the backend I need to make a workflows to send updates and messages on a 5 hour basis to remind them to start or finish the work, and a button that says started, and if the task is scheduled once it hits that scheduled time it has to be marked as started, if not marked done by due date it will be marked as expired 
  
  // <h1>sidebar</h1>
  //         <h1>projects tab, in the tab will display all the projects on going, and then there will be a button on the top left to add a project, and once instantiated you can click it and it will display a pop up with all the tasks and a description under the name of the project,</h1>
  //         <h1>todays tasks tab like a weekly calendar like google calendar
  //             on the calander week there will be a tasklist on the side, and then a button on top to add the tasks, so that they dont have project 
  //         </h1>

    useEffect(() => {
        fetch('http://localhost:5500/api/v1/auth/check-auth')
            .then(res => res.json())
            .then(data => setActiveUser(data))
            console.log(activeUser)
    },[])

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
                <div className="calendar-div">
                    <h1>Calandar div</h1>
                    on the right side of the calander there will be a little tasklist sidebar that will basically display all tasks due and their time if they have one, 
                </div>
            </div>
            <Background />
        </div>
    )
}