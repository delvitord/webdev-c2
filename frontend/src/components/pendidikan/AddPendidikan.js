import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Card, CardContent } from "@mui/material";

const AddPendidikan = () => {
  const [nama_instansi, setNamaInstansi] = useState("");
  const [awal_periode, setAwalPeriode] = useState("");
  const [akhir_periode, setAkhirPeriode] = useState("");
  const [jurusan, setJurusan] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  // const getAccountId = async (e) => {
  //   const response = await axios.get(`http://localhost:5000/admin/${id}`);
  //   setAccountId(response.data.id);
  // };

  const savePendidikan = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/pedidikan`, {
        nama_instansi,
        awal_periode,
        akhir_periode,
        jurusan,
      });
      navigate("/data-diri");
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
              <form onSubmit={savePendidikan}>
                <TextField
                  label="Nama Instansi"
                  fullWidth
                  value={nama_instansi}
                  onChange={(e) => setNamaInstansi(e.target.value)}
                  placeholder="Nama Instansi"
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  label="Tahun Masuk"
                  fullWidth
                  type="date"
                  value={awal_periode}
                  onChange={(e) => setAwalPeriode(e.target.value)}
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
                  value={akhir_periode}
                  onChange={(e) => setAkhirPeriode(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  label="Jurusan"
                  fullWidth
                  value={jurusan}
                  onChange={(e) => setJurusan(e.target.value)}
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
