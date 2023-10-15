import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Card, CardContent } from "@mui/material";

const UpdateDatadiri = () => {
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
  const navigate = useNavigate();
  const [ token, setToken ] = useState("");

  useEffect(() => {
    refreshToken(); // Refresh the token when the component mounts
    getDatadiri(); // Fetch data from the server when the component mounts
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
      console.log(response.data)
      console.log(
        "Token in local storage: ",
        localStorage.getItem("accessToken")
      );
    } catch (error) {
      console.log(error);
    }
  };

  const updateDatadiri = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:5000/data_diri`,
        dataDiri,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(
        "Token in local storage: ",
        localStorage.getItem("accessToken")
      );
      console.log("Server Response: ", response);
      navigate("/datadiri");
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      <Grid container spacing={2} mt={5} justifyContent="center">
        <Grid item>
          <Card sx={{ maxWidth: 450 }}>
            <CardContent>
              <form onSubmit={updateDatadiri}>
                {/* Render input fields for dataDiri */}
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
                <TextField
                  label="Foto"
                  fullWidth
                  type="file"
                  name="foto"
                  value={dataDiri.foto || ""}
                  onChange={(e) =>
                    setDataDiri({ ...dataDiri, nama: e.target.value })
                  }
                  inputProps={{ accept: "image/*" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  margin="normal"
                />
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
                <TextField
                  label="X"
                  fullWidth
                  name="x"
                  value={dataDiri.x || ""}
                  onChange={(e) =>
                    setDataDiri({ ...dataDiri, x: e.target.value })
                  }
                  placeholder="X"
                  variant="outlined"
                  margin="normal"
                />
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
                <Button type="submit" variant="contained" color="primary">
                  Update
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default UpdateDatadiri;
