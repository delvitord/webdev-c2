import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress"; 

const AddCustomUrl = ({ onCancelAdd, onSuccess }) => {
  const [customUrl, setCustomUrl] = useState({
    url_custom: "",
    errorUrlCustom: false,
  });

  const [isCanceled, setIsCanceled] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [isLoading, setLoading] = useState(false); 
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomUrl((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleCancel = () => {
    setIsCanceled(true);
    window.location.reload();
  };

  const saveCustomUrl = async (e) => {
    e.preventDefault();

    // Validasi input
    if (!customUrl.url_custom) {
      // Menampilkan pesan error pada setiap TextField yang kosong
      setCustomUrl((prevState) => ({
        ...prevState,
        errorUrlCustom: !customUrl.url_custom,
      }));
    } else {
      // Jika semua input terisi, lanjutkan
      if (!isCanceled) {
        const accessToken = localStorage.getItem("accessToken");
        //get id from id in find data diri
        const dataDiri = await axios.get("http://localhost:5000/datadiri", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const id = dataDiri.data[0].id;
        
        const formData = new FormData();
        formData.append("url_custom", customUrl.url_custom);

        try {
          setLoading(true);
          const response = await axios.post(`http://localhost:5000/custom_url/${id}`, formData);
          console.log(response);
          setShowSuccessAlert(true);
          setTimeout(() => {
            setShowSuccessAlert(false);
            setLoading(false);
            onSuccess();
            onCancelAdd();
          }, 2000);
        } catch (error) {
          if (error.response && error.response.data && error.response.data.error) {
            const errorMsg = error.response.data.error;
            setMsg(errorMsg);
            setShowErrorMsg(true);
            setTimeout(() => {
              setShowErrorMsg(false);
            }, 2000);
          }
          setLoading(false);
          console.log(error);
          console.log(error.response);
        }        
      }
    }
  };

  return (
    <>
      {showSuccessAlert && (
        <Alert severity="success" sx={{ marginBottom: 1 }}>
          Data Custom Url berhasil disimpan
        </Alert>
      )}
      {showErrorMsg && (
        <Alert severity="error" sx={{ marginBottom: 1 }}>
          {msg}
        </Alert>
      )}
      <form onSubmit={saveCustomUrl}>
        <Grid container spacing={0.8} mt={0.5} justifyContent="center">
          <Grid item sm={12}>
            <TextField
              label="Url Custom"
              fullWidth
              name="url_custom"
              value={customUrl.url_custom}
              onChange={handleInputChange}
              placeholder="ex: 'andy' is for /personal-web/andy"
              variant="outlined"
              margin="normal"
              error={customUrl.errorUrlCustom}
              helperText={
                customUrl.errorUrlCustom ? "Url Custom harus diisi" : ""
              }
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
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Save"
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

export default AddCustomUrl;
