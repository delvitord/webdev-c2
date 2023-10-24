import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import DataTable from "./DataTable";
import Content from "../layout/Content";
import Card from "@mui/material/Card";
import { CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { CardMedia } from "@mui/material";

const DatadiriDetail = () => {
  const [dataDiri, setDataDiri] = useState({
    nama: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    alamat: "",
    email: "",
    no_telp: "",
    foto: "", // Menggunakan null untuk elemen input file
    deskripsi: "",
    linkedin: "",
    instagram: "",
    x: "",
    github: "",
  });
  const [datadiris, setDatadiri] = useState([]);
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [selectedData, setSelectedData] = useState(null);
  const [showNoDataMessage, setShowNoDataMessage] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
    getDatadiri();
  }, []);

  const refreshToken = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      // Cek apakah accessToken ada dan masih valid
      if (accessToken) {
        const decoded = jwt_decode(accessToken);
        const currentTime = Math.floor(Date.now() / 1000);

        // Jika token masih valid, tidak perlu refresh
        if (decoded.exp > currentTime) {
          return;
        }
      }

      // Jika token kedaluwarsa atau tidak ada, lakukan permintaan refresh
      const response = await axios.get("http://localhost:5000/token", {
        withCredentials: true,
        // Jika diperlukan, sertakan cara otentikasi yang sesuai di sini
      });
      const newAccessToken = response.data.accessToken;

      // Simpan token yang baru di local storage
      localStorage.setItem("accessToken", newAccessToken);

      // Perbarui state dengan token yang baru
      setToken(newAccessToken);
    } catch (error) {
      console.log(error);

      // Redirect ke halaman login jika terjadi kesalahan otentikasi
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
    }
  };

  const accessToken = localStorage.getItem("accessToken");

  const getDatadiri = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/data_diri`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (Array.isArray(response.data) && response.data.length > 0) {
        // Ambil data diri pertama dalam array
        const dataDiriServer = response.data[0];

        // Set nilai dari data yang diperoleh ke dalam state
        setDataDiri({
          nama: dataDiriServer.nama,
          tempat_lahir: dataDiriServer.tempat_lahir,
          tanggal_lahir: dataDiriServer.tanggal_lahir,
          alamat: dataDiriServer.alamat,
          email: dataDiriServer.email,
          no_telp: dataDiriServer.no_telp,
          foto: dataDiriServer.foto,
          deskripsi: dataDiriServer.deskripsi,
          linkedin: dataDiriServer.linkedin,
          instagram: dataDiriServer.instagram,
          x: dataDiriServer.x,
          github: dataDiriServer.github,
        });
      }
      console.log(response.data);
      console.log("Token in local storage: ", localStorage.getItem("accessToken"));
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseDetail = () => {
    navigate("/datadiri");
  };
  const [open] = React.useState(true);

  return (
    <Content open={open}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: 15 }}>Data Diri</h1>
      <Card>
        <Button variant="contained" color="success" sx={{ mb: 3, mt: 3, ml: 3 }} onClick={handleCloseDetail}>
          Close Detail
        </Button>
        <CardContent>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "20px",
              marginTop: "20px",
            }}
          >
            <CardMedia
              component="img"
              alt="Foto Profil"
              height="50"
              image={dataDiri.foto} // Gunakan URL gambar dari state Anda
              title="Foto Profil"
              style={{
                width: "250px", // Menyesuaikan lebar gambar
                height: "250px", // Menyesuaikan tinggi gambar
                borderRadius: "50%", // Membuat gambar bulat
              }}
            />
          </div>

          <Grid container spacing={0.8} mt={0.5} justifyContent="center">
            <Grid item xs={12}>
              <TextField
                label="Nama Lengkap"
                fullWidth
                name="nama"
                value={dataDiri.nama}
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
                placeholder="Tempat Lahir"
                variant="outlined"
                margin="normal"
                error={dataDiri.errorTempatLahir}
                helperText={dataDiri.errorTempatLahir ? "Tempat Lahir harus diisi" : ""}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Tanggal Lahir"
                fullWidth
                type="date"
                name="tanggal_lahir"
                value={dataDiri.tanggal_lahir}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                margin="normal"
                error={dataDiri.errorTanggalLahir}
                helperText={dataDiri.errorTanggalLahir ? "Tanggal Lahir harus diisi" : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-multiline-static"
                label="Alamat"
                multiline
                name="alamat"
                maxRows={4}
                defaultValue="Default Value"
                value={dataDiri.alamat}
                placeholder="Alamat"
                variant="outlined"
                margin="normal"
                error={dataDiri.errorAlamat}
                fullWidth
                helperText={dataDiri.errorAlamat ? "Alamat harus diisi" : ""}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Email"
                fullWidth
                type="email"
                name="email"
                value={dataDiri.email}
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
                placeholder="No Telepon"
                variant="outlined"
                margin="normal"
                error={dataDiri.errorNoTelp}
                helperText={dataDiri.errorNoTelp ? "No Telepon harus diisi" : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Deskripsi"
                fullWidth
                multiline
                name="deskripsi"
                value={dataDiri.deskripsi}
                placeholder="Deskripsi"
                variant="outlined"
                id="outlined-multiline-flexible"
                maxRows={4}
                margin="normal"
                error={dataDiri.errorDeskripsi}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Linkedin" fullWidth name="linkedin" value={dataDiri.linkedin} placeholder="Linkedin" variant="outlined" margin="normal" error={dataDiri.errorLinkedin} />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Instagram" fullWidth name="instagram" value={dataDiri.instagram} placeholder="Instagram" variant="outlined" margin="normal" error={dataDiri.errorInstagram} />
            </Grid>
            <Grid item xs={6}>
              <TextField label="X" fullWidth name="x" value={dataDiri.x} placeholder="X" variant="outlined" margin="normal" error={dataDiri.errorX} />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Github" fullWidth name="github" value={dataDiri.github} placeholder="Github" variant="outlined" margin="normal" error={dataDiri.errorGithub} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Content>
  );
};

export default DatadiriDetail;
