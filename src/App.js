/* eslint-disable react-hooks/exhaustive-deps */
// project import
import React, { useState, useEffect } from 'react';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from 'layout/MainLayout/index';
import GlobalBackground from 'components/GlobalBackground';
import QuestionListPage from 'pages/question-page/QuestionList/questionListPage';
import QuestionFormPage from 'pages/question-page/newQuestionPage/questionFormPage';
import Prefetch from 'pages/authentication/prefetch';
import CategoryFormPage from 'pages/category-page/newCategoryPage/categoryFormPage';
import CategoryListPage from 'pages/category-page/categoryList/categoryListPage';
import ExamDashboard from 'pages/question-page/examDashboard';
import ExamComponentPage from 'pages/question-page/ExamComponentPage';
import Register from 'pages/authentication/Register';
import Login from 'pages/authentication/Login';
import DashboardDefault from 'pages/dashboard/index';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setUser } from 'store/reducers/user';
import { onAuthStateChanged } from 'firebase/auth';
import { fireAuth } from 'pages/authentication/firebase';
import axiosInstance from 'utils/axiosInstance';
import RoleBasedGuard from 'pages/authentication/roleBasedAuth';
import TagFormPage from 'pages/tag-page/newTagPage/tagFormPage';
import TagListPage from 'pages/tag-page/tagList/tagListPage';
import ReferalPage from 'pages/refferalPage/referalPage';
import SettingsPage from 'pages/settingsPage/settingsPage';
import HistoryTable from 'pages/question-page/Components/HistoryTable';
import AnalyticsPage from 'pages/analytics/analyticsPage';
import ProfilePage from 'pages/profile/ProfileComponentPage';
import PaymentPage from 'pages/subscription/PaymentPage';
import SubscriptionGuard from 'pages/authentication/subscriptionGuard';
import Forgot from 'pages/authentication/Forgot';
import { useGetSubscriptionStatusQuery } from 'store/api/PaymentStatusApiSlice';
import UserPage from 'pages/userPage/userPage';
import UserListPage from 'pages/userPage/usersList/userListPage';
import VerificationGuard from 'pages/authentication/verificationGaurd';
import Verify from 'pages/subscription/verifyEmailComponent';
import TOS from 'pages/extra-pages/TOS';
import ContactUs from 'pages/extra-pages/Contact';
import UserProfile from 'pages/profile/userProfile';
import OtherUserProfile from 'pages/profile/OtherUserProfile';
import SubsLandingPage from 'pages/subs/subs';
import MRCPPage from 'pages/subs/mrcp';
import SubjectsPage from 'pages/LongCases/SubjectsPage';
import SubjectCasesPage from 'pages/LongCases/SubjectCasesPage';
import Loader from 'loader'; // Import the Loader component
import LongCaseComponentWrapper from 'pages/LongCases/LongCaseComponentWrapper';
import StudyPlanner from './pages/study-planner/StudyPlanner';
import Pomodoro from 'pages/question-page/Pomodoro';
import Survival from 'pages/question-page/Survival';
import LifeDrainMode from 'pages/question-page/Lifedrain';
// Register the service worker when the app starts
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  });
}

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //
const App = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);
  const { refetch } = useGetSubscriptionStatusQuery();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const listen = onAuthStateChanged(fireAuth, (user) => {
      if (user) {
        axiosInstance.get('user/profile', {
          headers: { Authorization: `Bearer ${user.accessToken}` }
        }).then(async (profile) => {
          await dispatch(setUser({
            token: user.accessToken,
            email: user.email,
            emailVerified: user.emailVerified,
            isAnonymous: user.isAnonymous,
            phoneNumber: user.phoneNumber,
            photoURL: user.photoURL,
            uid: user?.uid || "",
            role: profile.data.data.role,
            xp: profile.data.data?.xp || 0,
            displayName: profile.data.data.displayName,
            name: profile.data.data.name,
            lastName: profile.data.data.lastName,
            referredById: profile.data.data.referredById,
            referralCode: profile.data.data.referral_code,
            streak: profile.data.data?.streak || 0,
            country: profile.data.data.country,
            university: profile.data.data.university,
            settings: {
              focus: profile.data.data?.focus || false,
              anon: profile.data.data?.anon || false,
            }
          }));
          refetch();
          setIsLoading(false); // Set loading to false once the user data is fetched
        }).catch((e) => {
          console.log(e);
          setIsLoading(false); // In case of error, set loading to false
        });
      } else {
        dispatch(setUser(null));
        setIsLoading(false); // If no user, set loading to false
      }
    });
    return () => {
      listen();
    };
  }, []);

  const loading = currentUser === "Loading";
  const guest = currentUser === null;
  const loggedIn = !loading && currentUser && currentUser.uid;

  return (
    <ThemeCustomization>
      <ScrollTop>
        <GlobalBackground />
        {isLoading ? (
          <Loader /> // Display the loader while loading is true
        ) : (
          <Routes>
            <Route path="/" element={<MainLayout />}>
              {loading ? <div>Loading</div> :
                <>
                  <Route index element={<DashboardDefault />} />
                  <Route path="/verify" element={<Verify />} />
                  <Route path="login" element={<Login />} />
                  <Route path="forgot-password" element={<Forgot />} />
                  <Route path="register" element={<Register />} />
                  <Route path="tos" element={<TOS />} />
                  <Route path="contact" element={<ContactUs />} />

                  <Route element={<VerificationGuard />}>
                    {loggedIn &&
                      <Route element={<Prefetch />}>
                        <Route path="main" element={<ExamDashboard />} />
                        <Route path="exampage" element={<ExamComponentPage />} />
                        <Route path="referral" element={<ReferalPage />} />
                        <Route path="settings" element={<SettingsPage />} />
                        <Route path="history" element={<HistoryTable />} />
                        <Route path="/pomodoro" element={<Pomodoro/>} />
                        <Route path="/survival" element={<Survival/>} />
                        <Route path="/lifedrain" element={<LifeDrainMode />} /> {/* Add this line */}




                        <Route element={<SubscriptionGuard />}>
                          <Route path="analytics" element={<AnalyticsPage />} />
                          {/* Wrap LongCases and Study Planner routes in SubscriptionGuard */}
                          <Route path="/LongCases" element={<SubjectsPage />} />
                          <Route path="/LongCases/:subject" element={<SubjectCasesPage />} />
                          <Route path="/LongCases/:subject/:caseId" element={<LongCaseComponentWrapper />} />
                          <Route path="/study-planner" element={<StudyPlanner />} />
                        </Route>

                        <Route path="profile" element={<ProfilePage />} />
                        <Route path="viewProfile" element={<UserProfile />} />
                        <Route path="viewProfile/:id" element={<OtherUserProfile />} />
                        <Route path="subscription" element={<PaymentPage />} />
                        <Route path="/subs" element={<SubsLandingPage />} />
                        <Route path="/subs/subscription" element={<PaymentPage />} />
                        <Route path="/subs/mrcp" element={<MRCPPage />} />

                        {/* admin routes */}
                        <Route element={<RoleBasedGuard roles={["ADMIN"]} />}>
                          <Route path="questionList" element={<QuestionListPage />} />
                          <Route path="question" element={<QuestionFormPage />} />
                          <Route path="question/:id" element={<QuestionFormPage />} />

                          <Route path="users" element={<UserListPage />} />
                          <Route path="user/:id" element={<UserPage />} />

                          <Route path="category" element={<CategoryFormPage />} />
                          <Route path="category/:id" element={<CategoryFormPage />} />
                          <Route path="categorylist" element={<CategoryListPage />} />

                          <Route path="tag" element={<TagFormPage />} />
                          <Route path="tag/:id" element={<TagFormPage />} />
                          <Route path="taglist" element={<TagListPage />} />
                        </Route>
                      </Route>
                    }
                  </Route>
                  {guest && <Route path="*" element={loading ? <div>loading</div> : <Navigate to="/login" replace={true} />} />}
                </>
              }
            </Route>
          </Routes>
        )}
      </ScrollTop>
    </ThemeCustomization>
  );
};

export default App;
