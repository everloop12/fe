
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { questionsApiSlice } from 'store/api/questionApiSlice';
import { store } from 'store/index';
import { selectUser } from 'store/reducers/user';

const Prefetch = () => {

    const currentUser = useSelector(selectUser);
    const { uid, role } = currentUser;
    useEffect(() => {
        store.dispatch(questionsApiSlice.util.prefetch('getUserQuestionData', undefined, { force: false }))

        if (role === "ADMIN")
            store.dispatch(questionsApiSlice.util.prefetch('getQuestions', 'questionsList', { force: false }))
    }, [role, uid])

    return <Outlet />
}
export default Prefetch
