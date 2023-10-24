import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

const EditSkill = ({ data, onCancelAdd, onSuccess }) => {
  const [skill, setSkill] = useState({
    id: data ? data.id : "",
    nama_skill: data ? data.nama_skill : "",
    level_keahlian: data ? data.level_keahlian : "",
    errorNamaSkill: "",
    errorLevelKeahlian: "",
  });

  const options = [
    { level_keahlian: "Pemula", id: 1 },
    { level_keahlian: "Menengah", id: 2 },
    { level_keahlian: "Ahli", id: 3 },
  ];

  const navigate = useNavigate();

  useEffect(() => {
    console.log(data);
  }, []); // Include `id` in the dependency array

  const accessToken = localStorage.getItem("accessToken");
  const [isCanceled, setIsCanceled] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const updateSkill = async (e) => {
    e.preventDefault();
    if (!skill.nama_skill) {
      setSkill({ ...skill, errorNamaSkill: "Nama Skill harus diisi" });
      return; // Stop the update if nama_skill is empty
    }
    if (!skill.level_keahlian) {
      setSkill({ ...skill, errorLevelKeahlian: "Level Keahlian harus diisi" });
      return; // Stop the update if nama_skill is empty
    }
    try {
      setLoading(true); // Start loading animation
      await axios.patch(`http://localhost:5000/datadiri/skill/${skill.id}`, skill, {
        headers,
      });
      setShowSuccessAlert(true);
      setTimeout(() => {
        setLoading(false); // Stop loading animation
        setShowSuccessAlert(false);
        onSuccess();
        onCancelAdd();
      }, 2000);
    } catch (error) {
      setLoading(false); // Stop loading animation in case of an error
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
          Data Skill berhasil disimpan
        </Alert>
      )}
      <form onSubmit={updateSkill}>
        <Grid container spacing={0.8} mt={0.5} justifyContent="center">
          <Grid item sm={12}>
            <TextField
              label="Nama Skill"
              fullWidth
              value={skill.nama_skill}
              onChange={(e) =>
                setSkill({
                  ...skill,
                  nama_skill: e.target.value,
                  errorNamaSkill: "", // Clear the error when user types
                })
              }
              variant="outlined"
              margin="normal"
              error={!!skill.errorNamaSkill} // Set error state
              helperText={skill.errorNamaSkill} // Display error message
            />
          </Grid>
          <Grid item sm={12}>
            <Autocomplete
              id="level_keahlian"
              options={options}
              value={options.find((option) => option.id === skill.level_keahlian)}
              onChange={(e, newValue) =>
                setSkill({
                  ...skill,
                  level_keahlian: newValue ? newValue.id : null,
                  errorLevelKeahlian: "",
                })
              }
              getOptionLabel={(option) => option.level_keahlian}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Level keahlian"
                  sx={{ marginTop: 1 }}
                  error={!!skill.errorLevelKeahlian} // Set error state
                  helperText={skill.errorLevelKeahlian} // Display error message
                />
              )}
            />
          </Grid>
          <Grid container justifyContent="flex-end">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ marginTop: 2 }}
              onClick={updateSkill}
              disabled={isLoading} // Disable the button when loading
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : "Update"}
              {/* Display loading animation when isLoading is true */}
            </Button>
            <Button variant="contained" color="error" sx={{ marginTop: 2, marginLeft: 1 }} onClick={handleCancel}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default EditSkill;
