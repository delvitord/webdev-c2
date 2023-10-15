import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Card, CardContent } from "@mui/material";

const UpdateOrganisasi = () => {
  const [organisasi, setOrganisasi] = useState({
    nama_organisasi: "",
    jabatan: "",
    awal_periode: "",
    akhir_periode: "",
    deskripsi: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getOrganisasiById();
  }, []);

  const accessToken = localStorage.getItem("accessToken");

  const updateOrganisasi = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `http://localhost:5000/datadiri/organisasi/${id}`,
        organisasi,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      navigate("/organisasi");
    } catch (error) {
      console.log(error);
    }
  };

  const getOrganisasiById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/datadiri/organisasi/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.data) {
        const dataServer = response.data;

        setOrganisasi({
          nama_organisasi: dataServer.nama_organisasi,
          jabatan: dataServer.jabatan,
          awal_periode: dataServer.awal_periode,
          akhir_periode: dataServer.akhir_periode,
          deskripsi: dataServer.deskripsi,
        });
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Grid container spacing={2} mt={5} justifyContent="center">
        <Grid item>
          <Card sx={{ maxWidth: 450 }}>
            <CardContent>
              <form onSubmit={updateOrganisasi}>
                <TextField
                  label="Nama Organisasi"
                  fullWidth
                  name="nama_organisasi"
                  value={organisasi.nama_organisasi || ""}
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
                <TextField
                  label="Jabatan"
                  fullWidth
                  name="jabatan"
                  value={organisasi.jabatan || ""}
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
                <TextField
                  label="Tahun Mulai"
                  fullWidth
                  type="date"
                  name="awal_periode"
                  value={organisasi.awal_periode || ""}
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
                <TextField
                  label="Tahun Selesai"
                  fullWidth
                  type="date"
                  name="akhir_periode"
                  value={organisasi.akhir_periode || ""}
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
                <TextField
                  label="Deskripsi"
                  fullWidth
                  name="deskripsi"
                  value={organisasi.deskripsi || ""}
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

export default UpdateOrganisasi;