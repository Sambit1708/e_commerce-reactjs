import * as React from 'react';
import { Box, Card, Link, Typography, Stepper, Step, StepLabel, styled, Button, Breadcrumbs } from '@mui/material'
import OrderService from '../../Services/OrderService';
import PreLoading from '../../Components/PreLoading';
import { FaStar } from "react-icons/fa";
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Footer from '../../Components/Footer';
import NavBar from '../../Components/NavBar';
import { useNavigate } from 'react-router-dom'


const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 10,
      left: 'calc(-50% + 16px)',
      right: 'calc(50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#784af4',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#784af4',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
      borderTopWidth: 3,
      borderRadius: 1,
    },
}));

const steps = [
    {
        id: 'CONFIRMED',
        index: 0,
        name: 'Confirmed'
    },
    {
        id: 'SHIPPED',
        index: 1,
        name: 'Shipped'
    },
    {
        id: 'OUT_FOR_DELIVERY',
        index: 2,
        name: 'Out For Delivery'
    },
    {
        id: 'DELIVERED',
        index: 3,
        name: 'Delivered'
    }
];

const OrderDetailPage = () => {

    const [ order, setOrder ] = React.useState({});
    const [ currentOrderItem, setCurrentOrderItem ] = React.useState({})
    const [ orderItems, setOrderItems ] = React.useState([]);
    const [ preLoading, setPreLoading ] = React.useState(true);
    const navigate = useNavigate();
    var today = new Date();

    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/main" sx={{ fontSize: "14px" }}>
          Home
        </Link>,
        <Link
          underline="hover" key="2" color="inherit"
          sx={{ fontSize: "14px" }} href="/u/account"
        >
          My Account
        </Link>,
        <Link underline="hover" key="3" color="inherit" href="/u/account/orders" sx={{ fontSize: "14px" }}>
          My Order
        </Link>,
        <Typography key="4" color="text.primary" fontFamily="poppins" fontSize="14px">
          12002
        </Typography>,
    ];

    /**
     * * This method is used to fetch order details
     */
    const fetchOrderById = async () => {
        try {
            const query = new URLSearchParams(window.location.search);
            const orderId = query.get('orderId');
            const orderItemId = query.get('orderDetailId');

            const orderResponse = await OrderService.getOrderById(orderId);
            const orderItemResponse = await OrderService.getOrderItemsByOrderId(orderId);
            const currentOrderItemResponse = await OrderService.getAllOrderItemById(orderItemId);
            if(orderResponse.status === 200 && 
                orderItemResponse.status === 200 && 
                currentOrderItemResponse.status === 200) 
            {
                setOrder(orderResponse.data);
                setOrderItems(orderItemResponse.data);
                setCurrentOrderItem(currentOrderItemResponse.data);
                setPreLoading(false);
            }
        } catch(error) {
            navigate(-1);
        }
    }

    React.useEffect(() => {
        fetchOrderById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const formattedDate = (timestamp) => {
        const date = new Date(timestamp);

        const year = date.getFullYear();
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const month = monthNames[date.getMonth()];
        const day = String(date.getDate()).padStart(2, '0');

        const formattedDate = `${day}-${month}-${year}`;
        return formattedDate;
    }

    if(preLoading) {
        return (
            <Box>
                <NavBar />
                <Box sx={{ mt: "70px", bgcolor: '#f7f7ff', minHeight: 580}}>
                    <PreLoading />
                </Box>
            </Box>
        )    
    }

    return (
        <Box sx={{ bgcolor: "#f5f5f5" }}>
            <NavBar />
            <Box sx={{ display: 'flex', pt: 10 }}>
                <Box>
                    <Box sx={{ ml: "100px" }}>
                        <Breadcrumbs
                            separator={<NavigateNextIcon fontSize="small" />}
                            aria-label="breadcrumb"
                        >
                            {breadcrumbs}
                        </Breadcrumbs>
                    </Box>
                    <Card className='order-card-header' sx={{ display: "flex" }}>
                        <Box sx={{ width: "48%" }}>
                            <Box sx={{ height: "135px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                                <Typography fontWeight="bold" fontFamily="poppins" fontSize="13px">
                                    Delivery Address
                                </Typography>
                                <Typography fontWeight="bold" fontFamily="poppins" fontSize="13px">
                                    { order.address.deliverTo }
                                </Typography>
                                <Typography fontFamily="poppins" fontSize="13px">
                                { order.address.address } {order.address.city} - {order.address.pinCode}, {order.address.state}
                                </Typography>
                                <Box>
                                    <Typography fontWeight="bold" fontFamily="poppins" fontSize="13px">
                                        Phone Number
                                    </Typography>
                                    <Typography fontFamily="poppins" fontSize="13px">
                                        {order.address.phoneNumber}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ width: "4%"}}>
                            <Box sx={{ borderLeft: "1px solid #d5d5d5", height: "100%", mt: "-16px" }}></Box>
                        </Box>
                        <Box sx={{ width: "48%" }}>
                            <Box>
                                <Typography fontWeight="bold" fontFamily="poppins" fontSize="13px">
                                    More Actions
                                </Typography>
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <Box sx={{ display: "flex", alignItems: "center", pt: 1 }}>
                                        <Box
                                            component="img"
                                            alt='R'
                                            title='Image'
                                            width="30px"
                                            src={require('../../Assets/images/payment.png')}
                                        />
                                        <Box sx={{ ml: 1 }}>
                                            <Typography fontFamily="poppins" fontSize="13px">
                                                Download Invoice
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ mr: 3 }}>
                                        <Button variant='outlined' sx={{ textTransform: 'none', fontSize: "12px"}}>
                                            Download
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>

                    </Card>
                    <Card className='order-card-header' sx={{ display: "flex" }}>
                        <Box sx={{ width: "33%", display: "flex" }}>
                            <Box>
                                <Box 
                                    component="img"
                                    alt='R'
                                    title='Image'
                                    width="100px"
                                    src={currentOrderItem.product.imagePath}
                                />
                                <Box></Box>
                            </Box>
                            <Box sx={{ ml: 2 }}>
                                <Box sx={{ display: "flex" }}>
                                    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100px", justifyContent: "space-between" }}>
                                        <Typography fontSize="14px" fontFamily="poppins" fontWeight="500">
                                            {currentOrderItem.product.title}
                                        </Typography>
                                        <Typography fontSize="12px" variant="subtitle2" color="gray" fontFamily="poppins">
                                            Color: {currentOrderItem.product.productDetails.color}
                                        </Typography>
                                        <Typography fontSize="12px" variant="subtitle2" color="gray" fontFamily="poppins">
                                            Size: {currentOrderItem.productSize.size}
                                        </Typography>
                                        <Typography fontSize="14px" fontWeight="bold" fontFamily="poppins">
                                            &#8377; {currentOrderItem.price}
                                        </Typography>
                                    </Box>
                                    <Box></Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ width: "40%" }}>
                            <Stepper activeStep={steps.filter((item) => item.id === order.orderStatus)[0].index} alternativeLabel connector={<QontoConnector />}>
                                {steps.map((label) => (
                                    <Step key={label.id}>
                                        <StepLabel sx={{ fontFamily: "poppins" }}>
                                            <Typography fontFamily="poppins" fontSize="10px" color="green">
                                                {label.name}
                                            </Typography>
                                        </StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </Box>
                        <Box sx={{ width: "27%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                            <Link href="#" sx={{fontSize: "13px", display: "flex", alignItems: "center"}} underline='none'>
                                <FaStar sx={{mr: 2}} />&nbsp;&nbsp;Rate & Review Product
                            </Link>
                            <Box></Box>
                        </Box>
                    </Card>
                    <Card className='order-card-header' sx={{ pt: 0, pl: 0 }}>
                        <Box sx={{ pt: 1, borderBottom: "1px solid #e5e5e5", width: "100%", height: "40px", pl: 3 }}>
                            <Typography fontFamily="poppins" fontWeight="500">
                                Order items in this order
                            </Typography>
                        </Box>
                        {
                            orderItems.map((item, index) => (
                                <React.Fragment key={index}>
                                    <Box sx={{ display: "flex", justifyContent: "space-between", pb: 2 }}>
                                        <Box sx={{ display: "flex", pl: 3, pt: 2 }}>
                                            <Box>
                                                <Box 
                                                    component="img"
                                                    alt='R'
                                                    title='Image'
                                                    width="100px"
                                                    src={item.product.imagePath}
                                                />
                                                <Box></Box>
                                            </Box>
                                            <Box sx={{ ml: 2 }}>
                                                <Box>
                                                    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100px", justifyContent: "space-between" }}>
                                                        <Typography fontSize="14px" fontFamily="poppins" fontWeight="500">
                                                            { item.product.title }
                                                        </Typography>
                                                        <Typography fontSize="12px" variant="subtitle2" color="gray" fontFamily="poppins">
                                                            Color: { item.product.productDetails.color }
                                                        </Typography>
                                                        <Typography fontSize="12px" variant="subtitle2" color="gray" fontFamily="poppins">
                                                            Size: { item.productSize.size }
                                                        </Typography>
                                                        <Typography fontSize="14px" fontWeight="bold" fontFamily="poppins">
                                                            &#8377; { item.price }
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Box sx={{display: "flex", alignItems: "center", mb: 1, pr: 4 }}>
                                            <span className={today > Date.parse(order.deliveryDate) ? 'greenDot': 'blueDot'}></span>
                                            <Typography fontFamily="poppins" fontSize="13px" fontWeight="500" sx={{ml: 1}}>
                                            {
                                                today > Date.parse(order.deliveryDate) ?
                                                'Delivered on '+formattedDate(order.deliveryDate) : 
                                                'Delivery Expected on '+formattedDate(order.deliveryDate)
                                            }
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ border: "1px solid #d5d5d5" }}></Box>
                                </React.Fragment>
                            ))
                        }
                        
                    </Card>
                </Box>
            </Box>
            <Footer />
        </Box>
    )
}

export default OrderDetailPage