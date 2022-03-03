import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Logo from "../../assets/img/logo.png";
import "./login.css";
import Banner from "../../assets/img/banner01.jpg";
import authAxios from "../interceptor/interceptor";
// import axios from "axios";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://www.signatures1.com/">
        Signature1
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
  const name = "lj";
  const user = "9790016466";
  const [password, setpassword] = React.useState("");
  const [otpNumber, setotpNumber] = React.useState("");
  const [otp, setotp] = React.useState(true);
  const [random, setrandom] = React.useState(null);

  const submit = () => {
    if (password !== "") {
      setotp(false);
      let min = 1000;
      let max = 9999;
      let rand = min + Math.random() * (max - min);
      setrandom(Math.floor(rand));
      console.log(random);
    } else {
      alert("Please Enter Your Phone Number");
    }
  };

  const verifyOtp = () => {
    const datas = {
      corporate_name: `${name}`,
      user_name: `${user}`,
      password: `${password}`,
    };

    // const verification = {
    //   username: "mohanraj16119@gmail.com",
    //   hash: "Hash key",
    //   numbers: "8526738649",
    //   sender: "TXTLCL",
    //   message: "Test",
    //   test: "0",
    // };

    // if (Number(otpNumber) === Number(random)) {
    //   alert("hi");
    // } else {
    //   alert("No");
    // }

    // axios.post("http://api.textlocal.in/send/",verification).then(itm => {
    //   console.log(itm.data)
    // }).catch(err => console.error(err.message))

    authAxios
      .post("customer_signin", datas)
      .then((res) => {
        if (res.data.message === "Success") {
          alert("You login successfully!");
          localStorage.setItem("user", user);
          localStorage.setItem("auth", res.data.token);
          // navigate("/dashboard");
          window.location.href = "/";
        } else {
          alert("Please try again...");
        }
      })
      .catch((err) => console.error(err.message));
  };

  return (
    <div className="login">
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: `url(${Banner})`,
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box className="boxes">
              <img alt="Remy Sharp" src={Logo} style={{ width: 100 }} />
              <Typography component="h1" variant="h5" style={{ marginTop: 15 }}>
                Sign in
              </Typography>
              {otp ? (
                <Box component="form" noValidate sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Phone Number"
                    type="text"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                  />
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    style={{ backgroundColor: "#48382e" }}
                    onClick={submit}
                  >
                    Sign In
                  </Button>
                  <Copyright sx={{ mt: 5 }} />
                </Box>
              ) : (
                <Box noValidate sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 4);
                    }}
                    name="otp"
                    label="Enter OTP"
                    type="number"
                    value={otpNumber}
                    onChange={(e) => setotpNumber(e.target.value)}
                  />
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    style={{ backgroundColor: "#48382e" }}
                    onClick={verifyOtp}
                  >
                    Verify
                  </Button>
                  <Copyright sx={{ mt: 5 }} />
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
}
