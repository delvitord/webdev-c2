import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Card, CardContent } from "@mui/material";
import { Typography } from "@mui/material";

const AddPortofolio = () => {
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [file, setFile] = useState(null);
  const [fileSelected, setFileSelected] = useState(false);
  const [images, setImages] = useState([]);
  const [link, setLink] = useState("");
  const navigate = useNavigate();
  const [imagesSelected, setImagesSelected] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileSelected(true);
  };

  const handleCancelFile = () => {
    setFile(null);
    setFileSelected(false);
  };

  const handleImagesChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...selectedImages]);
    setImagesSelected(true);
  };
  
  const handleCancelImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
    if (updatedImages.length === 0) {
      setImagesSelected(false);
    }
  };

  const savePortofolio = async (e) => {
    e.preventDefault();

    const accessToken = localStorage.getItem("accessToken");

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": `multipart/form-data`,
    };

    const formData = new FormData();
    formData.append("judul", judul);
    formData.append("deskripsi", deskripsi);
    formData.append("file", file);
    formData.append("link", link);

    images.forEach((image) => {
      formData.append("image", image);
    });

    try {
      await axios.post("http://localhost:5000/datadiri/portofolio", formData, {
        headers,
      });
      navigate("/portofolio");
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
                  label="Link"
                  fullWidth
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="Link"
                  variant="outlined"
                  margin="normal"
                />
                <Typography variant="h6" gutterBottom>
                  File
                </Typography>
                {fileSelected ? (
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
                        backgroundColor: "red",
                        color: "white",
                        padding: "2px 4px",
                        borderRadius: "5px",
                        marginRight: "8px",
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
                      }}
                    >
                      {file.name}
                    </p>
                    <Button
                      type="button"
                      color="primary"
                      onClick={handleCancelFile}
                      style={{
                        marginRight: "5px",
                        paddingTop: "2px",
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
                      accept=".pdf,"
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
                          marginBottom: "20px",
                        }}
                      >
                        Pilih File
                      </Button>
                    </label>
                  </>
                )}
                <Typography variant="h6" gutterBottom>
                  Image
                </Typography>
                {images.length > 0 ? (
                  <>
                    <input
                      type="file"
                      accept=".gif,.jpg,.jpeg,.png"
                      multiple
                      id="image-upload"
                      style={{ display: "none" }}
                      onChange={handleImagesChange}
                    />
                    <label htmlFor="image-upload">
                      <Button
                        component="span"
                        variant="outlined"
                        color="primary"
                      >
                        Add More
                      </Button>
                    </label>
                    {images.map((image, index) => (
                      <div
                        key={image.name} // Menggunakan 'name' gambar sebagai kunci unik
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
                            backgroundColor: "red",
                            color: "white",
                            padding: "2px 4px",
                            borderRadius: "5px",
                            marginRight: "8px",
                          }}
                        >
                          Image
                        </div>
                        <p
                          style={{
                            marginRight: "8px",
                            flexGrow: 1,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {image.name}
                        </p>
                        <Button
                          type="button"
                          color="error"
                          onClick={() => handleCancelImage(index)}
                          sx={{ minWidth: 0, padding: 0, textTransform: "none" }}
                        >
                          X
                        </Button>
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    <input
                      type="file"
                      accept=".gif,.jpg,.jpeg,.png"
                      multiple
                      id="image-upload"
                      style={{ display: "none" }}
                      onChange={handleImagesChange}
                    />
                    <label htmlFor="image-upload">
                      <Button
                        component="span"
                        variant="outlined"
                        color="primary"
                      >
                        Pilih File
                      </Button>
                    </label>
                  </>
                )}
                <Typography variant="h6" gutterBottom>
                 
                </Typography>
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
