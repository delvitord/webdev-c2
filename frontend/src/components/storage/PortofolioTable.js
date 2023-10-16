import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import DataTable from "./DataTable";
import Content from "../layout/Content";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MuiAlert from "@mui/material/Alert";
import AddPortofolio from "../portofolio/AddPortofolio";
import EditPortofolio from "../portofolio/EditPortofolio";
import Snackbar from "@mui/material/Snackbar";
import { Transition } from "react-transition-group";
import SourceIcon from "@mui/icons-material/Source";
import "../style.css";
import { Card, CardContent } from "@mui/material";
import { useParams } from "react-router-dom";

const columns = [
  { field: "id", headerName: "ID", minWidth: 30 },
  { field: "judul", headerName: "Judul", minWidth: 125 },
  { field: "deskripsi", headerName: "Deskripsi", minWidth: 150 },
  { field: "file", headerName: "File", minWidth: 200 },
  { field: "image", headerName: "Image", minWidth: 225 },
  { field: "link", headerName: "Link", minWidth: 200 },
  { field: "actions", headerName: "Actions", width: 150 },
];

const PortofolioTable = () => {
  const [portofolios, setPortofolio] = useState([]);
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const navigate = useNavigate();
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [portofolioToDelete, setPortofolioToDelete] = useState(null);
  const [isAddPortofolioDialogOpen, setAddPortofolioDialogOpen] = useState(false);
  const [isEditPortofolioDialogOpen, setEditPortofolioDialogOpen] = useState(false);
  const [dataToEdit, setDataToEdit] = useState(null);

  useEffect(() => {
    refreshToken();
    getPortofolio();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setPortofolio(decoded.nama);
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

  const getPortofolio = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.get("http://localhost:5000/datadiri/portofolio", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setPortofolio(response.data); // Assuming the response includes database IDs
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [open] = React.useState(true);

  const handleAddPortofolioClick = () => {
    setAddPortofolioDialogOpen(true);
  };

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };

  const handleDeleteClick = (id) => {
    setPortofolioToDelete(id);
    setDeleteConfirmationOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const confirmDelete = () => {
    const id = portofolioToDelete;
    if (id) {
      try {
        const accessToken = localStorage.getItem("accessToken");
        axios
          .delete(`http://localhost:5000/datadiri/portofolio/${id}`, {
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
    setPortofolioToDelete(null);
    setDeleteConfirmationOpen(false);
  };

  const handleAddPortofolioClose = () => {
    setAddPortofolioDialogOpen(false);
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

  const handleEditClick = (data) => {
    setDataToEdit(data);
    setEditPortofolioDialogOpen(true);
    console.log(data);
  };

  const handleEditPortofolioClose = () => {
    // Menutup dialog edit
    setEditPortofolioDialogOpen(false);
    setDataToEdit(null); // Kosongkan `editId`
  };

  return (
    <Content open={open}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: 15 }}>Portofolio</h1>
      <Card>
        <CardContent>
          <Button variant="contained" color="success" sx={{ mb: 3 }} onClick={handleAddPortofolioClick}>
            Add New
          </Button>
          {portofolios && portofolios.length > 0 ? (
            <DataTable
              rows={portofolios}
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
                  } else if (column.field === "foto") {
                    return (
                      <img
                        src={params.value} // Anda harus menyediakan URL gambar dari data
                        alt="Foto"
                        style={{ width: 50, height: 50 }} // Sesuaikan dengan ukuran yang sesuai
                      />
                    );
                  } else {
                    return <span>{params.value}</span>;
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
          Konfirmasi Hapus Portofolio
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
      <Transition in={isAddPortofolioDialogOpen} timeout={300} unmountOnExit>
        {(state) => (
          <Dialog open={isAddPortofolioDialogOpen} onClose={handleAddPortofolioClose}>
            <DialogTitle sx={{ display: "flex", marginTop: "10px", marginLeft: "10px", height: "110px" }}>
              <div style={iconStyle}>
                <SourceIcon />
              </div>
              <span style={{ fontSize: "24px", fontWeight: "bold", marginTop: "10px", marginLeft: "20px" }}>Add New Data Portofolio</span>
            </DialogTitle>
            <DialogContent sx={{ marginTop: "-30px" }}>
              <AddPortofolio onCancelAdd={handleAddPortofolioClose} onSuccess={getPortofolio} />
            </DialogContent>
          </Dialog>
        )}
      </Transition>

      <Transition in={isEditPortofolioDialogOpen} timeout={300} unmountOnExit>
        {(state) => (
          <Dialog open={isEditPortofolioDialogOpen} onClose={handleEditPortofolioClose}>
            <DialogTitle sx={{ display: "flex", marginTop: "10px", marginLeft: "10px", height: "110px" }}>
              <div style={iconStyle}>
                <SourceIcon />
              </div>
              <span style={{ fontSize: "24px", fontWeight: "bold", marginTop: "10px", marginLeft: "20px" }}>Update Data Portofolio</span>
            </DialogTitle>
            <DialogContent sx={{ marginTop: "-30px" }}>
              <EditPortofolio data={dataToEdit} onCancelAdd={handleEditPortofolioClose} onSuccess={getPortofolio} />
            </DialogContent>
          </Dialog>
        )}
      </Transition>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <MuiAlert elevation={6} variant="filled" severity="success" onClose={handleSnackbarClose}>
          Portofolio successfully deleted!
        </MuiAlert>
      </Snackbar>
    </Content>
  );
};

export default PortofolioTable;
