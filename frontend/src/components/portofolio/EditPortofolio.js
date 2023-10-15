import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Card, CardContent } from "@mui/material";

const UpdatePortofolio = () => {
  const [Portofolio, setPortofolio] = useState({
    judul: "",
    deskripsi: "",
    file: "",
    images: "",
    link: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getPortofolioById();
  }, []);

  
  const accessToken = localStorage.getItem("accessToken");

  const updatePortofolio = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/datadiri/portofolio/${id}`, Portofolio,{
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": `multipart/form-data`,
        },
      });
      navigate("/portofolio");
    } catch (error) {
      console.log(error);
    }
  };

  const getPortofolioById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/datadiri/portofolio/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.data) {
        const dataServer = response.data; // Gunakan data sebagai objek langsung

        // Set nilai dari data yang diperoleh ke dalam state
        setPortofolio({
          judul: dataServer.judul,
          deskripsi: dataServer.deskripsi,
          link: dataServer.link,
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
              <form onSubmit={updatePortofolio}>
                <TextField
                  label="Judul"
                  fullWidth
                  name="judul"
                  value={Portofolio.judul || ""}
                  onChange={(e) =>
                    setPortofolio({
                      ...Portofolio,
                      judul: e.target.value,
                    })
                  }
                  placeholder="Judul"
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  label="Deskripsi"
                  fullWidth
                  multiline
                  value={Portofolio.deskripsi || ""}
                  onChange={(e) =>
                    setPortofolio({
                      ...Portofolio,
                      deskripsi: e.target.value,
                    })
                  }
                  placeholder="Deskripsi"
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  label="Link"
                  fullWidth
                  value={Portofolio.link || ""}
                  onChange={(e) =>
                    setPortofolio({
                      ...Portofolio,
                      link: e.target.value,
                    })
                  }
                  placeholder="Link"
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

export default UpdatePortofolio;
