import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Alert } from "@mui/material";

const UpdateOrganisasi = () => {
  const [organisasi, setOrganisasi] = useState({
    nama_organisasi: "",
    jabatan: "",
    awal_periode: "",
    akhir_periode: "",
    deskripsi: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getOrganisasiById();
  }, [id]);

  const accessToken = localStorage.getItem("accessToken");
  const [isCanceled, setIsCanceled] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const updateOrganisasi = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/datadiri/organisasi/${id}`, organisasi, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      navigate("/organisasi");
    } catch (error) {
      console.log(error);
    }
  };

  const getOrganisasiById = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/datadiri/organisasi/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.data) {
        const dataServer = response.data;

        setOrganisasi({
          nama_organisasi: dataServer.nama_organisasi,
          jabatan: dataServer.jabatan,
          awal_periode: dataServer.awal_periode,
          akhir_periode: dataServer.akhir_periode,
          deskripsi: dataServer.deskripsi,
        });
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setIsCanceled(true);
    navigate("/organisasi");
  };

  return (
    <>
      {showSuccessAlert && (
        <Alert severity="success" sx={{ marginBottom: 1 }}>
          Data Pengalaman Organisasi berhasil disimpan
        </Alert>
      )}
      <form onSubmit={updateOrganisasi}>
        <Grid container spacing={0.8} mt={0.5} justifyContent="center">
          <Grid item sm={12}>
            <TextField
              label="Nama Organisasi"
              fullWidth
              name="nama_organisasi"
              value={organisasi.nama_organisasi || ""}
              onChange={(e) =>
                setOrganisasi({
                  ...organisasi,
                  nama_organisasi: e.target.value,
                })
              }
              placeholder="Nama Organisasi"
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item sm={12}>
            <TextField
              label="Jabatan"
              fullWidth
              name="jabatan"
              value={organisasi.jabatan || ""}
              onChange={(e) =>
                setOrganisasi({
                  ...organisasi,
                  jabatan: e.target.value,
                })
              }
              placeholder="Jabatan"
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              label="Tahun Mulai"
              fullWidth
              type="date"
              name="awal_periode"
              value={organisasi.awal_periode || ""}
              onChange={(e) =>
                setOrganisasi({
                  ...organisasi,
                  awal_periode: e.target.value,
                })
              }
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              label="Tahun Selesai"
              fullWidth
              type="date"
              name="akhir_periode"
              value={organisasi.akhir_periode || ""}
              onChange={(e) =>
                setOrganisasi({
                  ...organisasi,
                  akhir_periode: e.target.value,
                })
              }
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item sm={12}>
            <TextField
              label="Deskripsi"
              fullWidth
              name="deskripsi"
              value={organisasi.deskripsi || ""}
              onChange={(e) =>
                setOrganisasi({
                  ...organisasi,
                  deskripsi: e.target.value,
                })
              }
              placeholder="Deskripsi"
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid container justifyContent="flex-end" sx={{ marginTop: "10px", marginBottom: "10px" }}>
            <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
              Update
            </Button>
            <Button variant="contained" color="error" sx={{ marginTop: 2, marginLeft: 1 }} onClick={handleCancel}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default UpdateOrganisasi;
