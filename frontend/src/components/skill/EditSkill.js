import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Card, CardContent } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Alert from "@mui/material/Alert";
import { useMemo } from "react";

const EditSkill = () => {
  const { id } = useParams();
  const [nama_skill, setSkill] = useState(""); // Menyimpan nama skill
  const [level_keahlian, setLevelKeahlian] = useState(null); // Menyimpan level keahlian
  const [error, setError] = useState("");
  const [isCanceled, setIsCanceled] = useState(false);
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  const options = useMemo(
    () => [
      { level_keahlian: "Pemula", id: 1 },
      { level_keahlian: "Menengah", id: 2 },
      { level_keahlian: "Ahli", id: 3 },
    ],
    []
  );
  useEffect(() => {
    // Mengambil data skill berdasarkan ID saat komponen dimuat
    axios
      .get(`http://localhost:5000/datadiri/skill/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        const skillData = response.data;
        setSkill(skillData.nama_skill);
        setLevelKeahlian(options.find((option) => option.id === skillData.level_keahlian));
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id, options, accessToken]); // Include accessToken in the dependency array

  const updateSkill = async (e) => {
    e.preventDefault();

    setError(""); // Reset error state

    if (!isCanceled) {
      // Hanya validasi jika tidak dibatalkan
      if (!nama_skill && !level_keahlian) {
        setError("Nama Skill dan Level Keahlian harus diisi");
      } else if (!nama_skill) {
        setError("Nama Skill harus diisi");
      } else if (!level_keahlian) {
        setError("Level Keahlian harus diisi");
      }
    }

    if (!isCanceled && (nama_skill || level_keahlian)) {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const formData = new FormData();
      formData.append("nama_skill", nama_skill);
      formData.append("level_keahlian", level_keahlian.id);

      try {
        await axios.patch(`http://localhost:5000/datadiri/skill/${id}`, formData, {
          headers,
        });
        navigate("/skill");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleCancel = () => {
    setIsCanceled(true); // Set isCanceled to true when Cancel is clicked
    navigate(-1); // Navigate to the previous page
  };

  return (
    <Grid container spacing={2} mt={5} justifyContent="center">
      <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "center" }}>
        <Card sx={{ width: 450 }}>
          <CardContent>
            {error && <Alert severity="error">{error}</Alert>}
            <form onSubmit={updateSkill}>
              <TextField label="Nama Skill" fullWidth value={nama_skill} onChange={(e) => setSkill(e.target.value)} placeholder="Skill" variant="outlined" margin="normal" />
              <Autocomplete
                id="level_keahlian"
                options={options}
                value={level_keahlian}
                onChange={(event, newValue) => setLevelKeahlian(newValue)}
                getOptionLabel={(option) => option.level_keahlian}
                renderInput={(params) => <TextField {...params} label="Level keahlian" sx={{ marginTop: 1 }} />}
              />
              <Grid container justifyContent="flex-end">
                <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
                  Update
                </Button>
                <Button variant="contained" color="error" sx={{ marginTop: 2, marginLeft: 1 }} onClick={handleCancel}>
                  Cancel
                </Button>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default EditSkill;
