import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import Alert from "@mui/material/Alert";

const EditUser = ({ data, onCancelAdd, onSuccess }) => {
  const [user, setUser] = useState({
    id: data ? data.id : "",
    username: data ? data.username : "",
    email: data ? data.email : "",
    role: data ? data.role : "",
  });

  const options = [
    { role: "Admin", id: 1 },
    { role: "Pengguna", id: 2 },
  ];

  const navigate = useNavigate();

  const accessToken = localStorage.getItem("accessToken");
  const [isCanceled, setIsCanceled] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      // Update data akun dengan menggunakan rute PATCH yang sesuai
      await axios.patch(`http://localhost:5000/admin/${user.id}`, user, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setShowSuccessAlert(true);
      setTimeout(() => {
        setShowSuccessAlert(false);
        onSuccess(); // Panggil fungsi `onSuccess` yang dikirim dari SkillList
        onCancelAdd(); // Tutup dialog AddSkill
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
          Data User berhasil disimpan
        </Alert>
      )}
      <form onSubmit={updateUser}>
        <Grid container spacing={0.8} mt={0.5} justifyContent="center">
          <Grid item sm={12}>
            <TextField
              label="Username"
              fullWidth
              value={user.username}
              onChange={(e) =>
                setUser({
                  ...user,
                  username: e.target.value,
                })
              }
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item sm={12}>
            <TextField
              label="Email"
              fullWidth
              type="email"
              value={user.email}
              onChange={(e) =>
                setUser({
                  ...user,
                  email: e.target.value,
                })
              }
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item sm={12}>
            <Autocomplete
              id="role"
              options={options}
              value={options.find((option) => option.id === user.role)}
              onChange={(e, newValue) =>
                setUser({
                  ...user,
                  role: newValue ? newValue.id : null,
                })
              }
              getOptionLabel={(option) => option.role}
              renderInput={(params) => <TextField {...params} label="Role" sx={{ marginTop: 1 }} />}
            />
          </Grid>
          <Grid container justifyContent="flex-end">
            <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }} onClick={updateUser}>
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

export default EditUser;
