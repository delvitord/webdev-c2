import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import DataTable from './DataTable'
import Content from "../layout/Content";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const columns = [
  { field: "id", headerName: "ID", minWidth: 30 },
  { field: "judul", headerName: "Judul", minWidth: 200 },
  { field: "deskripsi", headerName: "Deskripsi", minWidth: 150, },
  { field: "file", headerName: "File", minWidth: 100 },
  { field: "image", headerName: "Image", minWidth: 120,  },
  { field: "link", headerName: "Link", minWidth: 150 },
  { field: "actions", headerName: "Actions", width: 150 },
];


const PortofolioTable = () => {
  const [portofolios, setPortofolio] = useState([]);
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const navigate = useNavigate();

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
  const handleEditClick = (id) => {
    // Navigasi ke halaman edit dengan mengirimkan ID data sebagai bagian dari URL
    navigate(`/edit-portofolio/${id}`);
  };

  const handleDeleteClick = async (id)=> {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      try {
        const accessToken = localStorage.getItem("accessToken");
        // Lakukan permintaan DELETE ke backend untuk menghapus data dengan ID tertentu
        axios.delete(`http://localhost:5000/datadiri/portofolio/${id}`, {
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
      <Link to={`/add-portofolio`}>
        <Button variant="contained" color="success" sx={{ mb: 3 }}>
          Add New
        </Button>
      </Link>
      {portofolios && portofolios.length > 0 ? (
        <DataTable
          rows={portofolios}
          columns={columns.map((column) => ({
            ...column,
            renderCell: (params) => {
              const { field, value } = params;

              if (field === "actions") {
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
              } else if (field === "file") {
                return value ? (
                  <a href={value} target="_blank" rel="noopener noreferrer">
                    View File
                  </a>
                ) : "No File";
              } else if (field === "image") {
                return value && value.length > 0 ? (
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {value.map((img, idx) => (
                      <div key={idx} style={{ marginBottom: "8px" }}>
                        <a href={img} target="_blank" rel="noopener noreferrer">
                          View Image {idx + 1}
                        </a>
                      </div>
                    ))}
                  </div>
                ) : "No Images";
              } else if (field === "foto") {
                return (
                  <img
                    src={params.value}
                    alt="Foto"
                    style={{ width: 50, height: 50 }}
                  />
                );
              } else {
                return <span>{value}</span>;
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

export default PortofolioTable