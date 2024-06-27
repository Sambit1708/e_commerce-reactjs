import React from 'react'
import NavBar from '../../Components/NavBar'
import { motion } from 'framer-motion'
import { Checkbox, Divider, FormControlLabel, FormGroup, Slider, Typography, Box, Skeleton } from '@mui/material'
import { Breadcrumbs, Link, Card, CardContent, CardMedia, CardHeader } from '@mui/material'
import { styled } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Footer from '../../Components/Footer'
import Grid from '@mui/material/Unstable_Grid2'
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ProductService from '../../Services/ProductService';
import BrandService from '../../Services/BrandService'


function valuetext(value) {
    return `${value}°C`;
}

const PrettoSlider = styled(Slider)({
    color: '#52af77',
    height: 8,
    '& .MuiSlider-track': {
      border: 'none',
    },
    '& .MuiSlider-thumb': {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        boxShadow: 'inherit',
      },
      '&:before': {
        display: 'none',
      },
    },
    '& .MuiSlider-valueLabel': {
      display: 'none',
    },
});

const ProductPage = () => {
    const [value, setValue] = React.useState([0, 100]);
    const [occasions, setOccasions] = React.useState([])
    const [idealFors, setIdealFors] = React.useState([])
    const [types, setTypes] = React.useState([])
    const [brands, setBrands] = React.useState([])
    const [products, setProducts] = React.useState([])
    const [filterItem, setFilterItem] = React.useState({
        idealFor: [],
        brand: [],
        occasion: [],
        type: []
    })
    
    const getAllFilterData = async () => {
        try {
            const occasionResponse = await ProductService.getAllDistOccasions();
            setOccasions(occasionResponse.data);

            const idealForResponse = await ProductService.getAllDistIdelFor();
            setIdealFors(idealForResponse.data);

            const typeResponse = await ProductService.getAllDistType();
            setTypes(typeResponse.data);

            const productResponse = await ProductService.getAllProducts();
            setProducts(productResponse.data);
            
            const brandResponse = await BrandService.getAllBrand();
            setBrands(brandResponse.data);
        } catch(error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        getAllFilterData();
    }, [])

    const addIdealForToFilter = (event, data, key) => {
        const ele = event.target.checked;
        const fltrItem = {...filterItem}
        const idlFrs = [...fltrItem[key]];
        const findIdl = idlFrs.find(item => item === data);
        if(ele) {
            if(findIdl === undefined) {
                idlFrs.push(data);
                fltrItem[key] = idlFrs
                setFilterItem(fltrItem);
            }
        }
        else {
            if(findIdl !== undefined) {
                idlFrs.splice(idlFrs.indexOf(data), 1);
                fltrItem[key] = idlFrs
                setFilterItem(fltrItem);
            }
        }
        console.log(fltrItem);
    }

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    function handleBredClick(event) {
        event.preventDefault();
        console.log('You clicked a breadcrumb.');
    }
    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="#" onClick={handleBredClick}>
          Home
        </Link>,
        <Link
          underline="hover"
          key="2"
          color="inherit"
          href="#"
          onClick={handleBredClick}
        >
          Footware
        </Link>
    ];


    return (
        <Box>
            <NavBar />
            <Box sx={{mt: '70px', display: 'flex'}}>
                <Box className='sidebar'>
                    <Box className='filter'>
                        <Box>
                            <Typography textTransform="uppercase" fontFamily="poppins" 
                                        fontWeight="bold" fontSize="16px" sx={{ m: 2 }}>
                                filters
                            </Typography>
                        </Box>
                        <Divider />
                        <section className='idealFor-section'>
                            <Accordion defaultExpanded>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="idealFor-content"
                                    id="idealFor-header"
                                >
                                    <Typography textTransform="uppercase" fontFamily="poppins" fontWeight="500" fontSize="14px">Ideal For</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ mt: -2 }}>
                                    <FormGroup>
                                        {
                                            (idealFors.length > 0) ? (
                                                idealFors.map(x => (
                                                    <FormControlLabel key={x} control={
                                                        <Checkbox id={x} sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }} 
                                                                    onChange={(e) => addIdealForToFilter(e, x, 'idealFor')} 
                                                        />} 
                                                        label={ <Typography fontWeight="400" fontFamily="poppins" fontSize="14px">{x}</Typography> } />
                                                ))
                                            ) : (
                                                <React.Fragment>
                                                    <Skeleton animation="wave" height={10} width="60%" style={{ marginBottom: 6 }} />
                                                    <Skeleton animation="wave" height={10} width="50%" style={{ marginBottom: 6 }} />
                                                    <Skeleton animation="wave" height={10} width="40%" style={{ marginBottom: 6 }} />
                                                </React.Fragment>
                                            )
                                        }
                                    </FormGroup>
                                </AccordionDetails>
                            </Accordion>
                        </section>
                        <Divider />
                        <section className='price-section'>
                            <Card component="div">
                                <CardContent>
                                    <motion.p initial={{x: 0}} style={{ fontWeight: '500' }} animate={{ fontSize:'13px', x: 20, textTransform: 'uppercase' }} >Price</motion.p>
                                    <PrettoSlider
                                        getAriaLabel={() => 'Temperature range'}
                                        value={value}
                                        onChange={handleChange}
                                        valueLabelDisplay="auto"
                                        getAriaValueText={valuetext}
                                        sx={{margin: '10px  10px 20px 20px', width: '80%'}}
                                    />
                                </CardContent>
                            </Card>
                            <Divider />
                        </section>
                        <section className='brand-section'>
                            <Accordion defaultExpanded>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="brand-content"
                                    id="brand-header"
                                >
                                    <Typography textTransform="uppercase" fontFamily="poppins" fontWeight="500" fontSize="14px">Brand</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ mt: -2 }}>
                                    <FormGroup>
                                        {
                                            (brands.length > 0) ? (
                                                brands.map(brnd => (
                                                    <FormControlLabel key={brnd.id} control={
                                                        <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }} 
                                                                    onChange={(e) => addIdealForToFilter(e, brnd.name, 'brand')} 
                                                        />}
                                                    label={ <Typography fontWeight="400" fontFamily="poppins" fontSize="14px">{brnd.name}</Typography> } />
                                                ))
                                            ) : (
                                                <React.Fragment>
                                                    <Skeleton animation="wave" height={10} width="60%" style={{ marginBottom: 6 }} />
                                                    <Skeleton animation="wave" height={10} width="50%" style={{ marginBottom: 6 }} />
                                                    <Skeleton animation="wave" height={10} width="40%" style={{ marginBottom: 6 }} />
                                                </React.Fragment>
                                            )
                                        }
                                    </FormGroup>
                                </AccordionDetails>
                            </Accordion>
                        </section>
                        <Divider />
                        <section className='occasion-section'>
                            <Accordion defaultExpanded>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="occasion-content"
                                    id="occasion-header"
                                >
                                    <Typography textTransform="uppercase" fontFamily="poppins" fontWeight="500" fontSize="14px">occasion</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ mt: -2 }}>
                                    <FormGroup>
                                        {
                                            (occasions.length > 0) ? (
                                                occasions.map(x => (
                                                    <FormControlLabel key={x} control={ 
                                                        <Checkbox id={x} sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }} 
                                                                    onChange={(e) => addIdealForToFilter(e, x, 'occasion')} 
                                                        />}
                                                        label={ <Typography fontWeight="400" fontFamily="poppins" fontSize="14px">{x}</Typography> } />
                                                ))
                                            ) : (
                                                <React.Fragment>
                                                    <Skeleton animation="wave" height={10} width="60%" style={{ marginBottom: 6 }} />
                                                    <Skeleton animation="wave" height={10} width="50%" style={{ marginBottom: 6 }} />
                                                    <Skeleton animation="wave" height={10} width="40%" style={{ marginBottom: 6 }} />
                                                </React.Fragment>
                                            )
                                        }
                                    </FormGroup>
                                </AccordionDetails>
                            </Accordion>
                        </section>
                        <Divider />
                        <section className='type-section'>
                            <Accordion defaultExpanded>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="type-content"
                                    id="type-header"
                                >
                                    <Typography textTransform="uppercase" fontFamily="poppins" fontWeight="500" fontSize="14px">type</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ mt: -2 }}>
                                    <FormGroup>
                                        {
                                            (types.length > 0) ? (
                                                types.map(x => (
                                                    <FormControlLabel key={x} control={
                                                        <Checkbox id={x} sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }} 
                                                                    onChange={(e) => addIdealForToFilter(e, x, 'type')} 
                                                        />}  
                                                        label={ <Typography fontWeight="400" fontFamily="poppins" fontSize="14px">{x}</Typography> } />
                                                ))
                                            ) : (
                                                <React.Fragment>
                                                    <Skeleton animation="wave" height={10} width="60%" style={{ marginBottom: 6 }} />
                                                    <Skeleton animation="wave" height={10} width="50%" style={{ marginBottom: 6 }} />
                                                    <Skeleton animation="wave" height={10} width="40%" style={{ marginBottom: 6 }} />
                                                </React.Fragment>
                                            )
                                        }
                                    </FormGroup>
                                </AccordionDetails>
                            </Accordion>
                        </section>
                    </Box>
                </Box>
                <Box component="div" className='resultbar'>
                    <Box sx={{ ml: 2 }}>
                        <Breadcrumbs
                            sx={{ mt: 1, fontSize: "12px" }}
                            separator={<NavigateNextIcon sx={{ fontSize:"13px" }} />}
                            aria-label="breadcrumb"
                        >
                            {breadcrumbs}
                        </Breadcrumbs>    
                        <Box sx={{ mt: 2 }}>
                            <Typography fontFamily="poppins" fontWeight="500">
                                Showing results for "shoes"
                            </Typography>
                        </Box>
                        <Divider sx={{borderColor: "#5A5A5A"}} />
                        <Box className="resultTables" sx={{mt: 2, p: 2}}>
                            <Grid container spacing={1}>
                                {
                                    ( products.length > 0 ) ? (
                                        products.filter(item => {
                                            if( (filterItem.idealFor.length !==0 && filterItem.idealFor.includes(item.productDetails.idealFor)) || 
                                                (filterItem.brand.length !==0 && filterItem.brand.includes(item.brand.name)) || 
                                                (filterItem.occasion.length !==0 && filterItem.occasion.includes(item.productDetails.occasion)) || 
                                                (filterItem.type.length !==0 && filterItem.type.includes(item.productDetails.type))) 
                                            {
                                                return true;
                                            }
                                            if( filterItem.idealFor.length === 0 &&
                                                filterItem.brand.length === 0 &&
                                                filterItem.occasion.length === 0 &&
                                                filterItem.type.length === 0) 
                                                {
                                                    return true;
                                                }
                                            return false;
                                        }).map(shoes => (
                                            <Grid key={shoes.title} item xs={3}>
                                                <Card sx={{ cursor: "pointer" }} onClick={() => {window.open(`/product/details/${shoes.id}`)}}>
                                                    <CardHeader
                                                        sx={{position: "absolute", ml: 24, mt: -2}}
                                                        action={
                                                            <IconButton aria-label="settings">
                                                                <FavoriteIcon  color="disabled" />
                                                            </IconButton>
                                                        }
                                                    />
                                                    <CardMedia
                                                        sx={{ height: 300, width: 250, p: 1, objectFit: "contain" }}
                                                        image={shoes.imagePath}
                                                        alt='R'
                                                        component='img'
                                                    />
                                                    <CardContent>
                                                        <Box sx={{mt: -1}}>
                                                            <Typography fontWeight="500" fontFamily="poppins" fontSize="14px" sx={{ color: "grey" }}>
                                                                {shoes.brand.name}
                                                            </Typography>
                                                        </Box>
                                                        <Box >
                                                            <Typography fontWeight="500" fontFamily="poppins" fontSize="13px" className='turncate'>
                                                                {shoes.title}
                                                            </Typography>
                                                        </Box>
                                                        <Box sx={{mt: 1}}>
                                                            <Typography fontWeight="bold" fontFamily="poppins" fontSize="13px" className='turncate'>
                                                                ₹{shoes.price}
                                                            </Typography>
                                                        </Box>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        ))
                                    ) : (
                                        <Grid item xs={3}>
                                            <Card sx={{ cursor: "pointer" }}>
                                                <CardContent>
                                                    <Skeleton sx={{ height: 200, mb: 5 }} animation="wave" variant="rectangular" />
                                                    <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                                                    <Skeleton animation="wave" height={10} width="80%" />
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    )
                                }
                            </Grid>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Footer />
        </Box>
    )
}

export default ProductPage