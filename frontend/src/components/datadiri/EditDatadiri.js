import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";

const UpdateDatadiri = ({ data, onCancelAdd, onSuccess }) => {
  const [dataDiri, setDataDiri] = useState({
    id: data ? data.id : "",
    nama: data ? data.nama : "",
    tempat_lahir: data ? data.tempat_lahir : "",
    tanggal_lahir: data ? data.tanggal_lahir : "",
    alamat: data ? data.alamat : "",
    email: data ? data.email : "",
    no_telp: data ? data.no_telp : "",
    foto: data ? data.foto : null, // Menggunakan null untuk elemen input file
    deskripsi: data ? data.deskripsi : "",
    linkedin: data ? data.linkedin : "",
    instagram: data ? data.instagram : "",
    x: data ? data.x : "",
    github: data ? data.github : "",
  });
  const navigate = useNavigate();

  const [token, setToken] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  useEffect(() => {
    refreshToken(); 
    console.log(data);
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

  const [isCanceled, setIsCanceled] = useState(false);


  const updateDatadiri = async (e) => {
    e.preventDefault();
    try {

      const response = await axios.patch(
        "http://localhost:5000/data_diri",
        dataDiri,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data", // Penting untuk mengunggah berkas
          },
        }
      );

      console.log("Server Response: ", response);
      setShowSuccessAlert(true);
      setTimeout(() => {
        setShowSuccessAlert(false);
        onSuccess(); // Call the `onSuccess` function passed from SkillList
        onCancelAdd(); // Close the AddSkill dialog
      }, 2000);
      navigate("/datadiri");
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setDataDiri({ ...dataDiri, foto: file });
  };

  const handleCancel = () => {
    setIsCanceled(true)
    navigate("/datadiri");
  };

  return (
    <>
      {showSuccessAlert && (
        <Alert severity="success" sx={{ marginBottom: 1 }}>
          Data berhasil disimpan
        </Alert>
      )}
      <form onSubmit={updateDatadiri}>
        <Grid container spacing={0.8} mt={0.5} justifyContent="center">
          <Grid item xs={12}>
            <TextField
              label="Nama"
              fullWidth
              name="nama"
              value={dataDiri.nama || ""}
              onChange={(e) =>
                setDataDiri({ ...dataDiri, nama: e.target.value })
              }
              placeholder="Nama"
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Tempat Lahir"
              fullWidth
              name="tempat_lahir"
              value={dataDiri.tempat_lahir || ""}
              onChange={(e) =>
                setDataDiri({ ...dataDiri, tempat_lahir: e.target.value })
              }
              placeholder="Tempat Lahir"
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Tanggal Lahir"
              fullWidth
              type="date"
              name="tanggal_lahir"
              value={dataDiri.tanggal_lahir || ""}
              onChange={(e) =>
                setDataDiri({ ...dataDiri, tanggal_lahir: e.target.value })
              }
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Alamat"
              fullWidth
              name="alamat"
              value={dataDiri.alamat || ""}
              onChange={(e) =>
                setDataDiri({ ...dataDiri, alamat: e.target.value })
              }
              placeholder="Alamat"
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              fullWidth
              type="email"
              name="email"
              value={dataDiri.email || ""}
              onChange={(e) =>
                setDataDiri({ ...dataDiri, email: e.target.value })
              }
              placeholder="Email"
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="No Telepon"
              fullWidth
              name="no_telp"
              value={dataDiri.no_telp || ""}
              onChange={(e) =>
                setDataDiri({ ...dataDiri, no_telp: e.target.value })
              }
              placeholder="No Telepon"
              variant="outlined"
              margin="normal"
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
              name="deskripsi"
              value={dataDiri.deskripsi || ""}
              onChange={(e) =>
                setDataDiri({ ...dataDiri, deskripsi: e.target.value })
              }
              placeholder="Deskripsi"
              variant="outlined"
              id="outlined-multiline-flexible"
              multiline
              maxRows={4}
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Linkedin"
              fullWidth
              name="linkedin"
              value={dataDiri.linkedin || ""}
              onChange={(e) =>
                setDataDiri({ ...dataDiri, linkedin: e.target.value })
              }
              placeholder="Linkedin"
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Instagram"
              fullWidth
              name="instagram"
              value={dataDiri.instagram || ""}
              onChange={(e) =>
                setDataDiri({ ...dataDiri, instagram: e.target.value })
              }
              placeholder="Instagram"
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="X"
              fullWidth
              name="x"
              value={dataDiri.x || ""}
              onChange={(e) => setDataDiri({ ...dataDiri, x: e.target.value })}
              placeholder="X"
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Github"
              fullWidth
              name="github"
              value={dataDiri.github || ""}
              onChange={(e) =>
                setDataDiri({ ...dataDiri, github: e.target.value })
              }
              placeholder="Github"
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

export default UpdateDatadiri;
