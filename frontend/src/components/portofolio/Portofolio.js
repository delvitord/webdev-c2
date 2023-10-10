import React, { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router-dom";
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";
import { CardContent } from "@mui/material";

const columns = [
  { id: "judul", label: "Judul", minWidth: 100 },
  { id: "deskripsi", label: "Deskripsi", minWidth: 100 },
  { id: "file", label: "File", minWidth: 100 },
  { id: "image", label: "Image", minWidth: 100 },
  { id: "link", label: "Link", minWidth: 100 },
];

const PortofolioList = () => {
  const [portofolio, setPortofolio] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    getPortofolio();
  }, []);
  
  const getPortofolio = async () => {
    try {
      // Retrieve the access token from localStorage
      const accessToken = localStorage.getItem("accessToken");
  
      const response = await axios.get("http://localhost:5000/datadiri/portofolio", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      setPortofolio(response.data);
      console.log(response.data);
    } catch (error) {
      // Handle errors, e.g., unauthorized access
      console.error("Error fetching portofolio data:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Navbar />
      <Box height={100} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
          <Card>
            <CardContent>
              {/* Add New Portofolio Item */}
              <Link to={`/add-portofolio`}>
                <Button variant="contained" color="success">
                  Add New
                </Button>
              </Link>
              {/* Portofolio Table */}
              <Paper sx={{ width: "100%", overflow: "hidden" }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align="left"
                            style={{ minWidth: column.minWidth }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {portofolio
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((item, index) => (
                          <TableRow key={item.id}>
                            {columns.map((column) => {
                              const { id } = column;
                              const value = item[id];

                              return (
                                <TableCell key={id} align="left">
                                  {id === "file" ? (
                                    // Render a link to the file
                                    value ? (
                                      <a href={value} target="_blank" rel="noopener noreferrer">
                                        View File
                                      </a>
                                    ) : (
                                      "No File"
                                    )
                                  ) : id === "image" ? (
                                    // Render image links
                                    value && value.length > 0 ? (
                                      value.map((img, idx) => (
                                        <div key={idx}>
                                          <a href={img} target="_blank" rel="noopener noreferrer">
                                            View Image {idx + 1}
                                          </a>
                                        </div>
                                      ))
                                    ) : (
                                      "No Images"
                                    )
                                  ) : (
                                    value
                                  )}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                {/* Pagination */}
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={portofolio.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default PortofolioList;
  