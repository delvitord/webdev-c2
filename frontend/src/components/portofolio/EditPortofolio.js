import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import { Card, CardContent } from "@mui/material";

const UpdatePortofolio = ({data, onCancelAdd, onSuccess}) => {
  const [Portofolio, setPortofolio] = useState({
    id: data ? data.id : "",
    judul: data ? data.judul : "",
    deskripsi: data ? data.deskripsi : "",
    file: data ? data.file :  "",
    image: data ? data.image : [""],
    link: data ? data.link : "",
  });
  console.log("ini data PORTOOO", Portofolio)
  let id = data ? data.id : "";
  
  const navigate = useNavigate();
  const [image, setImage] = useState([]);
  const [imageSelected, setImageSelected] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);

  useEffect(() => {
    getPortofolioById();
  }, []);

  useEffect(() => {
    console.log("Ini Di EFEK",Portofolio)
  }, [Portofolio]);

  console.log(Portofolio)

  const accessToken = localStorage.getItem("accessToken");

  const updatePortofolio = async (e) => {
    e.preventDefault();
    
    // Hapus gambar yang terdaftar dalam state imageToDelete dari daftar Portofolio.image
    console.log("diLUARRR",Portofolio)
    console.log("diLUARRR ID",id)
    const newPortofolio = Portofolio;

    if (imageSelected) {
      //Add image to setPortofolio.image
      setPortofolio(prev => ({
        ...prev, 
        image: [...prev.image, image],
      }));
      newPortofolio.image = [...Portofolio.image, ...image.flat()];
    } else {

      if(Portofolio.image?.length === 0){
        const arrayEmpty = [""]
        setPortofolio({
          ...Portofolio,
          image: arrayEmpty, // Perbarui daftar gambar ya ng dipilih
        });
      }
    }

    console.log("diLUARRR Portofolio",Portofolio)
    console.log("diLUARRR nwPortofolio",newPortofolio)
    if(imageSelected){
      console.log("image selected")
      const formData = new FormData();
      //append formData with field in portofolio
      formData.append("judul", newPortofolio.judul);
      formData.append("deskripsi", newPortofolio.deskripsi);
      formData.append("link", newPortofolio.link);
      formData.append("file", newPortofolio.file);
      //append formData with image
      for (let i = 0; i < newPortofolio.image.length; i++) {
        formData.append("image", newPortofolio.image[i]);
      }
      console.log("ini formdata",formData.get("image"))

      try {
        await axios.patch(`http://localhost:5000/datadiri/portofolio/${id}`, formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": `multipart/form-data`,
          },
        });
        setShowSuccessAlert(true);
        setTimeout(() => {
          setShowSuccessAlert(false);
          onSuccess(); // Call the `onSuccess` function passed from SkillList
          onCancelAdd(); // Close the AddSkill dialog
        }, 2000);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await axios.patch(`http://localhost:5000/datadiri/portofolio/${id}`, newPortofolio, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setShowSuccessAlert(true);
        setTimeout(() => {
        setShowSuccessAlert(false);
        onSuccess(); // Call the `onSuccess` function passed from SkillList
        onCancelAdd(); // Close the AddSkill dialog
      }, 2000);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getPortofolioById = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/datadiri/portofolio/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.data) {
        const dataServer = response.data;
        setPortofolio({
          judul: dataServer.judul,
          deskripsi: dataServer.deskripsi,
          link: dataServer.link,
          file: dataServer.file,
          image: dataServer.image, // Store the array of image URLs from the database
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

  const handleImageChange = (e) => {
    const selectedImage = Array.from(e.target.files);
    setImage((prevImage) => [...prevImage, ...selectedImage]);
    setImageSelected(true);
    console.log("ini image",image)
  };

  const handleCancelNewImage = (index) => {
    const updatedImages = [...image];
    updatedImages.splice(index, 1);
    setImage(updatedImages);
    if (updatedImages.length === 0) {
      setImageSelected(false);
    }
  };

 const handleCancelImage = (index) => {
    // Remove the image at the specified index from the image array
    const updatedImage = [...Portofolio.image];
    updatedImage.splice(index, 1);
    setPortofolio(prev => ({
      ...prev,
      image: updatedImage,
    }));
    
  };  
  const handleCancel = () => {
    setIsCanceled(true);
    navigate("/portofolio");
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
                    left: "12%",
                    transform: "translateX(-50%)",
                    marginBottom: "30px"
                  }}
                >
                  Image Lalu
                </div>
                    {Portofolio.image && Portofolio.image.length > 0 ? (
                        <>
                        {Portofolio.image.map((imageURL, index) => {
                          if (typeof imageURL === 'string') {
                            return (
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
                                  {imageURL.split('.').pop().toUpperCase()}
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
                            );
                          }
                          return null; // Skip rendering if imageURL is not a string
                        })}
                        </>
                    ) : (
                        <>
                        <p
                        style={{marginBottom: "14px",}}
                        >
                        Image tidak ada
                        </p>
                        
                        </>
                    )
                    
                    }
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
            left: "12%",
            transform: "translateX(-50%)",
            marginBottom: "30px"
          }}
        >
          Image Baru
        </div>
          {image.length > 0 ? (
            <>
              {image.map((image, index) => (
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
                      fontSize: "14px"
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
                      fontSize: "14px"
                    }}
                  >
                    {image.name}
                  </p>
                  <Button
                    type="button"
                    color="primary"
                    onClick={() => handleCancelNewImage(index)}
                    style={{
                      marginRight: "5px",
                      paddingTop: "2px",
                      fontSize: "12px"
                    }}
                    sx={{ minWidth: 0, padding: 0, textTransform: "none" }}
                  >
                    X
                  </Button>
                </div>
              ))}
              <input
                type="file"
                accept=".gif,.jpg,.jpeg,.png"
                multiple
                id="image-upload"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
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
              <input
                type="file"
                accept=".gif,.jpg,.jpeg,.png"
                multiple
                id="image-upload"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              <label htmlFor="image-upload">
                <Button
                  component="span"
                  variant="outlined"
                  color="primary"
                  style={{ marginBottom: "15px", marginTop: "2px", }}
                >
                  Pilih File
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
              onClick={updatePortofolio}
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
