import * as React from 'react'
import NavBar from '../Components/NavBar'
import Footer from '../Components/Footer'
import { Box, Breadcrumbs, Button, Card, CardMedia, Divider, Link, Popover, Typography } from '@mui/material'
import Products from '../Components/Products'
import { motion } from 'framer-motion'
import Helper from '../Helper/Helper'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { CardItem } from '../Components/Component'

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

const breadcrumbs = [
  <Link underline="hover" key="1" color="inherit" href="/" onClick={handleClick} sx={{marginLeft: '20px', fontSize: '13px'}}>
    Home
  </Link>,
  <Link
    underline="hover"
    key="2"
    color="inherit"
    href="/material-ui/getting-started/installation/"
    onClick={handleClick}
    sx={{fontSize: '13px'}}
  >
    Mobile
  </Link>,
  <Link underline="hover" key="3" color="inherit" href="/" onClick={handleClick} sx={{fontSize: '13px'}}>
    {Products.Mobiles[2].brand}
  </Link>,
  <Typography key="4" color="text.primary" sx={{fontSize: '13px'}}>
    {Products.Mobiles[2].title}
  </Typography>,
];

const ProductDetailPage = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
        <NavBar />
        <Box sx={{  width: '98%', margin: 'auto', marginTop: '70px', display: 'flex' }}>
          <div style={{ width:'35%'}}>
            <Card sx={{ height: 450, padding: '10px 60px 10px 60px' }}>
              <CardMedia
                sx={{ width: 300, height: 400, marginTop: '20px', backgroundSize: '300px 380px'}}
                image={Products.Mobiles[2].imgPath}
                title={Products.Mobiles[2].title}
              />
            </Card>
            <div style={{ display: 'flex', marginTop: '10px' }}>
              <Button sx={{marginRight: '10px',flexGrow: 1, height: '50px' }} variant='contained' color='error'><ShoppingCartIcon sx={{fontSize: '1.3em'}} />&nbsp;Add to Cart</Button>
              <Button sx={{flexGrow: 1.5, height: '50px'}} variant='contained' color='success'><LocalMallIcon sx={{fontSize: '1.3em'}} />&nbsp;Buy Now</Button>
            </div>
          </div>
          <Box className='product-details' height='596px'>
            {/* Breadcrumb Section */}
            <Breadcrumbs separator="›" aria-label="breadcrumb">
              {breadcrumbs}
            </Breadcrumbs>

            {/* Title and Rating Section */}
            <motion.p 
                  initial={{x:0}} 
                  animate={{x:20}} 
                  style={{ fontSize: '1.2em' }}
            >
                  {Products.Mobiles[2].title}
            </motion.p>
            <div style={{marginLeft: '20px', marginTop: '-10px'}}>
              <span className='rating-icon'>{Products.Mobiles[2].rating} &#9733;</span>
              <span style={{ marginLeft: '10px', fontSize: '15px', color: 'grey' }}>128 Ratings & 21 Reviews</span>
            </div>


            <motion.p 
                  initial={{x:0}} 
                  animate={{x:20}} 
                  style={{color: 'blue'}}
            >
                  Glad to make a deal with you
            </motion.p>


            <motion.p initial={{x:0}} animate={{x:20}} style={{color: 'green', marginBottom: '-15px', fontWeight: '600'}}>Extra &#8377;{Helper.getDiscountAmount(Products.Mobiles[2].Price, Products.Mobiles[2].discount)} off</motion.p>
            <div style={{ display:'flex', alignItems: 'center' }}>
              <h2 style={{marginLeft:20}} >&#8377;{ Helper.getDiscountPrice(Products.Mobiles[2].Price, Products.Mobiles[2].discount) }</h2>
              <p style={{ marginLeft: '15px', textDecoration: 'line-through', color: 'grey' }}>&#8377;{Products.Mobiles[2].Price}</p>
              <p style={{ marginLeft: '15px', color: 'green', fontWeight: '600' }}>{Products.Mobiles[2].discount}% off</p>
              <div>
                <HelpOutlineIcon
                    aria-owns={open ? 'mouse-over-popover' : undefined}
                    aria-haspopup="true"
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}
                    sx={{ marginLeft: '15px', color: 'grey' }} 
                />
                <Popover
                  id="mouse-over-popover"
                  sx={{
                    pointerEvents: 'none',
                  }}
                  open={open}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  onClose={handlePopoverClose}
                  disableRestoreFocus
                >
                  <div style={{padding: 15}}>
                    <div style={{display: 'flex'}}>
                      <p className='popover-head'>Maximum Price  =&nbsp;&nbsp;</p>
                      <p className='popover-text' style={{textDecoration: 'line-through'}}>{Products.Mobiles[2].Price}</p>
                    </div>
                    <div style={{display: 'flex'}}>
                      <p className='popover-head'>Selling Price  =&nbsp;&nbsp;</p>
                      <p className='popover-text' style={{textDecoration: 'line-through'}}>{Products.Mobiles[2].Price}</p>
                    </div>
                    <Divider />
                    <div style={{display: 'flex'}}>
                      <p className='popover-head'>Special Price  =&nbsp;&nbsp;</p>
                      <p className='popover-text'>&nbsp;&nbsp;{Helper.getDiscountPrice(Products.Mobiles[2].Price, Products.Mobiles[2].discount)}</p>
                    </div>
                  </div>
                </Popover>
                
              </div>
            </div>
            <div style={{ marginLeft: '20px', display: 'flex'}}>
              <Typography variant='p' component='div' color='text.secondary' sx={{marginTop:'15px', fontSize: '15px', fontWeight: '600'}}>
                Highlights
              </Typography>
              <div >
                <ul className='prod-ul'>
                    {Products.Mobiles[2].highlight.split("\n").map((point) => (
                        <li className='prod-lst' style={{ color: '#232b2b', fontSize: '14px', marginBottom: '8px' }}>{point}</li>
                    ))}
                </ul>
              </div>
            </div>
            <div style={{ marginLeft: '20px', display: 'flex'}}>
              <Typography variant='p' component='div' color='text.secondary' sx={{marginTop:'15px', fontSize: '15px', fontWeight: '600'}}>
                Description
              </Typography>
              <Typography variant='p' component='div' sx={{marginTop:'15px', color:'#232b2b', marginLeft: '20px'}}>
                {Products.Mobiles[2].description}
              </Typography>
            </div>

            {/* Specification */}
            
            <div className='spec-content' style={{  padding:'40px 20px 20px 20px' }}>
              <Typography variant='h5' component='div' style={{ border: '1px solid #D3D3D3', padding: '20px', borderBottom: 'none' }}>
                Specifications
              </Typography>
              <div style={{ border: '1px solid #D3D3D3', padding: '20px' }}>
                <Typography variant='h6' style={{ marginLeft: '15px', fontSize: '1.2em', marginBottom: '10px' }}>
                  General
                </Typography>
                {Products.Generals.map((item) => (
                  <div style={{ display: 'flex', marginBottom:'5px' }}>
                    <Typography variant='p' color='text.secondary' sx={{ padding: '10px', width: '20%'}}>{item.title}</Typography>
                    <Typography variant='p' sx={{ padding: '10px', width: '80%' }}>{item.value}</Typography>
                  </div>
                ))}
              </div>
              <div style={{ border: '1px solid #D3D3D3', padding: '20px', borderTop: 'none' }}>
                <Typography variant='h6' style={{ marginLeft: '15px', fontSize: '1.2em', marginBottom: '10px' }}>
                  Display Features
                </Typography>
                {Products.DisplayFeatures.map((item) => (
                  <div style={{ display: 'flex', marginBottom:'5px' }}>
                    <Typography variant='p' color='text.secondary' sx={{ padding: '10px', width: '20%'}}>{item.title}</Typography>
                    <Typography variant='p' sx={{ padding: '10px', width: '80%' }}>{item.value}</Typography>
                  </div>
                ))}
              </div>
            </div>
          </Box>
        </Box>
        <Box sx={{ 
            backgroundColor: '#fff', 
            height: '350px',
            marginLeft: 'auto',
            marginRight: 'auto',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
            width: '98%'
          }}>
          <div className='electronic-section'>
              <Typography gutterBottom variant="h5" component="div">
                  <motion.h5 animate={{fontSize: '1em', x:20, y:5}}>Similar Products</motion.h5>
              </Typography>
              <div className='left-icon electronics' onClick={(event) => Helper.scrollLeft(event)}>
                  <ChevronLeftIcon className='icons electronics' />
              </div>
              <div className='card-container electronics-scroll' style={{marginTop: '-30px'}}>
                  {Products.Mobiles.map((item) => (
                      <CardItem title={item.title} imgPath={item.imgPath}/>
                  ))}
              </div>
              <div className='right-icon electronics' onClick={(event) => Helper.scrollRight(event)}>
                  <ChevronRightIcon className='icons electronics' />
              </div>
          </div>
        </Box>
        <Footer />
    </div>
  )
}

export default ProductDetailPage