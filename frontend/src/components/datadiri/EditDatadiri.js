// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";

// const UpdateDatadiri = () => {
//   const [nama, setNama] = useState("");
//   const [tempat_lahir, setTempatLahir] = useState("");
//   const [tanggal_lahir, setTanggalLahir] = useState("");
//   const [alamat, setAlamat] = useState("");
//   const [email, setEmail] = useState("");
//   const [no_telp, setNoTelp] = useState("");
//   const [foto, setFoto] = useState("");
//   const [deskripsi, setDeskripsi] = useState("");
//   const [linkedin, setLinkedin] = useState("");
//   const [instagram, setInstagram] = useState("");
//   const [x, setX] = useState("");
//   const [github, setGithub] = useState("");
//   const navigate = useNavigate();
//   const {id} = useParams();
  
//   useEffect(() => {
//     getDatadiriById();
//   }, []);

//   const updateDatadiri = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.patch(`http://localhost:5000/:account/data_diri/${id}`, {
//         nama,
//         tempat_lahir,
//         tanggal_lahir,
//         alamat,
//         email,
//         no_telp,
//         foto,
//         deskripsi,
//         linkedin,
//         instagram,
//         x,
//         github,
//       });
//       navigate("/data-diri");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const getDatadiriById = async () => {
//     const response = await axios.get(`http://localhost:5000/data_diri/${id}`);
//     setNama(response.data.nama);
//     setTempatLahir(response.data.tempat_lahir);
//     setTanggalLahir(response.data.tanggal_lahir);
//     setAlamat(response.data.alamat);
//     setEmail(response.data.email);
//     setNoTelp(response.data.no_telp);
//     setFoto(response.data.foto);
//     setDeskripsi(response.data.deskripsi);
//     setLinkedin(response.data.linkedin);
//     setInstagram(response.data.instagram);
//     setX(response.data.x);
//     setGithub(response.data.github);
//   };

//   return (
//     <div className="columns mt-5 is-centered">
//       <div className="column is-half">
//         <form onSubmit={updateDatadiri}>
//           <div className="field">
//             <label className="label">Nama</label>
//             <div className="control">
//               <input
//                 type="text"
//                 className="input"
//                 value={nama}
//                 onChange={(e) => setNama(e.target.value)}
//                 placeholder="Nama"
//               />
//             </div>
//           </div>
//           <div className="field">
//             <label className="label">Tempat Lahir</label>
//             <div className="control">
//               <input
//                 type="text"
//                 className="input"
//                 value={tempat_lahir}
//                 onChange={(e) => setTempatLahir(e.target.value)}
//                 placeholder="Tempat Lahir"
//               />
//             </div>
//           </div>
//           <div className="field">
//             <label className="label">Tanggal Lahir</label>
//             <div className="control">
//               <input
//                 type="text"
//                 className="input"
//                 value={tanggal_lahir}
//                 onChange={(e) => setTanggalLahir(e.target.value)}
//                 placeholder="Tanggal Lahir"
//               />
//             </div>
//           </div>
//           <div className="field">
//             <label className="label">Alamat</label>
//             <div className="control">
//               <input
//                 type="text"
//                 className="input"
//                 value={alamat}
//                 onChange={(e) => setAlamat(e.target.value)}
//                 placeholder="Alamat"
//               />
//             </div>
//           </div>
//           <div className="field">
//             <label className="label">Email</label>
//             <div className="control">
//               <input
//                 type="text"
//                 className="input"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Email"
//               />
//             </div>
//           </div>
//           <div className="field">
//             <label className="label">No Telepon</label>
//             <div className="control">
//               <input
//                 type="text"
//                 className="input"
//                 value={no_telp}
//                 onChange={(e) => setNoTelp(e.target.value)}
//                 placeholder="No Telepon"
//               />
//             </div>
//           </div>
//           <div className="field">
//             <label className="label">Foto</label>
//             <div className="control">
//               <input
//                 type="text"
//                 className="input"
//                 value={foto}
//                 onChange={(e) => setFoto(e.target.value)}
//                 placeholder="Foto"
//               />
//             </div>
//           </div>
//           <div className="field">
//             <label className="label">Deskripsi</label>
//             <div className="control">
//               <input
//                 type="text"
//                 className="input"
//                 value={deskripsi}
//                 onChange={(e) => setDeskripsi(e.target.value)}
//                 placeholder="Deskripsi"
//               />
//             </div>
//           </div>
//           <div className="field">
//             <label className="label">Linkedin</label>
//             <div className="control">
//               <input
//                 type="text"
//                 className="input"
//                 value={linkedin}
//                 onChange={(e) => setLinkedin(e.target.value)}
//                 placeholder="Linkedin"
//               />
//             </div>
//           </div>
//           <div className="field">
//             <label className="label">Instagram</label>
//             <div className="control">
//               <input
//                 type="text"
//                 className="input"
//                 value={instagram}
//                 onChange={(e) => setInstagram(e.target.value)}
//                 placeholder="Instagram"
//               />
//             </div>
//           </div>
//           <div className="field">
//             <label className="label">X</label>
//             <div className="control">
//               <input
//                 type="text"
//                 className="input"
//                 value={x}
//                 onChange={(e) => setX(e.target.value)}
//                 placeholder="X"
//               />
//             </div>
//           </div>
//           <div className="field">
//             <label className="label">Github</label>
//             <div className="control">
//               <input
//                 type="text"
//                 className="input"
//                 value={github}
//                 onChange={(e) => setGithub(e.target.value)}
//                 placeholder="Github"
//               />
//             </div>
//           </div>
//           <div className="field">
//             <button type="submit" className="button is-success">
//               Update
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UpdateDatadiri;


import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Card, CardContent } from "@mui/material";

const UpdateDatadiri = () => {
  const [dataDiri, setDataDiri] = useState({
    nama: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    alamat: "",
    email: "",
    no_telp: "",
    foto: "",
    deskripsi: "",
    linkedin: "",
    instagram: "",
    x: "",
    github: "",
  });

  const navigate = useNavigate();
  const [token, setToken] = useState(""); // State to store the token
  const [expire, setExpire] = useState("");

  useEffect(() => {
    refreshToken(); // Refresh the token when the component mounts
    getDatadiri(); // Fetch data from the server when the component mounts
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      const currentTime = Math.floor(Date.now() / 1000);
      if (decoded.exp < currentTime) {
        // Implement token refresh logic here if needed
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        navigate("/login");
      }
    }
  };

  const axiosJwt = axios.create();

  axiosJwt.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        try {
          const response = await axios.get("http://localhost:5000/token");
          config.headers.Authorization = `Bearer ${response.data.accessToken}`;
          setToken(response.data.accessToken);
          const decoded = jwt_decode(response.data.accessToken);
          setDataDiri({ ...decoded.dataDiri });
          setExpire(decoded.exp);
        } catch (error) {
          console.log(error);
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const getDatadiri = async () => {
    try {
      const response = await axiosJwt.get(`http://localhost:5000/data_diri`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDataDiri(response.data.dataDiri);
    } catch (error) {
      console.log(error);
    }
  };


  const updateDatadiri = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/data_diri`, dataDiri, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
      });
      navigate("/datadiri");
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDataDiri({ ...dataDiri, [name]: value });
  };

  return (
    <>
      <Grid container spacing={2} mt={5} justifyContent="center">
        <Grid item>
          <Card sx={{ maxWidth: 450 }}>
            <CardContent>
              <form onSubmit={updateDatadiri}>
                {/* Render input fields for dataDiri */}
                <TextField
                  label="Nama"
                  fullWidth
                  name="nama"
                  value={dataDiri.nama || " "}
                  onChange={handleInputChange}
                  placeholder="Nama"
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  label="Tempat Lahir"
                  fullWidth
                  name="tempat_lahir"
                  value={dataDiri.tempat_lahir}
                  onChange={handleInputChange}
                  placeholder="Tempat Lahir"
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  label="Tanggal Lahir"
                  fullWidth
                  type="date"
                  name="tanggal_lahir"
                  value={dataDiri.tanggal_lahir}
                  onChange={handleInputChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  label="Alamat"
                  fullWidth
                  name="alamat"
                  value={dataDiri.alamat}
                  onChange={handleInputChange}
                  placeholder="Alamat"
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  label="Email"
                  fullWidth
                  type="email"
                  name="email"
                  value={dataDiri.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  label="No Telepon"
                  fullWidth
                  name="no_telp"
                  value={dataDiri.no_telp}
                  onChange={handleInputChange}
                  placeholder="No Telepon"
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  label="Foto"
                  fullWidth
                  type="file"
                  name="foto"
                  value={dataDiri.foto}
                  onChange={handleInputChange}
                  inputProps={{ accept: "image/*" }}
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
                  value={dataDiri.deskripsi}
                  onChange={handleInputChange}
                  placeholder="Deskripsi"
                  variant="outlined"
                  id="outlined-multiline-flexible"
                  multiline
                  maxRows={4}
                  margin="normal"
                />
                <TextField
                  label="Linkedin"
                  fullWidth
                  name="linkedin"
                  value={dataDiri.linkedin}
                  onChange={handleInputChange}
                  placeholder="Linkedin"
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  label="Instagram"
                  fullWidth
                  name="instagram"
                  value={dataDiri.instagram}
                  onChange={handleInputChange}
                  placeholder="Instagram"
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  label="X"
                  fullWidth
                  name="x"
                  value={dataDiri.x}
                  onChange={handleInputChange}
                  placeholder="X"
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  label="Github"
                  fullWidth
                  name="github"
                  value={dataDiri.github}
                  onChange={handleInputChange}
                  placeholder="Github"
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

export default UpdateDatadiri;
