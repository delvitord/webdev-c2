import React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Container } from "@mui/material";

function Content({ children }) {
  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) => (theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900]),
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
        boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)", // Bayangan
        padding: 3, // Padding untuk memberikan ruang ekstra
        borderRadius: "10px", // Rounded corners
        mt: -7, // Adding a top margin of -10
      }}
    >
      <Toolbar />
      {children}
    </Box>
  );
}

export default Content;
