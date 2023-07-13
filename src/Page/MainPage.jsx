import * as React from 'react'
import NavBar from '../Components/NavBar'
import { Box, Grid, Typography } from '@mui/material'
import '../assets/style.css'
import Footer from '../Components/Footer'
import Products from '../Components/Products'
import { motion } from "framer-motion"
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { CardItem } from '../Components/Component'
import Helper from '../Helper/Helper'

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
                    <a key={item.title} href='!#' className='mainpage-a'>
                        <div className='prod-contain' style={{textAlign: 'center'}}>
                            <div>
                                <img src={item.imgPath} alt='Product'/>
                            </div>
                            <div>
                                <motion.span animate={{color:'#000'}}>{item.title}</motion.span>
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
                    <Typography gutterBottom variant="h5" component="div">
                        <motion.h5 animate={{fontSize: '1em', x:20, y:5}}>Electronics</motion.h5>
                    </Typography>
                    <div className='left-icon electronics' onClick={(event) => Helper.scrollLeft(event)}>
                        <ChevronLeftIcon className='icons electronics' />
                    </div>
                    <div className='card-container electronics-scroll'>
                        {Products.electronics.map((item) => (
                            <CardItem title={item.title} imgPath={item.imgPath}/>
                        ))}
                    </div>
                    <div className='right-icon electronics' onClick={(event) => Helper.scrollRight(event)}>
                        <ChevronRightIcon className='icons electronics' />
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
                    <Typography gutterBottom variant="h5" component="div">
                        <motion.h5 animate={{fontSize: '1em', x:20, y:5}}>Toys</motion.h5>
                    </Typography>
                    <div className='left-icon toys' onClick={(event) => Helper.scrollLeft(event)}>
                        <ChevronLeftIcon className='icons toys' />
                    </div>
                    <div className='card-container toys-scroll' >
                        {Products.toys.map((item) => (
                            <CardItem title={item.title} imgPath={item.imgPath}/>
                        ))}
                    </div>
                    <div className='right-icon toys' onClick={(event) => Helper.scrollRight(event)}>
                        <ChevronRightIcon className='icons toys' />
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
                    <Typography gutterBottom variant="h5" component="div">
                        <motion.h5 animate={{fontSize: '1em', x:20, y:5}}>Fashion</motion.h5>
                    </Typography>
                    <Grid container spacing={2} textAlign='center'>
                        <Grid item xs={4}>
                            <Grid container spacing={2} sx={{padding: '20px'}}>
                                {Products.fashions.map((item) => (
                                    <Grid key={item.title} item xs={6}>
                                        <CardItem title={item.title} imgPath={item.imgPath}/>
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