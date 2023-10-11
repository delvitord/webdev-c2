import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Card, CardContent } from "@mui/material";

const AddPortofolio = () => {
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);
  const [link, setLink] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    // Mengambil file dari input
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleImagesChange = (e) => {
    // Mengambil multiple image files dari input
    const selectedImages = Array.from(e.target.files);
    setImages(selectedImages);
  };

  const savePortofolio = async (e) => {
    e.preventDefault();
  
    // Mengambil token akses dari penyimpanan lokal
    const accessToken = localStorage.getItem("accessToken");
  
    // Membuat header dengan otorisasi Bearer
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': `multipart/form-data`,
    };
  
    // Membuat FormData untuk mengirim data yang kompleks (file, image) ke server
    const formData = new FormData();
    formData.append("judul", judul);
    formData.append("deskripsi", deskripsi);
    formData.append("file", file);
    formData.append("link", link);
  
    // Menambahkan setiap gambar ke FormData, bahkan jika tidak ada gambar yang dipilih
    images.forEach((image) => {
      formData.append('image', image);
    });
  
    try {
      await axios.post("http://localhost:5000/datadiri/portofolio", formData, {
        headers, // Menggunakan header yang sudah dibuat
      });
      navigate("/portofolio"); // Redirect setelah berhasil menambahkan portofolio
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <>
      <Grid container spacing={2} mt={5} justifyContent="center">
        <Grid>
          <Card sx={{ maxWidth: 450 }}>
            <CardContent>
              <form onSubmit={savePortofolio}>
                <TextField
                  label="Judul"
                  fullWidth
                  value={judul}
                  onChange={(e) => setJudul(e.target.value)}
                  placeholder="Judul"
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  label="Deskripsi"
                  fullWidth
                  multiline
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  placeholder="Deskripsi"
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  type="file"
                  label="File"
                  fullWidth
                  onChange={handleFileChange}
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImagesChange}
                />
                <TextField
                  label="Link"
                  fullWidth
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="Link"
                  variant="outlined"
                  margin="normal"
                />
                <Button type="submit" variant="contained" color="primary">
                  Save
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default AddPortofolio;
