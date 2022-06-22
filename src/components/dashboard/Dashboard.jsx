import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

const DashboardComponent = () => {
  const currUser = useSelector((state) => state);
  useEffect(() => {
    console.log(currUser);
  }, []);

  return (
    <Box m={1} display="flex" justifyContent="flex-left">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back
        {/* Hi, Welcome back {currUser.name} */}
      </Typography>
    </Box>
  );
};

export default DashboardComponent;
