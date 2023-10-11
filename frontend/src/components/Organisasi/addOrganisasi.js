import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Card, CardContent } from "@mui/material";

const AddOrganisasi = () => {
  const [nama_organisasi, setNamaOrganisasi] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [awal_periode, setAwalPeriode] = useState("");
  const [akhir_periode, setAkhirPeriode] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const navigate = useNavigate();

  const saveOrganisasi = async (e) => {
    e.preventDefault();

    // Mengambil token akses dari penyimpanan lokal
    const accessToken = localStorage.getItem("accessToken");

    // Membuat header dengan otorisasi Bearer
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    try {
      // Mengirim data organisasi ke server
      await axios.post("http://localhost:5000/datadiri/organisasi", {
        nama_organisasi,
        jabatan,
        awal_periode,
        akhir_periode,
        deskripsi,
      }, {
        headers, // Menggunakan header yang sudah dibuat
      });
      navigate("/organisasi"); // Redirect setelah berhasil menambahkan organisasi
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Grid container spacing={2} mt={5} justifyContent="center">
        <Grid>
          <Card sx={{ maxWidth: 450 }}>
            <CardContent>
              <form onSubmit={saveOrganisasi}>
                <TextField
                  label="Nama Organisasi"
                  fullWidth
                  value={nama_organisasi}
                  onChange={(e) => setNamaOrganisasi(e.target.value)}
                  placeholder="Nama Organisasi"
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  label="Jabatan"
                  fullWidth
                  value={jabatan}
                  onChange={(e) => setJabatan(e.target.value)}
                  placeholder="Jabatan"
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  label="Awal Periode"
                  fullWidth
                  type="date"
                  value={awal_periode}
                  onChange={(e) => setAwalPeriode(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  label="Akhir Periode"
                  fullWidth
                  type="date"
                  value={akhir_periode}
                  onChange={(e) => setAkhirPeriode(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  label="Deskripsi"
                  fullWidth
                  multiline
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  placeholder="Deskripsi"
                  variant="outlined"
                  margin="normal"
                />
                <Button type="submit" variant="contained" color="primary">
                  Save
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default AddOrganisasi;
