import React from "react";
import Box from "@mui/material/Box";
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";
import OrganisasiTable from "../storage/OrganisasiTable";

const OrganisasiList = () => {
  return (
    <>
      <Navbar />
      <Box height={100} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <OrganisasiTable />
        </Box>
      </Box>
    </>
  );
};

export default OrganisasiList;
