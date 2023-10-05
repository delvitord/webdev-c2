import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";

const columns = [
  { id: "nama", label: "Nama", minWidth: 170 },
  { id: "tempat_lahir", label: "Tempat Lahir", minWidth: 100 },
  { id: "tanggal_lahir", label: "Tanggal Lahir", minWidth: 170 },
  { id: "alamat", label: "Alamat", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 170 },
  { id: "no_telp", label: "No.Telp", minWidth: 170 },
  { id: "foto", label: "Foto", minWidth: 170 },
  { id: "deskripsi", label: "Deskripsi", minWidth: 170 },
  { id: "linkedin", label: "LinkedIn", minWidth: 170 },
  { id: "instagram", label: "Instagram", minWidth: 170 },
  { id: "x", label: "X", minWidth: 170 },
  { id: "github", label: "GitHub", minWidth: 170 },
  { id: "actions", label: "Actions", minWidth: 170 },
];

const DatadiriList = () => {
  const [datadiris, setDatadiri] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    getDatadiri();
  }, []);

  const getDatadiri = async () => {
    const response = await axios.get("http://localhost:5000/data_diri");
    setDatadiri(response.data);
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
      <Box height={100}/>
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
          <Link to={`/add`}>
            <Button variant="contained" color="success">
              Add New
            </Button>
          </Link>
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
                  {datadiris
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((data_diri, index) => (
                      <TableRow key={data_diri.id}>
                        {columns.map((column) => {
                          const value = data_diri[column.id];
                          return (
                            <TableCell key={column.id} align="left">
                              {column.id === "actions" ? (
                                <Link to={`/edit/${data_diri.id}`}>
                                  <Button
                                    variant="contained"
                                    color="info"
                                    size="small"
                                  >
                                    Edit
                                  </Button>
                                </Link>
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
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={datadiris.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default DatadiriList;
