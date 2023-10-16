import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate} from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Alert } from "@mui/material";

const UpdatePendidikan = ({ data, onCancelAdd, onSuccess }) => {
  const [Pendidikans, setPendidikan] = useState({
    id: data ? data.id : "", // Mengecek apakah data ada sebelum mengakses properti 'id'
    nama_instansi: data ? data.nama_instansi : "",
    awal_periode: data ? data.awal_periode : "",
    akhir_periode: data ? data.akhir_periode : "",
    jurusan: data ? data.jurusan : "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    console.log(data);
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
      await axios.patch(
        `http://localhost:5000/datadiri/pendidikan/${Pendidikans.id}`,
        Pendidikans,
        {
          headers,
        }
      );
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
              value={Pendidikans.nama_instansi}
              onChange={(e) =>
                setPendidikan({
                  ...Pendidikans,
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
              value={Pendidikans.awal_periode}
              onChange={(e) =>
                setPendidikan({
                  ...Pendidikans,
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
              value={Pendidikans.akhir_periode}
              onChange={(e) =>
                setPendidikan({
                  ...Pendidikans,
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
              value={Pendidikans.jurusan}
              onChange={(e) =>
                setPendidikan({
                  ...Pendidikans,
                  jurusan: e.target.value,
                })
              }
              placeholder="Jurusan"
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid
            container
            justifyContent="flex-end"
            sx={{ marginTop: "10px", marginBottom: "10px" }}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ marginTop: 2 }}
              onClick={updatePendidikan}
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

export default UpdatePendidikan;
