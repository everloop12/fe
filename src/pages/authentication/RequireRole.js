/* eslint-disable react/prop-types */
import { useLocation, Navigate, Outlet } from "react-router-dom"


const Auth = ({ allowedRoles = [] }) => {
    const location = useLocation()
    const roles = [];

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