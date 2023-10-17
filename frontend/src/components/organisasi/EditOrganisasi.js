import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate} from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Alert } from "@mui/material";

const UpdateOrganisasi = ({ data, onCancelAdd, onSuccess }) => {
  const [organisasi, setOrganisasi] = useState({
    id: data ? data.id : "",
    nama_organisasi: data ? data.nama_organisasi : "",
    jabatan: data ? data.jabatan : "",
    awal_periode: data ? data.awal_periode : "",
    akhir_periode: data ? data.akhir_periode : "",
    deskripsi: data ? data.deskripsi : "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    console.log(data);
  }, []);

  const accessToken = localStorage.getItem("accessToken");
  const [isCanceled, setIsCanceled] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const updateOrganisasi = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `http://localhost:5000/datadiri/organisasi/${organisasi.id}`,
        organisasi,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
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
    window.location.reload();
  };

  return (
    <>
      {showSuccessAlert && (
        <Alert severity="success" sx={{ marginBottom: 1 }}>
          Data Pengalaman Organisasi berhasil disimpan
        </Alert>
      )}
      <form onSubmit={updateOrganisasi}>
        <Grid container spacing={0.8} mt={0.5} justifyContent="center">
          <Grid item sm={12}>
            <TextField
              label="Nama Organisasi"
              fullWidth
              name="nama_organisasi"
              value={organisasi.nama_organisasi}
              onChange={(e) =>
                setOrganisasi({
                  ...organisasi,
                  nama_organisasi: e.target.value,
                })
              }
              placeholder="Nama Organisasi"
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item sm={12}>
            <TextField
              label="Jabatan"
              fullWidth
              name="jabatan"
              value={organisasi.jabatan}
              onChange={(e) =>
                setOrganisasi({
                  ...organisasi,
                  jabatan: e.target.value,
                })
              }
              placeholder="Jabatan"
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              label="Tahun Mulai"
              fullWidth
              type="date"
              name="awal_periode"
              value={organisasi.awal_periode}
              onChange={(e) =>
                setOrganisasi({
                  ...organisasi,
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
              label="Tahun Selesai"
              fullWidth
              type="date"
              name="akhir_periode"
              value={organisasi.akhir_periode}
              onChange={(e) =>
                setOrganisasi({
                  ...organisasi,
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
              label="Deskripsi"
              fullWidth
              name="deskripsi"
              value={organisasi.deskripsi}
              onChange={(e) =>
                setOrganisasi({
                  ...organisasi,
                  deskripsi: e.target.value,
                })
              }
              placeholder="Deskripsi"
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
              onClick={updateOrganisasi}
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

export default UpdateOrganisasi;
