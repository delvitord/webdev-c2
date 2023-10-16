import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Card, CardContent } from "@mui/material";


const UpdatePortofolio = () => {
  const [Portofolio, setPortofolio] = useState({
    judul: "",
    deskripsi: "",
    file: "",
    images: "",
    link: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const [imagesToDelete, setImagesToDelete] = useState([]);

  useEffect(() => {
    getPortofolioById();
  }, []);

  const accessToken = localStorage.getItem("accessToken");

  const updatePortofolio = async (e) => {
    e.preventDefault();
  
    // Hapus gambar yang terdaftar dalam state imagesToDelete dari daftar Portofolio.images
    const updatedImages = Portofolio.images.filter((image) => !imagesToDelete.includes(image));
  
    setPortofolio({
      ...Portofolio,
      images: updatedImages, // Perbarui daftar gambar tanpa yang dihapus
    });
  
    try {
      await axios.patch(`http://localhost:5000/datadiri/portofolio/${id}`, Portofolio, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": `multipart/form-data`,
        },
      });
  
      navigate("/portofolio");
    } catch (error) {
      console.log(error);
    }
  };

  const getPortofolioById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/datadiri/portofolio/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.data) {
        const dataServer = response.data;
        setPortofolio({
          judul: dataServer.judul,
          deskripsi: dataServer.deskripsi,
          link: dataServer.link,
          file: dataServer.file,
          images: dataServer.image, // Store the array of image URLs from the database
        });
      }
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
      <Grid container spacing={2} mt={5} justifyContent="center">
        <Grid item>
          <Card sx={{ maxWidth: 450 }}>
            <CardContent>
              <form onSubmit={updatePortofolio}>
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
                        <a href={Portofolio.file} target="_blank" rel="noopener noreferrer">
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
                  paddingLeft: "15px"
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
                    marginBottom: "30px"
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
                                    fontSize: "14px"
                                }}
                            >
                                {imageURL.split('.').pop().toUpperCase()}
                            </div>
                            <p
                            style={{
                              marginRight: "8px",
                              flexGrow: 1,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              fontSize: "14px"
                            }}
                          >
                            <a href={imageURL} target="_blank" rel="noopener noreferrer">
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

export default UpdatePortofolio;
