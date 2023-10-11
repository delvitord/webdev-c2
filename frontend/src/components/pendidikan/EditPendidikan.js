import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Card, CardContent } from "@mui/material";

const UpdatePendidikan = () => {
  const [nama_instansi, setNamaInstansi] = useState("");
  const [awal_periode, setAwalPeriode] = useState("");
  const [akhir_periode, setAkhirPeriode] = useState("");
  const [jurusan, setJurusan] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getPendidikanById();
  }, []);

  const updatePendidikan = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      };
      
      await axios.patch(`http://localhost:5000/pendidikan/${id}`, {
        nama_instansi,
        awal_periode,
        akhir_periode,
        jurusan,
      }, { headers });
      
      navigate("/pendidikan");
    } catch (error) {
      console.log(error);
    }
  };

  const getPendidikanById = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await axios.get(`http://localhost:5000/pendidikan/${id}`, { headers });
    setNamaInstansi(response.data.nama_instansi);
    setAwalPeriode(response.data.awal_periode);
    setAkhirPeriode(response.data.akhir_periode);
    setJurusan(response.data.jurusan);
  };

  return (
    <>
      <Grid container spacing={2} mt={5} justifyContent="center">
        <Grid item>
          <Card sx={{ maxWidth: 450 }}>
            <CardContent>
              <form onSubmit={updatePendidikan}>
                <TextField
                  label="Nama Instansi"
                  fullWidth
                  value={nama_instansi}
                  onChange={(e) => setNamaInstansi(e.target.value)}
                  placeholder="Nama instansi"
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  label="Tahun Masuk"
                  fullWidth
                  type="date"
                  value={awal_periode}
                  onChange={(e) => setAwalPeriode(e.target.value)}
                  placeholder="Tahun Masuk"
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  label="Tahun Lulus"
                  fullWidth
                  type="date"
                  value={akhir_periode}
                  onChange={(e) => setAkhirPeriode(e.target.value)}
                  placeholder="Tahun Lulus"
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  label="Jurusan"
                  fullWidth
                  value={jurusan}
                  onChange={(e) => setJurusan(e.target.value)}
                  placeholder="Alamat"
                  variant="outlined"
                  margin="normal"
                />
                <Button type="submit" variant="contained" color="primary">
                  Update
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default UpdatePendidikan;
