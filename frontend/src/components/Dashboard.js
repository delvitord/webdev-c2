import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import Sidebar from "./layout/Sidebar";
import Content from "./layout/Content";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PersonIcon from "@mui/icons-material/Person";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { Grid } from "@mui/material";

const Dashboard = () => {
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [account, setAccount] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
    getAccount();
  }, []);

  const Logout = async () => {
    try {
      await axios.delete("http://localhost:5000/logout");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setUsername(decoded.username);
      const currentTime = Math.floor(Date.now() / 1000);
      if (decoded.exp < currentTime) {
      }
      setExpire(decoded.exp);
    } catch (error) {
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
        const response = await axios.get("http://localhost:5000/token");
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setUsername(decoded.username);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const getAccount = async () => {
    const response = await axiosJwt.get("http://localhost:5000/admin/${id}", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setAccount(response.data);
  };

  const [open] = React.useState(true);
  const adminAccounts = account.filter((acc) => acc.role === 1);
  const userAccounts = account.filter((acc) => acc.role === 2);

  const iconStyle = {
    fontSize: "100%",
    color: "black", // Sesuaikan dengan warna ikon Anda
    backgroundColor: "#ccc", // Warna abu-abu untuk latar belakang
    borderRadius: "50%", // Membuatnya menjadi lingkaran
    width: "4.5rem", // Lebar total ikon (termasuk latar belakang)
    height: "4.5rem", // Tinggi total ikon (termasuk latar belakang)
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "4%",
  };

  return (
    <>
      <Navbar />
      <Box height={50} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <CssBaseline />
          <Content open={open}>
            <h1 style={{ fontSize: "24px", fontWeight: "bold", marginTop: "35px", marginLeft: "10px" }}>Hi, {username}!</h1>
            <Grid container spacing={2} style={{ marginTop: "10px" }}>
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <Card variant="outlined" style={{ borderRadius: "10px" }}>
                  <CardContent style={{ display: "flex", alignItems: "center" }}>
                    <div style={iconStyle}>
                      <PeopleAltIcon />
                    </div>
                    <div style={{ flex: 1, textAlign: "left" }}>
                      <div style={{ fontSize: "20px", fontWeight: "bold" }}>Total Account</div>
                      <div style={{ fontSize: "20px" }}>{account.length}</div>
                    </div>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={4} lg={4}>
                <Card variant="outlined" style={{ borderRadius: "10px" }}>
                  <CardContent style={{ display: "flex", alignItems: "center" }}>
                    <div style={iconStyle}>
                      <AdminPanelSettingsIcon />
                    </div>
                    <div style={{ flex: 1, textAlign: "left" }}>
                      <div style={{ fontSize: "20px", fontWeight: "bold" }}>Number of Admin</div>
                      <div style={{ fontSize: "20px" }}>{adminAccounts.length}</div>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <Card variant="outlined" style={{ borderRadius: "10px" }}>
                  <CardContent style={{ display: "flex", alignItems: "center" }}>
                    <div style={iconStyle}>
                      <PersonIcon />
                    </div>
                    <div style={{ flex: 1, textAlign: "left" }}>
                      <div style={{ fontSize: "20px", fontWeight: "bold" }}>Number of User</div>
                      <div style={{ fontSize: "20px" }}>{userAccounts.length}</div>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Content>

          <Footer />
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
