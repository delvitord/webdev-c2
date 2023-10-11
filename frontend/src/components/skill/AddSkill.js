import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Card, CardContent } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

const AddSkill = () => {
  const [nama_skill, setSkill] = useState("");
  const [level_keahlian, setLevelKeahlian] = useState("ahli"); // Default to "ahli"
  const navigate = useNavigate();

  const saveSkill = async (e) => {
    e.preventDefault();

    // Mengambil token akses dari penyimpanan lokal
    const accessToken = localStorage.getItem("accessToken");

    // Membuat header dengan otorisasi Bearer
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    // Membuat FormData untuk mengirim data yang kompleks (file, image) ke server
    const formData = new FormData();
    formData.append("nama_skill", nama_skill);
    formData.append("level_keahlian", level_keahlian);

    try {
      await axios.post("http://localhost:5000/datadiri/skill", formData, {
        headers, // Menggunakan header yang sudah dibuat
      });
      navigate("/skill"); // Redirect setelah berhasil menambahkan skill
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Grid container spacing={2} mt={5} justifyContent="center">
        <Grid>
          <Card sx={{ maxWidth: 450 }}>
            <CardContent>
              <form onSubmit={saveSkill}>
                <TextField label="Nama Skill" fullWidth value={nama_skill} onChange={(e) => setSkill(e.target.value)} placeholder="Skill" variant="outlined" margin="normal" />
                <InputLabel id="level-label">Level Keahlian</InputLabel>
                <Select labelId="level-label" id="level" fullWidth value={level_keahlian} onChange={(e) => setLevelKeahlian(e.target.value)} variant="outlined" margin="normal">
                  <MenuItem value="ahli">Ahli</MenuItem>
                  <MenuItem value="berpengalaman">Berpengalaman</MenuItem>
                  <MenuItem value="Terampil">Terampil</MenuItem>
                  <MenuItem value="Menengah">Menengah</MenuItem>
                  <MenuItem value="Pemula">Pemula</MenuItem>
                </Select>
                <Button type="submit" variant="contained" color="primary">
                  Save
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default AddSkill;
