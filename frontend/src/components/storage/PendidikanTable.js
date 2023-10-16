import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate, useParams } from "react-router-dom";
import DataTable from "./DataTable";
import Content from "../layout/Content";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

const columns = [
  { field: "id", headerName: "No", minWidth: 30 },
  { field: "nama_instansi", headerName: "Nama Instansi", minWidth: 250 },
  { field: "awal_periode", headerName: "Tahun Masuk", minWidth: 200 },
  { field: "akhir_periode", headerName: "Tahun Lulus", minWidth: 200 },
  { field: "jurusan", headerName: "Jurusan", minWidth: 200 },
  { field: "actions", headerName: "Actions", minWidth: 100 },
];

const PendidikanTable = () => {
  const [pendidikan, setPendidikan] = useState([]);
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const navigate = useNavigate();
  const {id} = useParams()
  const accessToken = localStorage.getItem("accessToken");

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

      const response = await axios.get(
        "http://localhost:5000/datadiri/pendidikan",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const dataWithId = response.data.map((item, index) => ({
        ...item,
        id: index + 1,
      }));
      setPendidikan(dataWithId);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [open] = React.useState(true);
  const handleEditClick = (id) => {
    // Navigasi ke halaman edit dengan mengirimkan ID data sebagai bagian dari URL
    navigate(`/edit-pendidikan/${id}`);
  };

  const handleDeleteClick = async (original) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      try {
        // Lakukan permintaan DELETE ke backend untuk menghapus data dengan ID tertentu
        axios.delete(`http://localhost:5000/pendidikan/${original}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        // window.location.reload();
      } catch (error) {
        console.error("Error deleting data:", error);
      }
    }
  };

  return (
    <Content open={open}>
      <Link to={`/add-pendidikan`}>
        <Button
          variant="contained"
          color="success"
          sx={{ marginLeft: 1 }}
        >
          <AddIcon sx={{ marginRight: 1 }} /> Add New
        </Button>
      </Link>
      {pendidikan && pendidikan.length > 0 ? (
        <DataTable
          rows={pendidikan}
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
                  </div>
                );
              }
            },
          }))}
        />
      ) : (
        <p>Data tidak tersedia atau sedang dimuat...</p>
      )}
    </Content>
  );
};

export default PendidikanTable;
