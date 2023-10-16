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
import AddPendidikan from "../pendidikan/AddPendidikan";
import EditPendidikan from "../pendidikan/EditPendidikan";
import Snackbar from "@mui/material/Snackbar";
import { Transition } from "react-transition-group";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import { useParams } from "react-router-dom";
import "../style.css";

const columns = [
  { field: "id", headerName: "No", minWidth: 100 },
  { field: "nama_instansi", headerName: "Nama Instansi", minWidth: 250 },
  { field: "awal_periode", headerName: "Tahun Masuk", minWidth: 200 },
  { field: "akhir_periode", headerName: "Tahun Lulus", minWidth: 200 },
  { field: "jurusan", headerName: "Jurusan", minWidth: 300 },
  { field: "actions", headerName: "Actions", minWidth: 150 },
];

const PendidikanTable = () => {
  const [pendidikan, setPendidikan] = useState([]);
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const accessToken = localStorage.getItem("accessToken");
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [pendidikanToDelete, setPendidikanToDelete] = useState(null);
  const [isAddPendidikanDialogOpen, setAddPendidikanDialogOpen] = useState(false);
  const [isEditPendidikanDialogOpen, setEditPendidikanDialogOpen] = useState(false);
  const [dataToEdit, setDataToEdit] = useState(null);

  useEffect(() => {
    refreshToken();
    getPendidikan();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setPendidikan(decoded.nama);
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

  const getPendidikan = async () => {
    try {
      const response = await axios.get("http://localhost:5000/datadiri/pendidikan", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setPendidikan(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [open] = React.useState(true);
  const handleAddPendidikanClick = () => {
    setAddPendidikanDialogOpen(true);
  };

  const handleDeleteClick = (id) => {
    setPendidikanToDelete(id);
    setDeleteConfirmationOpen(true);
  };

  const confirmDelete = () => {
    const id = pendidikanToDelete;
    if (id) {
      try {
        const accessToken = localStorage.getItem("accessToken");
        axios
          .delete(`http://localhost:5000/datadiri/pendidikan/${id}`, {
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
    setPendidikanToDelete(null);
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

  const handleAddPendidikanClose = () => {
    setAddPendidikanDialogOpen(false);
  };

  const handleEditClick = (data) => {
    setDataToEdit(data);
    setEditPendidikanDialogOpen(true);
    console.log(data);
  };

  const handleEditPendidikanClose = () => {
    // Menutup dialog edit
    setEditPendidikanDialogOpen(false);
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
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: 15 }}>Riwayat Pendidikan</h1>
      <Card>
        <CardContent>
          <Button variant="contained" color="success" sx={{ mb: 3 }} onClick={handleAddPendidikanClick}>
            Add New
          </Button>

          {pendidikan && pendidikan.length > 0 ? (
            <DataTable
              rows={pendidikan}
              columns={columns.map((column) => ({
                ...column,
                renderCell: (params) => {
                  if (column.field === "actions") {
                    return (
                      <div>
                        <IconButton aria-label="Edit" color="primary" onClick={() => handleEditClick(params.row)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton aria-label="Delete" color="error" onClick={() => handleDeleteClick(params.row.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    );
                  }
                },
              }))}
            />
          ) : (
            <p>Data tidak tersedia atau sedang dimuat...</p>
          )}
        </CardContent>
      </Card>

      <Dialog open={deleteConfirmationOpen} onClose={cancelDelete} aria-labelledby="draggable-dialog-title">
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Konfirmasi Hapus Data Pendidikan
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
      <Transition in={isAddPendidikanDialogOpen} timeout={300} unmountOnExit>
        {(state) => (
          <Dialog open={isAddPendidikanDialogOpen} onClose={handleAddPendidikanClose}>
            <DialogTitle sx={{ display: "flex", marginTop: "10px", marginLeft: "10px", height: "110px" }}>
              <div style={iconStyle}>
                <SchoolRoundedIcon />
              </div>
              <span style={{ fontSize: "24px", fontWeight: "bold", marginTop: "10px", marginLeft: "20px" }}>Add New Data Pendidikan</span>
            </DialogTitle>
            <DialogContent sx={{ marginTop: "-30px" }}>
              <AddPendidikan onCancelAdd={handleAddPendidikanClose} onSuccess={getPendidikan} />
            </DialogContent>
          </Dialog>
        )}
      </Transition>

      <Transition in={isEditPendidikanDialogOpen} timeout={300} unmountOnExit>
        {(state) => (
          <Dialog open={isEditPendidikanDialogOpen} onClose={handleEditPendidikanClose}>
            <DialogTitle sx={{ display: "flex", marginTop: "10px", marginLeft: "10px", height: "110px" }}>
              <div style={iconStyle}>
                <SchoolRoundedIcon />
              </div>
              <span style={{ fontSize: "24px", fontWeight: "bold", marginTop: "10px", marginLeft: "20px" }}>Update Data Pendidikan</span>
            </DialogTitle>
            <DialogContent sx={{ marginTop: "-30px" }}>
              <EditPendidikan data={dataToEdit} onCancelAdd={handleEditPendidikanClose} onSuccess={getPendidikan} />
            </DialogContent>
          </Dialog>
        )}
      </Transition>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <MuiAlert elevation={6} variant="filled" severity="success" onClose={handleSnackbarClose}>
          Pendidikan successfully deleted!
        </MuiAlert>
      </Snackbar>
    </Content>
  );
};

export default PendidikanTable;
