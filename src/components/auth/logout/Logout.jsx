import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Grid,
  Stack,
  Avatar,
  Link,
} from "@mui/material";
import { logout } from "../../../redux/actions/index";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const LogOutComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <div className="logout align-items center">
      <h1>Are You Sure You Want To Logout?</h1>
      <Button
        variant="contained"
        size="large"
        color="inherit"
        onClick={handleClick}
      >
        Yes
      </Button>{" "}
      {/* <Button variant="contained" size="large" color="inherit" href={"/podcasts"}>
        No
      </Button> */}
    </div>
  );
};

export default LogOutComponent;
