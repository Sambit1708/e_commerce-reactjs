import * as React from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Button, styled, Snackbar, Alert } from '@mui/material';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';
import NavBar from '../../Components/NavBar';
import Grid from '@mui/material/Unstable_Grid2';
import Footer from '../../Components/Footer';
import Products from '../../Components/Common/Products';
import BoltIcon from '@mui/icons-material/Bolt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCartContext } from '../../Components/CartProvider'
import ProductService from '../../Services/ProductService';
import { useNavigate } from 'react-router-dom'
import LoginService from '../../Services/LoginService';
import Swal from 'sweetalert2';

const BuyNowButton = styled(Button)({
  textTransform: 'uppercase',
  fontSize: 16,
  padding: '6px 12px',
  border: '1px solid',
  lineHeight: 1.5,
  width: '100%',
  height: "56px",
  borderColor: '#fb641b',
  backgroundColor: "#fb641b",
  color: "#fff",
  boxShadow: `none`,
  fontFamily: [
    'Poppins',
    'sans-serif',
  ].join(','),
  '&:hover': {
    backgroundColor: '#f85404',
    borderColor: '#f85404',
    boxShadow: 'none'
  },
  '&:active': {
    boxShadow: `none`,
    backgroundColor: '#ff9f00'
  }
});

const AddToCartButton = styled(Button)({
  width: '100%',
  height: "56px",
  textTransform: 'uppercase',
  fontSize: 16,
  padding: '6px 12px',
  border: '1px solid',
  lineHeight: 1.5,
  borderColor: '#ff9f00',
  backgroundColor: "#ff9f00",
  color: "#fff",
  boxShadow: `none`,
  fontFamily: [
    'Poppins',
    'sans-serif',
  ].join(','),
  '&:hover': {
    backgroundColor: '#eb9300',
    borderColor: '#eb9300',
    boxShadow: 'none'
  },
  '&:active': {
    boxShadow: `none`,
    backgroundColor: '#ff9f00'
  }
});

const ProductDetailPage = () => {
  const [size, setSize] = React.useState()
  const [openSizeAlert, setOpenSizeAlert] = React.useState(false);
  const [product, setProduct] = React.useState({
    id: "demo",
    title: "demo",
    price: 0,
    description: `demo`,
    rating: 0,
    imageName: "demo",
    imagePath: "../../../Assets/images/user.png",
    brand: {
        id: "demo",
        name: "demo",
        description: "Hello"
    },
    productSizes: [
      {
          id: "demo",
          size: 0,
          quantity: 0
      }
    ],
    productDetails: {
        color: "demo",
        modelName: "demo",
        idealFor: "demo",
        occasion: "demo",
        type: "demo",
    }
  })
  const navigate = useNavigate();
  const detailKeys = ['id', 'createDate', 'updateDate'];

  const fetchProductById = async (prodId) => {
    try {
      const productResponse = await ProductService.getProduct(prodId);
      setProduct(productResponse.data);
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    var href = window.location.href
    var prodId = href.slice(href.lastIndexOf('/')+1, href.length);
    fetchProductById(prodId);
  }, [])

  const handleClickOnCart = () => {
    setOpenSizeAlert(true);
  };

  const handleCloseSizeAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSizeAlert(false);
  };
  
  const handleClickReadMore = (event) => {
    const ele = document.getElementById('p-detail-desc');
    ele.style.display='block';
    event.target.style.display='none'
  }

  const { addToCart } = useCartContext()

  const addToCartFunc = async (event) => {
    if(size === undefined) {
      handleClickOnCart();
      return;
    }
    
    if(!await LoginService.isLoggedin()) {
      Swal.fire({
        title: "!! Sorry !!",
        text: "This facility is not available for non user",
        icon: "error",
        showDenyButton: true,
        confirmButtonText: "Login",
        confirmButtonColor: "#32CD32",
        denyButtonText: `Explore`
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login/productDetails')
        } else if (result.isDenied) {
          Swal.fire("Please explore our product", "", "info");
        }
      });
    }
    else {
      addToCart(size, product)
      navigate('/u/viewcart')
    }
  }

  const chooseSize = (event, item) => {
    setSize(item);
    const activeEle = document.getElementsByClassName('active-size-btn');
    for(let i=0; i<activeEle.length; i++) {
      activeEle[i].classList.remove('active-size-btn')
    }
    event.currentTarget.classList.add('active-size-btn')
  }

  const transformKey = (item) => {
    if(item === '') {
      return item;
    }
    const regex = /^([a-z]+)([A-Z][a-z]+)?/gm;
    var name = '';
    const match = regex.exec(item);

    if(match) {
      name = match[1].charAt(0).toUpperCase()+match[1].slice(1);
      if(match[2]!== undefined) {
        name += ' '+match[2]
      }
    }
    return name;
  }
  

  return (
    <Box>
      <NavBar />
      <Box component="div" sx={{display: 'flex', mt: 15}}>
        <Box component="div" sx={{ ml: 15 }}>
          <Card sx={{ height: 440, width: 426 }} >
            <CardMedia
              sx={{ height: 440, objectFit: "contain" }}
              image={product.imagePath}
              title={product.title}
              component='img'
            />
          </Card>
          <Grid container spacing={1} sx={{ mt: 2 }}>
            <Grid item xs={6}>
              <AddToCartButton onClick={addToCartFunc} startIcon={<ShoppingCartIcon />}>
                Add to cart
              </AddToCartButton>
              <Snackbar open={openSizeAlert} autoHideDuration={6000} onClose={handleCloseSizeAlert}>
                <Alert
                  onClose={handleCloseSizeAlert}
                  severity="error"
                  variant="filled"
                  sx={{ width: '100%' }}
                >
                  Please Choose a Size!
                </Alert>
              </Snackbar>
            </Grid>
            <Grid item xs={6}>
              <BuyNowButton startIcon={<BoltIcon />}>Buy Now</BuyNowButton>
            </Grid>
          </Grid>
        </Box>
        <Box component="div" sx={{ml: 2}}>
          <Card sx={{ width: 600 }}>
            <CardContent>
                <Box>
                  <Typography fontSize="14px" color="gray" fontWeight="500" fontFamily='poppins'>
                    {product.brand.name}
                  </Typography>
                  <Typography gutterBottom variant="h6" fontWeight='500' fontFamily='poppins'>
                    {product.title}
                  </Typography>
                </Box>
                <Typography sx={{mt: 3}}  fontWeight='500' fontFamily='poppins'>
                  MRP: ₹{product.price}
                </Typography>
                <Box sx={{mt: 1}}>
                  <Typography variant='p' className='rating-icon'>
                    {product.rating} <span className="fa fa-star"></span>
                  </Typography>
                  <Typography variant='p' sx={{ ml: 1, color: '#878787', fontSize: '14px', fontWeight: '500' }}>500 reviews & 42 ratings</Typography>
                </Box>
                <Box sx={{ display: "flex", mt: 3, alignItems: "center", zIndex: 1 }}>
                  <Typography fontWeight="550">Size: </Typography>
                  <Grid spacing={1} container sx={{ ml: 2 }}>
                    {product.productSizes.sort(
                      (a,b) => a.size - b.size
                    ).map(item => (
                      <Grid key={item.id} item>
                        <Box className='size-btn-ele' onClick={(e) => chooseSize(e, item)} variant='outlined'>
                          {item.size}
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
                <Box component="img" 
                      src={require('../../Assets/images/ribbon1.png')} 
                      sx={{ height: "100px", width: "400px", mt: 3 }} 
                />
                <Accordion sx={{mt:"2px"}}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <Typography fontWeight="500" fontFamily="poppins" variant="h6">
                      Product Details
                    </Typography>
                  </AccordionSummary>
                  <Divider sx={{borderColor: "#d4d4d4"}} />
                  <AccordionDetails>
                    {
                      Object.keys(product.productDetails).map((key, index) => {
                        if(detailKeys.includes(key)) {
                          return null;
                        }
                        return (
                          <Grid container key={index} sx={{mt: 3}}>
                            <Grid item xs={4}>
                              <Typography fontSize="14px" fontFamily='poppins' sx={{ color: "grey" }}>
                                {transformKey(key)}:
                              </Typography>
                            </Grid>
                            <Grid item xs={8}>
                              <Typography fontSize="14px" fontFamily='poppins'>
                                {product.productDetails[key]}
                              </Typography>
                            </Grid>
                          </Grid>
                        )
                      })
                    }
                    <Box className='read-more' onClick={handleClickReadMore}>
                      Read More
                    </Box>
                    <Box id='p-detail-desc' sx={{ mt: 2 }}>
                      <Typography fontSize="13px" fontFamily='poppins' >
                        {product.description}
                      </Typography>
                    </Box>
                  </AccordionDetails>
                </Accordion>
                <Divider />
                <Card sx={{ mt: 2 }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: "center" }}>
                      <Box component="div">
                        <Typography fontWeight="500" fontFamily="poppins" variant="h6">
                          Rating and Reviews
                        </Typography>
                      </Box>
                      <Box component="div" sx={{ ml: 2 }}>
                        <Typography variant='p' className='rating-icon'>
                          {product.rating} <span className="fa fa-star"></span>
                        </Typography>
                      </Box>
                      <Box component="div">
                        <Typography variant='p' sx={{ ml: 1, color: '#878787', fontSize: '14px', fontWeight: '500' }}>
                          40 ratings & 4 reviews
                        </Typography>
                      </Box>
                    </Box>
                    <Divider sx={{ borderColor: '#000', mt: 1 }} />
                    <Box component="div">
                      {Products.ratingAndReviews.map((rating, index) => (
                        <Box key={index} component="div" sx={{ ml: 1, mt: 2 }}>
                          <Box component="div" sx={{ display: 'flex',  alignItems: "center" }}>
                            <Box component="div">
                              <Typography variant='p' className='rating-icon' sx={{ fontSize: "11px" }}>
                                {rating.rating} <span className="fa fa-star"></span>
                              </Typography>
                            </Box>
                            <Box component="div" sx={{ ml: 2 }}>
                              <Typography variant='p' fontSize="14px">
                                {rating.review}
                              </Typography>
                            </Box>
                          </Box>
                          <Box component="div" sx={{ display: 'flex', alignItems: "center", mt: 2 }}>
                            <Typography variant='p' fontSize="12px" sx={{ color: "grey" }}>
                              {rating.user}
                            </Typography>
                            <Typography variant='p' fontSize="12px" sx={{ color: "grey", ml: 3 }}>
                              7days ago
                            </Typography>
                          </Box>
                          <Divider sx={{ borderColor: '#000', mt: 2 }} />
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
            </CardContent>
          </Card>
        </Box>
      </Box>
      <Footer />
    </Box>
  )
}

export default ProductDetailPage