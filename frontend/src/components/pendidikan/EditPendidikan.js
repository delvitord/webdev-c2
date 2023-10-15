import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Card, CardContent } from "@mui/material";

const UpdatePendidikan = () => {
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

  const updatePendidikan = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/datadiri/pendidikan/${id}`, Pendidikan,{
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      navigate("/pendidikan");
    } catch (error) {
      console.log(error);
    }
  };

  const getPendidikanById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/datadiri/pendidikan/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
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
      console.log(response)
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
              <form onSubmit={updatePendidikan}>
                <TextField
                  label="Nama Instansi"
                  fullWidth
                  name="nama_instansi"
                  value={Pendidikan.nama_instansi || ""}
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
                <TextField
                  label="Tahun Masuk"
                  fullWidth
                  type="date"
                  name="awal_periode"
                  value={Pendidikan.awal_periode || ""}
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
                <TextField
                  label="Tahun Lulus"
                  fullWidth
                  type="date"
                  name="akhir_periode"
                  value={Pendidikan.akhir_periode || ""}
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
                <TextField
                  label="Jurusan"
                  fullWidth
                  name="jurusan"
                  value={Pendidikan.jurusan || ""}
                  onChange={(e) =>
                    setPendidikan({
                      ...Pendidikan,
                      jurusan: e.target.value,
                    })
                  }
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
