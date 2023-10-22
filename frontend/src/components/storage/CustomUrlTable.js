import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import SendIcon from "@mui/icons-material/Send";
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
import AddCustomUrl from "../customurl/AddCustomUrl";
import UpdateCustomUrl from "../customurl/EditCustomUrl";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { Transition } from "react-transition-group";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import "../style.css";

const columns = [
  { field: "id", headerName: "Id", minWidth: 100 },
  { field: "url_custom", headerName: "URL Custom", minWidth: 250 },
  { field: "dataDiriId", headerName: "dataDiriId", minWidth: 200 },
  { field: "actions", headerName: "Actions", minWidth: 150 },
];

const CustomUrlTable = () => {
  const [customUrl, setCustomUrl] = useState([]);
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [customUrlToDelete, setCustomUrlToDelete] = useState(null);
  const [isAddCustomUrlDialogOpen, setAddCustomUrlDialogOpen] = useState(false);
  const [isEditCustomUrlDialogOpen, setEditCustomUrlDialogOpen] = useState(false);
  const [dataToEdit, setDataToEdit] = useState(null);

  useEffect(() => {
    refreshToken();
    getCustomUrl();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setCustomUrl(decoded.nama);
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

  const getCustomUrl = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      //get id from id in find data diri
      const dataDiri = await axios.get("http://localhost:5000/datadiri", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const id = dataDiri.data[0].id;

      const response = await axios.get(`http://localhost:5000/custom_url_id/${id}`);
      setCustomUrl(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [open] = React.useState(true);
  const handleAddCustomUrlClick = () => {
    setAddCustomUrlDialogOpen(true);
  };

  const handleDeleteClick = (id) => {
    setCustomUrlToDelete(id);
    setDeleteConfirmationOpen(true);
  };

  const confirmDelete = () => {
    const id = customUrlToDelete;
    if (id) {
      try {
        axios
          .delete(`http://localhost:5000/custom_url/${id}`)
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
    setCustomUrlToDelete(null);
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

  const handleAddCustomUrlClose = () => {
    setAddCustomUrlDialogOpen(false);
  };

  const handleEditClick = (data) => {
    setDataToEdit(data);
    setEditCustomUrlDialogOpen(true);
    console.log(data);
  };

  const handleEditCustomUrlClose = () => {
    // Menutup dialog edit
    setEditCustomUrlDialogOpen(false);
    setDataToEdit(null); // Kosongkan `editId`
  };

  const handleButton = () => {
    try {
      if (customUrl.length === 0) {
        alert("Please fill your custom url first!");
      } else {
        navigate(`/personal-web/${customUrl[0].url_custom}`)
      }
    } catch (error) {
      alert("Please fill your custom url first!");
    }
    
  }

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
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: 15 }}>Custom Url of Your Personal Web</h1>
      <Card>
        <CardContent>
          <Button variant="contained" color="success" sx={{ mb: 3 }} onClick={handleAddCustomUrlClick}>
            Add New
          </Button>

          {customUrl && customUrl.length > 0 ? (
            <DataTable
              rows={customUrl}
              columns={columns.map((column) => ({
                ...column,
                renderCell: (params) => {
                  if (column.field === "actions") {
                    return (
                      <div>
                        <IconButton aria-label="Edit" color="primary" onClick={() => handleEditClick(params.row)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton aria-label="Delete" color="error" onClick={() => handleDeleteClick(params.row.dataDiriId)}>
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
          <Button
          variant="contained"
          size="small" // Make the button smaller
          sx={{
            color:"white",
            mb: 3,
            width: 180,
            height: 35,
            marginTop: "30px",
            alignSelf: "center",
            backgroundColor: "#333333",
          }}
          onClick={handleButton}
          endIcon={<SendIcon />}
        >
          Lauch Your Web
        </Button>
        </CardContent>
      </Card>

      <Dialog open={deleteConfirmationOpen} onClose={cancelDelete} aria-labelledby="draggable-dialog-title">
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Konfirmasi Hapus Data CustomUrl
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

      {/* Add or Edit CustomUrl Dialog */}
      <Transition in={isAddCustomUrlDialogOpen} timeout={300} unmountOnExit>
        {(state) => (
          <Dialog open={isAddCustomUrlDialogOpen} onClose={handleAddCustomUrlClose}>
            <DialogTitle sx={{ display: "flex", marginTop: "10px", marginLeft: "10px", height: "110px" }}>
              <div style={iconStyle}>
                <SchoolRoundedIcon />
              </div>
              <span style={{ fontSize: "24px", fontWeight: "bold", marginTop: "10px", marginLeft: "20px" }}>Personalize Url of Your Personal Web</span>
            </DialogTitle>
            <DialogContent sx={{ marginTop: "-30px" }}>
              <AddCustomUrl onCancelAdd={handleAddCustomUrlClose} onSuccess={getCustomUrl} />
            </DialogContent>
          </Dialog>
        )}
      </Transition>

      <Transition in={isEditCustomUrlDialogOpen} timeout={300} unmountOnExit>
        {(state) => (
          <Dialog open={isEditCustomUrlDialogOpen} onClose={handleEditCustomUrlClose}>
            <DialogTitle sx={{ display: "flex", marginTop: "10px", marginLeft: "10px", height: "110px" }}>
              <div style={iconStyle}>
                <SchoolRoundedIcon />
              </div>
              <span style={{ fontSize: "24px", fontWeight: "bold", marginTop: "10px", marginLeft: "20px" }}>Update Data CustomUrl</span>
            </DialogTitle>
            <DialogContent sx={{ marginTop: "-30px" }}>
              <UpdateCustomUrl data={dataToEdit} onCancelAdd={handleEditCustomUrlClose} onSuccess={getCustomUrl} />
            </DialogContent>
          </Dialog>
        )}
      </Transition>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <MuiAlert elevation={6} variant="filled" severity="success" onClose={handleSnackbarClose}>
          CustomUrl successfully deleted!
        </MuiAlert>
      </Snackbar>
    </Content>
  );
};

export default CustomUrlTable;
