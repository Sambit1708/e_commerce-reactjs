import * as React from 'react'
import { Box, Card, CardActions, CardContent, Divider, Grid, Typography } from '@mui/material'
import { CustomInput, CustomPasswordInput } from '../../Components/Common/CustomInput';
import { AuthButton } from '../../Components/Common/StyledButtons';
import Swal from 'sweetalert2'
import UserService from '../../Services/UserService';
import { useNavigate } from 'react-router-dom';


const SignUpPage = () => {
  
    const formRef = React.useRef();
    const navigate = useNavigate();

    const signUP = async (event) => {
        event.preventDefault();
        const data = {
            firstName: formRef.current.firstName.value,
            lastName: formRef.current.lastName.value,
            email: formRef.current.email.value,
            password: formRef.current.password.value,
            phone: formRef.current.phone.value,
            gender: formRef.current.gender.value,
            enabled: true
        }
        if(formRef.current.password.value !== formRef.current.confirmPassword.value) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Password And Confirm Password is not matched"
              });
        }
        else {
            try {
                const userResponse = await UserService.createUser(data);
                if(userResponse.status === 201) {
                    Swal.fire({
                        icon: "success",
                        title: "Congratulations",
                        text: "User successfully has been created"
                    }).then((result) => {
                        if(result.isConfirmed) {
                            navigate("/login")
                        }
                    });
                }
            }
            catch (error) {
                console.log(error);
            }
        }
    }
    
    return (
        <Box>
            <Box sx={{ pt: "50px", bgcolor: '#f7f7ff', minHeight: 580 }}>
                <Box 
                    sx={{ ml: "auto", mr: "auto", width: 600 }}
                >
                    <Box component="form" onSubmit={signUP} ref={formRef}>
                        <Card sx={{ minWidth: 600 }}>
                            <Box sx={{ border: "1px solid #ffd333" }}>
                                <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
                                    <Typography color="black" fontFamily="poppins" fontSize="24px" textTransform="uppercase" fontWeight="500">
                                        SignUP Form
                                    </Typography>
                                </Box>
                            </Box>
                            <Divider sx={{borderColor: "black"}} />
                            <CardContent>
                                <Box sx={{ display: "flex", flexDirection: "column" }}>
                                    <Box sx={{border: "1px solid #ccc", p: 3, borderRadius: "5px", mb: 2}}>
                                        <Box sx={{ mt: "-37px", position: "absolute", bgcolor: "#fff", width: "fit-content", pl:"2px", pr: "2px"}}>
                                            <Typography fontFamily="poppins" color="#bebebe">
                                                Name Section
                                            </Typography>
                                        </Box>
                                        <Grid container spacing={2} className='mb-2'>
                                            <Grid item xs={6}>
                                                <CustomInput 
                                                        size='medium' label="First Name" type='text' name='firstName' 
                                                        i_id='firstname' required={true} cFullWidth={true} 
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <CustomInput 
                                                        size='medium' label="Last Name" type='text' name='lastName'
                                                        i_id='lastname' required={true} cFullWidth={true} 
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Box sx={{border: "1px solid #ccc", p: 3, borderRadius: "5px"}}>
                                        <Box sx={{ mt: "-37px", position: "absolute", bgcolor: "#fff", width: "fit-content", pl:"2px", pr: "2px"}}>
                                            <Typography fontFamily="poppins" color="#bebebe">
                                                Email Section
                                            </Typography>
                                        </Box>
                                        <Box className="mb-2">
                                            <CustomInput 
                                                    size='medium' label="Email" type='email' name='email' 
                                                    i_id='email' required={true} cFullWidth={true} 
                                            />
                                        </Box>
                                        <Grid container spacing={2} className='mb-2'>
                                            <Grid item xs={6}>
                                                <CustomPasswordInput 
                                                            label="Password" type='password' name='password' 
                                                            i_id='password' required={true} cFullWidth={true} 
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <CustomPasswordInput 
                                                            label="Confirm Password" type='password' name='confirmPassword' 
                                                            i_id='confirmPassword' required={true} cFullWidth={true} 
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Box sx={{border: "1px solid #ccc", p: 3, borderRadius: "5px", mt: 2}}>
                                        <Box sx={{ mt: "-37px", position: "absolute", bgcolor: "#fff", width: "fit-content", pl:"2px", pr: "2px"}}>
                                            <Typography fontFamily="poppins" color="#bebebe">
                                                Details Section
                                            </Typography>
                                        </Box>
                                        <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                                <CustomInput 
                                                        size='medium' label="Phone" type='text' name='phone' 
                                                        i_id='phone' required={true} cFullWidth={true} 
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <CustomInput 
                                                        size='medium' label="Gender" type='text' name='gender' 
                                                        i_id='gender' required={true} cFullWidth={true} 
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Box>
                            </CardContent>
                            <CardActions sx={{ m: 1, display: "flex", justifyContent: "center", flexDirection: "column" }}>
                                <Box>
                                    <AuthButton type='submit'>SignUP</AuthButton>
                                </Box>
                                <Box sx={{ display: "flex", mt: 1 }}>
                                    <p style={{color: "gray", fontSize: "13px"}}>Already a Customer?&nbsp;</p>
                                    <a style={{ fontSize: "13px" }} href="login">Login</a>
                                </Box>
                            </CardActions>
                        </Card>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default SignUpPage