import * as React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Snackbar,
  Alert,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import BoltIcon from "@mui/icons-material/Bolt";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import NavBar from "../../Components/NavBar";
import Footer from "../../Components/Footer";
import Products from "../../Components/Common/Products";
import ProductService from "../../Services/ProductService";
import { useNavigate } from "react-router-dom";
import LoginService from "../../Services/LoginService";
import Swal from "sweetalert2";
import {
  BuyNowButton,
  AddToCartButton,
} from "../../Components/Common/StyledButtons";
import CartService from "../../Services/CartService";
import PreLoading from "../../Components/PreLoading";

const ProductDetailPage = () => {
  const [size, setSize] = React.useState();
  const [product, setProduct] = React.useState({});
  const [productSizes, setProductSizes] = React.useState([]);
  const detailKeys = ["id", "createDate", "updateDate"];
  const [openSizeAlert, setOpenSizeAlert] = React.useState(false);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();
  const href = window.location.href;

  const handleCloseBackdrop = () => {
    setOpenBackdrop(false);
  };
  const handleOpenBackdrop = () => {
    setOpenBackdrop(true);
  };

  const fetchProductById = async (prodId) => {
    try {
      const productResponse = await ProductService.getProduct(prodId);
      const productSizeResponse = await ProductService.getProductSizeOfProduct(
        prodId
      );
      if (
        productResponse.status === 200 &&
        productSizeResponse.status === 200
      ) {
        setProduct(productResponse.data);
        setProductSizes(productSizeResponse.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  React.useLayoutEffect(() => {
    const prodId = href.slice(href.lastIndexOf("/") + 1, href.length);
    fetchProductById(prodId);
  }, [href]);

  const handleClickOnCart = () => {
    setOpenSizeAlert(true);
  };

  const handleCloseSizeAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSizeAlert(false);
  };

  const handleClickReadMore = (event) => {
    const ele = document.getElementById("p-detail-desc");
    ele.style.display = "block";
    event.target.style.display = "none";
  };

  const addToCartFunc = async (event) => {
    if (size === undefined) {
      handleClickOnCart();
      return;
    }

    if (!(await LoginService.isLoggedin())) {
      Swal.fire({
        title: "!! Sorry !!",
        text: "This facility is not available for non user",
        icon: "error",
        showDenyButton: true,
        confirmButtonText: "Login",
        confirmButtonColor: "#32CD32",
        denyButtonText: `Keep Exploring`,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login/productDetails");
        }
      });
    } else {
      const cartProduct = {
        productId: product.id,
        productSizeId: size.id,
        quantity: 1,
      };
      handleOpenBackdrop();
      setTimeout(async () => {
        try {
          await CartService.addToCart(cartProduct);
          navigate("/u/viewcart");
        } catch (error) {
          navigate("/u/viewcart");
        }
      }, 100);
    }
  };

  const chooseSize = (event, item) => {
    setSize(item);
    const activeEle = document.getElementsByClassName("active-size-btn");
    for (let i = 0; i < activeEle.length; i++) {
      activeEle[i].classList.remove("active-size-btn");
    }
    event.currentTarget.classList.add("active-size-btn");
  };

  const transformKey = (item) => {
    if (item === "") {
      return item;
    }
    const regex = /^([a-z]+)([A-Z][a-z]+)?/gm;
    var name = "";
    const match = regex.exec(item);

    if (match) {
      name = match[1].charAt(0).toUpperCase() + match[1].slice(1);
      if (match[2] !== undefined) {
        name += " " + match[2];
      }
    }
    return name;
  };

  if (loading) {
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
      {Object.keys(product).length !== 0 && (
        <Box component="div" sx={{ display: "flex", mt: 15 }}>
          <Box component="div" sx={{ ml: 15 }}>
            <Card sx={{ height: 440, width: 426 }}>
              <CardMedia
                sx={{ height: 440, objectFit: "contain" }}
                image={product.imagePath}
                title={product.title}
                component="img"
              />
            </Card>
            <Grid container spacing={1} sx={{ mt: 2 }}>
              <Grid item xs={6}>
                <AddToCartButton
                  onClick={addToCartFunc}
                  startIcon={<ShoppingCartIcon />}
                >
                  Add to cart
                </AddToCartButton>
                <Snackbar
                  open={openSizeAlert}
                  autoHideDuration={6000}
                  onClose={handleCloseSizeAlert}
                >
                  <Alert
                    onClose={handleCloseSizeAlert}
                    severity="error"
                    variant="filled"
                    sx={{ width: "100%" }}
                  >
                    Please Choose a Size!
                  </Alert>
                </Snackbar>
              </Grid>
              <Grid item xs={6}>
                <BuyNowButton startIcon={<BoltIcon />} onClick={addToCartFunc}>
                  Buy Now
                </BuyNowButton>
              </Grid>
            </Grid>
          </Box>
          <Box component="div" sx={{ ml: 2 }}>
            <Card sx={{ width: 600 }}>
              <CardContent>
                <Box>
                  <Typography
                    fontSize="14px"
                    color="gray"
                    fontWeight="500"
                    fontFamily="poppins"
                  >
                    {product.brand.name}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="h6"
                    fontWeight="500"
                    fontFamily="poppins"
                  >
                    {product.title}
                  </Typography>
                </Box>
                <Typography
                  sx={{ mt: 3 }}
                  fontWeight="500"
                  fontFamily="poppins"
                >
                  MRP: ₹{product.price}
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <Typography variant="p" className="rating-icon">
                    {product.rating} <span className="fa fa-star"></span>
                  </Typography>
                  <Typography
                    variant="p"
                    sx={{
                      ml: 1,
                      color: "#878787",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    500 reviews & 42 ratings
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    mt: 3,
                    alignItems: "center",
                    zIndex: 1,
                  }}
                >
                  <Typography fontWeight="550">Size: </Typography>
                  <Grid spacing={1} container sx={{ ml: 2 }}>
                    {productSizes
                      .sort((a, b) => a.size - b.size)
                      .map((item) => (
                        <Grid key={item.id} item>
                          <Box
                            className="size-btn-ele"
                            onClick={(e) => chooseSize(e, item)}
                            variant="outlined"
                          >
                            {item.size}
                          </Box>
                        </Grid>
                      ))}
                  </Grid>
                </Box>
                <Box
                  component="img"
                  src={require("../../Assets/images/ribbon1.png")}
                  sx={{ height: "100px", width: "400px", mt: 3 }}
                />
                <Accordion sx={{ mt: "2px" }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <Typography
                      fontWeight="500"
                      fontFamily="poppins"
                      variant="h6"
                    >
                      Product Details
                    </Typography>
                  </AccordionSummary>
                  <Divider sx={{ borderColor: "#d4d4d4" }} />
                  <AccordionDetails>
                    {Object.keys(product.productDetails).map((key, index) => {
                      if (detailKeys.includes(key)) {
                        return null;
                      }
                      return (
                        <Grid container key={index} sx={{ mt: 3 }}>
                          <Grid item xs={4}>
                            <Typography
                              fontSize="14px"
                              fontFamily="poppins"
                              sx={{ color: "grey" }}
                            >
                              {transformKey(key)}:
                            </Typography>
                          </Grid>
                          <Grid item xs={8}>
                            <Typography fontSize="14px" fontFamily="poppins">
                              {product.productDetails[key]}
                            </Typography>
                          </Grid>
                        </Grid>
                      );
                    })}
                    <Box className="read-more" onClick={handleClickReadMore}>
                      Read More
                    </Box>
                    <Box id="p-detail-desc" sx={{ mt: 2 }}>
                      <Typography fontSize="13px" fontFamily="poppins">
                        {product.description}
                      </Typography>
                    </Box>
                  </AccordionDetails>
                </Accordion>
                <Divider />
                <Card sx={{ mt: 2 }}>
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box component="div">
                        <Typography
                          fontWeight="500"
                          fontFamily="poppins"
                          variant="h6"
                        >
                          Rating and Reviews
                        </Typography>
                      </Box>
                      <Box component="div" sx={{ ml: 2 }}>
                        <Typography variant="p" className="rating-icon">
                          {product.rating} <span className="fa fa-star"></span>
                        </Typography>
                      </Box>
                      <Box component="div">
                        <Typography
                          variant="p"
                          sx={{
                            ml: 1,
                            color: "#878787",
                            fontSize: "14px",
                            fontWeight: "500",
                          }}
                        >
                          40 ratings & 4 reviews
                        </Typography>
                      </Box>
                    </Box>
                    <Divider sx={{ borderColor: "#000", mt: 1 }} />
                    <Box component="div">
                      {Products.ratingAndReviews.map((rating, index) => (
                        <Box key={index} component="div" sx={{ ml: 1, mt: 2 }}>
                          <Box
                            component="div"
                            sx={{ display: "flex", alignItems: "center" }}
                          >
                            <Box component="div">
                              <Typography
                                variant="p"
                                className="rating-icon"
                                sx={{ fontSize: "11px" }}
                              >
                                {rating.rating}{" "}
                                <span className="fa fa-star"></span>
                              </Typography>
                            </Box>
                            <Box component="div" sx={{ ml: 2 }}>
                              <Typography variant="p" fontSize="14px">
                                {rating.review}
                              </Typography>
                            </Box>
                          </Box>
                          <Box
                            component="div"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mt: 2,
                            }}
                          >
                            <Typography
                              variant="p"
                              fontSize="12px"
                              sx={{ color: "grey" }}
                            >
                              {rating.user}
                            </Typography>
                            <Typography
                              variant="p"
                              fontSize="12px"
                              sx={{ color: "grey", ml: 3 }}
                            >
                              7days ago
                            </Typography>
                          </Box>
                          <Divider sx={{ borderColor: "#000", mt: 2 }} />
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </Box>
        </Box>
      )}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
        onClick={handleCloseBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Footer />
    </Box>
  );
};

export default ProductDetailPage;
