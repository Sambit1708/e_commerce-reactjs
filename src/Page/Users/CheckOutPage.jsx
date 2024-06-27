import * as React from 'react';
import { AppBar, Box, Button, Card, CardContent, CardHeader, Divider, FormControl, FormControlLabel, FormLabel, Grid, InputAdornment, Radio, RadioGroup, styled, TextField, Toolbar, Tooltip, Typography } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { FaCheck } from "react-icons/fa6";
import '../../Assets/style.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import { tooltipClasses  } from '@mui/material/Tooltip';
import UserService from '../../Services/UserService'
import CartService from '../../Services/CartService';
import Swal from 'sweetalert2';
import OrderService from '../../Services/OrderService';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';


const DeliverHereButton = styled(Button)({
    textTransform: 'uppercase',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    width: '200px',
    height: "50px",
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

const ContinueButton = styled(Button)({
    textTransform: 'uppercase',
    fontSize: 14,
    paddingLeft: '3px',
    paddingRight: "3px",
    border: '1px solid',
    lineHeight: 1.5,
    width: '150px',
    height: "50px",
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

const SaveAndDeliverButton = styled(Button)({
    textTransform: 'uppercase',
    fontSize: 14,
    paddingLeft: '3px',
    paddingRight: "3px",
    border: '1px solid',
    lineHeight: 1.5,
    width: '250px',
    height: "50px",
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


const CheckOutPage = () => {
    const [delivertStepper, setDeliveryStepper] = React.useState(0);
    const [openDeliveryStatus, setOpenDeliveryStatus] = React.useState(false);
    const [openPlaceOrderStatus, setOpenPlaceOrderStatus] = React.useState(false);
    const [paymentOption, setPaymentOption] = React.useState('CARD');
    const [addressOption, setAddressOption] = React.useState('card');
    const [allAddress, setAllAddress] = React.useState([]);
    const [allCartItems, setAllCartItems] = React.useState([]);
    const [typeRadio, setTypeRadio] = React.useState('HOME');
    const navigate = useNavigate();

    const handleChangeAddressType = (event) => {
        setTypeRadio(event.target.value);
    };

    const fetchAllAddress = async () => {
        try {
            const allAddressResponse = await UserService.getAllAddresses();
            console.log(allAddressResponse)
            if(allAddressResponse.status === 200) {
                setAllAddress(allAddressResponse.data);
                allAddressResponse.data.forEach((item) => {
                    if(item.currentAddress) {
                        setAddressOption(item.id)
                    }
                })
                if(allAddressResponse.data.length === 0) {
                    setAddressOption('empty')
                    Swal.fire({
                        icon: "warning",
                        title: "Address is missing",
                        text: "Please add your address first"
                    })
                }
            }
        } catch (error) {
            console.log(error)
        }

    }

    const getAllCartItems = async () => {
        try {
            const cartItemsResponse = await CartService.getAllCartItem();
            if(cartItemsResponse.status === 200) {
                setAllCartItems(cartItemsResponse.data);
            }
            if(cartItemsResponse.status !== 200 || cartItemsResponse.data.length === 0) {
                navigate('/u/viewcart')
            }
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        fetchAllAddress();
        getAllCartItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleDeliveryStatus = () => {
        setOpenDeliveryStatus(!openDeliveryStatus);
    
    };

    const handlePlaceOrderStatus = () => {
        setOpenPlaceOrderStatus(!openPlaceOrderStatus);
    };

    const handlePaymentOption = (e) => {
        setPaymentOption(e.target.value);
    }

    const handleAddressOption = (event) => {
        setAddressOption(event.target.value);
    }

    const nextStep = () => {
        setTimeout(() => {
            setDeliveryStepper(delivertStepper + 1);
        },2000)
    }

    const checkDeliveryAddress = () => {
        document.getElementById('delivery-btn').style.display='none';
        document.getElementById('delivery-check').style.display='block';
        document.getElementById('edit-btn').style.display='none';
        nextStep();
    }

    const checkOrderStatus = () => {
        handleDeliveryStatus();
        nextStep();
    }

    const onQtyClick = async (event, productId, productSizeId) => {
        const sign = event.target.innerText;
        const iCart = [...allCartItems]
        const newCart = iCart.find(item => 
          (item.product.id === productId && item.productSize.id === productSizeId)
        )
        if(sign === '-' && newCart.quantity > 1) {
          newCart.quantity = newCart.quantity-1;
        }
        else if(sign === '+') {
          newCart.quantity = newCart.quantity+1;
        }

        setAllCartItems(iCart);
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
                const iCart = [...allCartItems];
                const newCart = iCart.filter(item => 
                    (item.productSize.id !== productSizeId && item.product.id !== productId)
                )
                setAllCartItems(newCart);
            }
        });
    }
    
    const getTotalProduct = () => {
        return allCartItems.length;
    }

    const getTotalPrice = () => {
        var price = 0;
        for(let i=0; i<allCartItems.length; i++) {
            price = price + (allCartItems[i].product.price * allCartItems[i].quantity)
        }
        return price;
    }

    const HtmlTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
      ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
          backgroundColor: '#f5f5f9',
          color: 'rgba(0, 0, 0, 0.87)',
          maxWidth: 220,
          fontSize: theme.typography.pxToRem(12),
          border: '1px solid #dadde9',
        },
      }));

    /**
     * @param {JSON} data 
     */
    const completeOrderDB = async (data) => {
        try {
            const orderResponse = await OrderService.addOrder(data)
            if(orderResponse.status === 201) {
                Swal.fire({
                    title: "!! Success !!",
                    text: "You have successfully ordered.",
                    icon: "success",
                    backdrop: `
                        rgba(0,0,123,0.4)
                        url("https://sweetalert2.github.io/images/nyan-cat.gif")
                        left top
                        no-repeat
                  `
                  }).then((result) => {
                    if (result.isConfirmed) {
                      window.location.reload();
                    }
                  });
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    const completeOrder = () => {
        const orderItemsDtos = [];
        const cartItemIds = [];
        allCartItems.forEach((item) => {
            orderItemsDtos.push({
                productId: item.product.id,
                productSizeId: item.productSize.id,
                quantity: item.quantity,
                price: item.product.price
            })
            cartItemIds.push(item.id);
        })
        const data = {
            addressId: addressOption,
            paymentMode: paymentOption,
            orderItemsDtos: [...orderItemsDtos],
            cartItemIds: [...cartItemIds]
        }
        handlePlaceOrderStatus();
        setTimeout(() => {completeOrderDB(data);}, 1000);
    }

    const onClickAddAddressStyle = (e) => {
        if(e.target.innerText === 'Add Address' || e.target.innerText === 'ADD ADDRESS') {
            document.getElementById('add-address-section').style.display = 'block';
            document.getElementById('add-address-btn').style.display = 'none';
        } else {
            document.getElementById('add-address-section').style.display = 'none';
            document.getElementById('add-address-btn').style.display = 'block';
        }
        
    }
    
    const saveAddressDB = async (data) => {
        try {
            const addressResponse = await UserService.saveAddress(data);
            if(addressResponse.status === 201) {
                Swal.fire({
                    title: "!! Success !!",
                    text: "You have successfully added address.",
                    icon: "success"
                  }).then((result) => {
                    if (result.isConfirmed) {
                      window.location.reload();
                    }
                  });
            }
        } catch (error) {
            console.log(error);
        }
    }

    const saveAddressAndContnue = (event) => {
        event.preventDefault();
        const formData = new FormData(document.getElementsByTagName('form')[0]);
        const formJson = Object.fromEntries(formData.entries());
        formJson["type"] = typeRadio;
        saveAddressDB(formData);
    }

    return (
        <Box sx={{bgcolor: "#f5f5f5"}}>
            <AppBar sx={{color: 'black', background: '#2874f0'}} component="nav">
                <Toolbar sx={{ display:'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ width: '600px', display:'flex', justifyContent: 'space-between', alignItems: "center" }}>
                        <Typography
                            variant="h6"
                            component="div"
                            fontFamily="poppins"
                            color="white"
                        >
                            E-Commerce
                        </Typography>
                    </Box>
                </Toolbar>
            </AppBar>
            {
                allCartItems.length !== 0 ? (
                <Box sx={{width: "1250px", ml: "auto", mr: "auto", pt: 12}}>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <Card>
                                <CardHeader sx={{ bgcolor: delivertStepper === 0 && "#2874f0" }}
                                    title={
                                        <Box sx={{ display: "flex", alignItems: "center" }}>
                                            <Box sx={{ border: "1px solid white", borderRadius: "2px", bgcolor: delivertStepper !== 0 ? "#d3d3d3" : "white", p: "0px 5px" }}>
                                                <Typography sx={{color: "#2874f0"}} fontSize="11px" fontWeight="bold">
                                                            1
                                                </Typography>
                                            </Box>
                                            <Box sx={{ml: 2}}>
                                                <Typography fontFamily="poppins" textTransform="uppercase" 
                                                        sx={{color: delivertStepper !== 0 ? "#2874f0" : "white"}} fontWeight="500">
                                                    Delivery Address
                                                </Typography>
                                            </Box>
                                            <Box sx={{ ml: 1 }}>
                                                <FaCheck display={delivertStepper !== 0 ? "block":"none"} color='green' />
                                            </Box>
                                        </Box>
                                    }
                                />
                                {
                                    delivertStepper === 0 &&
                                    allAddress.length !== 0 ? (
                                    <CardContent>
                                    {
                                        allAddress.length !== 0 &&
                                        <FormControl>
                                            <RadioGroup
                                                name="radio-buttons-group"
                                                value={addressOption}
                                                onChange={handleAddressOption}
                                            >
                                                {   allAddress.sort((a,b) => new Date(b.updateDate) - new Date(a.updateDate) )
                                                                .map((item, index) => (
                                                    <Box key={index} sx={{ mt: 2 }}>
                                                        <FormControlLabel key={index} value={item.id} control={<Radio />} label= {
                                                            <Box sx={{ display: "flex", justifyContent: "space-between", width: "750px" }}>
                                                                <Box>
                                                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                                                        <Typography fontFamily="poppins" fontWeight="500" fontSize="14px">
                                                                            {item.deliverTo} - {item.phoneNumber}
                                                                        </Typography>
                                                                    </Box>
                                                                    <Box sx={{ display: "flex" }}>
                                                                        <Typography fontFamily="poppins" fontSize="13px" sx={{color: "grey", width: "500px"}}>
                                                                            {item.address} {item.city}, {item.state} - <b style={{color: "black"}}>{item.pinCode}</b>
                                                                        </Typography>
                                                                        {
                                                                            addressOption === item.id &&
                                                                            <FaCheck display="none" id='delivery-check' color='green' />
                                                                        }
                                                                    </Box>
                                                                </Box>
                                                                <Box id='edit-btn'>
                                                                    <Button variant='outlined'>Edit</Button>
                                                                </Box>
                                                            </Box>
                                                        } />
                                                        {
                                                            addressOption === item.id &&
                                                            <Box id='delivery-btn' sx={{ mt: 2, ml: "30px"}}>
                                                                <DeliverHereButton onClick={checkDeliveryAddress}>Deliver Here</DeliverHereButton>
                                                            </Box>
                                                        }
                                                    </Box>
                                                ))} 
                                            </RadioGroup>
                                        </FormControl>
                                    }
                                    </CardContent>
                                    ) : (
                                        allAddress.length === 0 &&
                                        addressOption !== 'empty' ? (
                                            <Box sx={{ width: "fit-content", ml: "auto", mr: "auto", mt: 2, mb: 2 }}>
                                                <Box sx={{ bgcolor:"#fff", width: "200px", p:2, boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
                                                    <Box sx={{ display: "flex", height: "25px",justifyContent: "center" }}>
                                                        <CircularProgress size={30} sx={{mr: 1, mt: "-4px"}}  />
                                                        <p>Loading</p>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        ) : (
                                            <Box></Box>
                                        )
                                    )
                                }
                            </Card>
                            {
                                delivertStepper === 0 &&
                                <Card sx={{mt: 3, textAlign: "left"}}>
                                    <Box component="form">
                                        <Box sx={{width: "100%"}} id="add-address-btn">
                                            <Button startIcon={<AddIcon />} onClick={onClickAddAddressStyle}
                                                    sx={{textTransform: "uppercase", p: 2, fontFamily: "poppins"}}
                                            >
                                                Add Address
                                            </Button>
                                        </Box>
                                        <Box id="add-address-section" sx={{m: "50px auto", width: "600px",  display: "none" }}>
                                            <Box>
                                                <Typography textTransform="uppercase" fontFamily="poppins" 
                                                            fontWeight="bold" textAlign="center"
                                                            sx={{ mb: 3, textDecoration: "underline" }}>
                                                    Add Address
                                                </Typography>
                                            </Box>
                                            <Grid container spacing={2}>
                                                <Grid item xs={6}>
                                                    <TextField label="Name" fullWidth={true} name="deliverTo"
                                                                InputLabelProps={{ style: { fontFamily: "poppins" } }}
                                                                InputProps={{ style: { fontFamily: "poppins", fontSize: "15px" } }} 
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField label="Phone" fullWidth={true} name="phoneNumber"
                                                                InputLabelProps={{ style: { fontFamily: "poppins" } }}
                                                                InputProps={{ style: { fontFamily: "poppins", fontSize: "15px", letterSpacing: "1px" } }} 
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField label="Pincode" fullWidth={true} name="pinCode"
                                                                InputLabelProps={{ style: { fontFamily: "poppins" } }}
                                                                InputProps={{ style: { fontFamily: "poppins", fontSize: "15px", letterSpacing: "1px" } }} 
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField label="Landmark" fullWidth={true} name="landMark"
                                                                InputLabelProps={{ style: { fontFamily: "poppins" } }}
                                                                InputProps={{ style: { fontFamily: "poppins", fontSize: "15px" } }} 
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField label="Address" fullWidth={true} multiline rows={4} name="address"
                                                                InputLabelProps={{ style: { fontFamily: "poppins" } }}
                                                                InputProps={{ style: { fontFamily: "poppins", fontSize: "15px" } }} 
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField label="City" fullWidth={true} name="city"
                                                                InputLabelProps={{ style: { fontFamily: "poppins" } }}
                                                                InputProps={{ style: { fontFamily: "poppins", fontSize: "15px", letterSpacing: "1px" } }} 
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField label="State" fullWidth={true} name="state"
                                                                InputLabelProps={{ style: { fontFamily: "poppins" } }}
                                                                InputProps={{ style: { fontFamily: "poppins", fontSize: "15px", letterSpacing: "1px" } }} 
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <FormControl sx={{ mt: 2 }}>
                                                        <FormLabel id="radio-label-type" sx={{fontFamily: "poppins"}}>Address Type</FormLabel>
                                                        <RadioGroup
                                                            row
                                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                                            name="addressType"
                                                            value={typeRadio}
                                                            onChange={handleChangeAddressType}
                                                        >
                                                            <FormControlLabel value="HOME" control={<Radio />} label={ <Typography fontFamily="poppins">Home</Typography> } />
                                                            <FormControlLabel value="WORK" control={<Radio />} label={  <Typography fontFamily="poppins">Work</Typography> } sx={{ ml: 4 }} />
                                                        </RadioGroup>
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                            <Box>
                                                <Box sx={{ display: "flex", mt: 4 }}>
                                                    <SaveAndDeliverButton type="submit"  onClick={saveAddressAndContnue}>
                                                        Save and deliver here
                                                    </SaveAndDeliverButton>
                                                    <Button sx={{ fontFamily: "poppins", fontSize: "14px", ml: 1 }} 
                                                            onClick={onClickAddAddressStyle}>
                                                        Cancel
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Card>
                            }
                            <Card sx={{mt: 3}}>
                                <CardHeader sx={{ bgcolor: delivertStepper === 1 && "#2874f0" }}
                                    title={
                                        <Box sx={{ display: "flex", alignItems: "center" }}>
                                            <Box sx={{ border: "1px solid white", borderRadius: "2px", bgcolor: delivertStepper !== 1 ? "#d3d3d3" : "white", p: "0px 5px" }}>
                                                <Typography sx={{color: "#2874f0"}} fontSize="11px" fontWeight="bold">
                                                            2
                                                </Typography>
                                            </Box>
                                            <Box sx={{ml: 2}}>
                                                <Typography fontFamily="poppins" textTransform="uppercase" 
                                                        sx={{color: delivertStepper !== 1 ? "#2874f0" : "white"}} fontWeight="500">
                                                    Order Summary
                                                </Typography>
                                            </Box>
                                            <Box sx={{ ml: 1 }}>
                                                <FaCheck display={delivertStepper > 1 ? "block":"none"} color='green' />
                                            </Box>
                                        </Box>
                                    }
                                />
                                {
                                    delivertStepper === 1 &&
                                    <CardContent>
                                    {
                                        allCartItems.length !== 0 &&
                                        allCartItems.map((item, index) => (
                                            <Box key={index} sx={{ display: "flex", justifyContent: "space-between", mb: 2, mt: 2 }}>
                                                <Box>
                                                    <Box sx={{ display: "flex" }}>
                                                        <Box
                                                            component="img"
                                                            sx={{ width: "110px" }}
                                                            src={item.product.imagePath}
                                                        />
                                                        <Box sx={{ ml: 3 }}>
                                                            <Typography className='turncate' fontFamily="poppins" sx={{ width: "450px" }}>
                                                                {item.product.title}
                                                            </Typography>
                                                            <Typography fontFamily="poppins" fontSize="13px" sx={{color: "grey"}}>
                                                                Size: {item.productSize.size},&nbsp;color: {item.product.productDetails.color}
                                                            </Typography>
                                                            <Typography fontFamily="poppins" fontSize="13px" sx={{color: "grey", mt: 3}}>
                                                                Seller: {item.product.brand.name}
                                                            </Typography>
                                                            <Typography fontFamily="poppins" fontWeight="600" sx={{ mt: 2}}>
                                                                &#8377; {item.product.price}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                    <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                                                        <Box sx={{ display: "flex", alignItems: 'center', width: "110px", justifyContent: "space-between" }}>
                                                            <button className="size-btn" onClick={
                                                                (e) => onQtyClick(e, item.product.id, item.productSize.id)}
                                                            >
                                                                - 
                                                            </button>
                                                            <div className='size-input'> 
                                                                {item.quantity} 
                                                            </div>
                                                            <button className="size-btn" onClick={
                                                                (e) => onQtyClick(e, item.product.id, item.productSize.id)}
                                                            >
                                                                + 
                                                            </button>
                                                        </Box>
                                                        <Box sx={{ ml: 3 }}>
                                                            <Button onClick={() => removeCartItem(item.product.id, item.productSize.id)}
                                                                    sx={{ color: "black", fontWeight: "bold" }}
                                                            >
                                                                Remove
                                                            </Button>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                                <Box sx={{ mr: 3 }}>
                                                    <Typography fontFamily="poppins" fontSize="14px" >
                                                        Delivery by 2 days
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        ))
                                    }
                                    </CardContent>
                                }
                            </Card>
                            <Card sx={{mt:3, mb:3}}>
                                {
                                    delivertStepper === 1 &&
                                    <CardContent>
                                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                            <Typography color="green" fontFamily="poppins" fontSize="13px">
                                                Order Confirmation mail will be sent to &nbsp;
                                                <b style={{color: "black"}}>sambitkhandai6@gmail.com</b>
                                            </Typography>
                                            <ContinueButton onClick={checkOrderStatus}>
                                                {!openDeliveryStatus ? 'Continue' : (
                                                    <Backdrop
                                                        sx={{ color: '#fff', zIndex: "drawer", position: 'absolute'}}
                                                        open={openDeliveryStatus}
                                                        onClick={handleDeliveryStatus}
                                                    >
                                                        <CircularProgress color="inherit" size={30} />
                                                    </Backdrop>
                                                )}
                                            </ContinueButton>
                                        </Box>
                                    </CardContent>
                                }
                                
                            </Card>
                            <Card sx={{ mb: 3 }}>
                                <CardHeader sx={{bgcolor: delivertStepper === 2 && "#2874f0"}}
                                    title={
                                        <Box sx={{ display: "flex", alignItems: "center" }}>
                                            <Box sx={{ border: "1px solid white", borderRadius: "2px",bgcolor: delivertStepper !== 2 ? "#d3d3d3" : "white", p: "0px 5px" }}>
                                                <Typography sx={{color: "#2874f0"}} fontSize="11px" fontWeight="bold">
                                                            3
                                                </Typography>
                                            </Box>
                                            <Box sx={{ml: 2}}>
                                                <Typography fontFamily="poppins" textTransform="uppercase" 
                                                        sx={{color: delivertStepper !== 2 ? "#2874f0" : "white"}} fontWeight="500">
                                                    Payment Option
                                                </Typography>
                                            </Box>
                                            <Box sx={{ ml: 1 }}>
                                                <FaCheck display={delivertStepper === 3 ? "block":"none"}  color='green' />
                                            </Box>
                                        </Box>
                                    }
                                />
                                {
                                    delivertStepper === 2 &&
                                    <CardContent>
                                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                            <FormControl>
                                                <RadioGroup
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    defaultValue="female"
                                                    name="radio-buttons-group"
                                                    value={paymentOption}
                                                    onChange={handlePaymentOption}
                                                >
                                                    <FormControlLabel value="CARD" control={<Radio />} label= {
                                                        <Box sx={{width: "500px"}}>
                                                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                                                <Typography fontFamily="poppins" fontWeight="500" fontSize="14px">
                                                                    Credit / Debit Card
                                                                </Typography>
                                                            </Box>
                                                            {
                                                                paymentOption === 'CARD' &&
                                                                <Box sx={{mt: 1, width: "300px"}}>
                                                                    <TextField InputLabelProps={{style: {fontFamily: "poppins"}}}
                                                                                InputProps={{style: {fontFamily: "poppins"}}} 
                                                                                id={"cardNumber"} label={"Card Number"}
                                                                                fullWidth={true} variant='outlined' type={"number"} name={"cardNumber"} 
                                                                                required={true} onInput={(e)=>{
                                                                                    e.target.value = e.target.value.slice(0, 12);
                                                                                }}
                                                                    />
                                                                    <Box sx={{mt: 2, display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                                                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                            <DatePicker sx={{width: "150px"}} views={["year", "month"]} format="MM/YYYY" />
                                                                        </LocalizationProvider>
                                                                        <TextField
                                                                            label="CVV"
                                                                            type='number'
                                                                            id="outlined-start-adornment"
                                                                            variant='filled'
                                                                            size='small'
                                                                            sx={{ width: '100px' }}
                                                                            defaultValue=''
                                                                            onInput={(e)=>{
                                                                                e.target.value = e.target.value.slice(0, 3);
                                                                            }}
                                                                            InputLabelProps={{style: {fontFamily: "poppins", fontSize: "13px"}}}
                                                                            InputProps={{
                                                                                style: { cursor: "pointer"},
                                                                                endAdornment: 
                                                                                    <HtmlTooltip placement='right' title={
                                                                                        <React.Fragment>
                                                                                        <Typography color="inherit">CVV</Typography>
                                                                                        <b>{'Cvv'}</b> is<u>{' last 3 dight from back'}</u>.{' '}
                                                                                        {"It's is written in back of your card"}
                                                                                        </React.Fragment>
                                                                                    } >
                                                                                        <InputAdornment position="end">
                                                                                            <HelpRoundedIcon />
                                                                                        </InputAdornment>
                                                                                    </HtmlTooltip>,
                                                                            }}
                                                                        />
                                                                    </Box>
                                                                </Box>
                                                            }
                                                        </Box>
                                                    } />
                                                    <Divider sx={{borderColor: "black", mt: 3, mb: 3, ml: -2, mr: '-500%' }} />
                                                    <FormControlLabel value="UPI" control={<Radio />} label= {
                                                        <Box>
                                                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                                                <Typography fontFamily="poppins" fontWeight="500" fontSize="14px">
                                                                    Pay Via Upi
                                                                </Typography>
                                                            </Box>
                                                            {
                                                                paymentOption === 'UPI' &&
                                                                <FormControl>
                                                                    <RadioGroup
                                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                                        defaultValue="s"
                                                                        name="radio-buttons-group"
                                                                    >
                                                                        <FormControlLabel value="phonePay" control={<Radio size="small" />} label= {
                                                                            <Box>
                                                                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                                                                    <Box 
                                                                                        component="img"
                                                                                        title="Phone Pay"
                                                                                        alt="Phone Pay"
                                                                                        src={require('../../Assets/images/phonepe-icon.png')}
                                                                                        sx={{width: "20px", mr: 1}}
                                                                                    />
                                                                                    <Typography fontFamily="poppins" fontWeight="500" fontSize="14px">
                                                                                        Phone Pay
                                                                                    </Typography>
                                                                                </Box>
                                                                            </Box>
                                                                        }/>
                                                                        <FormControlLabel value="googlePay" control={<Radio size="small" />} label= {
                                                                            <Box>
                                                                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                                                                    <Box 
                                                                                        component="img"
                                                                                        title="Phone Pay"
                                                                                        alt="Phone Pay"
                                                                                        src={require('../../Assets/images/google-pay.png')}
                                                                                        sx={{width: "40px", mr: 1}}
                                                                                    />
                                                                                    <Typography fontFamily="poppins" fontWeight="500" fontSize="14px">
                                                                                        Google Pay
                                                                                    </Typography>
                                                                                </Box>
                                                                            </Box>
                                                                        }/>
                                                                    </RadioGroup>
                                                                </FormControl>
                                                            }
                                                        </Box>
                                                    }/>
                                                    <Divider sx={{borderColor: "black", mt: 3, mb: 3, ml: -2, mr: '-500%' }} />
                                                    <FormControlLabel value="CASH_ON_DELIVERY" control={<Radio />} label= {
                                                        <Box>
                                                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                                                <Typography fontFamily="poppins" fontWeight="500" fontSize="14px">
                                                                    Cash on Delivery
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                    }/>
                                                    <Divider sx={{borderColor: "black", mt: 3, ml: -2, mr: '-500%' }} />
                                                </RadioGroup>
                                            </FormControl>
                                            
                                        </Box>
                                        <Box sx={{ mt: 2, textAlign: "right" }}>
                                            <DeliverHereButton onClick={completeOrder}>
                                                {!openPlaceOrderStatus ? 'Place Order' : (
                                                    <Backdrop
                                                        sx={{ color: '#fff', zIndex: "drawer", position: 'absolute'}}
                                                        open={openPlaceOrderStatus}
                                                        onClick={handlePlaceOrderStatus}
                                                    >
                                                        <CircularProgress color="inherit" size={30} />
                                                    </Backdrop>
                                                )}
                                            </DeliverHereButton>
                                        </Box>
                                    </CardContent>
                                }
                            </Card>
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
                                                <Typography fontFamily="poppins">Price ({getTotalProduct()})</Typography>
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
                </Box>
                ) : (
                    <Box sx={{ ml: "auto", mr: "auto", pt: "100px", width: "fit-content", height: "650px" }}>
                        <Box sx={{bgcolor:"#fff", width: "200px", p:2, boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
                            <Box sx={{ display: "flex", height: "25px", justifyContent: "center" }}>
                                <CircularProgress size={30} sx={{mr: 1, mt: "-3px"}}  />
                                <p>Loading</p>
                            </Box>
                        </Box>
                    </Box>
                )
            }
        </Box>
    )
}

export default CheckOutPage