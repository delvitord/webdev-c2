import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);
  const [role, setRole] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const isPasswordValidValue = isPasswordValid(password);
    const isConfPasswordValid = password === confPassword;

    setIsFormValid(isPasswordValidValue && isConfPasswordValid);
  }, [password, confPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isPasswordValid(password)) {
      setPasswordError(true);
      return;
    }

    setPasswordError(false);
    try {
      await axios.post("http://localhost:5000/admin", {
        username: username,
        email: email,
        password: password,
        confPassword: confPassword,
        role: 2, // Menambahkan role ke data pengguna yang didaftarkan.
      });

      navigate("/login");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  const isPasswordValid = (password) => {
    // Password must be at least 8 characters and contain at least one letter and one number
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#333333" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 3 }}
          >
            {msg && (
              <Alert
                severity="error"
                style={{ marginTop: "10px", marginBottom: "10px" }}
              >
                {msg}{" "}
              </Alert>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={passwordError}
              helperText={
                passwordError
                  ? "Password must be at least 8 characters and contain letters and numbers"
                  : ""
              }
              <TextField
              margin="normal"
              required
              fullWidth
              name="confPassword"
              label="Confirm Password"
              type="password"
              id="confPassword"
              autoComplete="new-password"
              value={confPassword}
              onChange={(e) => setConfPassword(e.target.value)}
              error={passwordError}
              helperText={passwordError ? "Passwords do not match" : ""}
            />
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="Anda telah membaca dan menerima Syarat dan Ketentuan kami."
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Register;
