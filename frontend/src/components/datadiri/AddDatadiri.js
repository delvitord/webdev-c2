import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

const AddDatadiri = () => {
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
  });

  const [token, setToken] = useState("");
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
        // Implementasikan logika refresh token di sini jika diperlukan
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.post("http://localhost:5000/data_diri", dataDiri, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response);
      navigate("/datadiri");
    } catch (error) {
      console.log(error);
      console.log(error.response);
    }
  };

  const handleCancel = () => {
    setIsCanceled(true);
    navigate("/datadiri");
  };

  return (
    <>
      <Grid container spacing={0.8} mt={0.5} justifyContent="center">
        <Grid item xs={12}>
          <TextField label="Nama" fullWidth name="nama" value={dataDiri.nama} onChange={handleInputChange} placeholder="Nama" variant="outlined" margin="normal" />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Tempat Lahir" fullWidth name="tempat_lahir" value={dataDiri.tempat_lahir} onChange={handleInputChange} placeholder="Tempat Lahir" variant="outlined" margin="normal" />
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
          />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Alamat" fullWidth name="alamat" value={dataDiri.alamat} onChange={handleInputChange} placeholder="Alamat" variant="outlined" margin="normal" />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Email" fullWidth type="email" name="email" value={dataDiri.email} onChange={handleInputChange} placeholder="Email" variant="outlined" margin="normal" />
        </Grid>
        <Grid item xs={6}>
          <TextField label="No Telepon" fullWidth name="no_telp" value={dataDiri.no_telp} onChange={handleInputChange} placeholder="No Telepon" variant="outlined" margin="normal" />
        </Grid>
        <Grid item xs={6}>
          <input type="file" accept=".gif,.jpg,.jpeg,.png" multiple id="image-upload" style={{ display: "none" }} />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Deskripsi" fullWidth name="deskripsi" value={dataDiri.deskripsi} onChange={handleInputChange} placeholder="Deskripsi" variant="outlined" id="outlined-multiline-flexible" multiline maxRows={4} margin="normal" />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Linkedin" fullWidth name="linkedin" value={dataDiri.linkedin} onChange={handleInputChange} placeholder="Linkedin" variant="outlined" margin="normal" />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Instagram" fullWidth name="instagram" value={dataDiri.instagram} onChange={handleInputChange} placeholder="Instagram" variant="outlined" margin="normal" />
        </Grid>
        <Grid item xs={6}>
          <TextField label="X" fullWidth name="x" value={dataDiri.x} onChange={handleInputChange} placeholder="X" variant="outlined" margin="normal" />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Github" fullWidth name="github" value={dataDiri.github} onChange={handleInputChange} placeholder="Github" variant="outlined" margin="normal" />
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
    </>
  );
};

export default AddDatadiri;
