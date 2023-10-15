import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Card, CardContent } from "@mui/material";

const AddPendidikan = () => {
  const [Pendidikan, setPendidikan] = useState({
    nama_instansi: "",
    awal_periode: "",
    akhir_periode: "",
    jurusan: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  // const getAccountId = async (e) => {
  //   const response = await axios.get(`http://localhost:5000/admin/${id}`);
  //   setAccountId(response.data.id);
  // };

  const savePendidikan = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem("accessToken");
      await axios.post(`http://localhost:5000/datadiri/pendidikan`, Pendidikan, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      navigate("/pendidikan");
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPendidikan({ ...Pendidikan, [name]: value });
  };


  return (
    <>
      <Grid container spacing={2} mt={5} justifyContent="center">
        <Grid>
          <Card sx={{ maxWidth: 450 }}>
            <CardContent>
              <form onSubmit={savePendidikan}>
                <TextField
                  label="Nama Instansi"
                  fullWidth
                  name="nama_instansi"
                  value={Pendidikan.nama_instansi}
                  onChange={handleInputChange}
                  placeholder="Nama Instansi"
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  label="Tahun Masuk"
                  fullWidth
                  type="date"
                  name="awal_periode"
                  value={Pendidikan.awal_periode}
                  onChange={handleInputChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  label="Tahun Lulus"
                  fullWidth
                  type="date"
                  name="akhir_periode"
                  value={Pendidikan.akhir_periode}
                  onChange={handleInputChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  label="Jurusan"
                  fullWidth
                  name="jurusan"
                  value={Pendidikan.jurusan}
                  onChange={handleInputChange}
                  placeholder="Jurusan"
                  variant="outlined"
                  margin="normal"
                />
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

export default AddPendidikan;
