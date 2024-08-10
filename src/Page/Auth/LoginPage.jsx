import * as React from "react";
import {
  Backdrop,
  Box,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import LoginService from "../../Services/LoginService";
import { useNavigate } from "react-router-dom";
import { AuthButton } from "../../Components/Common/StyledButtons";
import { CustomInput } from "../../Components/Common/CustomInput";
import UserService from "../../Services/UserService";
import Swal from "sweetalert2";

const LoginPage = () => {
  const loginRef = React.useRef();
  const navigate = useNavigate();
  const [openBackdrop, setOpenBackdrop] = React.useState(false);

  const handleCloseBackdrop = () => {
    setOpenBackdrop(false);
  };
  const handleOpenBackdrop = () => {
    setOpenBackdrop(true);
  };

  React.useEffect(() => {
    const getTokenExpiration = async () => {
      try {
        const response = await LoginService.validateToken();
        if (response.data.status === "true") {
          navigate("/main");
        }
      } catch (error) {}
    };

    // eslint-disable-next-line valid-typeof
    if (LoginService.getToken() !== undefined) {
      getTokenExpiration();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generateToken = async (data) => {
    try {
      const tokenResponse = await LoginService.userLogin(data);
      if (tokenResponse.status === 201) {
        LoginService.setToken(tokenResponse.data.token);

        const userResponse = await UserService.getCurrentUser();
        if (userResponse.status === 200) {
          LoginService.setCurrentUser(userResponse.data);

          if (userResponse.status === 200) {
            var href = window.location.href;
            var item = href.slice(href.lastIndexOf("/") + 1, href.length);
            if (item === "login") {
              navigate(-1);
            } else {
              navigate(-1);
            }
          }
        }
      } else {
        handleCloseBackdrop();
        setTimeout(() => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Email or Password.",
          });
        }, 100);
      }
    } catch (error) {
      handleCloseBackdrop();
      setTimeout(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Invalid Email or Password.",
        });
      }, 100);
    }
  };

  const login = (event) => {
    event.preventDefault();
    handleOpenBackdrop();
    setTimeout(() => {
      const loginData = {
        username: loginRef.current.email.value,
        password: loginRef.current.password.value,
      };
      generateToken(loginData);
    }, 500);
  };

  return (
    <Box>
      <Box sx={{ bgcolor: "#f7f7ff", minHeight: 600, position: "relative" }}>
        <Box
          sx={{
            position: "absolute",
            left: "50%",
            top: "45%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Box component="form" onSubmit={login} ref={loginRef}>
            <Card sx={{ width: 450 }}>
              <Box sx={{ border: "1px solid #ffd333" }}>
                <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
                  <Typography
                    color="black"
                    fontFamily="poppins"
                    fontSize="24px"
                    textTransform="uppercase"
                    fontWeight="500"
                  >
                    Login Form
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ borderColor: "black" }} />
              <CardContent sx={{ width: 400, ml: "auto", mr: "auto" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    m: 2,
                    height: "180px",
                    justifyContent: "space-between",
                  }}
                >
                  <CustomInput
                    label="Email"
                    type="email"
                    name="email"
                    required={true}
                    cFullWidth={true}
                  />
                  <CustomInput
                    label="Password"
                    type="password"
                    name="password"
                    required={true}
                    cFullWidth={true}
                  />
                </Box>
              </CardContent>

              {/* <Divider sx={{borderColor: "black"}} /> */}
              <CardActions
                sx={{
                  m: 1,
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Box>
                  <AuthButton type="submit">Login</AuthButton>
                </Box>
                <Box>
                  <Box sx={{ display: "flex", mt: 1 }}>
                    <p style={{ color: "gray", fontSize: "13px" }}>
                      New here?&nbsp;
                    </p>
                    <a style={{ fontSize: "13px" }} href="signup">
                      SignUp
                    </a>
                  </Box>
                </Box>
              </CardActions>
            </Card>
          </Box>
        </Box>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openBackdrop}
          onClick={handleCloseBackdrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    </Box>
  );
};

export default LoginPage;
