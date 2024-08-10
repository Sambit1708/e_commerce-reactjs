import { Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material'
import * as React from 'react'

const PersonalInfoPage = (props) => {

  const { userDetail } = props;
  const [ userUpdate, setUserUpdate ] = React.useState(true);
  const userFormRef = React.useRef();
  
  const updateUserDetailForm = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
  }
  
  return (
    <Box>
       <Box component='form' onSubmit={updateUserDetailForm} ref={userFormRef}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography fontFamily="poppins" fontSize="18px" fontWeight="500">Personal Information</Typography>
                {userUpdate && 
                    <Box className='user-edit-link' onClick={()=>{setUserUpdate(false)}}>
                        Edit
                    </Box>
                }
            </Box>
            <Box sx={{ display: "flex", mt: 2 }}>
                <Box>
                    <label className="form-label" style={{color: "grey"}}>First Name</label>
                    <input style={{ width: "300px", height: "50px" }} type="text" readOnly={userUpdate}
                            className="form-control" defaultValue={userDetail.firstName} name='firstName'
                    />
                </Box>
                <Box sx={{ ml: 2 }}>
                    <label className="form-label" style={{color: "grey"}}>Last Name</label>
                    <input style={{ width: "300px", height: "50px" }} type="text" readOnly={userUpdate}
                            className="form-control" defaultValue={userDetail.lastName} name='lastName'
                    />
                </Box>
            </Box>
            <Box sx={{mt: 3}}>
                <FormControl>
                    <FormLabel sx={{ fontSize: "14px", fontFamily: "poppins", fontWeight: "500" }}>Your Gender</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="gender-label-id"
                        name="gender"
                        defaultValue={userDetail.gender}
                    >
                        <FormControlLabel value="Female" control={<Radio size='small' disabled={userUpdate} />} label={
                            <Typography fontSize="15px" fontFamily="poppins">Female</Typography>} 
                        />
                        <FormControlLabel value="Male" control={<Radio size='small' disabled={userUpdate} />} label={
                            <Typography fontSize="15px" fontFamily="poppins">Male</Typography>} 
                        />
                    </RadioGroup>
                </FormControl>
            </Box>
            <Box sx={{mt: 8}}>
                <Box sx={{ display: "flex", mt: 2, alignItems: "center" }}>
                    <Typography fontFamily="poppins" fontSize="18px" fontWeight="500">Email Address</Typography>
                    {userUpdate && 
                        <Box className='user-edit-link' onClick={()=>{setUserUpdate(false)}}>
                            Edit
                        </Box>
                    }
                </Box>
                <Box sx={{mt: 2}}>
                    <input style={{ width: "300px", height: "50px" }} 
                            type="email" className="form-control" readOnly={userUpdate}
                            defaultValue={userDetail.email} name='email'
                    />
                </Box>
            </Box>
            <Box sx={{mt: 8}}>
                <Box sx={{ display: "flex", mt: 2, alignItems: "center" }}>
                    <Typography fontFamily="poppins" fontSize="18px" fontWeight="500">Mobile Number</Typography>
                    {userUpdate && 
                        <Box className='user-edit-link' onClick={()=>{setUserUpdate(false)}}>
                            Edit
                        </Box>
                    }
                </Box>
                <Box sx={{mt: 2, display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <input style={{ width: "300px", height: "50px" }} type="text" 
                            className="form-control" readOnly={userUpdate}
                            defaultValue={userDetail.phone} name='phone'
                    />
                    {
                        !userUpdate && 
                        <Box>
                            <Button sx={{ mr: 2, fontFamily: "poppins" }} type='submit' variant='contained'>
                                Save User
                            </Button>
                            <Button sx={{ mr: 4, fontFamily: "poppins" }} type='button' 
                                    variant='contained' color='error' onClick={()=>{setUserUpdate(true)}}>
                                Cancel
                            </Button>
                        </Box>
                    }
                </Box>
            </Box>
       </Box>
    </Box>
  )
}

export default PersonalInfoPage