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
import AddSkill from "./AddSkill"; // Import the AddSkill component

const levelKeahlianText = {
  1: "Pemula",
  2: "Menengah",
  3: "Ahli",
};

const columns = [
  { id: "nama_skill", label: "Nama Skill", minWidth: 100 },
  { id: "level_keahlian", label: "Level Keahlian", minWidth: 100 },
];

const SkillList = () => {
  const [skill, setSkill] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [skillToDelete, setSkillToDelete] = useState(null);
  const [isAddSkillDialogOpen, setAddSkillDialogOpen] = useState(false);

  useEffect(() => {
    getSkill();
  }, []);

  const getSkill = async () => {
    try {
      // Retrieve the access token from localStorage
      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.get("http://localhost:5000/datadiri/skill", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setSkill(response.data);
      console.log(response.data);
    } catch (error) {
      // Handle errors, e.g., unauthorized access
      console.error("Error fetching skill data:", error);
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
    navigate(`/edit-skill/${id}`);
  };

  const handleDeleteClick = (id) => {
    setSkillToDelete(id);
    setDeleteConfirmationOpen(true);
  };

  const confirmDelete = () => {
    const id = skillToDelete;
    if (id) {
      try {
        const accessToken = localStorage.getItem("accessToken");
        axios
          .delete(`http://localhost:5000/datadiri/skill/${id}`, {
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
    setSkillToDelete(null);
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

  const handleAddSkillClick = () => {
    setAddSkillDialogOpen(true);
  };

  const handleAddSkillClose = () => {
    setAddSkillDialogOpen(false);
  };

  return (
    <>
      <Navbar />
      <Box height={100} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Content>
          <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: 15 }}>Skill</h1>
          <Card>
            <CardContent>
              <Button variant="contained" color="success" sx={{ marginLeft: 1 }} onClick={handleAddSkillClick}>
                <AddIcon sx={{ marginRight: 1 }} /> Add New
              </Button>

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
                      {skill.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
                        <TableRow key={item.id}>
                          <TableCell align="left">{page * rowsPerPage + index + 1}</TableCell>
                          {columns.map((column) => {
                            const { id } = column;
                            const value = item[id];

                            return (
                              <TableCell key={id} align="left">
                                {column.id === "level_keahlian" ? levelKeahlianText[value] : value}
                              </TableCell>
                            );
                          })}
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
                <TablePagination rowsPerPageOptions={[10, 25, 100]} component="div" count={skill.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
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

      {/* Add Skill Dialog */}
      <Dialog open={isAddSkillDialogOpen} onClose={handleAddSkillClose}>
        <DialogTitle>Add New Skill</DialogTitle>
        <DialogContent>
          <AddSkill onCancelAdd={handleAddSkillClose} onSuccess={getSkill} />
        </DialogContent>
      </Dialog>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <MuiAlert elevation={6} variant="filled" severity="success" onClose={handleSnackbarClose}>
          Skill successfully deleted!
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default SkillList;
