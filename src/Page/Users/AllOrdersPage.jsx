import * as React from "react";
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Paper,
  InputBase,
  Typography,
  Link,
  Breadcrumbs,
} from "@mui/material";
import NavBar from "../../Components/NavBar";
import Footer from "../../Components/Footer";
import SearchIcon from "@mui/icons-material/Search";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import OrderService from "../../Services/OrderService";
import PreLoading from "../../Components/PreLoading";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const breadcrumbs = [
  <Link
    underline="hover"
    key="1"
    color="inherit"
    href="/main"
    sx={{ fontSize: "14px" }}
  >
    Home
  </Link>,
  <Link
    underline="hover"
    key="2"
    color="inherit"
    sx={{ fontSize: "14px" }}
    href="/u/account"
  >
    My Account
  </Link>,
  <Link
    underline="hover"
    key="3"
    color="inherit"
    href="/u/account/orders"
    sx={{ fontSize: "14px" }}
  >
    My Order
  </Link>,
];

const AllOrdersPage = () => {
  const [orderItems, setOrderItems] = React.useState([]);
  const [preLoading, setPreLoading] = React.useState(true);
  const navigate = useNavigate();
  const searhRef = React.useRef();
  var today = new Date();

  /**
   * * This method is used to fetch order details
   * @param {*} id
   */
  const fetchOrderOfUser = async () => {
    try {
      const orderItemResponse = await OrderService.getAllOrderItemOfUser();
      if (orderItemResponse.status === 200) {
        setOrderItems(orderItemResponse.data);
        setPreLoading(false);
      }
    } catch (error) {
      console.log(error);
      // navigate(-1);
    }
  };

  React.useEffect(() => {
    fetchOrderOfUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formattedDate = (timestamp) => {
    console.log(timestamp);
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[date.getMonth()];
    const day = String(date.getDate()).padStart(2, "0");

    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  };

  const searchProduct = (event) => {
    event.preventDefault();
    console.log(searhRef.current.search.value);
  };

  if (preLoading) {
    return (
      <Box>
        <NavBar />
        <Box sx={{ mt: "70px", bgcolor: "#f7f7ff", minHeight: 580 }}>
          <PreLoading />
        </Box>
      </Box>
    );
  }
  return (
    <Box>
      <NavBar />
      <Box sx={{ mt: "70px", bgcolor: "#f7f7ff", minHeight: 580 }}>
        <Box>
          <Box sx={{ ml: "225px", mt: 1 }}>
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              {breadcrumbs}
            </Breadcrumbs>
          </Box>
          <Box sx={{ pt: 5 }}>
            <Box component="form" ref={searhRef} onSubmit={searchProduct}>
              <Paper
                sx={{
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  width: 700,
                  ml: "auto",
                  mr: "auto",
                }}
              >
                <IconButton
                  type="submit"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
                <InputBase
                  sx={{ ml: 1, flex: 1, fontFamily: "poppins" }}
                  placeholder="Search for Products"
                  name="search"
                  inputProps={{
                    "aria-label": "search for products",
                    fontFamily: "poppins",
                  }}
                />
              </Paper>
            </Box>
          </Box>
          {orderItems
            .sort((a, b) => new Date(b.deliveryDate) - new Date(a.deliveryDate))
            .map((item, index) => (
              <Box key={index} sx={{ mt: 2 }}>
                <Card
                  sx={{
                    width: "900px",
                    ml: "auto",
                    mr: "auto",
                    pl: 5,
                    pr: 5,
                    mb: 1,
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Box
                        sx={{ display: "flex", cursor: "pointer" }}
                        onClick={() => {
                          navigate(
                            `details?orderId=${item.orderId}&orderDetailId=${item.orderItemId}`
                          );
                        }}
                      >
                        <Box
                          component="img"
                          src={item.imagePath}
                          sx={{ width: "75px" }}
                        />
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <Typography
                            fontFamily="poppins"
                            fontSize="14px"
                            sx={{ ml: 2 }}
                          >
                            {item.title}
                          </Typography>
                          <Typography
                            fontFamily="poppins"
                            fontSize="12px"
                            color="gray"
                            sx={{ ml: 2, mt: 1 }}
                          >
                            Color: {item.color}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography
                        fontFamily="poppins"
                        fontSize="14px"
                        fontWeight="500"
                      >
                        &#8377; {item.price}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          height: "85px",
                        }}
                      >
                        <Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mb: 1,
                            }}
                          >
                            <span
                              className={
                                today > Date.parse(item.deliveryDate)
                                  ? "greenDot"
                                  : "blueDot"
                              }
                            ></span>
                            <Typography
                              fontFamily="poppins"
                              fontSize="13px"
                              fontWeight="600"
                              sx={{ ml: 1 }}
                            >
                              {today > Date.parse(item.deliveryDate)
                                ? "Delivered on"
                                : "Delivery Expected on"}
                              {` ${formattedDate(item.deliveryDate)}`}
                            </Typography>
                          </Box>
                          {today > Date.parse(item.deliveryDate) && (
                            <Typography fontFamily="poppins" fontSize="11px">
                              Your Item has Delivered
                            </Typography>
                          )}
                        </Box>
                        {today > Date.parse(item.deliveryDate) && (
                          <Link
                            href="#"
                            sx={{
                              fontSize: "13px",
                              display: "flex",
                              alignItems: "center",
                            }}
                            underline="none"
                          >
                            <FaStar />
                            &nbsp;&nbsp;Rate & Review Product
                          </Link>
                        )}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            ))}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default AllOrdersPage;
