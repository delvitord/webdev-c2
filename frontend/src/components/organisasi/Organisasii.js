import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";
import { CardContent } from "@mui/material";
import OrganisasiTable from "../storage/OrganisasiTable";

const OrganisasiList = () => {
    return (
        <>
          <Navbar />
          <Box height={100} />
          <Box sx={{ display: "flex" }}>
            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
              <OrganisasiTable />
            </Box>
          </Box>
        </>
      );
};

export default OrganisasiList;