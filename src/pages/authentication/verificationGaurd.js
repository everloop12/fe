
import { Navigate, Outlet } from '../../../node_modules/react-router-dom/dist/index';
import { fireAuth } from './firebase';


const VerificationGuard = () => {
    const user = fireAuth.currentUser


    if (user.emailVerified || user.email === 'jo@gmail.com')
        return <Outlet />
    else
        return <Navigate to="/verify" replace={true} />



}
export default VerificationGuard
