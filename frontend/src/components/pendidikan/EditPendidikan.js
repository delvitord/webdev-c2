import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Alert } from "@mui/material";

const UpdatePendidikan = (props) => {
  const [Pendidikan, setPendidikan] = useState({
    nama_instansi: "",
    awal_periode: "",
    akhir_periode: "",
    jurusan: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getPendidikanById();
  }, []);

  const accessToken = localStorage.getItem("accessToken");
  const [isCanceled, setIsCanceled] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const updatePendidikan = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/datadiri/pendidikan/${id}`, Pendidikan, {
        headers,
      });
      navigate("/pendidikan");
    } catch (error) {
      console.log(error);
    }
  };

  const getPendidikanById = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/datadiri/pendidikan/${id}`, {
        headers,
      });
      if (response.data) {
        const dataServer = response.data; // Gunakan data sebagai objek langsung

        // Set nilai dari data yang diperoleh ke dalam state
        setPendidikan({
          nama_instansi: dataServer.nama_instansi,
          awal_periode: dataServer.awal_periode,
          akhir_periode: dataServer.akhir_periode,
          jurusan: dataServer.jurusan,
        });
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setIsCanceled(true);
    navigate("/pendidikan");
  };

  return (
    <>
      {showSuccessAlert && (
        <Alert severity="success" sx={{ marginBottom: 1 }}>
          Data Pendidikan berhasil disimpan
        </Alert>
      )}
      <form onSubmit={updatePendidikan}>
        <Grid container spacing={0.8} mt={0.5} justifyContent="center">
          <Grid item sm={12}>
            <TextField
              label="Nama Instansi"
              fullWidth
              name="nama_instansi"
              value={Pendidikan.nama_instansi} // Gunakan nilai dari state
              onChange={(e) =>
                setPendidikan({
                  ...Pendidikan,
                  nama_instansi: e.target.value,
                })
              }
              placeholder="Nama instansi"
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              label="Tahun Masuk"
              fullWidth
              type="date"
              name="awal_periode"
              value={Pendidikan.awal_periode}
              onChange={(e) =>
                setPendidikan({
                  ...Pendidikan,
                  awal_periode: e.target.value,
                })
              }
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              label="Tahun Lulus"
              fullWidth
              type="date"
              name="akhir_periode"
              value={Pendidikan.akhir_periode}
              onChange={(e) =>
                setPendidikan({
                  ...Pendidikan,
                  akhir_periode: e.target.value,
                })
              }
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item sm={12}>
            <TextField
              label="Jurusan"
              fullWidth
              name="jurusan"
              value={Pendidikan.jurusan}
              onChange={(e) =>
                setPendidikan({
                  ...Pendidikan,
                  jurusan: e.target.value,
                })
              }
              placeholder="Jurusan"
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid container justifyContent="flex-end" sx={{ marginTop: "10px", marginBottom: "10px" }}>
            <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
              Update
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

export default UpdatePendidikan;
