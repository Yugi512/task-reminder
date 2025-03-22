import Background from "~/components/background";
import { Outlet } from "react-router";

export default function AuthPage(){

    return (
        <div className="auth-page">
            <div className="form-section">
                <Outlet />
            </div>
            <Background />
        </div>
    )
}