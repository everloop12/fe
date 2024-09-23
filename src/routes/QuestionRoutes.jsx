import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
// import { useSelector } from 'react-redux';
// import { selectAuthenticated } from 'store/reducers/user';




// render - utilities

const ExamPage = Loadable(lazy(() => import('pages/question-page/examComponent')));

// ==============================|| MAIN ROUTING ||============================== //

const QuestionRoutes = () => {
  // const auth = useSelector(selectAuthenticated);

  return {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: 'questions',
        element: /*auth &&  */ <ExamPage />
      },
    ]
  }
};

export default QuestionRoutes;
