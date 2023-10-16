import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";

const AddPortofolio = ({ onCancelAdd, onSuccess }) => {
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [file, setFile] = useState(null);
  const [fileSelected, setFileSelected] = useState(false);
  const [images, setImages] = useState([]);
  const [link, setLink] = useState("");
  const navigate = useNavigate();
  const [imagesSelected, setImagesSelected] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const [errors, setErrors] = useState({
    judul: "",
    deskripsi: "",
    file: "",
    link: "",
  });

  const handleCancel = () => {
    setIsCanceled(true);
    navigate(-1);
  };

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

    setErrors({
      judul: "",
      deskripsi: "",
      file: "",
      link: "",
    });

    if (!judul || !deskripsi || !file || !link) {
      // Validasi input
      if (!judul) {
        setErrors((prevErrors) => ({ ...prevErrors, judul: "Judul harus diisi." }));
      }
      if (!deskripsi) {
        setErrors((prevErrors) => ({ ...prevErrors, deskripsi: "Deskripsi harus diisi." }));
      }
      if (!file) {
        setErrors((prevErrors) => ({ ...prevErrors, file: "File harus diunggah." }));
      }
      if (!link) {
        setErrors((prevErrors) => ({ ...prevErrors, link: "Link harus diisi." }));
      }
    } else {
      // Jika semua input terisi, lanjutkan
      if (!isCanceled) {
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
          setShowSuccessAlert(true);
          setTimeout(() => {
            setShowSuccessAlert(false);
            onSuccess(); // Panggil fungsi `onSuccess` yang dilewatkan dari SkillList
            onCancelAdd(); // Tutup dialog AddSkill
          }, 2000);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  return (
    <>
      {showSuccessAlert && (
        <Alert severity="success" sx={{ marginBottom: 1 }}>
          Data Portofolio berhasil disimpan
        </Alert>
      )}
      <form onSubmit={savePortofolio} sx={{ margin: "auto" }}>
        <Grid container spacing={0.8} mt={0.5} justifyContent="center">
          <Grid>
            <TextField label="Judul" fullWidth value={judul} onChange={(e) => setJudul(e.target.value)} placeholder="Judul" variant="outlined" margin="normal" helperText={errors.judul} error={!!errors.judul} />
            <TextField
              label="Deskripsi"
              fullWidth
              multiline
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              placeholder="Deskripsi"
              variant="outlined"
              margin="normal"
              helperText={errors.deskripsi}
              error={!!errors.deskripsi}
            />
            <TextField label="Link" fullWidth value={link} onChange={(e) => setLink(e.target.value)} placeholder="Link" variant="outlined" margin="normal" helperText={errors.link} error={!!errors.link} />
            {/* Tambahkan pesan kesalahan untuk file */}
            {errors.file && (
              <Alert severity="error" sx={{ marginBottom: 1 }}>
                {errors.file}
              </Alert>
            )}

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
                  left: "6%",
                  transform: "translateX(-50%)",
                  marginBottom: "30px",
                }}
              >
                File
              </div>
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
                    {file.name}
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
                  <input type="file" accept=".pdf," id="file-upload" style={{ display: "none" }} onChange={handleFileChange} />
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
            <div
              style={{
                border: "1px solid #ccc",
                borderRadius: "6px",
                marginTop: "10px",
                marginBottom: "20px",
                position: "relative",
                paddingTop: "17px",
                paddingLeft: "15px",
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
                  left: "8%",
                  transform: "translateX(-50%)",
                  marginBottom: "30px",
                }}
              >
                Image
              </div>
              {images.length > 0 ? (
                <>
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
                        marginBottom: "10px",
                        backgroundColor: "white",
                        width: "60%",
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
                        {image.type}
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
                        {image.name}
                      </p>
                      <Button
                        type="button"
                        color="primary"
                        onClick={() => handleCancelImage(index)}
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
                  ))}
                  <input type="file" accept=".gif,.jpg,.jpeg,.png" multiple id="image-upload" style={{ display: "none" }} onChange={handleImagesChange} />
                  <label htmlFor="image-upload">
                    <Button
                      component="span"
                      variant="outlined"
                      color="primary"
                      style={{
                        marginBottom: "15px",
                      }}
                    >
                      Add More
                    </Button>
                  </label>
                </>
              ) : (
                <>
                  <input type="file" accept=".gif,.jpg,.jpeg,.png" multiple id="image-upload" style={{ display: "none" }} onChange={handleImagesChange} />
                  <label htmlFor="image-upload">
                    <Button component="span" variant="outlined" color="primary" style={{ marginBottom: "15px", marginTop: "2px" }}>
                      Pilih File
                    </Button>
                  </label>
                </>
              )}
            </div>
            <Grid container justifyContent="flex-end" sx={{ marginTop: "10px", marginBottom: "10px" }}>
              <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
                Save
              </Button>
              <Button variant="contained" color="error" sx={{ marginTop: 2, marginLeft: 1 }} onClick={handleCancel}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default AddPortofolio;
