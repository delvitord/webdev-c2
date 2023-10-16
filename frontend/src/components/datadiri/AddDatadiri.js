import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Alert } from "@mui/material";

const AddDatadiri = ({ onCancelAdd, onSuccess }) => {
  const [dataDiri, setDataDiri] = useState({
    nama: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    alamat: "",
    email: "",
    no_telp: "",
    foto: "",
    deskripsi: "",
    linkedin: "",
    instagram: "",
    x: "",
    github: "",
    errorNama: false,
    errorTempatLahir: false,
    errorTanggalLahir: false,
    errorAlamat: false,
    errorEmail: false,
    errorNoTelp: false,
  });

  const [token, setToken] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const navigate = useNavigate();
  const [isCanceled, setIsCanceled] = useState(false);

  useEffect(() => {
    refreshToken();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      const currentTime = Math.floor(Date.now() / 1000);
      if (decoded.exp < currentTime) {
        // Implement refresh token logic here if needed
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        navigate("/login");
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDataDiri({ ...dataDiri, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setDataDiri({ ...dataDiri, foto: file });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !dataDiri.nama ||
      !dataDiri.tempat_lahir ||
      !dataDiri.tanggal_lahir ||
      !dataDiri.alamat ||
      !dataDiri.email ||
      !dataDiri.no_telp
    ) {
      setDataDiri((prevState) => ({
        ...prevState,
        errorNama: !dataDiri.nama,
        errorTempatLahir: !dataDiri.tempat_lahir,
        errorTanggalLahir: !dataDiri.tanggal_lahir,
        errorAlamat: !dataDiri.alamat,
        errorEmail: !dataDiri.email,
        errorNoTelp: !dataDiri.no_telp,
      }));
    } else {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.post(
          "http://localhost:5000/data_diri",
          dataDiri,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log(response);
        setShowSuccessAlert(true);
        setTimeout(() => {
          setShowSuccessAlert(false);
          onSuccess();
          onCancelAdd();
        }, 2000);
      } catch (error) {
        console.log(error);
        console.log(error.response);
      }
    }
  };

  const handleCancel = () => {
    setIsCanceled(true);
    navigate("/datadiri");
  };

  return (
    <>
      {showSuccessAlert && (
        <Alert severity="success" sx={{ marginBottom: 1 }}>
          Data Pendidikan berhasil disimpan
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={0.8} mt={0.5} justifyContent="center">
          <Grid item xs={12}>
            <TextField
              label="Nama Lengkap"
              fullWidth
              name="nama"
              value={dataDiri.nama}
              onChange={handleInputChange}
              placeholder="Nama Lengkap"
              variant="outlined"
              margin="normal"
              error={dataDiri.errorNama}
              helperText={dataDiri.errorNama ? "Nama Lengkap harus diisi" : ""}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Tempat Lahir"
              fullWidth
              name="tempat_lahir"
              value={dataDiri.tempat_lahir}
              onChange={handleInputChange}
              placeholder="Tempat Lahir"
              variant="outlined"
              margin="normal"
              error={dataDiri.errorTempatLahir}
              helperText={
                dataDiri.errorTempatLahir ? "Tempat Lahir harus diisi" : ""
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Tanggal Lahir"
              fullWidth
              type="date"
              name="tanggal_lahir"
              value={dataDiri.tanggal_lahir}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              margin="normal"
              error={dataDiri.errorTanggalLahir}
              helperText={
                dataDiri.errorTanggalLahir ? "Tanggal Lahir harus diisi" : ""
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-multiline-static"
              label="Alamat"
              multiline
              name="alamat"
              maxRows={4}
              value={dataDiri.alamat}
              onChange={handleInputChange}
              placeholder="Alamat"
              variant="outlined"
              margin="normal"
              error={dataDiri.errorAlamat}
              fullWidth
              helperText={dataDiri.errorAlamat ? "Alamat harus diisi" : ""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              fullWidth
              type="email"
              name="email"
              value={dataDiri.email}
              onChange={handleInputChange}
              placeholder="Email"
              variant="outlined"
              margin="normal"
              error={dataDiri.errorEmail}
              helperText={dataDiri.errorEmail ? "Email harus diisi" : ""}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="No Telepon"
              fullWidth
              name="no_telp"
              value={dataDiri.no_telp}
              onChange={handleInputChange}
              placeholder="No Telepon"
              variant="outlined"
              margin="normal"
              error={dataDiri.errorNoTelp}
              helperText={dataDiri.errorNoTelp ? "No Telepon harus diisi" : ""}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Foto"
              fullWidth
              type="file"
              name="foto"
              onChange={handleFileChange}
              inputProps={{ accept: "image/*" }}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Deskripsi"
              fullWidth
              multiline
              name="deskripsi"
              value={dataDiri.deskripsi}
              onChange={handleInputChange}
              placeholder="Deskripsi"
              variant="outlined"
              maxRows={4}
              margin="normal"
              error={dataDiri.errorDeskripsi}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Linkedin"
              fullWidth
              name="linkedin"
              value={dataDiri.linkedin}
              onChange={handleInputChange}
              placeholder="Linkedin"
              variant="outlined"
              margin="normal"
              error={dataDiri.errorLinkedin}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Instagram"
              fullWidth
              name="instagram"
              value={dataDiri.instagram}
              onChange={handleInputChange}
              placeholder="Instagram"
              variant="outlined"
              margin="normal"
              error={dataDiri.errorInstagram}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="X"
              fullWidth
              name="x"
              value={dataDiri.x}
              onChange={handleInputChange}
              placeholder="X"
              variant="outlined"
              margin="normal"
              error={dataDiri.errorX}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Github"
              fullWidth
              name="github"
              value={dataDiri.github}
              onChange={handleInputChange}
              placeholder="Github"
              variant="outlined"
              margin="normal"
              error={dataDiri.errorGithub}
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

export default AddDatadiri;
