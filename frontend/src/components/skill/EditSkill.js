import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import Alert from "@mui/material/Alert";

const EditSkill = ({ data, onCancelAdd, onSuccess }) => {
  const [skill, setSkill] = useState({
    id: data ? data.id : "",
    nama_skill: data ? data.nama_skill : "",
    level_keahlian: data ? data.level_keahlian : "",
  });

  const options = [
    { level_keahlian: "Pemula", id: 1 },
    { level_keahlian: "Menengah", id: 2 },
    { level_keahlian: "Ahli", id: 3 },
  ];

  const navigate = useNavigate();

  useEffect(() => {
    console.log(data)
  }, []); // Include `id` in the dependency array

  const accessToken = localStorage.getItem("accessToken");
  const [isCanceled, setIsCanceled] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const updateSkill = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/datadiri/skill/${skill.id}`, skill, {
        headers,
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
  };

  const handleCancel = () => {
    setIsCanceled(true); // Set isCanceled to true when Cancel is clicked
    window.location.reload();
  };

  return (
    <>
      {showSuccessAlert && (
        <Alert severity="success" sx={{ marginBottom: 1 }}>
          Data Pendidikan berhasil disimpan
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
                })
              }
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item sm={12}>
            <Autocomplete
              id="level_keahlian"
              options={options}
              value={options.find(
                (option) => option.id === skill.level_keahlian
              )}
              onChange={(e, newValue) =>
                setSkill({
                  ...skill,
                  level_keahlian: newValue ? newValue.id : null,
                })
              }
              getOptionLabel={(option) => option.level_keahlian}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Level keahlian"
                  sx={{ marginTop: 1 }}
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
      </form>
    </>
  );
};

export default EditSkill;
