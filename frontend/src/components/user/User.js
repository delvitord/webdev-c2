import React from "react";
import Box from "@mui/material/Box";
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";
import UserTable from "../storage/UserTable";

const UserList = () => {
  return (
    <>
      <Navbar />
      <Box height={100} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <UserTable />
        </Box>
      </Box>
    </>
  );
};

export default UserList;
