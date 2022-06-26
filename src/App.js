import React, { Suspense, lazy, useEffect } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import SignUpComponent from "./components/auth/signUp/SignUp";
import HeaderComponent from "./components/layouts/header/Header";
import ProtectedRoute from "./components/protectedRoutes/ProtectedRoute";
const LoginComponent = lazy(() => import("./components/auth/login/Login"));
const LogOutComponent = lazy(() => import("./components/auth/logout/Logout"));
const ProfileComponent = lazy(() => import("./components/Profile/Profile"));
const SettingsComponent = lazy(() => import("./components/settings/Settings"));
const DashboardComponent = lazy(() => import("./components/dashboard/Dashboard"));
// import Toast from './components/toast/Toast';

function App() {
  const isAuth = useSelector((state) => state.auth.isLoggedIn);
  return (
    <div>
      {isAuth != false ? <HeaderComponent></HeaderComponent> : ""}

      <Suspense fallback={<h1>Loading...</h1>}>
        {/* <Container maxWidth="xl"> */}
        <div className="container-fluid">
          {/* <div class="row">
            <div class="col-sm-8 pl-5"> */}
          <Routes>
            <Route path='/login' element={<LoginComponent />} exact></Route>
            <Route path='/logout' element={<LogOutComponent />} exact></Route>
            <Route path='/signup' element={<SignUpComponent />} exact></Route>
            <Route path='/dashboard' element={<ProtectedRoute><DashboardComponent /></ProtectedRoute>} ></Route>
            <Route path='/settings' element={<ProtectedRoute><SettingsComponent /></ProtectedRoute>} ></Route>
            <Route path='/profile' element={<ProtectedRoute><ProfileComponent /></ProtectedRoute>} ></Route>

          </Routes>
        </div>
        {/* <div class="col-sm-4"><ProfileComponent /></div> */}
        {/* </div>

        </div> */}
        {/* </Container> */}
      </Suspense>


      {/* <div class="container-fluid">
        <div class="d-flex">
          <div class="flex-shrink-1">Flex item 1</div>
          <div class="w-100">Flex item 2</div>
          <div class="w-100">Flex item 3</div>
        </div>
      </div> */}

      {/* Layout */}
    </div >
  );
}

export default App;
