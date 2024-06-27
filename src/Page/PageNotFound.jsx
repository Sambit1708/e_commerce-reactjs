import { Box, Typography } from '@mui/material'
import React from 'react'

const PageNotFound = () => {
  return (
    <div> 
        <Box>
            <Box  sx={{width: "500px", ml: "auto", mr: "auto"}}>
                <Box sx={{mt: "50px"}}>
                    <Typography fontFamily="poppins" fontSize="72px" textTransform="uppercase" color="grey" letterSpacing="50px">
                        Sorry
                    </Typography>
                    <Typography fontFamily="poppins" fontSize="30px" textTransform="uppercase" color="grey">
                        We couldn't find the page
                    </Typography>
                </Box>
                <Box className="img-component">
                    <Box
                        component="img"
                        src={require('../Assets/images/404.jpg')} 
                        alt='M'
                        title='404 Page Not Found'
                        sx={{ height: "400px", width: "500px" }}
                    />
                </Box>
            </Box>
        </Box>
    </div>
  )
}

export default PageNotFound