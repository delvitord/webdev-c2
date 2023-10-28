import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import { Card, CardContent } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const UpdatePortofolio = ({data, onCancelAdd, onSuccess}) => {
  const [Portofolio, setPortofolio] = useState({
    id: data ? data.id : "",
    judul: data ? data.judul : "",
    deskripsi: data ? data.deskripsi : "",
    file: data ? data.file :  "",
    image: data ? data.image : "",
    link: data ? data.link : "",
  });
  console.log("ini data PORTOOO", Portofolio)
  let id = data ? data.id : "";
  
  const navigate = useNavigate();
  const [image, setImage] = useState([]);
  const [imageSelected, setImageSelected] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);

  useEffect(() => {
    console.log(data)
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


    console.log("image selected")
    const formData = new FormData();
    //append formData with field in portofolio
    formData.append("judul", Portofolio.judul);
    formData.append("deskripsi", Portofolio.deskripsi);
    formData.append("link", Portofolio.link);
    formData.append("file", Portofolio.file);
    formData.append(`image`, Portofolio.image);

    console.log("ini formdata",formData.get("image"))

    try {
      setLoading(true);
      await axios.patch(`http://localhost:5000/datadiri/portofolio/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": `multipart/form-data`,
        },
      });
      setShowSuccessAlert(true);
      setTimeout(() => {
        setLoading(false);
        setShowSuccessAlert(false);
        onSuccess(); // Call the `onSuccess` function passed from SkillList
        onCancelAdd(); // Close the AddSkill dialog
      }, 2000);
    } catch (error) {
      setLoading(false);
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
    // Handle the file change and update the state with the selected file
    const selectedImage = e.target.files[0];
    setPortofolio({
      ...Portofolio,
      image: selectedImage,
    });
  };

  const handleCancelImage = () => {
    // Clear the selected file in the state
    setPortofolio({
      ...Portofolio,
      image: "",
    });
  };  

  const handleCancel = () => {
    setIsCanceled(true);
    window.location.reload();
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
                  left: "7%",
                  transform: "translateX(-50%)",
                  marginBottom: "30px",
                }}
              >
                Image
              </div>
              {Portofolio.image ? (
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
                    {/* {Portofolio.image.split(".").pop().toUpperCase()} */}
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
                      href={Portofolio.image}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Image
                    </a>
                  </p>
                  <Button
                    type="button"
                    color="primary"
                    onClick={handleCancelImage}
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
                        marginBottom: "10px",
                      }}
                    >
                      Pilih Image
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
        </Grid>
      </form>
    </>
  );
};

export default UpdatePortofolio;
