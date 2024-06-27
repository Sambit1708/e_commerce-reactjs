import * as React from 'react'
import NavBar from '../Components/NavBar'
import { Box, Typography, Card, CardContent, CardMedia } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import Products from '../Components/Common/Products'
import '../Assets/style.css'
import Footer from '../Components/Footer'
import { useNavigate } from 'react-router-dom'

const CardItem = ({trend}) => {
    const navigate = useNavigate();
    return (
        <Card sx={{ height: 350, cursor: 'pointer' }} onClick={() => {navigate('/product/details')}} >
            <CardMedia
                sx={{ height: 250 }}
                image={trend.imgPath}
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom component="div" fontWeight='bold'>
                    {trend.name}
                </Typography>
            </CardContent>
        </Card>
    )
}

const MainPage = () => {

    return (
        <Box>
            <NavBar />
            <Box sx={{mt: 5}}>
                <Box>
                    <Box
                        component="img"
                        src={require('../Assets/images/shooesCoverPage.png')} 
                        className='start-bg'
                        alt='M'/>
                    <Typography variant='h2' sx={{position: 'absolute', mt: -45, ml: 85, zIndex: 3, fontSize: '70px', fontFamily: 'Poppins', fontWeight: '500' }}>
                        SAMWare where,<br/> Comfort Meets <br/> Indivisuality
                    </Typography>
                </Box>
                <Box sx={{p:5}}>
                    <Typography variant='h6' fontFamily={'Poppins'}>
                        New Trends
                    </Typography>
                    <Grid container spacing={1}>
                        {Products.trendings.map((trend, index) => {
                            return (
                                <Grid xs={3} key={index}>
                                    <CardItem trend={trend}/>
                                </Grid>
                            )
                        }) }
                    </Grid>
                </Box>
            </Box>
            <Footer />
        </Box>
    )
}

export default MainPage