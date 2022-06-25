// // // import { Suspense } from "react";
// // import { Route, Switch, Routes, Outlet } from "react-router-dom";
// // // import routes from "../../routes"; // Route list

// // // const ProtectedRoutes = () => (
// // //   <Routes>
// // //     <Suspense fallback={"Loading................"}>
// // //       {routes.map(({ component: Component, path, exact }) => (
// // //         <Route path={`/${path}`} key={path} exact={exact}>
// // //           <Component />
// // //         </Route>
// // //       ))}
// // //     </Suspense>
// // //   </Routes>
// // // );

// // // // export default ProtectedRoutes;
// // // import React from "react";
// // // import { Navigate, Route, Routes } from "react-router-dom";

// // // function ProtectedRoute({ isAuth, children }) {
// // //   // const isAuthenticated = localStorage.getItem("isAuthenticated");
// // //   // const isAuth = localStorage.getItem("user");
// // //   // console.log("isAuthenticated", isAuthenticated);
// // //   console.log(isAuth, "isAuth");
// // //   // console.log(Component, "component");
// // //   // return isAuthenticated ? children : <Navigate to="/login" />;
// // //   if (!isAuth) {
// // //     return <Navigate to="/login" replace />;
// // //   }
// // //   return children;
// // // }

// // // export default ProtectedRoute;
// import { Navigate } from "react-router-dom";
// // const ProtectedRoute = ({ children, isAuth }) => {
// //   console.log(isAuth);
// //   const auth = false; //your logic
// //   const isAuthenticated = localStorage.getItem("isAuthenticated");
// //   console.log("isAuthenticated", isAuthenticated);
// //   return isAuth ? children : <Navigate to="/login" />;
// //   // return isAuthenticated ? children : <Navigate to={"/login" />

// //   // return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
// // }
// // // const ProtectedRoute = ({ component: Component, authed, ...rest }) => {
// // //   console.log(authed)
// // //   return (
// // //     <Route {...rest} render={(props) => authed === true
// // //       ? <Component {...props} />
// // //       : <Navigate to={{ pathname: '/login', state: { from: props.location } }} />} />
// // //   );
// // // }
// // // const ProtectedRoute = ({ isAuth, children }) => {
// // //   console.log(isAuth)
// // //   if (!isAuth) {
// // //     return <Navigate to="/login" replace />;
// // //   }
// // //   return children;
// // // };
// // export default ProtectedRoute;
// import React, { useEffect, useState } from 'react'
// import { Redirect } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';


// const ProtectedRoute = ({ children }) => {
//   console.log("protected route");
//   console.log("protected route", children);
//   const [state, setState] = useState('')
//   const isAuth = useSelector((state) => state.auth.isLoggedIn);
//   // console.log(isAuth);
//   // useEffect(() => {
//   //   setState(isAuth)
//   //   console.log(isAuth);
//   //   console.log(state);
//   //   // if (isAuth != false) {
//   //   //   children
//   //   // }
//   //   // <Navigate to="/login" replace />
//   // }, [isAuth]);



//   return state != false ? children : <Navigate to="/login" replace />;


// }

// export default ProtectedRoute;




import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  let location = useLocation();
  console.log(children)
  const auth = useSelector((state) => state.auth.isLoggedIn);
  console.log(auth);
  console.log(location);
  if (!auth) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
export default ProtectedRoute;