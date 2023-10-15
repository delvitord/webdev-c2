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
import Content from "../layout/Content";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const columns = [
  { id: "nama_kegiatan", label: "Nama Kegiatan", minWidth: 100 },
  { id: "image", label: "Gambar", minWidth: 100 },
];

const GaleriList = () => {
  const [galeri, setGaleri] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [galeriToDelete, setGaleriToDelete] = useState(null);

  useEffect(() => {
    getGaleri();
  }, []);

  const getGaleri = async () => {
    try {
      // Retrieve the access token from localStorage
      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.get("http://localhost:5000/datadiri/galeri", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setGaleri(response.data);
      console.log(response.data);
    } catch (error) {
      // Handle errors, e.g., unauthorized access
      console.error("Error fetching galeri data:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const navigate = useNavigate();

  const handleEditClick = (id) => {
    navigate(`/edit-galeri/${id}`);
  };

  const handleDeleteClick = (id) => {
    setGaleriToDelete(id);
    setDeleteConfirmationOpen(true);
  };

  const confirmDelete = () => {
    const id = galeriToDelete;
    if (id) {
      try {
        const accessToken = localStorage.getItem("accessToken");
        axios
          .delete(`http://localhost:5000/datadiri/galeri/${id}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((response) => {
            if (response.status === 200) {
              // Skill is successfully deleted, show the snackbar
              handleSnackbarOpen();
              window.location.reload();
            } else {
              console.error("Gagal menghapus data.");
            }
          })
          .catch((error) => {
            console.error("Error deleting data:", error);
          });
      } catch (error) {
        console.error("Error deleting data:", error);
      }
    }
    setDeleteConfirmationOpen(false);
  };

  const cancelDelete = () => {
    setGaleriToDelete(null);
    setDeleteConfirmationOpen(false);
  };

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <>
      <Navbar />
      <Box height={100} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Content>
          <Card>
            <CardContent>
              <Link to={`/add-galeri`}>
                <Button variant="contained" color="success" sx={{ marginLeft: 1 }}>
                  <AddIcon sx={{ marginRight: 1 }} /> Add New
                </Button>
              </Link>
              <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "1.5rem" }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="left" style={{ minWidth: 10, fontWeight: "bold" }}>
                          No.
                        </TableCell>
                        {columns.map((column) => (
                          <TableCell key={column.id} align="left" style={{ minWidth: column.minWidth, fontWeight: "bold" }}>
                            {column.label}
                          </TableCell>
                        ))}
                        <TableCell align="left" style={{ minWidth: 10, fontWeight: "bold" }}>
                          Actions
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {galeri.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
                        <TableRow key={item.id}>
                          <TableCell align="left">{page * rowsPerPage + index + 1}</TableCell>

                          <TableCell align="left">
                            <Button variant="outlined">Outlined</Button>
                          </TableCell>

                          <TableCell align="left">
                            <div>
                              <IconButton aria-label="Edit" color="primary" onClick={() => handleEditClick(item.id)}>
                                <EditIcon />
                              </IconButton>
                              <IconButton aria-label="Delete" color="error" onClick={() => handleDeleteClick(item.id)}>
                                <DeleteIcon />
                              </IconButton>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination rowsPerPageOptions={[10, 25, 100]} component="div" count={galeri.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
              </Paper>
            </CardContent>
          </Card>
        </Content>
      </Box>

      {/* Dialog Konfirmasi Delete */}
      <Dialog open={deleteConfirmationOpen} onClose={cancelDelete} aria-labelledby="draggable-dialog-title">
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Konfirmasi Hapus Skill
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Apakah Anda yakin ingin menghapus data ini?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={cancelDelete}>
            Batal
          </Button>
          <Button onClick={confirmDelete} color="error">
            Hapus
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <MuiAlert elevation={6} variant="filled" severity="success" onClose={handleSnackbarClose}>
          Skill successfully deleted!
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default GaleriList;
