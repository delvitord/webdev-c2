import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress"; 

const AddPendidikan = ({ onCancelAdd, onSuccess }) => {
  const [pendidikan, setPendidikan] = useState({
    nama_instansi: "",
    awal_periode: "",
    akhir_periode: "",
    jurusan: "",
    errorNamaInstansi: false,
    errorAwalPeriode: false,
    errorAkhirPeriode: false,
    errorJurusan: false,
  });

  const [isCanceled, setIsCanceled] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [msg, setMsg] = useState("");
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [isLoading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPendidikan((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleCancel = () => {
    setIsCanceled(true);
    window.location.reload();
  };

  const savePendidikan = async (e) => {
    e.preventDefault();

    // Validasi input
    if (!pendidikan.nama_instansi || !pendidikan.awal_periode) {
      // Menampilkan pesan error pada setiap TextField yang kosong
      setPendidikan((prevState) => ({
        ...prevState,
        errorNamaInstansi: !pendidikan.nama_instansi,
        errorAwalPeriode: !pendidikan.awal_periode,
        errorAkhirPeriode: !pendidikan.akhir_periode,
      }));
    } else {
      // Jika semua input terisi, lanjutkan
      if (!isCanceled) {
        const accessToken = localStorage.getItem("accessToken");

        const formData = new FormData();
        formData.append("nama_instansi", pendidikan.nama_instansi);
        formData.append("awal_periode", pendidikan.awal_periode);
        formData.append("akhir_periode", pendidikan.akhir_periode);
        formData.append("jurusan", pendidikan.jurusan);

        try {
          setLoading(true);
          await axios.post("http://localhost:5000/datadiri/pendidikan", formData, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "multipart/form-data",
            },
          });
          setShowSuccessAlert(true);
          setTimeout(() => {
            setLoading(true);
            setShowSuccessAlert(false);
            onSuccess(); // Call the `onSuccess` function passed from SkillList
            onCancelAdd(); // Close the AddSkill dialog
          }, 2000);
        } catch (error) {
          if (error.response) {
            setMsg(error.response.data.error);
            setShowErrorMsg(true);
            setTimeout(() => {
              setShowErrorMsg(false);
            }, 2000);
          }
          setLoading(false);
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
          Data Pendidikan berhasil disimpan
        </Alert>
      )}
      {showErrorMsg && (
        <Alert severity="error" sx={{ marginBottom: 1 }}>
          {msg}
        </Alert>
      )}
      <form onSubmit={savePendidikan}>
        <Grid container spacing={0.8} mt={0.5} justifyContent="center">
          <Grid item sm={12}>
            <TextField
              label="Nama Instansi"
              fullWidth
              name="nama_instansi"
              value={pendidikan.nama_instansi}
              onChange={handleInputChange}
              placeholder="Nama Instansi"
              variant="outlined"
              margin="normal"
              error={pendidikan.errorNamaInstansi}
              helperText={
                pendidikan.errorNamaInstansi ? "Nama Instansi harus diisi" : ""
              }
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              label="Tahun Masuk"
              fullWidth
              type="date"
              name="awal_periode"
              value={pendidikan.awal_periode}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              margin="normal"
              error={pendidikan.errorAwalPeriode}
              helperText={
                pendidikan.errorAwalPeriode ? "Tahun Masuk harus diisi" : ""
              }
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              label="Tahun Lulus"
              fullWidth
              type="date"
              name="akhir_periode"
              value={pendidikan.akhir_periode}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              margin="normal"
              error={pendidikan.errorAkhirPeriode}
              helperText={
                pendidikan.errorAkhirPeriode ? "Tahun Lulus harus diisi" : ""
              }
            />
          </Grid>
          <Grid item sm={12}>
            <TextField
              label="Jurusan"
              fullWidth
              name="jurusan"
              value={pendidikan.jurusan}
              onChange={handleInputChange}
              placeholder="Jurusan"
              variant="outlined"
              margin="normal"
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
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Save"
              )}
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

export default AddPendidikan;
