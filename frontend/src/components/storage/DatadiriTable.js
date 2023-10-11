import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import DataTable from './DataTable'
import Content from "../layout/Content";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const columns = [
  { field: "id", headerName: "No", width: 30 },
  { field: "nama", headerName: "Nama", minWidth: 100 },
  { field: "tempat_lahir", headerName: "Tempat Lahir", minWidth: 100 },
  { field: "tanggal_lahir", headerName: "Tanggal Lahir", minWidth: 100 },
  { field: "alamat", headerName: "Alamat", minWidth: 100 },
  { field: "email", headerName: "Email", minWidth: 100 },
  { field: "no_telp", headerName: "No.Telp", minWidth: 100 },
  { field: "foto", headerName: "Foto", minWidth: 100, },
  { field: "deskripsi", headerName: "Deskripsi", minWidth: 100 },
  { field: "linkedin", headerName: "LinkedIn", minWidth: 100 },
  { field: "instagram", headerName: "Instagram", minWidth: 100 },
  { field: "x", headerName: "X", minWidth: 100 },
  { field: "github", headerName: "GitHub", minWidth: 100 },
  { field: "actions", headerName: "Actions", minWidth: 100 },
];

const DatadiriTable = () => {
  const [datadiris, setDatadiri] = useState([]);
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
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
    }
  };

  const [open] = React.useState(true);
  const handleEditClick = (id) => {
    // Navigasi ke halaman edit dengan mengirimkan ID data sebagai bagian dari URL
    navigate(`/edit-datadiri`);
  };

  const handleDeleteClick = async => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      try {
        const accessToken = localStorage.getItem("accessToken");
        // Lakukan permintaan DELETE ke backend untuk menghapus data dengan ID tertentu
        axios.delete(`http://localhost:5000/data_diri`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        window.location.reload();
      } catch (error) {
        console.error("Error deleting data:", error);
      }
    }
  };

  return (
    <Content open={open}>
      {datadiris && datadiris.length > 0 ? (
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
    </Content>
  );
};

export default DatadiriTable