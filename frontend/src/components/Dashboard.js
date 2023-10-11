import React, { useState, useEffect } from 'react'
import axios from 'axios'
import jwt_decode from "jwt-decode"
import { useNavigate } from 'react-router-dom'
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import Sidebar from './layout/Sidebar';
import Content from './layout/Content';

const Dashboard = () => {
  const [username, setUsername] = useState('')
  const [token, setToken] = useState('')
  const [expire, setExpire] = useState('')
  const [account, setAccount] = useState([])
  const navigate = useNavigate()
  
  useEffect(() => {
    refreshToken();
    getAccount();
  }, []);

  const Logout = async()=>{
    try {
      await axios.delete('http://localhost:5000/logout')
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

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

  
  const axiosJwt = axios.create()

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

  const getAccount = async() =>{
    const response = await axiosJwt.get('http://localhost:5000/admin/${id}',{
        headers:{
           Authorization: `Bearer ${token}` 
        }
    })
    setAccount(response.data)
  }

  const [open] = React.useState(true);


  return (
    <>
    <Navbar />
    <Box height={50}/>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <CssBaseline />
          <Content open={open}>
            <div className="container mt-5">
              <h1 className="title">Welcome Back: {username}</h1>
              <button onClick={getAccount} className="button is-info">
                Get User
              </button>
              <table className="table is-striped is-fullwidth">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {account.map((account, index) => (
                    <tr key={account.id}>
                      <td>{index + 1}</td>
                      <td>{account.username}</td>
                      <td>{account.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Content>
          <Footer />
        </Box>
      </Box>
    </>
  );
}

export default Dashboard