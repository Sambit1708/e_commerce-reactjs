import * as React from 'react'
import NavBar from '../Components/NavBar'
import { Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import '../assets/style.css'
import Footer from '../Components/Footer'
import Products from '../Components/Products'

const MainPage = () => {
  return (
    <div>
        <NavBar />
        <Box sx={{ 
            marginTop: '75px',
            backgroundColor: '#fff', 
            height: '126px',
            marginLeft: 'auto',
            marginRight: 'auto',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
            width: '98%'
        }} className="mainpage-all-a">
            {Products.categories.map((item) => (
                <a href='!#' className='mainpage-a'>
                    <div className='prod-contain' style={{textAlign: 'center'}}>
                        <div>
                            <img style={{width: '64px'}} src={item.imgPath} alt='Product'/>
                        </div>
                        <div>
                            <span style={{color: '#000'}}>{item.title}</span>
                        </div>
                    </div>
                </a>
            ))}
        </Box>
        <Box sx={{ 
                marginTop: '20px',
                backgroundColor: '#fff', 
                height: '200px',
                marginLeft: 'auto',
                marginRight: 'auto',
                boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                width: '98%'
            }}
            
            className='latest-containt'
        >
        </Box>
        <Box sx={{ 
                marginTop: '20px',
                backgroundColor: '#fff', 
                height: '350px',
                marginLeft: 'auto',
                marginRight: 'auto',
                boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                width: '98%'
            }}>
            <div className='electronic-section'>
                <Typography gutterBottom variant="h5" component="div" sx={{paddingLeft: '20px', paddingTop: '10px'}}>
                    <strong>Electronics</strong>
                </Typography>
                <div style={{display: 'flex', justifyContent: 'space-evenly', paddingTop: '20px', textAlign: 'center'}}>
                    {Products.electronics.map((item) => (
                        <Card sx={{ maxWidth: 200 }}>
                            <CardMedia
                                sx={{ width: 200, height: 180, backgroundSize: 'contain' }}
                                image={item.imgPath}
                                title={item.title}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="p" component="div">
                                    <strong>{item.title}</strong>
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </Box>
        <Box sx={{ 
                marginTop: '20px',
                backgroundColor: '#fff', 
                height: '350px',
                marginLeft: 'auto',
                marginRight: 'auto',
                boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                width: '98%'
            }}>
            <div className='toys-section'>
                <Typography gutterBottom variant="h5" component="div" sx={{paddingLeft: '20px', paddingTop: '10px'}}>
                    <strong>Toys</strong>
                </Typography>
                <div style={{display: 'flex', justifyContent: 'space-evenly', paddingTop: '20px', textAlign: 'center'}}>
                    {Products.toys.map((item) => (
                        <Card sx={{ maxWidth: 200, cursor: 'pointer' }}>
                            <CardMedia
                                sx={{ width: 200, height: 180, backgroundSize: 'contain' }}
                                image={item.imgPath}
                                title={item.title}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="p" component="div">
                                    <strong>{item.title}</strong>
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </Box>
        <Box sx={{ 
                marginTop: '20px',
                backgroundColor: '#fff',
                marginLeft: 'auto',
                marginRight: 'auto',
                boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                width: '98%'
            }}>
            <div className='Fashion-section'>
                <Typography gutterBottom variant="h5" component="div" sx={{paddingLeft: '20px', paddingTop: '10px'}}>
                    <strong>Fashion</strong>
                </Typography>
                <Grid container spacing={2} textAlign='center'>
                    <Grid item xs={4}>
                        <Grid container spacing={2} sx={{padding: '20px'}}>
                            {Products.fashions.map((item) => (
                                <Grid item xs={6}>
                                    <Card sx={{ maxWidth: 200 }}>
                                        <CardMedia
                                            sx={{ width: 200, height: 180, backgroundSize: 'contain' }}
                                            image={item.imgPath}
                                            title={item.title}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="p" component="div">
                                                <strong>{item.title}</strong>
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        <div style={{padding: '20px'}}>
                            <img style={{width: '800px'}} src={require('../assets/images/HappyShopping.jpg')} alt="Happy Shopping"/>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </Box>
        <Footer />
    </div>
  )
}

export default MainPage