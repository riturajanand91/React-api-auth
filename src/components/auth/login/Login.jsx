import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Container, Typography, Paper, Button, TextField, FormControl, InputLabel, Input, FormHelperText, Grid, Stack, Avatar, Link } from "@mui/material";
import ShieldIcon from "@mui/icons-material/Shield";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import { loginUser } from "../../../redux/actions";

const LoginComponent = () => {
  const paperStyle = { padding: 20, height: "50vh", width: 400, margin: "260px auto" };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.currentUser);
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Email must be a valid email address").required("Email is required"),
    password: Yup.string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/(?=.*[0-9])/, "Password must contain a number."),
  });

  const formik = useFormik({
    initialValues: {
      email: "abd@gmail.com",
      password: "Admin@12345",
      // password: "Admin@12345687",
    },
    validationSchema: LoginSchema,
    onSubmit: (values, { setSubmitting }) => {
      dispatch(loginUser(values));
      // setSubmitting(false);
      navigate("/");
    },
  });
  console.log(auth);
  // useEffect(() => {
  //   console.log(auth);
  // }, [auth]);

  /** In all cases if authToken in state then user will be redirected to dashboard */
  // if (auth.authToken) return ;
  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid item alignItems="center" paddingBottom={5}>
          <Box display="flex" sx={{ justifyContent: "center" }}>
            <ShieldIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          </Box>
          <Typography variant="h3">Sign In</Typography>
        </Grid>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Grid container direction={"column"} spacing={3}>
              <Grid item>
                <TextField label="Username" placeholder="Enter username" fullWidth type="email" {...getFieldProps("email")} error={Boolean(touched.email && errors.email)} helperText={touched.email && errors.email} />
              </Grid>
              <Grid item>
                <TextField label="Password" placeholder="Enter password" fullWidth type="password" {...getFieldProps("password")} error={Boolean(touched.password && errors.password)} helperText={touched.password && errors.password} />
              </Grid>
              <Box sx={{ flexGrow: 1, mt: 3 }}>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Box display="flex" sx={{ justifyContent: "center" }}>
                      <Link component={RouterLink} variant="subtitle2" to="/signup" underline="hover">
                        Sign Up Here?
                      </Link>
                    </Box>
                  </Grid>
                  <Grid item xs={6} justifyContent="flex-end">
                    <Box display="flex" justifyContent="flex-end">
                      <Button variant="contained" type="submit" disabled={isSubmitting}>
                        Login
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

export default LoginComponent;
