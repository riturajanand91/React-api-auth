import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Container, Typography, Paper, Button, TextField, FormControl, InputLabel, Input, FormHelperText, Grid, Stack, Avatar, Link } from "@mui/material";
import { styled } from "@mui/material/styles";
import ShieldIcon from "@mui/icons-material/Shield";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import { registerUser } from "../../../redux/actions";

const SignUpComponent = () => {
  const paperStyle = { padding: 30, height: "55vh", width: 400, margin: "260px auto" };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth);
  const SignUpSchema = Yup.object().shape({
    email: Yup.string().email("Email must be a valid email address").required("Email is required"),
    username: Yup.string()
      // .username("Username must be a valid email address")
      .min(3, "Username is too short - should be 3 chars minimum.")
      .required("Username is required"),
    // password: Yup.string().required("Password is required"),
    password: Yup.string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/(?=.*[0-9])/, "Password must contain a number."),
  });
  const formik = useFormik({
    initialValues: {
      email: "hello@2.com",
      password: "123456123",
      username: "helloUser",
    },
    validationSchema: SignUpSchema,
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        console.log("SignUp Started", values);
        dispatch(registerUser(values));
        setSubmitting(false);
        console.log(isAuth);
      }, 500);
      // navigate("/login", { replace: true });
    },
  });
  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid item alignItems="center" paddingBottom={5}>
          <Box display="flex" sx={{ justifyContent: "center" }}>
            <ShieldIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          </Box>
          <Typography variant="h3">Sign Up</Typography>
        </Grid>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Grid container direction={"column"} spacing={3}>
              <Grid item>
                <TextField label="Username" placeholder="Enter username" fullWidth type="email" {...getFieldProps("username")} error={Boolean(touched.username && errors.username)} helperText={touched.username && errors.username} />
              </Grid>
              <Grid item>
                <TextField label="Email" placeholder="Enter Email" fullWidth type="email" {...getFieldProps("email")} error={Boolean(touched.email && errors.email)} helperText={touched.email && errors.email} />
              </Grid>
              <Grid item>
                <TextField label="Password" placeholder="Enter password" fullWidth type="password" {...getFieldProps("password")} error={Boolean(touched.password && errors.password)} helperText={touched.password && errors.password} />
              </Grid>
              <Box sx={{ flexGrow: 1, mt: 3 }}>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Box display="flex" sx={{ justifyContent: "center" }}>
                      <Link component={RouterLink} variant="subtitle2" to="/login" underline="hover">
                        Login Here?
                      </Link>
                    </Box>
                  </Grid>
                  <Grid item xs={6} justifyContent="flex-end">
                    <Box display="flex" justifyContent="flex-end">
                      <Button variant="contained" type="submit" disabled={isSubmitting}>
                        Sign Up
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Form>
        </FormikProvider>
      </Paper>
    </Grid>
  );
};
export default SignUpComponent;
