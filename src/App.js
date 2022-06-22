import React, { Suspense, lazy, useEffect } from "react";
import './App.css';
import Router from "./routes";
import { Container } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import HeaderComponent from "./components/layouts/header/Header";
import { loadUser } from "./redux/actions/index";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  let user;
  if (localStorage.hasOwnProperty("user")) {
    user = localStorage.getItem("user");
  }
  const isAuth = useSelector((state) => state);
  // console.log(isAuth);

  return (
    <div className="App">
      {user ? <HeaderComponent></HeaderComponent> : ""}
      {/* {user ? <HeaderComponent></HeaderComponent> : ""} */}
      <Suspense fallback={<h1>Loading...</h1>}>
        <Container maxWidth="xl">
          <Router />
        </Container>
      </Suspense>
    </div>
  );
}

export default App;
