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
  // const name = "lj";
  const name = "ljpol";
  const [password, setpassword] = React.useState("");
  const [otpNumber, setotpNumber] = React.useState("");
  const [otp, setotp] = React.useState(true);
  const [random, setrandom] = React.useState(null);
  const [validCond, setvalidCond] = React.useState(false);

  const submit = () => {
    let min = 1000;
    let max = 9999;
    let rand = min + Math.random() * (max - min);
    setrandom(Math.floor(rand));

    const datas = {
      corporate_name: `${name}`,
      user_name: `${password}`,
      password: `${password}`,
    };
    authAxios
      .post("customer_signin", datas)
      .then((res) => {
        if (res.data.message === "Success") {
          setvalidCond(false);
          localStorage.setItem("auth", res.data.token);
          setotp(false);
        } else {
          setvalidCond(true);
        }
      })
      .catch((err) => {
        setvalidCond(true);
        console.error(err.message);
      });
    // axios
    //   .post(
    //     `http://ctr.beyondmobile.co.in/api/otp.php?authkey=31705AcY4TOCs3P5dc50a94&mobile=${password}&message=Your%20OTP%20is%20${Math.floor(
    //       rand
    //     )}&sender=BeyonD&otp=${Math.floor(rand)}&otp_expiry=2&otp_length=4`
    //   )
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => console.error("err.message"));
  };

  const verifyOtp = () => {
    localStorage.setItem("user", password);
    window.location.href = "/";

    // if (Number(random) === Number(otpNumber)) {
    // condition
    // } else {
    //   alert("Wrong information");
    // }
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
                  <div id="sign-in-button"></div>
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
                  {validCond ? (
                    <p
                      style={{
                        float: "left",
                        fontSize: "13px",
                        color: "red",
                        marginBottom: "0px",
                      }}
                    >
                      Please Enter Valid Phone
                    </p>
                  ) : null}
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
                  <div id="sign-in-button"></div>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 6);
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
