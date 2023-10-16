import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";

const AddOrganisasi = ({ onCancelAdd, onSuccess }) => {
  const [nama_organisasi, setNamaOrganisasi] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [awal_periode, setAwalPeriode] = useState("");
  const [akhir_periode, setAkhirPeriode] = useState("");
  const [deskripsi, setDeskripsi] = useState("");

  // State untuk pesan kesalahan pada setiap input
  const [namaOrganisasiError, setNamaOrganisasiError] = useState(false);
  const [jabatanError, setJabatanError] = useState(false);
  const [awalPeriodeError, setAwalPeriodeError] = useState(false);
  const [akhirPeriodeError, setAkhirPeriodeError] = useState(false);
  const [deskripsiError, setDeskripsiError] = useState(false);

  const [isCanceled, setIsCanceled] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const navigate = useNavigate();

  const saveOrganisasi = async (e) => {
    e.preventDefault();

    if (!nama_organisasi || !jabatan || !awal_periode || !akhir_periode || !deskripsi) {
      // Mengatur pesan kesalahan sesuai dengan input yang kosong
      setNamaOrganisasiError(!nama_organisasi);
      setJabatanError(!jabatan);
      setAwalPeriodeError(!awal_periode);
      setAkhirPeriodeError(!akhir_periode);
      setDeskripsiError(!deskripsi);
    } else {
      // Jika semua input terisi, lanjutkan
      if (!isCanceled) {
        const accessToken = localStorage.getItem("accessToken");

        const data = {
          nama_organisasi,
          awal_periode,
          akhir_periode,
          jabatan,
          deskripsi,
        };

        try {
          await axios.post("http://localhost:5000/datadiri/organisasi", data, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          });
          setShowSuccessAlert(true);
          setTimeout(() => {
            setShowSuccessAlert(false);
            onSuccess(); // Call the `onSuccess` function passed from SkillList
            onCancelAdd(); // Close the AddSkill dialog
          }, 2000);
        } catch (error) {
          console.log(error);
          // Handle errors here
        }
      }
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
      <form onSubmit={saveOrganisasi}>
        <Grid container spacing={0.8} mt={0.5} justifyContent="center">
          <Grid item sm={12}>
            <TextField
              label="Nama Organisasi"
              fullWidth
              value={nama_organisasi}
              onChange={(e) => setNamaOrganisasi(e.target.value)}
              placeholder="Nama Organisasi"
              variant="outlined"
              margin="normal"
              error={namaOrganisasiError}
              helperText={namaOrganisasiError ? "Nama Organisasi harus diisi" : ""}
            />
          </Grid>
          <Grid item sm={12}>
            <TextField
              label="Jabatan"
              fullWidth
              value={jabatan}
              onChange={(e) => setJabatan(e.target.value)}
              placeholder="Jabatan"
              variant="outlined"
              margin="normal"
              error={jabatanError}
              helperText={jabatanError ? "Jabatan harus diisi" : ""}
            />
          </Grid>
          <Grid item sm={6}>
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
              error={awalPeriodeError}
              helperText={awalPeriodeError ? "Awal Periode harus diisi" : ""}
            />
          </Grid>
          <Grid item sm={6}>
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
              error={akhirPeriodeError}
              helperText={akhirPeriodeError ? "Akhir Periode harus diisi" : ""}
            />
          </Grid>
          <Grid item sm={12}>
            <TextField
              label="Deskripsi"
              fullWidth
              multiline
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              placeholder="Deskripsi"
              variant="outlined"
              margin="normal"
              error={deskripsiError}
              helperText={deskripsiError ? "Deskripsi harus diisi" : ""}
            />
          </Grid>
          <Grid container justifyContent="flex-end" sx={{ marginTop: "10px", marginBottom: "10px" }}>
            <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
              Save
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

export default AddOrganisasi;
