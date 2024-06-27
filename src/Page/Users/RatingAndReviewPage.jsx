import * as React from 'react'
import { Box, Divider, Grid, Typography } from '@mui/material'


const RatingAndReviewPage = () => {
  return (
    <Box>
        <Typography fontFamily="poppins" fontSize="18px" fontWeight="500">My Reviews</Typography>
        <Box sx={{mt: 3}}>
            <Grid container>
                <Grid item xs={2}>
                    <Box 
                        component="img"
                        src={require('../../Assets/images/trending/motorsport-sneakers.png')}
                        sx={{ width: "70px" }}
                    />
                </Grid>
                <Grid item xs={10}>
                    <Box>
                        <Typography fontFamily="poppins" fontSize="14px" color="grey">Motorsport Sneakers</Typography>
                        <Box sx={{display: "flex", mt: 1}}>
                            <Typography variant='p' className='rating-icon' fontSize="11px">
                                4.3 <span class="fa fa-star"></span>
                            </Typography>
                            <Typography fontSize="14px" fontWeight="500" fontFamily="poppins" sx={{ml: 2}}>It is Nice</Typography>
                        </Box>
                        <Box sx={{mt: 1}}>
                            <Typography fontSize="14px" fontFamily="poppins">
                                Product quality is very good. Satisfaction according to the price money. It also has loud sound adjustable. It has long range about 6-8 meters.
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Divider sx={{borderColor: "#ccc", ml: -5, mr: -5, mt: 2}} />
        </Box>
    </Box>
  )
}

export default RatingAndReviewPage