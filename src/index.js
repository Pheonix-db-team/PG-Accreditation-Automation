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
import FacultySignupPage from './pages/FacultySignupPage';
import FacultySigninPage from './pages/FacultySigninPage';
import FacultyDashboard from './pages/FacultyDashboard';
import StudentSignupPage from './pages/StudentSignupPage';
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
