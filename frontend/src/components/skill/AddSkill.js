import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

const AddSkill = ({ onCancelAdd, onSuccess }) => {
  const [skill, setSkill] = useState({
    nama_skill: "",
    level_keahlian: null,
    errorNamaSkill: false,
    errorLevelKeahlian: false,
  });

  const options = [
    { level_keahlian: "Pemula", id: 1 },
    { level_keahlian: "Menengah", id: 2 },
    { level_keahlian: "Ahli", id: 3 },
  ];

  const [isCanceled, setIsCanceled] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [errorAlert, setErrorAlert] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSkill((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleCancel = () => {
    setIsCanceled(true);
    onCancelAdd();
  };

  const saveSkill = async (e) => {
    e.preventDefault();

    if (!skill.nama_skill || !skill.level_keahlian) {
      setSkill((prevState) => ({
        ...prevState,
        errorNamaSkill: !skill.nama_skill,
        errorLevelKeahlian: !skill.level_keahlian,
      }));
      setErrorAlert("Lengkapi semua isian sebelum menyimpan.");
    } else {
      if (!isCanceled) {
        setLoading(true);
        const accessToken = localStorage.getItem("accessToken");

        const formData = new FormData();
        formData.append("nama_skill", skill.nama_skill);
        formData.append("level_keahlian", skill.level_keahlian);

        try {
          const response = await axios.post("http://localhost:5000/datadiri/skill", formData, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          console.log("Response from server:", response);
          setShowSuccessAlert(true);
          setErrorAlert("");
          setTimeout(() => {
            setLoading(false);
            setShowSuccessAlert(false);
            onSuccess();
            onCancelAdd();
          }, 2000);
        } catch (error) {
          setLoading(false);
          console.log(error);
          setErrorAlert("Terjadi kesalahan saat menyimpan data skill.");
        }
      }
    }
  };

  return (
    <>
      {showSuccessAlert && (
        <Alert severity="success" sx={{ marginBottom: 1 }}>
          Data Skill berhasil disimpan
        </Alert>
      )}
      <form onSubmit={saveSkill}>
        <Grid container spacing={0.8} mt={0.5} justifyContent="center">
          <Grid item sm={12}>
            <TextField
              label="Nama Skill"
              fullWidth
              name="nama_skill"
              value={skill.nama_skill}
              onChange={handleInputChange}
              placeholder="Nama Skill"
              variant="outlined"
              margin="normal"
              error={skill.errorNamaSkill}
              helperText={skill.errorNamaSkill ? "Nama Skill harus diisi" : ""}
            />
          </Grid>
          <Grid item sm={12}>
            <Autocomplete
              id="skill.level_keahlian"
              options={options}
              value={options.find((option) => option.id === skill.level_keahlian) || null}
              onChange={(_, newValue) => setSkill({ ...skill, level_keahlian: newValue ? newValue.id : null })}
              getOptionLabel={(option) => option.level_keahlian} // Menggunakan level_keahlian sebagai label
              renderInput={(params) => <TextField {...params} label="Level Keahlian" sx={{ marginTop: 1 }} error={skill.errorLevelKeahlian} />}
              helperText={skill.errorLevelKeahlian ? "Level Keahlian harus diisi" : ""}
            />
          </Grid>
          <Grid container justifyContent="flex-end" sx={{ marginTop: "10px", marginBottom: "10px" }}>
            <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }} disabled={isLoading}>
              {isLoading ? <CircularProgress size={24} color="inherit" /> : "Save"}
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

export default AddSkill;
