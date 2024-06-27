import * as React from 'react';
import { Dialog, DialogContent, Box, Stack } from '@mui/material'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Grid from '@mui/material/Unstable_Grid2';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ProductDetails = (props) => {

  const { product, detaiOpenDlg, handleDetailsProductClick } = props;

  return (
    <React.Fragment>
      <Dialog
        open={detaiOpenDlg}
        onClose={handleDetailsProductClick}
        TransitionComponent={Transition}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "800px",  // Set your width here
            },
          },
        }}
      >
        <AppBar sx={{ position: 'relative', bgcolor: "#9c27b0" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={props.handleDetailsProductClick}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} textTransform="uppercase" fontFamily="poppins" variant="h6" component="div">
              Product Details
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent sx={{mt: 1}}>
          <Box sx={{ pt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Box
                    component="img"
                    className='prod-details-img'
                    src={product.imagePath}
                    alt='R'
                />
              </Grid>
              <Grid item xs={8}>
                <Box className='p-details-info-details-page'>
                  <Typography color="grey" fontFamily="poppins" fontWeight="500" textTransform="uppercase" 
                      sx={{ pl: 1, pr: 1, mt: "-27px", bgcolor: "#fff", width: "fit-content"}}>
                      Product Info
                  </Typography>
                  <Box sx={{mt: 1}}>
                    <Typography textTransform="uppercase" fontFamily="poppins" 
                                fontSize="16px" fontWeight="bold">
                        {product.title}
                    </Typography>
                    <Typography sx={{ mt:1 }} fontFamily="poppins" fontSize="12px" color="grey">
                      {product.description}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box className='p-details'>
            <Typography color="grey" fontFamily="poppins" fontWeight="500" textTransform="uppercase" 
                        sx={{ pl: 1, pr: 1, ml: 4, mt: "-12px", bgcolor: "#fff", width: "fit-content"}}>
                Product Details
            </Typography>
              <Box className='p-details-container'>
                <Stack spacing={2}>
                  <Box className='p-details-flex'>
                    <Typography fontFamily="poppins" fontWeight="bold" 
                                textTransform="uppercase" fontSize="14px">
                        Price:
                    </Typography>
                    <Box sx={{width: "180px"}}>
                      <Typography fontFamily="poppins" fontSize="14px" fontWeight="500">
                          &#8377; {product.price}.00
                      </Typography>
                    </Box>   
                  </Box>
                  <Box className='p-details-flex'>
                    <Typography fontFamily="poppins" fontWeight="bold" 
                                textTransform="uppercase" fontSize="14px">
                        Color:
                    </Typography>
                    <Box sx={{width: "180px"}}>
                      <Typography fontFamily="poppins" fontSize="14px">
                        {product.productDetails.color}
                      </Typography>
                    </Box>    
                  </Box>
                  <Box className='p-details-flex'>
                    <Typography fontFamily="poppins" fontWeight="bold" 
                                textTransform="uppercase" fontSize="14px">
                        Occasion:
                    </Typography>
                    <Box sx={{width: "180px"}}>
                      <Typography fontFamily="poppins" fontSize="14px">
                        {product.productDetails.occasion}
                      </Typography> 
                    </Box>
                  </Box>
                </Stack>
                <Stack spacing={2}>
                  <Box className='p-details-flex'>
                    <Typography fontFamily="poppins" fontWeight="bold" 
                                textTransform="uppercase" fontSize="14px">
                        Rating:
                    </Typography>
                    <Box sx={{width: "180px"}}>
                      <Typography variant='p' className='rating-icon'>
                          {product.rating} <span className="fa fa-star"></span>
                      </Typography> 
                    </Box>
                  </Box>
                  <Box className='p-details-flex'>
                    <Typography fontFamily="poppins" fontWeight="bold" 
                                textTransform="uppercase" fontSize="14px">
                        Type:
                    </Typography>
                    <Box sx={{width: "180px"}}>
                      <Typography fontFamily="poppins" fontSize="14px">
                        {product.productDetails.type}
                      </Typography>
                    </Box>
                  </Box>
                  <Box className='p-details-flex'>
                    <Typography fontFamily="poppins" fontWeight="bold" 
                                textTransform="uppercase" fontSize="14px">
                        Ideal For:
                    </Typography>
                    <Box sx={{width: "180px"}}>
                      <Typography fontFamily="poppins" fontSize="14px">
                        {product.productDetails.idealFor}
                      </Typography>
                    </Box>                            
                  </Box>
                </Stack>
              </Box>
              <Box sx={{ mt: 2 }}>
                <Box sx={{ display: "flex", width: "100%", alignItems: "center" }}>
                  <Box sx={{ width: "180px", pl: 4 }}>
                    <Typography fontFamily="poppins" fontWeight="bold" 
                                textTransform="uppercase" fontSize="14px">
                        Model Name:
                    </Typography>
                  </Box>
                  <Box sx={{width: "100%"}}>
                    <Typography fontFamily="poppins" fontSize="14px">
                      {product.productDetails.modelName}
                    </Typography>
                  </Box>                            
                </Box>
              </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  )
}

export default ProductDetails