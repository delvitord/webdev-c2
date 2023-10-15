import React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

function Content({ children }) {
  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.background.paper
            : theme.palette.background.default,
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
        boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)", // Bayangan
        padding: 3, // Padding untuk memberikan ruang ekstra
        borderRadius: "10px", // Rounded corners
      }}
    >
      <Toolbar />
        {children}
    </Box>
  );
}

export default Content;
