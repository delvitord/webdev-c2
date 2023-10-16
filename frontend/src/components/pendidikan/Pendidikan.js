import React from "react";
import Box from "@mui/material/Box";
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";
import PendidikanTable from "../storage/PendidikanTable";

const PendidikanList = () => {
  return (
    <>
      <Navbar />
      <Box height={100} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <PendidikanTable />
        </Box>
      </Box>
    </>
  );
};

export default PendidikanList;
