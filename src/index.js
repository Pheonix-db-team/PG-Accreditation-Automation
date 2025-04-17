import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import LoginPage from './pages/LoginPage';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import FacultySignupPage from './faculty/FacultySignupPage';
import FacultySigninPage from './faculty/FacultySigninPage';
import FacultyDashboard from './faculty/FacultyDashboard';
import StudentSignupPage from './student/StudentSignupPage';
import StudentSigninPage from './student/StudentSigninPage';
import StudentDashboard from './student/StudentDashboard';
import CheckBoxDemoPage from './pages/CheckBoxDemoPage';
import StudentCourseRegPage from './student/StudentCourseRegPage';
import AddSubjectPage from './subject/AddSubjectPage';
import AddCESPage from './pages/AddCESPage';
import RadioButtonPage from './pages/RadioButtonPage';
import CESResponsePage from './pages/CESResponsePage';
import StudentCESResponsePage from './student/StudentCESResponsePage';
import ViewCESResponsesPage from './pages/ViewCESResponsesPage';
import SubjectListPage from './subject/SubjectListPage';
import SurveyListPage from './pages/SurveyListPage';
import AdminSigninPage from './admin/AdminSignin';
import AdminDashboardPage from './admin/AdminDashboardPage';
import FacultyListPage from './faculty/ViewFacultyPage';
import StudentListPage from './student/ViewStudentPage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/404Page';


const router = createBrowserRouter([
  {
    path: "/",
    //Root path
    element: <App />,

  },
  {
    path: "blog",
    // element: <div>Hello world!</div>,
    element: <BlogPage />,

  },
  {
    path: "contact",

    element: <ContactPage />,

  },
  {
    path: "signup",

    element: <SignupPage />,

  },
  {
    path: "login",

    element: <LoginPage />,

  },
  {
    path: "dashboard",

    element: <DashboardPage />,

  },
  {
    path: "facultysignup",

    element: <FacultySignupPage />,

  },
  {
    path: "facultysignin",

    element: <FacultySigninPage />,

  },
  {
    path: "facultydashboard",

    element: <FacultyDashboard />,

  },
  {
    path: "studentsignup",

    element: <StudentSignupPage />,

  },
  {
    path: "studentsignin",

    element: <StudentSigninPage />,

  },
  {
    path: "studentdashboard",

    element: <StudentDashboard />,

  },
  {

    path: "checkboxdemo",

    element: <CheckBoxDemoPage />,

  },
  {

    path: "studentcoursereg",

    element: <StudentCourseRegPage />,

  },
  {

    path: "addsubject",

    element: <AddSubjectPage />,

  },
  {

    path: "addces",

    element: <AddCESPage />,

  },
  {

    path: "radiobutton",

    element: <RadioButtonPage />,

  },
  {

    path: "cesresponse",

    element: <CESResponsePage />,

  },
  {

    path: "studentcesresponse",

    element: <StudentCESResponsePage />,

  },
  {
    path: "viewcesresponses",
    element: <ViewCESResponsesPage />
  },
  {
    path: "subjectlist",
    element: <SubjectListPage />,

  },
  {
    path: "surveylist",
    element: <SurveyListPage />,

  },
  {
    path: "adminsignin",
    element: <AdminSigninPage />,

  },
  {
    path: "admindashboard",
    element: <AdminDashboardPage />,

  },
  {
    path: "viewfacultylist",
    element: <FacultyListPage />,

  },
  {
    path: "viewstudentlist",
    element: <StudentListPage />,

  },
  {
    path: "/homepage",
    element: <HomePage />,

  },
  {
    path: "/aboutpage",
    element: <AboutPage />,

  },
  {
    path: "/404path",
    element: < NotFoundPage />,

  },
  {
    path: "/*",
    element: < NotFoundPage />,

  },


]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
 < RouterProvider router={router} />
  //</React.StrictMode>

);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
