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
import AddSkill from "../skill/AddSkill";
import EditSkill from "../skill/EditSkill";
import Snackbar from "@mui/material/Snackbar";
import { Transition } from "react-transition-group";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import { useParams } from "react-router-dom";
import "../style.css";

const columns = [
  { field: "id", headerName: "No", minWidth: 50 },
  { field: "nama_skill", headerName: "Nama Skill", minWidth: 300 },
  { field: "level_keahlian", headerName: "Level Keahlian", minWidth: 300 },
  { field: "actions", headerName: "Actions", minWidth: 100 },
];

const SkillTable = () => {
  const [skill, setSkill] = useState([]);
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const accessToken = localStorage.getItem("accessToken");
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [skillToDelete, setSkillToDelete] = useState(null);
  const [isAddSkillDialogOpen, setAddSkillDialogOpen] = useState(false);
  const [isEditSkillDialogOpen, setEditSkillDialogOpen] = useState(false);
  const [dataToEdit, setDataToEdit] = useState(null);

  useEffect(() => {
    refreshToken();
    getSkill();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setSkill(decoded.nama);
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

  const getSkill = async () => {
    try {
      const response = await axios.get("http://localhost:5000/datadiri/skill", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setSkill(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [open] = React.useState(true);

  const handleAddSkillClick = () => {
    setAddSkillDialogOpen(true);
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

  const handleAddSkillClose = () => {
    setAddSkillDialogOpen(false);
  };

  const handleEditClick = (data) => {
    setDataToEdit(data);
    setEditSkillDialogOpen(true);
    console.log(data);
  };

  const handleEditSkillClose = () => {
    // Menutup dialog edit
    setEditSkillDialogOpen(false);
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
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: 15 }}>Skill</h1>
      <Card>
        <CardContent>
          <Button variant="contained" color="success" sx={{ mb: 3 }} onClick={handleAddSkillClick}>
            Add New
          </Button>

          {skill && skill.length > 0 ? (
            <DataTable
              rows={skill}
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
          Konfirmasi Hapus Data Skill
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
      <Transition in={isAddSkillDialogOpen} timeout={300} unmountOnExit>
        {(state) => (
          <Dialog open={isAddSkillDialogOpen} onClose={handleAddSkillClose}>
            <DialogTitle sx={{ display: "flex", marginTop: "10px", marginLeft: "10px", height: "110px" }}>
              <div style={iconStyle}>
                <TipsAndUpdatesIcon />
              </div>
              <span style={{ fontSize: "24px", fontWeight: "bold", marginTop: "10px", marginLeft: "20px" }}>Add New Data Skill</span>
            </DialogTitle>
            <DialogContent sx={{ marginTop: "-30px" }}>
              <AddSkill onCancelAdd={handleAddSkillClose} onSuccess={getSkill} />
            </DialogContent>
          </Dialog>
        )}
      </Transition>

      <Transition in={isEditSkillDialogOpen} timeout={300} unmountOnExit>
        {(state) => (
          <Dialog open={isEditSkillDialogOpen} onClose={handleEditSkillClose}>
            <DialogTitle sx={{ display: "flex", marginTop: "10px", marginLeft: "10px", height: "110px" }}>
              <div style={iconStyle}>
                <TipsAndUpdatesIcon />
              </div>
              <span style={{ fontSize: "24px", fontWeight: "bold", marginTop: "10px", marginLeft: "20px" }}>Update Data Skill</span>
            </DialogTitle>
            <DialogContent sx={{ marginTop: "-30px" }}>
              <EditSkill data={dataToEdit} onCancelAdd={handleEditSkillClose} onSuccess={getSkill} />
            </DialogContent>
          </Dialog>
        )}
      </Transition>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <MuiAlert elevation={6} variant="filled" severity="success" onClose={handleSnackbarClose}>
          Skill successfully deleted!
        </MuiAlert>
      </Snackbar>
    </Content>
  );
};

export default SkillTable;
