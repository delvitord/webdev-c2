import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate} from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Alert } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress"; 

const UpdateCustomUrl = ({ data, onCancelAdd, onSuccess }) => {
  const [CustomUrls, setCustomUrl] = useState({
    url_custom: data ? data.url_custom : "",

  });
  const navigate = useNavigate();

  useEffect(() => {
    console.log(data);
  }, []);

  const accessToken = localStorage.getItem("accessToken");
  const [isCanceled, setIsCanceled] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [isLoading, setLoading] = useState(false); 

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const updateCustomUrl = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const accessToken = localStorage.getItem("accessToken");
      //get id from id in find data diri
      const dataDiri = await axios.get("http://localhost:5000/datadiri", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const id = dataDiri.data[0].id;
      await axios.patch(
        `http://localhost:5000/custom_url/${id}`,
        CustomUrls,
        {
          headers,
        }
      );
      setShowSuccessAlert(true);
      setTimeout(() => {
        setLoading(true);
        setShowSuccessAlert(false);
        onSuccess(); // Call the `onSuccess` function passed from SkillList
        onCancelAdd(); // Close the AddSkill dialog
      }, 2000);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleCancel = () => {
    setIsCanceled(true);
    window.location.reload();
  };

  return (
    <>
      {showSuccessAlert && (
        <Alert severity="success" sx={{ marginBottom: 1 }}>
          Data CustomUrl berhasil disimpan
        </Alert>
      )}
      <form onSubmit={updateCustomUrl}>
        <Grid container spacing={0.8} mt={0.5} justifyContent="center">
          <Grid item sm={12}>
            <TextField
              label="Url Custom"
              fullWidth
              name="url_custom"
              value={CustomUrls.url_custom}
              onChange={(e) =>
                setCustomUrl({
                  ...CustomUrls,
                  url_custom: e.target.value,
                })
              }
              placeholder="ex: 'andy' is for /personal-web/andy"
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
              onClick={updateCustomUrl}
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

export default UpdateCustomUrl;
