import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";

const AddOrganisasi = ({ onCancelAdd, onSuccess }) => {
  const [organisasi, setOrganisasi] = useState({
    nama_organisasi: "",
    jabatan: "",
    awal_periode: "",
    akhir_periode: "",
    deskripsi: "",
    errorNamaOrganisasi: false,
    errorJabatan: false,
    errorAwalPeriode: false,
    errorAkhirPeriode: false,
    errorDeskripsi: false,
  });

  const [isCanceled, setIsCanceled] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrganisasi((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleCancel = () => {
    setIsCanceled(true);
    window.location.reload();
  };

  const saveOrganisasi = async (e) => {
    e.preventDefault();

    if (!organisasi.nama_organisasi || !organisasi.jabatan || !organisasi.awal_periode || !organisasi.akhir_periode || !organisasi.deskripsi) {
      // Mengatur pesan kesalahan sesuai dengan input yang kosong
      setOrganisasi((prevState) => ({
        ...prevState,
        errorNamaOrganisasi: !organisasi.nama_organisasi,
        errorJabatan: !organisasi.jabatan,
        errorAwalPeriode: !organisasi.awal_periode,
        errorAkhirPeriode: !organisasi.akhir_periode,
        errorDeskripsi: !organisasi.deskripsi,
      }));
    } else {
      // Jika semua input terisi, lanjutkan
      if (!isCanceled) {
        const accessToken = localStorage.getItem("accessToken");

        const formData = new FormData();
        formData.append("nama_organisasi", organisasi.nama_organisasi);
        formData.append("jabatan", organisasi.jabatan);
        formData.append("awal_periode", organisasi.awal_periode);
        formData.append("akhir_periode", organisasi.akhir_periode);
        formData.append("deskripsi", organisasi.deskripsi);

        try {
          await axios.post("http://localhost:5000/datadiri/organisasi", formData, {
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
              name="nama_organisasi"
              value={organisasi.nama_organisasi}
              onChange={handleInputChange}
              placeholder="Nama Organisasi"
              variant="outlined"
              margin="normal"
              error={organisasi.namaOrganisasiError}
              helperText={
                organisasi.namaOrganisasiError
                  ? "Nama Organisasi harus diisi"
                  : ""
              }
            />
          </Grid>
          <Grid item sm={12}>
            <TextField
              label="Jabatan"
              fullWidth
              name="jabatan"
              value={organisasi.jabatan}
              onChange={handleInputChange}
              placeholder="Jabatan"
              variant="outlined"
              margin="normal"
              error={organisasi.jabatanError}
              helperText={organisasi.jabatanError ? "Jabatan harus diisi" : ""}
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              label="Awal Periode"
              fullWidth
              name="awal_periode"
              type="date"
              value={organisasi.awal_periode}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              margin="normal"
              error={organisasi.awalPeriodeError}
              helperText={
                organisasi.awalPeriodeError ? "Awal Periode harus diisi" : ""
              }
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              label="Akhir Periode"
              fullWidth
              name="akhir_periode"
              type="date"
              value={organisasi.akhir_periode}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              margin="normal"
              error={organisasi.akhirPeriodeError}
              helperText={
                organisasi.akhirPeriodeError ? "Akhir Periode harus diisi" : ""
              }
            />
          </Grid>
          <Grid item sm={12}>
            <TextField
              label="Deskripsi"
              fullWidth
              name="deskripsi"
              multiline
              value={organisasi.deskripsi}
              onChange={handleInputChange}
              placeholder="Deskripsi"
              variant="outlined"
              margin="normal"
              error={organisasi.deskripsiError}
              helperText={
                organisasi.deskripsiError ? "Deskripsi harus diisi" : ""
              }
            />
          </Grid>
          <Grid
            container
            justifyContent="flex-end"
            sx={{ marginTop: "10px", marginBottom: "10px" }}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ marginTop: 2 }}
            >
              Save
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{ marginTop: 2, marginLeft: 1 }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default AddOrganisasi;
