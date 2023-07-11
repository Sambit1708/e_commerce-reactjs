import { Box, Button, Typography } from '@mui/material'
import * as React from 'react'
import NavBar from '../Components/NavBar'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {

    const navigate = useNavigate();
    return (
        <div>
            <NavBar />
            <Box sx={{ marginTop: '65px',backgroundColor: '#fff', minHeight: 596, position:'relative'}}>
                <div style={{
                    position:'absolute',
                    left: '50%',
                    top: '45%',
                    transform: 'translate(-50%, -50%)'
                }}>
                    <Typography sx={{marginBottom: 5}} component='div' variant='h2'>Home Page</Typography>
                    <Button onClick={() => {navigate('/product')}} variant='contained' color='success' sx={{marginRight: 1}}>Explore</Button>
                    <Button variant='contained' color='error'>Subscribe</Button>
                </div>
            </Box>
        </div>
    )
}

export default HomePage