import * as React from 'react'
import { Alert, Box, Button, Card, CardContent, CardHeader, DialogContent, Divider, Grid, Slide, Snackbar, styled, Typography } from '@mui/material'
import { DialogTitle, Dialog, FormControl, Radio, RadioGroup, FormControlLabel } from '@mui/material'
import NavBar from '../../Components/NavBar'
import Footer from '../../Components/Footer'
import { useCartContext } from '../../Components/CartProvider';
import CartService from '../../Services/CartService';
import UserService from '../../Services/UserService';
import Swal from 'sweetalert2';
import LoginService from '../../Services/LoginService';
import { useNavigate } from 'react-router-dom'



const BuyNowButton = styled(Button)({
  textTransform: 'uppercase',
  fontSize: 16,
  padding: '6px 80px',
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ViewCart = () => {
  const { cart } = useCartContext();
  const [openQtyAlert, setOpenQtyAlert] = React.useState(false);
  const [openAddressAlert, setOpenAddressAlert] = React.useState(false);
  const [cartItems, setCartItems] = React.useState([]);
  const [currAddress, setCurrAddress] = React.useState({});
  const [allAddress, setAllAddress] = React.useState([]);
  const navigate = useNavigate();

  const handleAddressAlert = () => {
    setOpenAddressAlert(!openAddressAlert);
  }

  const checkCurrentUser = async () => {
    console.log(cart)
    if(await LoginService.isLoggedin()) {
      var cartItemsResponse = [];
      try {
        if(cart.length !== 0) {
          const addToCartItems = {
            productId: cart[0].productId,
            productSizeId: cart[0].productSizeId,
            quantity: 1
          }
          const cartResponse = await CartService.addToCart(addToCartItems);
          console.log(cartResponse)
          if(cartResponse.status === 201 || cartResponse.status === 200 ||cartResponse.status === 500 ) {
            window.location.reload();
          }
        }
        else {
          cartItemsResponse = await CartService.getAllCartItem();
          setCartItems(cartItemsResponse.data);
        }
        const addressResponse = await UserService.getCurrentAddress();
        const allAddressResponse = await UserService.getAllAddresses();
        if(addressResponse.status === 200) {
          setCurrAddress(addressResponse.data);
        }
        if(allAddressResponse.status === 200) {
          setAllAddress(allAddressResponse.data);
        }
      } catch (error) {
      }
    }
  }

  React.useEffect(() => {
    checkCurrentUser();
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleCloseSizeAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenQtyAlert(false);
  };

  const onQtyClick = async (event, productId, productSizeId) => {
    const sign = event.target.innerText;
    const iCart = [...cartItems]
    const newCart = iCart.find(item => 
      (item.product.id === productId && item.productSize.id === productSizeId)
    )
    if(sign === '-' && newCart.quantity > 1) {
      newCart.quantity = newCart.quantity-1;
    }
    else if(sign === '+') {
      newCart.quantity = newCart.quantity+1;
    }
    const data = {
      quantity: newCart.quantity,
      productId: newCart.product.id,
      productSizeId: newCart.productSize.id
    }
    await CartService.updateItemQuantity(newCart.id, data);
    const cartItemsResponse = await CartService.getAllCartItem();
    setCartItems(cartItemsResponse.data);
    setOpenQtyAlert(true);
  }

  const removeCartItemDB = async (cartItemId) => {
    try {
      const dCartItemsResponse = 
                      await CartService.removeCartItem(cartItemId);
      if(dCartItemsResponse.status === 200) {
        Swal.fire({
          title: "!! Removed !!",
          text: `${(dCartItemsResponse).data.message}`,
          icon: "success"
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      }
    } catch (error) {
      Swal.fire({
        title: "!! Error !!",
        text: `Some problem occured please try after some time !!`,
        icon: "error"
      })
    }
  }

  const removeCartItem = (productId, productSizeId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!"
    }).then((result) => {
      if (result.isConfirmed) {
        const iCart = [...cartItems];
        const newCart = iCart.find(item => 
          (item.productSize.id === productSizeId && item.product.id === productId)
        )
        removeCartItemDB(newCart.id)
      }
    });
  }

  const getTotalProduct = () => {
    return cartItems.length;
  }

  const getTotalPrice = () => {
    var price = 0;
    for(let i=0; i<cartItems.length; i++) {
      price = price + (cartItems[i].product.price * cartItems[i].quantity)
    }
    return price;
  }

  const vertical = 'bottom';
  const horizontal = 'center';

  return (
    <Box>
      <NavBar />
      <Box component="div" sx={{ display: 'flex', pt: 15, bgcolor: "#f7f7ff" }}>
        {
          cartItems.length !== 0 ?
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Box sx={{ml: 8}}>
                  <Box sx={{ mb: 2 }}>
                    <Card sx={{p: 2, textAlign: "center" }}>
                      <Typography fontFamily="poppins" fontWeight="bold" textTransform="uppercase">
                        Add To Cart
                      </Typography>
                      <hr style={{ width: "150px", margin: "auto", border: "2px solid #2a55e5" }} />
                    </Card>
                  </Box>
                  {
                    Object.keys(currAddress).length !== 0 &&
                    <Box>
                      <Card>
                        <CardContent>
                          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <Box>
                              <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Typography fontFamily="poppins" fontSize="14px">Deliver to:&nbsp;</Typography>
                                <Typography fontFamily="poppins" fontWeight="500" fontSize="14px">{currAddress.deliverTo}, {currAddress.pin}</Typography>
                              </Box>
                              <Box>
                                <Typography className='turncate' fontFamily="poppins" fontSize="13px" sx={{color: "grey", width: "410px"}}>
                                  {currAddress.address}
                                </Typography>
                              </Box>
                            </Box>
                            <Box>
                              <Button variant='outlined' onClick={handleAddressAlert}>change</Button>
                              <Dialog onClose={handleAddressAlert} open={openAddressAlert}>
                                <DialogTitle>Address</DialogTitle>
                                <DialogContent>
                                  <FormControl>
                                    <RadioGroup
                                      aria-labelledby="demo-radio-buttons-group-label"
                                      defaultValue="address"
                                      name="radio-buttons-group"
                                    >
                                      {
                                        allAddress.length !== 0 &&
                                        allAddress.map((item, index) => (
                                          <FormControlLabel key={index} value="address" control={<Radio />} label= {
                                            <Box>
                                              <Box sx={{ display: "flex", alignItems: "center" }}>
                                                <Typography fontFamily="poppins" fontWeight="500" fontSize="14px">
                                                  {item.deliverTo}, {item.pin}
                                                </Typography>
                                              </Box>
                                              <Box>
                                                <Typography className='turncate' fontFamily="poppins" fontSize="13px" sx={{color: "grey", width: "410px"}}>
                                                  {item.address}
                                                </Typography>
                                              </Box>
                                            </Box>
                                          } />
                                        ))
                                      }
                                    </RadioGroup>
                                  </FormControl>
                                </DialogContent>
                              </Dialog>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    </Box>
                  }
                  <Box sx={{mt: 2}}>
                    <Card>
                      <CardContent>
                        {
                          cartItems.length !== 0 && 
                          cartItems.sort((a,b) => new Date(b.updateDate) - new Date(a.updateDate))
                          .map((item, index) => (
                            <React.Fragment key={index}>
                              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2, mt: 2 }}>
                                <Box>
                                  <Box sx={{ display: "flex" }}>
                                    <Box
                                      component="img"
                                      sx={{ width: "110px" }}
                                      src={ item.product.imagePath }
                                    />
                                    <Box sx={{ ml: 3 }}>
                                      <Typography className='turncate' fontFamily="poppins" sx={{ width: "450px" }}>{ item.product.title }</Typography>
                                      <Typography fontFamily="poppins" fontSize="13px" sx={{color: "grey"}}>Size: { item.productSize.size },&nbsp;color: { item.product.productDetails.color }</Typography>
                                      <Typography fontFamily="poppins" fontSize="13px" sx={{color: "grey", mt: 3}}>Seller: { item.product.brand.name }</Typography>
                                      <Typography fontFamily="poppins" fontWeight="600" sx={{ mt: 2}}>&#8377; { item.product.price }</Typography>
                                    </Box>
                                  </Box>
                                  <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                                    <Box sx={{ display: "flex", alignItems: 'center', width: "110px", justifyContent: "space-between" }}>
                                      <button onClick={ (e) => {
                                                                  onQtyClick( e, item.product.id, item.productSize.id)
                                                               }
                                                      } 
                                              className="size-btn"
                                      >
                                        -
                                      </button>
                                      <div className='size-input'>
                                        {item.quantity}
                                      </div>
                                      <button onClick={ (e) => {
                                                                  onQtyClick( e, item.product.id, item.productSize.id )
                                                               }
                                                      }
                                              className="size-btn"
                                      >
                                        +
                                      </button>
                                    </Box>
                                    <Box sx={{ ml: 3 }}>
                                      <Button onClick={() => removeCartItem( item.product.id, item.productSize.id )} 
                                              sx={{ color: "black", fontWeight: "bold" }}
                                      >
                                        Remove
                                      </Button>
                                    </Box>
                                  </Box>
                                </Box>
                                <Box sx={{ mr: 3 }}>
                                  <Typography fontFamily="poppins" fontSize="14px" >Delivery by 2 days</Typography>
                                </Box>
                              </Box>
                              <Divider sx={{ borderColor: "black", ml: -5, mr: -5 }} />
                            </React.Fragment>
                          ))
                        }
                      </CardContent>
                      <Box sx={{ height: "80px", boxShadow: `0 -2px 10px 0 rgba(0, 0, 0, .1);`, 
                                  display: "flex", justifyContent: "flex-end", alignItems: "center"}}>
                        <Box sx={{ mr: 3 }}>
                          <BuyNowButton onClick={() => navigate('/u/checkout')}>Place Order</BuyNowButton>
                        </Box>
                      </Box>
                    </Card>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={{ mr: 8 }}>
                  <Card>
                    <CardHeader 
                      title={<Typography fontFamily="poppins" textTransform="uppercase" 
                                          sx={{color: "grey"}} fontWeight="500">Price details</Typography>}
                    />
                    <Divider />
                    <CardContent>
                      <Box sx={{ p: 2 }}>
                        <Box sx={{ display: "flex", justifyContent: 'space-between' }}>
                          <Typography fontFamily="poppins">Price ({getTotalProduct()} items)</Typography>
                          <Typography fontWeight="500" fontFamily="poppins">&#8377; {getTotalPrice()}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: 'space-between', mt: 3 }}>
                          <Typography fontFamily="poppins">Delivery Charges</Typography>
                          <Typography fontWeight="500" fontFamily="poppins" sx={{ color: "#388e3c" }}>&#8377; 10</Typography>
                        </Box>
                        <Divider sx={{ borderColor: "black", mt: 3 }} />
                        <Box sx={{ display: "flex", justifyContent: 'space-between', mt: 3 }}>
                          <Typography fontFamily="poppins" fontWeight="bold" >Total Amount</Typography>
                          <Typography fontWeight="bold" fontFamily="poppins">&#8377; {getTotalPrice()+10}</Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              </Grid>
            </Grid>
          :
            <Card sx={{ width: "1200px", ml: "auto", mr: "auto" }}>
              <Box>
                <Box sx={{width: "fit-content",ml: "auto", mr: "auto", mt: 4}}>
                  <Box 
                    component='img'
                    sx={{height: "162px"}}
                    src={require('../../Assets/images/empty-cart.jpg')}
                  />
                </Box>
                <Box>
                  <Typography fontFamily="poppins" fontWeight="500" fontSize="18px" 
                              sx={{textAlign: "center", mt: 3}}
                  >
                    Your cart is empty!
                  </Typography>
                  <Typography fontFamily="poppins" fontWeight="500" fontSize="13px" 
                              sx={{color: "grey", textAlign: "center", mt: 2}}
                  >
                    Please add items to your cart
                  </Typography>
                </Box>
                <Box sx={{textAlign: "center", mt: 2, mb: 2}}>
                  <Button variant="contained" onClick={() => {navigate('/product')}}
                          sx={{ fontFamily: "poppins", width: "200px", height: "40px"}}>
                      Shop now
                    </Button>
                </Box>
              </Box>
            </Card>
        }
      </Box>
      <Snackbar 
        open={openQtyAlert}
        anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={6000} 
        onClose={handleCloseSizeAlert}
        key={vertical + horizontal}
        TransitionComponent={Transition}
      >
        <Alert
          onClose={handleCloseSizeAlert}
          severity="success"
          variant='filled'
          sx={{ width: '100%' }}
        >
          You have change Product's QUANTITY
        </Alert>
      </Snackbar>
      <Footer />
    </Box>
  )
}

export default ViewCart