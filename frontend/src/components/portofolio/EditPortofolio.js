import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";

const UpdatePortofolio = ({ data, onCancelAdd, onSuccess }) => {
  const [Portofolio, setPortofolio] = useState({
    id: data ? data.id : "",
    judul: data ? data.judul : "",
    deskripsi: data ? data.deskripsi : "",
    file: data ? data.file : "",
    images: data ? data.images : "",
    link: data ? data.link : "",
  });
  const navigate = useNavigate();

  const [imagesToDelete, setImagesToDelete] = useState([]);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);

  useEffect(() => {
    console.log(data)
  }, []);

  const accessToken = localStorage.getItem("accessToken");

  const updatePortofolio = async (e) => {
    e.preventDefault();

    // Hapus gambar yang terdaftar dalam state imagesToDelete dari daftar Portofolio.images
    const updatedImages = Portofolio.images.filter(
      (image) => !imagesToDelete.includes(image)
    );

    setPortofolio({
      ...Portofolio,
      images: updatedImages, // Perbarui daftar gambar tanpa yang dihapus
    });

    try {
      await axios.patch(
        `http://localhost:5000/datadiri/portofolio/${Portofolio.id}`,
        Portofolio,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": `multipart/form-data`,
          },
        }
      );

      setShowSuccessAlert(true);
      setTimeout(() => {
        setShowSuccessAlert(false);
        onSuccess(); // Panggil fungsi `onSuccess` yang dilewatkan dari SkillList
        onCancelAdd(); // Tutup dialog AddSkill
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (e) => {
    // Handle the file change and update the state with the selected file
    const selectedFile = e.target.files[0];
    setPortofolio({
      ...Portofolio,
      file: selectedFile,
    });
  };

  const handleCancelFile = () => {
    // Clear the selected file in the state
    setPortofolio({
      ...Portofolio,
      file: "",
    });
  };

  const handleImagesChange = (e) => {
    const selectedImages = e.target.files; // Menggunakan e.target.files untuk mendapatkan multiple files
    setPortofolio({
      ...Portofolio,
      images: selectedImages, // Perbarui daftar gambar yang dipilih
    });
  };

  const handleCancel = () => {
    setIsCanceled(true);
    navigate("/portofolio");
  };

  const handleCancelImage = (index) => {
    const updatedImages = [...Portofolio.images];
    updatedImages.splice(index, 1); // Hapus gambar sesuai dengan indeks
    setPortofolio({
      ...Portofolio,
      images: updatedImages, // Perbarui daftar gambar
    });
  };
  return (
    <>
      {showSuccessAlert && (
        <Alert severity="success" sx={{ marginBottom: 1 }}>
          Data Portofolio berhasil disimpan
        </Alert>
      )}
      <form onSubmit={updatePortofolio} sx={{ margin: "auto" }}>
        <Grid container spacing={0.8} mt={0.5} justifyContent="center">
          <Grid item>
            <TextField
              label="Judul"
              fullWidth
              name="judul"
              value={Portofolio.judul || ""}
              onChange={(e) =>
                setPortofolio({
                  ...Portofolio,
                  judul: e.target.value,
                })
              }
              placeholder="Judul"
              variant="outlined"
              margin="normal"
            />
            <TextField
              label="Deskripsi"
              fullWidth
              multiline
              value={Portofolio.deskripsi || ""}
              onChange={(e) =>
                setPortofolio({
                  ...Portofolio,
                  deskripsi: e.target.value,
                })
              }
              placeholder="Deskripsi"
              variant="outlined"
              margin="normal"
            />
            <TextField
              label="Link"
              fullWidth
              value={Portofolio.link || ""}
              onChange={(e) =>
                setPortofolio({
                  ...Portofolio,
                  link: e.target.value,
                })
              }
              placeholder="Link"
              variant="outlined"
              margin="normal"
            />

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
              {Portofolio.file ? (
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
                      href={Portofolio.file}
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
              {Portofolio.images && Portofolio.images.length > 0 ? (
                <>
                  {Portofolio.images.map((imageURL, index) => (
                    <div
                      key={index}
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
                        {imageURL.split(".").pop().toUpperCase()}
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
                          href={imageURL}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View File
                        </a>
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
                      style={{ marginBottom: "15px" }}
                    >
                      Add More
                    </Button>
                  </label>
                </>
              )}
            </div>
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
                Update
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
        </Grid>
      </form>
    </>
  );
};

export default UpdatePortofolio;
