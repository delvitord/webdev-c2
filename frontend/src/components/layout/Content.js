import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";

function Content({ children }) {
  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) => (theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900]),
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
        mt: -7, // Adding a top margin of -10
      }}
    >
      <Toolbar />
      <Container maxWidth="lg" sx={{ mt: 0, mb: 4 }}>
        {children}
      </Container>
    </Box>
  );
}

export default Content;
