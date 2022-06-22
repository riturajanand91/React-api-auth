import React, { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import SignUpComponent from "./components/auth/signUp/SignUp";

/** Lazy Loaded Routes With Suspense & Lazy */
const DashboardComponent = lazy(() =>
  import("./components/dashboard/Dashboard")
);
const LoginComponent = lazy(() => import("./components/auth/login/Login"));
const LogOutComponent = lazy(() => import("./components/auth/logout/Logout"));
const ProfileComponent = lazy(() => import("./components/profile/Profile"));
const SettingsComponent = lazy(() => import("./components/settings/Settings"));

const Router = () => {
  return useRoutes([
    {
      path: "/",
      element: <DashboardComponent />,
    },
    {
      path: "/profile",
      element: <ProfileComponent />,
    },
    {
      path: "/settings",
      element: <SettingsComponent />,
    },
    {
      path: "/logout",
      element: <LogOutComponent />,
    },
    {
      path: "/login",
      element: <LoginComponent />,
    },
    {
      path: "/signup",
      element: <SignUpComponent />,
    },
    // {
    //   path: "/",
    //   element: <DashboardComponent />,
    // },
    // { path: "*", element: <Navigate to="/404" replace /> },
  ]);
};

export default Router;
