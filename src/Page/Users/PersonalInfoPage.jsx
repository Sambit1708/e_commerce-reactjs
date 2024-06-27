import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material'
import * as React from 'react'

const PersonalInfoPage = () => {
  return (
    <Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography fontFamily="poppins" fontSize="18px" fontWeight="500">Personal Information</Typography>
            <a style={{fontSize: "14px", fontWeight: 400, marginLeft: "32px", textDecoration: "none"}} href="!#">Edit</a>
        </Box>
        <Box sx={{ display: "flex", mt: 2 }}>
            <Box>
                <label className="form-label" style={{color: "grey"}}>First Name</label>
                <input style={{ width: "300px", height: "50px" }} type="text" className="form-control" placeholder="name@example.com" readOnly />
            </Box>
            <Box sx={{ ml: 2 }}>
                <label className="form-label" style={{color: "grey"}}>Last Name</label>
                <input style={{ width: "300px", height: "50px" }} type="text" className="form-control" placeholder="name@example.com" readOnly />
            </Box>
        </Box>
        <Box sx={{mt: 3}}>
            <FormControl>
                <FormLabel sx={{ fontSize: "14px", fontFamily: "poppins", fontWeight: "500" }}>Your Gender</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                >
                    <FormControlLabel value="female" control={<Radio size='small' />} label={<Typography fontSize="15px" fontFamily="poppins">Female</Typography>} />
                    <FormControlLabel value="male" control={<Radio size='small' />} label={<Typography fontSize="15px" fontFamily="poppins">Male</Typography>} />
                </RadioGroup>
            </FormControl>
        </Box>
        <Box sx={{mt: 8}}>
            <Box sx={{ display: "flex", mt: 2, alignItems: "center" }}>
                <Typography fontFamily="poppins" fontSize="18px" fontWeight="500">Email Address</Typography>
                <a style={{fontSize: "14px", fontWeight: 400, marginLeft: "32px", textDecoration: "none"}} href="!#">Edit</a>
            </Box>
            <Box sx={{mt: 2}}>
                <input style={{ width: "300px", height: "50px" }} type="email" className="form-control" placeholder="name@example.com" readOnly/>
            </Box>
        </Box>
        <Box sx={{mt: 8}}>
            <Box sx={{ display: "flex", mt: 2, alignItems: "center" }}>
                <Typography fontFamily="poppins" fontSize="18px" fontWeight="500">Mobile Number</Typography>
                <a style={{fontSize: "14px", fontWeight: 400, marginLeft: "32px", textDecoration: "none"}} href="!#">Edit</a>
            </Box>
            <Box sx={{mt: 2}}>
                <input style={{ width: "300px", height: "50px" }} type="text" className="form-control" placeholder="+919861114128" readOnly/>
            </Box>
        </Box>
       
    </Box>
  )
}

export default PersonalInfoPage