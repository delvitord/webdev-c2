import React from "react";
import Box from "@mui/material/Box";
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";
import CustomUrlTable from "../storage/CustomUrlTable";


const CustomUrlList = () => {
  return (
    <>
      <Navbar />
      <Box height={100} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <CustomUrlTable />
        </Box>
        
      </Box>
    </>
  );
};

export default CustomUrlList;
