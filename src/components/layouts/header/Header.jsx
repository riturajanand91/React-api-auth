import React, { useState, useRef } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ShieldIcon from "@mui/icons-material/Shield";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import { createTheme, makeStyles, ThemeProvider } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import { navMenuItems, userMenuItems } from "../../../services/menu";
import { v4 as uuidv4 } from "uuid";

const HeaderComponent = () => {
  const anchorRef = useRef(null);

  /** User Account Menu */
  const [openUser, setOpenUser] = useState(null); //use A/c Menu
  const handleOpen = (event) => {
    setOpenUser(event.currentTarget);
  };
  const handleClose = (e) => {
    console.log(e);
    setOpenUser(null);
  };

  /** Nav Bar Menu */
  const [openNav, setOpenNav] = useState(null); //Main nav Menu
  const handleOpenNav = (event) => {
    setOpenNav(event.currentTarget);
  };
  const handleCloseNav = () => {
    setOpenNav(null);
  };

  const customTheme2 = createTheme({
    palette: {
      primary: {
        light: "#112233",
        main: "#445566",
        dark: "#778899",
        contrastText: "#fff",
      },
      secondary: {
        light: "#f0e6e6",
        main: "#c93434",
        dark: "#3c3c3c",
        contrastText: "#000",
      },
    },
  });

  return (
    <ThemeProvider theme={customTheme2}>
      <AppBar position="static" color={"primary"}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <ShieldIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              // href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Auth
            </Typography>

            {/* Three Dots Menu Start*/}
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNav}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={openNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(openNav)}
                onClose={handleCloseNav}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {navMenuItems.map((nav) => (
                  <MenuItem
                    key={uuidv4()}
                    to={nav.linkTo}
                    component={RouterLink}
                    onClick={handleCloseNav}
                  >
                    <Typography textAlign="center">{nav.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            {/* Three Dots Menu End*/}

            {/* Desktop Menu Start*/}
            <ShieldIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Auth
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {navMenuItems.map((nav) => (
                <Button
                  key={uuidv4()}
                  to={nav.linkTo}
                  component={RouterLink}
                  onClick={handleCloseNav}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {nav.name}
                </Button>
              ))}
            </Box>
            {/* Desktop Menu End*/}

            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <Badge badgeContent={4} color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Box>

            {/* Account menu Start */}
            <Box sx={{ flexGrow: 0, ml: 2 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpen} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={openUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(openUser)}
                onClose={handleClose}
              >
                {userMenuItems.map((menu) => (
                  <MenuItem
                    key={uuidv4()}
                    to={menu.linkTo}
                    component={RouterLink}
                    onClick={handleClose}
                  >
                    <Typography textAlign="center">{menu.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            {/* Account menu End */}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default HeaderComponent;
