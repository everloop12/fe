
import { useEffect } from 'react';
import { Navigate, Outlet } from '../../../node_modules/react-router-dom/dist/index';
import { useSelector } from 'react-redux';
import { selectUser } from 'store/reducers/user';

const RoleBasedGuard = ({ roles = [] }) => {
    const currentUser = useSelector(selectUser);

    useEffect(() => {
    }, [currentUser])

    const successCondition = roles.length > 0 ?
        currentUser.token && currentUser.role && roles.includes(currentUser.role) :
        currentUser.token

    if (successCondition)
        return <Outlet />
    else
        return currentUser.token ? <Navigate to="/" replace={true} /> : <Navigate to="/login" replace={true} />
}
export default RoleBasedGuard
