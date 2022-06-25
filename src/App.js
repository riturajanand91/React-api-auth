import React, { Suspense, lazy, useEffect } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
// import { loadUser } from "./redux/actions/index_old";
import { Container } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import SignUpComponent from "./components/auth/signUp/SignUp";
import HeaderComponent from "./components/layouts/header/Header";
import ProtectedRoute from "./components/protectedRoutes/ProtectedRoute";
const LoginComponent = lazy(() => import("./components/auth/login/Login"));
const LogOutComponent = lazy(() => import("./components/auth/logout/Logout"));
const ProfileComponent = lazy(() => import("./components/profile/Profile"));
const SettingsComponent = lazy(() => import("./components/settings/Settings"));
const DashboardComponent = lazy(() => import("./components/dashboard/Dashboard"));
// import Toast from './components/toast/Toast';

function App() {
  const isAuth = useSelector((state) => state.auth.isLoggedIn);
  return (
    <div className="App">
      {isAuth != false ? <HeaderComponent></HeaderComponent> : ""}
      {/* {user ? <HeaderComponent></HeaderComponent> : ""} */}
      <Suspense fallback={<h1>Loading...</h1>}>
        <Container maxWidth="xl">
          <Routes>
            <Route path='/login' element={<LoginComponent />} exact></Route>
            <Route path='/logout' element={<LogOutComponent />} exact></Route>
            <Route path='/signup' element={<SignUpComponent />} exact></Route>
            <Route path='/dashboard' element={<ProtectedRoute><DashboardComponent /></ProtectedRoute>} ></Route>
            <Route path='/settings' element={<ProtectedRoute><SettingsComponent /></ProtectedRoute>} ></Route>
            <Route path='/profile' element={<ProtectedRoute><ProfileComponent /></ProtectedRoute>} ></Route>

          </Routes>
        </Container>
      </Suspense>
    </div >
  );
}

export default App;
