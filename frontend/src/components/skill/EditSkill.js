import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import Alert from "@mui/material/Alert";

const EditSkill = (onCancelAdd, onSuccess, props) => {
  const [skill, setSkill] = useState({
    nama_skill: "",
    level_keahlian: "",
  });

  const options = [
    { level_keahlian: "Pemula", id: 1 },
    { level_keahlian: "Menengah", id: 2 },
    { level_keahlian: "Ahli", id: 3 },
  ];

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getSkillById();
  }, [id]); // Include `id` in the dependency array

  const accessToken = localStorage.getItem("accessToken");
  const [isCanceled, setIsCanceled] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [error, setError] = useState("");

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const updateSkill = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/datadiri/skill/${id}`, skill, {
        headers,
      });
      navigate("/skill");
    } catch (error) {
      console.log(error);
    }
  };

  const getSkillById = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/datadiri/skill/${id}`, {
        headers,
      });
      if (response.data) {
        const dataServer = response.data; // Gunakan data sebagai objek langsung

        // Set nilai dari data yang diperoleh ke dalam state
        setSkill({
          nama_skill: dataServer.nama_skill,
          level_keahlian: dataServer.level_keahlian,
        });
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setIsCanceled(true); // Set isCanceled to true when Cancel is clicked
    navigate("/skill");
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
            <TextField label="Nama Skill" fullWidth value={skill.nama_skill} onChange={(e) => setSkill(e.target.value)} variant="outlined" margin="normal" />
          </Grid>
          <Grid item sm={12}>
            <Autocomplete
              id="level_keahlian"
              options={options}
              value={skill.level_keahlian}
              onChange={(e) => setSkill(e.target.value)}
              getOptionLabel={(option) => option.level_keahlian}
              renderInput={(params) => <TextField {...params} label="Level keahlian" sx={{ marginTop: 1 }} />}
            />
          </Grid>
          <Grid container justifyContent="flex-end">
            <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
              Save
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
