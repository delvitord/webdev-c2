import React from "react";
import Box from "@mui/material/Box";
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";
import DatadiriDetail from "../storage/Datadiridetail";

const DatadiriList = () => {
  return (
    <>
      <Navbar />
      <Box height={100} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1 }}>
          <DatadiriDetail />
        </Box>
      </Box>
    </>
  );
};

export default DatadiriList;
