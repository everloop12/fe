import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import QuestionFormPage from 'pages/question-page/newQuestionPage/questionFormPage';
import DashboardDefault from 'pages/dashboard/index';


// render - dashboard

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));
const ExamPage = Loadable(lazy(() => import('pages/question-page/examDashboard')));
// render - utilities
const QuestionListPage = Loadable(lazy(() => import('pages/question-page/QuestionList/questionListPage')));
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <ExamPage />
    },
    {
      path: 'question',
      children: [{
        path: ':id',
        element: <QuestionFormPage />
      }]
      ,
      element: <QuestionFormPage />
    },
    {
      path: 'questionlist',
      element: <QuestionListPage />
    },
    {
      path: 'color',
      element: <Color />
    },
    {
      path: 'dashboard',
      element: <DashboardDefault />
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'typography',
      element: <Typography />
    },
    {
      path: 'icons/ant',
      element: <AntIcons />
    }
  ]
};

export default MainRoutes;
