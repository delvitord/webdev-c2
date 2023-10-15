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
import Grid from "@mui/material/Grid";
import { TextField } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import AddIcon from "@mui/icons-material/Add";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import { Link } from "react-router-dom";

const columns = [
  { field: "id", headerName: "No", width: 30 },
  { field: "nama", headerName: "Nama", minWidth: 250 },
  { field: "email", headerName: "Email", minWidth: 150 },
  { field: "no_telp", headerName: "No.Telp", minWidth: 150 },
  { field: "actions", headerName: "Actions", minWidth: 250 },
];

const DatadiriTable = () => {
  const [datadiris, setDatadiri] = useState([]);
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [selectedData, setSelectedData] = useState(null);
  const [showNoDataMessage, setShowNoDataMessage] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
    getDatadiri();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setDatadiri(decoded.nama);
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

  const getDatadiri = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.get("http://localhost:5000/data_diri", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const dataWithId = response.data.map((item, index) => ({
        ...item,
        id: index + 1,
      }));
      setDatadiri(dataWithId);
    } catch (error) {
      console.error("Error fetching data:", error);
      setShowNoDataMessage(true);
    }
  };

  const [open] = React.useState(true);

  const handleShowDetail = (data) => {
    setSelectedData(data);
    setShowNoDataMessage(false)
  };

  const handleEditClick = (id) => {
    // Navigasi ke halaman edit dengan mengirimkan ID data sebagai bagian dari URL
    navigate(`/edit-datadiri`);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      try {
        const accessToken = localStorage.getItem("accessToken");
        // Lakukan permintaan DELETE ke backend untuk menghapus data dengan ID tertentu
        axios
          .delete(`http://localhost:5000/data_diri`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then(() => {
            // Setelah menghapus data, Anda dapat memuat ulang data
            getDatadiri();
          })
          .catch((error) => {
            console.error("Error deleting data:", error);
          });
      } catch (error) {
        console.error("Error deleting data:", error);
      }
    }
  };

  return (
    <Content open={open}>
      {selectedData && (
        <div>
          <IconButton
            variant="contained"
            color="danger"
            sx={{ mb: 3 }}
            onClick={() => setSelectedData(null)}
          >
            <IndeterminateCheckBoxIcon sx={{ fontSize: 40 }} />
          </IconButton>
          <Grid
            item
            xs={10}
            sm={6}
            md={4}
            sx={{ marginRight: 5, textAlign: "center" }}
          >
            <img
              src={selectedData.foto}
              alt="Foto"
              style={{ width: 150, height: 150, objectFit: "cover" }}
            />
          </Grid>
          <TextField
            label="Name"
            fullWidth
            variant="outlined"
            InputProps={{ readOnly: true }}
            value={selectedData.nama}
            margin="normal"
          />
          <TextField
            label="Tempat Lahir"
            variant="outlined"
            InputProps={{ readOnly: true }}
            value={selectedData.tempat_lahir}
            margin="normal"
            sx={{ width: 742 }}
          />
          <TextField
            label="Tanggal Lahir"
            variant="outlined"
            InputProps={{ readOnly: true }}
            value={selectedData.tanggal_lahir}
            margin="normal"
            sx={{ marginLeft: 5, width: 742 }}
          />
          <TextField
            label="Alamat"
            fullWidth
            variant="outlined"
            InputProps={{ readOnly: true }}
            value={selectedData.alamat}
            margin="normal"
          />
          <TextField
            label="Email"
            fullWidth
            variant="outlined"
            InputProps={{ readOnly: true }}
            value={selectedData.email}
            margin="normal"
          />
          <TextField
            label="Linkedin"
            variant="outlined"
            InputProps={{ readOnly: true }}
            value={selectedData.linkedin}
            margin="normal"
            sx={{ width: 351 }}
          />
          <TextField
            label="Instagram"
            variant="outlined"
            InputProps={{ readOnly: true }}
            value={selectedData.instagram}
            margin="normal"
            sx={{ marginLeft: 5, width: 351 }}
          />
          <TextField
            label="X"
            variant="outlined"
            InputProps={{ readOnly: true }}
            value={selectedData.x}
            margin="normal"
            sx={{ marginLeft: 5, width: 351 }}
          />
          <TextField
            label="Github"
            variant="outlined"
            InputProps={{ readOnly: true }}
            value={selectedData.github}
            margin="normal"
            sx={{ marginLeft: 5, width: 351 }}
          />
          <TextField
            label="Deskripsi"
            fullWidth
            variant="outlined"
            InputProps={{ readOnly: true }}
            value={selectedData.deskripsi}
            multiline
            rows={4}
            margin="normal"
          />
        </div>
      )}
      {datadiris && datadiris.length === 0 && (
        <Link to={`/add-datadiri`}>
          <Button
            variant="contained"
            color="success"
            sx={{ marginLeft: 1 }}
          >
            <AddIcon sx={{ marginRight: 1 }} /> Add New
          </Button>
        </Link>
      )}
      {!selectedData && datadiris && datadiris.length > 0 ? (
        <DataTable
          rows={datadiris}
          columns={columns.map((column) => ({
            ...column,
            renderCell: (params) => {
              if (column.field === "actions") {
                return (
                  <div>
                    <IconButton
                      aria-label="Edit"
                      color="primary"
                      onClick={() => handleEditClick(params.row.id)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="Delete"
                      color="error"
                      onClick={() => handleDeleteClick(params.row.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      variant="contained"
                      color="info"
                      onClick={() => handleShowDetail(params.row)}
                    >
                      <InfoIcon />
                    </IconButton>
                  </div>
                );
              } else {
                return <span>{params.value}</span>;
              }
            },
          }))}
        />
      ) : showNoDataMessage ? (
        <p>Data tidak tersedia atau sedang dimuat...</p>
      ) : null}
    </Content>
  );
};

export default DatadiriTable;
