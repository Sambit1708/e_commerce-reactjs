import { Alert, Box, Card, CardActions, CardContent, Divider, Snackbar, Typography } from '@mui/material'
import * as React from 'react'
import LoginService from '../../Services/LoginService'
import { useNavigate } from 'react-router-dom'
import { AuthButton } from '../../Components/Common/StyledButtons'
import { CustomInput } from '../../Components/Common/CustomInput'
import UserService from '../../Services/UserService'


const LoginPage = () => {

  const [errorPop, setErrorPop] = React.useState('')
  const loginRef = React.useRef();
  const navigate = useNavigate();

  React.useEffect(() => {
    const getTokenExpiration = async () => {
      try {
        const response = await LoginService.validateToken();
        if(response.data.status === 'true') {
          navigate('/main')
        }
      } catch(error) {
        console.log(error)
      }
    }

    // eslint-disable-next-line valid-typeof
    if(typeof localStorage.getItem('token') !== undefined && localStorage.getItem('token') !== null) {
      getTokenExpiration();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setErrorPop('');
  };

  const generateToken = async (data) => {
    try {
      const tokenResponse = await LoginService.userLogin(data);
      LoginService.setToken(tokenResponse.data.token);
      
      const userResponse = await UserService.getCurrentUser();
      LoginService.setCurrentUser(userResponse.data);
      
      if(userResponse !== undefined) {
        var href = window.location.href
        var item = href.slice(href.lastIndexOf('/')+1, href.length);
        if(item === 'login')  {
          navigate('/product')
        }
        else {
          navigate(-1)
        }
      }

    } catch(error) {
      setErrorPop(error)
    }
  }

  const login = (event) => {
    event.preventDefault();
    const loginData = {
      username: loginRef.current.email.value,
      password: loginRef.current.password.value
    }
    generateToken(loginData)
  }

  return (
    <Box>
      <Box sx={{ bgcolor: '#f7f7ff', minHeight: 600, position:'relative'}}>
        <Box 
          sx={{
              position:'absolute',
              left: '50%',
              top: '45%',
              transform: 'translate(-50%, -50%)'
          }}
        >
          <Box component="form" onSubmit={login} ref={loginRef}>
            <Card sx={{ width: 450 }}>
              <Box sx={{ border: "1px solid #ffd333" }}>
                <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
                  <Typography color="black" fontFamily="poppins" fontSize="24px" textTransform="uppercase" fontWeight="500">
                    Login Form
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{borderColor: "black"}} />
              <CardContent sx={{width: 400, ml: "auto", mr: "auto" }}>
                <Box sx={{ display: "flex", flexDirection: "column", m: 2, height: "180px", justifyContent: 'space-between' }}>
                  <CustomInput label="Email" type='email' name='email' required={true} cFullWidth={true} />
                  <CustomInput label="Password" type='password' name='password' required={true} cFullWidth={true} />
                </Box>
              </CardContent>
              
              {/* <Divider sx={{borderColor: "black"}} /> */}
              <CardActions sx={{ m: 1, display: "flex", justifyContent: "center", flexDirection: "column" }}>
                <Box>
                  <AuthButton type='submit'>Login</AuthButton>
                </Box>
                <Box>
                  <Box sx={{ display: "flex", mt: 1 }}>
                    <p style={{color: "gray", fontSize: "13px"}}>New here?&nbsp;</p>
                    <a style={{ fontSize: "13px" }} href="signup">SignUp</a>
                  </Box>
                </Box>
              </CardActions>
            </Card>
          </Box>
        </Box>
        {errorPop !== '' && <Snackbar open={errorPop !== '' } autoHideDuration={3000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="error"
            variant="filled"
            sx={{ width: '100%' }}
          >
            {errorPop}
          </Alert>
        </Snackbar>}
      </Box>
    </Box>
  )
}

export default LoginPage