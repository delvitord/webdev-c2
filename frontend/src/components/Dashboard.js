import React, { useState, useEffect } from 'react'
import axios from 'axios'
import jwt_decode from "jwt-decode"
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const Dashboard = () => {
  const [username, setUsername] = useState('')
  const [token, setToken] = useState('')
  const [expire, setExpire] = useState('')
  const [account, setAccount] = useState([])
  const history = useHistory()
  
  useEffect(() => {
    refreshToken();
    getAccount();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/admin/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setUsername(decoded.username);

      // Periksa waktu kedaluwarsa token di sini
      const currentTime = Math.floor(Date.now() / 1000);
      if (decoded.exp < currentTime) {
        // Token sudah kedaluwarsa, mungkin perlu refresh
        // atau tindakan lain sesuai kebijakan Anda.
      }

      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        history.push("/");
      }
    }
  };


  const axiosJwt = axios.create()

  axiosJwt.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get("http://localhost:5000/admin/token");
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
    const response = await axiosJwt.get('http://localhost:5000/admin',{
        headers:{
           Authorization: `Bearer ${token}` 
        }
    })
    setAccount(response.data)
  }

  return (
    <div className="container mt-5">
      <h1 className="title">Welcome Back: {username}</h1>
      <button onClick={getAccount} className="button is-info ">
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
  );
}

export default Dashboard