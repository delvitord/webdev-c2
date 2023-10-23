import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

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
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    refreshToken(); 
    console.log(data);
  }, []);

  useEffect(() => {
      console.log("EFFECT File state cleared!", dataDiri.foto);
  }, [dataDiri]);

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
      setLoading(true);
      console.log("UPDATE File state cleared!", dataDiri.foto);
      const formData = new FormData();
      formData.append("nama", dataDiri.nama);
      formData.append("tempat_lahir", dataDiri.tempat_lahir);
      formData.append("tanggal_lahir", dataDiri.tanggal_lahir);
      formData.append("alamat", dataDiri.alamat);
      formData.append("email", dataDiri.email);
      formData.append("no_telp", dataDiri.no_telp);
      formData.append("foto", dataDiri.foto);
      formData.append("deskripsi", dataDiri.deskripsi);
      formData.append("linkedin", dataDiri.linkedin);
      formData.append("instagram", dataDiri.instagram);
      formData.append("x", dataDiri.x);
      formData.append("github", dataDiri.github);

      const response = await axios.patch("http://localhost:5000/data_diri", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data", // Penting untuk mengunggah berkas
        },
      });

      console.log("Server Response: ", response);
      setShowSuccessAlert(true);
      setTimeout(() => {
        setLoading(false);
        setShowSuccessAlert(false);
        onSuccess(); // Call the `onSuccess` function passed from SkillList
        onCancelAdd(); // Close the AddSkill dialog
      }, 2000);
      navigate("/datadiri");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setDataDiri({ ...dataDiri, foto: file });
  };

  const handleCancel = () => {
    setIsCanceled(true)
    window.location.reload();
  };

  const handleCancelFile = () => {
    // Clear the selected file in the state
    setDataDiri(prev => ({
      ...prev,
      foto: "",
    }));

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
            <div
              style={{
                border: "1px solid #ccc",
                borderRadius: "6px",
                marginTop: "10px",
                marginBottom: "20px",
                position: "relative",
                paddingTop: "18px",
                paddingLeft: "15px",
                paddingBottom: "3px",
              }}
            >
              <div
                style={{
                  backgroundColor: "white",
                  color: "black",
                  padding: "4px",
                  borderTopLeftRadius: "6px",
                  borderTopRightRadius: "6px",
                  fontSize: "14px",
                  position: "absolute",
                  top: "-18px",
                  left: "10%",
                  transform: "translateX(-50%)",
                  marginBottom: "30px",
                }}
              >
                Foto
              </div>
              {dataDiri.foto ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #ccc",
                    padding: "4px",
                    borderRadius: "6px",
                    marginTop: "10px",
                    marginBottom: "20px",
                    backgroundColor: "white",
                    width: "50%",
                    color: "#1976d2",
                    borderColor: "#1976d2",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#1976d2",
                      color: "white",
                      padding: "2px 4px",
                      borderRadius: "5px",
                      marginRight: "8px",
                      fontSize: "14px",
                    }}
                  >
                    PDF
                  </div>
                  <p
                    style={{
                      marginRight: "8px",
                      flexGrow: 1,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      fontSize: "14px",
                    }}
                  >
                    <a
                      href={dataDiri.foto}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View File
                    </a>
                  </p>
                  <Button
                    type="button"
                    color="primary"
                    onClick={handleCancelFile}
                    style={{
                      marginRight: "5px",
                      paddingTop: "2px",
                      fontSize: "12px",
                    }}
                    sx={{ minWidth: 0, padding: 0, textTransform: "none" }}
                  >
                    X
                  </Button>
                </div>
              ) : (
                <>
                  <input
                    type="file"
                    accept=".gif,.jpg,.jpeg,.png"
                    id="file-upload"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  <label htmlFor="file-upload">
                    <Button
                      component="span"
                      variant="outlined"
                      color="primary"
                      style={{
                        marginBottom: "10px",
                      }}
                    >
                      Pilih File
                    </Button>
                  </label>
                </>
              )}
            </div>
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
              disabled={isLoading} // Disable the button when loading
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Update"
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

export default UpdateDatadiri;
