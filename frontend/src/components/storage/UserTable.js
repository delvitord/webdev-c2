import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@mui/material";
import DataTable from "./DataTable";
import Content from "../layout/Content";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import AddUser from "../user/AddUser";
import EditUser from "../user/EditUser";
import { Transition } from "react-transition-group";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useParams } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import "../style.css";

const columns = [
  { field: "id", headerName: "No", minWidth: 50 },
  { field: "username", headerName: "Username", minWidth: 200 },
  { field: "email", headerName: "Email", minWidth: 250 },
  { field: "role", headerName: "Role", minWidth: 200 },
  { field: "actions", headerName: "Actions", minWidth: 100 },
];

const UserTable = () => {
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isAddUserDialogOpen, setAddUserDialogOpen] = useState(false);
  const [isEditUserDialogOpen, setEditUserDialogOpen] = useState(false);
  const [dataToEdit, setDataToEdit] = useState(null);

  useEffect(() => {
    refreshToken();
    getUsers(); // Updated the function name from `getUser` to `getUsers`
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setUsername(decoded.username);
      const currentTime = Math.floor(Date.now() / 1000);
      if (decoded.exp < currentTime) {
      }
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        navigate("/login");
      }
    }
  };

  const axiosJwt = axios.create();

  axiosJwt.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get("http://localhost:5000/token");
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setUsername(decoded.username);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const getUsers = async () => {
    const response = await axiosJwt.get("http://localhost:5000/admin/${id}", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUsers(response.data);
  };
  const [open] = React.useState(true);

  const handleAddUserClick = () => {
    setAddUserDialogOpen(true);
  };

  const handleDeleteClick = (id) => {
    setUserToDelete(id);
    setDeleteConfirmationOpen(true);
  };

  const confirmDelete = () => {
    const id = userToDelete;
    if (id) {
      try {
        const accessToken = localStorage.getItem("accessToken");
        axios
          .delete(`http://localhost:5000/admin/${id}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((response) => {
            if (response.status === 200) {
              // Datadiri is successfully deleted, show the snackbar
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
    setUserToDelete(null);
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

  const handleAddUserClose = () => {
    setAddUserDialogOpen(false);
  };

  const handleEditClick = (data) => {
    setDataToEdit(data);
    setEditUserDialogOpen(true);
    console.log(data);
  };

  const handleEditUserClose = () => {
    // Menutup dialog edit
    setEditUserDialogOpen(false);
    setDataToEdit(null); // Kosongkan `editId`
  };

  const iconStyle = {
    fontSize: "40px", // Sesuaikan dengan ukuran yang Anda inginkan
    color: "black", // Sesuaikan dengan warna ikon Anda
    backgroundColor: "#ccc", // Warna abu-abu untuk latar belakang
    borderRadius: "50%", // Membuatnya menjadi lingkaran
    width: "60px", // Lebar total ikon (termasuk latar belakang)
    height: "60px", // Tinggi total ikon (termasuk latar belakang)
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <Content open={open}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: 15 }}>User</h1>
      <Card>
        <CardContent>
          <Button variant="contained" color="success" sx={{ mb: 3 }} onClick={handleAddUserClick}>
            Add New
          </Button>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: "bold", textAlign: "center" }}>No</TableCell>
                  <TableCell style={{ fontWeight: "bold", textAlign: "center" }}>Username</TableCell>
                  <TableCell style={{ fontWeight: "bold", textAlign: "center" }}>Email</TableCell>
                  <TableCell style={{ fontWeight: "bold", textAlign: "center" }}>Role</TableCell>
                  <TableCell style={{ fontWeight: "bold", textAlign: "center" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ textAlign: "center" }}>
                {users.map((user, index) => (
                  <TableRow key={user.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role === 1 ? "Admin" : user.role === 2 ? "Pengguna" : "Unknown"}</TableCell>
                    <TableCell>
                      <IconButton aria-label="Edit" color="primary" onClick={() => handleEditClick(user)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton aria-label="Delete" color="error" onClick={() => handleDeleteClick(user.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <Dialog open={deleteConfirmationOpen} onClose={cancelDelete} aria-labelledby="draggable-dialog-title">
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Konfirmasi Hapus Data User
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Apakah Anda yakin ingin menghapus data ini?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" autoFocus onClick={cancelDelete}>
            Batal
          </Button>
          <Button onClick={confirmDelete} color="error">
            Hapus
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add or Edit Pendidikan Dialog */}
      <Transition in={isAddUserDialogOpen} timeout={300} unmountOnExit>
        {(state) => (
          <Dialog open={isAddUserDialogOpen} onClose={handleAddUserClose}>
            <DialogTitle sx={{ display: "flex", marginTop: "10px", marginLeft: "10px", height: "110px" }}>
              <div style={iconStyle}>
                <PersonAddIcon />
              </div>
              <span style={{ fontSize: "24px", fontWeight: "bold", marginTop: "10px", marginLeft: "20px" }}>Add New Data User</span>
            </DialogTitle>
            <DialogContent sx={{ marginTop: "-30px" }}>
              <AddUser onCancelAdd={handleAddUserClose} onSuccess={getUsers} />
            </DialogContent>
          </Dialog>
        )}
      </Transition>

      <Transition in={isEditUserDialogOpen} timeout={300} unmountOnExit>
        {(state) => (
          <Dialog open={isEditUserDialogOpen} onClose={handleEditUserClose}>
            <DialogTitle sx={{ display: "flex", marginTop: "10px", marginLeft: "10px", height: "110px" }}>
              <div style={iconStyle}>
                <PersonAddIcon />
              </div>
              <span style={{ fontSize: "24px", fontWeight: "bold", marginTop: "10px", marginLeft: "20px" }}>Update Data User</span>
            </DialogTitle>
            <DialogContent sx={{ marginTop: "-30px" }}>
              <EditUser data={dataToEdit} onCancelAdd={handleEditUserClose} onSuccess={getUsers} />
            </DialogContent>
          </Dialog>
        )}
      </Transition>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <MuiAlert elevation={6} variant="filled" severity="success" onClose={handleSnackbarClose}>
          User successfully deleted!
        </MuiAlert>
      </Snackbar>
    </Content>
  );
};

export default UserTable;
