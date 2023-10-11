import React from "react";
import Button from "@mui/material/Button";
import  Box  from "@mui/material/Box";
import Card from "@mui/material/Card"
import { Link } from "react-router-dom";
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";
import { CardContent } from "@mui/material";
import DatadiriTable from "../storage/DatadiriTable";

const DatadiriList = () => {
  return (
    <>
      <Navbar />
      <Box height={100}/>
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
          <Card>
            <CardContent>
              <Link to={`/add-datadiri`}>
                <Button variant="contained" color="success">
                  Add New
                </Button>
              </Link>
              <DatadiriTable/ >
            </CardContent>
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default DatadiriList;
