
import { useGetSubscriptionStatusQuery } from 'store/api/PaymentStatusApiSlice';
import { Navigate, Outlet } from '../../../node_modules/react-router-dom/dist/index';
import moment from '../../../node_modules/moment/moment';
import { useSelector } from 'react-redux';
import { selectUser } from 'store/reducers/user';

const SubscriptionGuard = () => {

    const currentUser = useSelector(selectUser);

    const {
        data: subscribed,
        isLoading,
        isSuccess,
    } = useGetSubscriptionStatusQuery();

    const successCondition = moment(subscribed?.data?.lastPackageExpiry) > moment()

    if (isLoading || !currentUser.token)
        return ""

    if (isSuccess) {
        if (successCondition)
            return <Outlet />
        else
            return <Navigate to="/subscription" replace={true} />

    }


}
export default SubscriptionGuard
