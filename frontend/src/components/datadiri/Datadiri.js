import React from "react";
import Box from "@mui/material/Box";
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";
import DatadiriTable from "../storage/DatadiriTable";

const DatadiriList = () => {
  return (
    <>
      <Navbar />
      <Box height={100} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1 }}>
          <DatadiriTable />
        </Box>
      </Box>
    </>
  );
};

export default DatadiriList;
