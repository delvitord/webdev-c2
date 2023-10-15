import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import DataTable from "./DataTable";
import Content from "../layout/Content";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const columns = [
    { field: "id", headerName: "No", width: 30 },
    { field: "nama_organisasi", headerName: "Nama Organisasi", minWidth: 100 },
    { field: "jabatan", headerName: "Jabatan", minWidth: 100 },
    { field: "awal_periode", headerName: "Awal Periode", minWidth: 100 },
    { field: "akhir_periode", headerName: "Akhir Periode", minWidth: 100 },
    { field: "deskripsi", headerName: "Deskripsi", minWidth: 100 },
    { field: "actions", headerName: "Actions", width: 150 },
];

const OrganisasiTable = () => {
    const [organisasi, setOrganisasi] = useState([]);
    const [token, setToken] = useState("");
    const [expire, setExpire] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        refreshToken();
        getOrganisasi();
    }, []);

    const refreshToken = async () => {
        try {
            const response = await axios.get("http://localhost:5000/token");
            const decoded = jwt_decode(response.data.accessToken);
            const currentTime = Date.now() / 1000;
            if (decoded.exp < currentTime) {
                // Handle token expiration
                setExpire(decoded.exp);
            }
        } catch (error) {
            if (error.response) {
                navigate("/login");
            }
        }
    };

    const getOrganisasi = async () => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const response = await axios.get(
                "http://localhost:5000/datadiri/organisasi",
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            const dataWithId = response.data.map((item, index) => ({
                ...item,
                id: index + 1,
                _originalId: item.id,
            }));
            setOrganisasi(dataWithId);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleEditClick = (originalId) => {
        navigate(`/edit-organisasi/${originalId}`);
    };

  const handleDeleteClick = async (originalId) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      try {
        const accessToken = localStorage.getItem("accessToken");
  
        // Send a DELETE request to the server to delete the item with a specific ID
        await axios.delete(`http://localhost:5000/datadiri/organisasi/${originalId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
  
        // After successful deletion, you can update the state or refresh the data
        getOrganisasi(); // You may want to call this to refresh the data.
      } catch (error) {
        console.error("Error deleting data:", error);
      }
    }
  };

    return (
        <Content open={true}>
            {organisasi && organisasi.length > 0 ? (
                <DataTable
                    rows={organisasi}
                    columns={columns.map((column) => ({
                        ...column,
                        renderCell: (params) => {
                            if (column.field === "actions") {
                                return (
                                    <div>
                                        <IconButton
                                            aria-label="Edit"
                                            color="primary"
                                            onClick={() => handleEditClick(params.row._originalId)}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            aria-label="Delete"
                                            color="error"
                                            onClick={() => handleDeleteClick(params.row._originalId)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </div>
                                );
                            }
                            return params.value;
                        },
                    }))}
                />
            ) : (
                <p>Data tidak tersedia atau sedang dimuat...</p>
            )}
        </Content>
    );
};

export default OrganisasiTable;