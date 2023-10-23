import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";

const AddUser = ({ onCancelAdd, onSuccess }) => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confPassword: "",
    role: null,
    errorUsername: false,
    errorEmail: false,
    errorPassword: false,
    errorRole: false,
  });

  const options = [
    { role: "Admin", id: 1 },
    { role: "Pengguna", id: 2 },
  ];

  const [isCanceled, setIsCanceled] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleCancel = () => {
    setIsCanceled(true);
    onCancelAdd();
  };

  const saveUser = async (e) => {
    e.preventDefault();

    if (!user.username || !user.email || !user.password || !user.role) {
      setUser((prevState) => ({
        ...prevState,
        errorUsername: !user.username,
        errorEmail: !user.email,
        errorPassword: !user.password,
        errorRole: !user.role,
      }));
      setErrorAlert("Lengkapi semua isian sebelum menyimpan.");
    } else {
      if (!isCanceled) {
        const accessToken = localStorage.getItem("accessToken");

        const formData = new FormData();
        formData.append("username", user.username);
        formData.append("email", user.email);
        formData.append("password", user.password);
        formData.append("confPassword", user.password);
        formData.append("role", user.role);

        try {
          const response = await axios.post("http://localhost:5000/admin", formData, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          console.log("Response from server:", response);
          setShowSuccessAlert(true);
          setErrorAlert("");
          setTimeout(() => {
            setShowSuccessAlert(false);
            onSuccess();
            onCancelAdd();
          }, 2000);
        } catch (error) {
          console.log(error);
          setErrorAlert("Terjadi kesalahan saat menyimpan data pengguna.");
        }
      }
    }
  };

  return (
    <>
      {showSuccessAlert && (
        <Alert severity="success" sx={{ marginBottom: 1 }}>
          Data User berhasil disimpan
        </Alert>
      )}
      <form onSubmit={saveUser}>
        <Grid container spacing={0.8} mt={0.5} justifyContent="center">
          <Grid item sm={12}>
            <TextField
              label="Username"
              fullWidth
              name="username"
              value={user.username}
              onChange={handleInputChange}
              placeholder="Username"
              variant="outlined"
              margin="normal"
              error={user.errorUsername}
              helperText={user.errorUsername ? "Username harus diisi" : ""}
            />
          </Grid>
          <Grid item sm={12}>
            <TextField
              label="Email"
              fullWidth
              name="email"
              type="email"
              value={user.email}
              onChange={handleInputChange}
              placeholder="Email"
              variant="outlined"
              margin="normal"
              error={user.errorEmail}
              helperText={user.errorEmail ? "Email harus diisi" : ""}
            />
          </Grid>
          <Grid item sm={12}>
            <TextField
              label="Password"
              fullWidth
              name="password"
              type="text"
              value={user.password}
              onChange={handleInputChange}
              variant="outlined"
              margin="normal"
              error={user.errorPassword}
              helperText={user.errorPassword ? "Password harus diisi" : ""}
            />
          </Grid>
          <Grid item sm={12}>
            <Autocomplete
              id="user.role"
              options={options}
              value={options.find((option) => option.id === user.role) || null}
              onChange={(_, newValue) => setUser({ ...user, role: newValue ? newValue.id : null })}
              getOptionLabel={(option) => option.role}
              renderInput={(params) => <TextField {...params} label="Role" sx={{ marginTop: 1 }} error={user.errorRole} />}
              helperText={user.errorRole ? "Role harus diisi" : ""}
            />
          </Grid>
          <Grid container justifyContent="flex-end" sx={{ marginTop: "10px", marginBottom: "10px" }}>
            <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
              Save
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

export default AddUser;
