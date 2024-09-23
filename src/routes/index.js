/* eslint-disable react-hooks/exhaustive-deps */
import { useRoutes } from 'react-router-dom';

// project import
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';
import QuestionRoutes from './QuestionRoutes';
import { selectAuthenticated } from 'store/reducers/user';
import { useSelector } from 'react-redux';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  const authenticated = useSelector(selectAuthenticated);
  const routes = [];
  // if (authenticated)
  routes.push(MainRoutes);
  routes.push(LoginRoutes);
  routes.push(QuestionRoutes());

  return useRoutes(routes);
}
