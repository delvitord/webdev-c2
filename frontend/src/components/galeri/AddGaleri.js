import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Card, CardContent } from "@mui/material";
import Alert from "@mui/material/Alert";

const AddGaleri = () => {
  const [nama_kegiatan, setNama_kegiatan] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [error, setError] = useState("");
  const [isCanceled, setIsCanceled] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const navigate = useNavigate();
  const [selectedImages, setSelectedImages] = useState([]);

  const saveGaleri = async (e) => {
    e.preventDefault();

    setError(""); // Reset error state

    if (!isCanceled) {
      if (!nama_kegiatan || !selectedImages.length || !deskripsi) {
        setError("Nama Kegiatan, Gambar, dan Deskripsi harus diisi");
      }
    }

    if (!isCanceled && (nama_kegiatan || selectedImages.length || deskripsi)) {
      const formData = new FormData();
      formData.append("nama_kegiatan", nama_kegiatan);
      formData.append("deskripsi", deskripsi);

      // Append each selected image to the FormData
      selectedImages.forEach((image, index) => {
        formData.append(`image${index}`, image);
      });

      try {
        const accessToken = localStorage.getItem("accessToken");

        await axios.post("http://localhost:5000/datadiri/galeri", formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": `multipart/form-data`,
          },
        });
        setShowSuccessAlert(true);
        setTimeout(() => {
          setShowSuccessAlert(false);
          navigate("/galeri");
        }, 2000);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleCancel = () => {
    setIsCanceled(true);
    navigate("/galeri");
  };


  const handleImagesChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    setSelectedImages(selectedImages);
  };

  return (
    <Grid container spacing={2} mt={5} justifyContent="center">
      <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "center" }}>
        <Card sx={{ width: 450 }}>
          <CardContent>
            {error && <Alert severity="error">{error}</Alert>}
            {showSuccessAlert && (
              <Alert severity="success" sx={{ marginBottom: 1 }}>
                Data Galeri berhasil disimpan
              </Alert>
            )}
            <form onSubmit={saveGaleri}>
              <TextField label="Nama Kegiatan" fullWidth value={nama_kegiatan} onChange={(e) => setNama_kegiatan(e.target.value)} placeholder="Galeri" variant="outlined" margin="normal" />
              <input type="file" accept="image/*" multiple onChange={handleImagesChange} />
              <TextField label="Deskripsi" fullWidth value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} placeholder="Galeri" variant="outlined" margin="normal" />
              <Grid container justifyContent="flex-end">
                <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
                  Save
                </Button>
                <Button variant="contained" color="error" sx={{ marginTop: 2, marginLeft: 1 }} onClick={handleCancel}>
                  Cancel
                </Button>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AddGaleri;
