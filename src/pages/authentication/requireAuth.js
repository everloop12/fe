/* eslint-disable react/prop-types */
import { useLocation, Navigate, Outlet } from "react-router-dom"
import { fireAuth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react";


const Auth = ({ allowedRoles = [], requireLogin = false }) => {
    const location = useLocation()

    const [authUser, setAuthUser] = useState("Loading");
    useEffect(() => {
        const listen = onAuthStateChanged(fireAuth, (user) => {

            if (user) {
                setAuthUser(user);
            } else {
                setAuthUser(null);
            }
        });
        return () => {
            listen();
        };
    }, [authUser]);

    if (authUser === "loading")
        return <></>

    let content = <Outlet />;
    if (!requireLogin)
        return content;

    if (authUser) {
        if (allowedRoles.length > 0) {
            content = (
                roles.some(role => allowedRoles.includes(role))
                    ? <Outlet />
                    : <Navigate to="/login" state={{ from: location }} replace />
            )
        }
    }
    else {
        content = <Navigate to="/login" state={{ from: location }} replace />;
    }

    return content
}
export default Auth