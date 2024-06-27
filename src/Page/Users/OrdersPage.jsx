import * as React from 'react'
import { Box, Card, CardContent, IconButton, Paper, InputBase, Typography, Link } from '@mui/material'
import NavBar from '../../Components/NavBar'
import Footer from '../../Components/Footer'
import SearchIcon from '@mui/icons-material/Search';
import { FaStar } from "react-icons/fa";


const OrdersPage = () => {
  const searhRef = React.useRef()
  const searchProduct = (event) => {
    event.preventDefault();
    console.log(searhRef.current.search.value)
  }
  
  return (
    <Box>
        <NavBar />
          <Box sx={{ mt: "70px", bgcolor: '#f7f7ff', minHeight: 580}}>
            <Box>
              <Box sx={{pt: 5}}>
                <Box component='form' ref={searhRef} onSubmit={searchProduct}>
                  <Paper
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 700, ml: "auto", mr: "auto" }}
                  >
                    <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                      <SearchIcon />
                    </IconButton>
                    <InputBase
                      sx={{ ml: 1, flex: 1, fontFamily: "poppins" }}
                      placeholder="Search for Products"
                      name='search'
                      inputProps={{ 'aria-label': 'search for products', fontFamily: "poppins" }}
                    />
                  </Paper>
                </Box>
              </Box>
              <Box sx={{ mt: 2 }}>
                <Card sx={{ width: "900px", ml: "auto", mr: "auto", pl: 5, pr: 5, mb: 1 }}>
                  <CardContent>
                    <Box sx={{display: "flex", justifyContent: "space-between"}}>
                      <Box sx={{display: "flex"}}>
                        <Box 
                          component="img"
                          src={require('../../Assets/images/Products/air-max-dn-shoes.png')}
                          sx={{ width: "75px" }}
                        />
                        <Box sx={{ display: "flex", flexDirection: "column",  }}>
                          <Typography fontFamily="poppins" fontSize="14px" sx={{ ml: 2 }}>air Max Dn Shoes</Typography>
                          <Typography fontFamily="poppins" fontSize="12px" color="gray" sx={{ml: 2, mt: 1}}>Color: Black</Typography>
                        </Box>
                      </Box>
                      <Typography fontFamily="poppins" fontSize="14px" fontWeight="500">&#8377; 106</Typography>
                      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "85px" }}>
                        <Box>
                          <Box sx={{display: "flex", alignItems: "center", mb: 1 }}>
                            <span className='greenDot'></span>
                            <Typography fontFamily="poppins" fontSize="13px" fontWeight="600" sx={{ml: 1}}>Delivered on March 5</Typography>
                          </Box>
                          <Typography fontFamily="poppins" fontSize="11px">Your Item has Delivered</Typography>
                        </Box>
                          <Link href="#" sx={{fontSize: "13px", display: "flex", alignItems: "center"}} underline='none'>
                            <FaStar sx={{mr: 2}} />Rate & Review Product
                          </Link>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Box>
          </Box>
        <Footer />
    </Box>
  )
}

export default OrdersPage