import React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

function Footer() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        &#169; PersonalWeb. All rigths reserved
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default Footer;
