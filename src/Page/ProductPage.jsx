import React from 'react'
import NavBar from '../Components/NavBar'
import '../assets/style.css'
import { motion } from 'framer-motion'
import { Card, CardContent, CardMedia, Checkbox, Divider, FormControlLabel, FormGroup, Grid, Slider, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Products from '../Components/Products'
import Footer from '../Components/Footer'


const getDiscountPrice = (price, discount) => {
    var oPrice = price.replaceAll(",","");
    var discPrice = oPrice;
    if( discount === '0' ) {
        return price;
    }
    if( discount !== '0' ) {
        discPrice = discPrice / discount
    }
    discPrice = oPrice - discPrice
    var x= Math.floor(discPrice);
    x=x.toString();
    var lastThree = x.substring(x.length-3);
    var otherNumbers = x.substring(0,x.length-3);
    if(otherNumbers !== '')
        lastThree = ',' + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return res;
}

const CardItem = (props) => (
    <React.Fragment key={props.title}>
        <Card key={props.title} sx={{ width: '100%', height: '250px', cursor: 'pointer', display: 'flex' }}>
            <CardMedia
                sx={{ width: 250, height: 180, marginTop: '20px', backgroundSize: 'contain' }}
                image={props.imgPath}
                title={props.title}
            />
            <CardContent sx={{ width: '100%' }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography gutterBottom variant="p" component="div">
                            <strong style={{ fontSize: '1.1em' }}>{props.title}</strong>
                        </Typography>
                        <span className='rating-icon'>{props.rating} &#9733;</span>
                        <span style={{ marginLeft: '10px', fontSize: '15px', color: 'grey' }}>128 Ratings & 21 Reviews</span>
                        <ul>
                            {props.highlight.split("\n").map((point) => (
                                <li>{point}</li>
                            ))}
                        </ul>
                    </Grid>
                    <Grid item xs={6} sx={{ marginTop: '-25px', display: 'flex', flexDirection: 'column' }}>
                        <h2 style={{marginLeft: '50px'}}>&#8377;{ getDiscountPrice(props.price, props.discount) }</h2>
                        <div style={{ marginTop: '-30px', marginLeft: '50px', display: 'flex', alignItems: 'center'}}>
                            <p style={{textDecoration: 'line-through', color: 'grey', marginRight: '20px'}}>
                                &#8377;{props.price}
                            </p>
                            <p style={{ fontSize: '12px', color: 'green' }}>{props.discount}% off</p>
                        </div>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
        <Divider />
    </React.Fragment>
)

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

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
        <div>
            <NavBar />
            <div style={{marginTop: '70px', display: 'flex'}}>
                <div className='sidebar'>
                    <div className='filter'>
                        <motion.p initial={{x: 0}} style={{ fontWeight: '500' }} animate={{ fontSize:'1.2em', x: 20 }} >Filters</motion.p>
                        <Divider />
                        <motion.p initial={{x: 0}} style={{ fontWeight: '500' }} animate={{ fontSize:'13px', x: 20, textTransform: 'uppercase' }} >Categories</motion.p>
                        <Divider />
                        <section className='price-section'>
                            <div>
                                <motion.p initial={{x: 0}} style={{ fontWeight: '500' }} animate={{ fontSize:'13px', x: 20, textTransform: 'uppercase' }} >Price</motion.p>
                                <PrettoSlider
                                    getAriaLabel={() => 'Temperature range'}
                                    value={value}
                                    onChange={handleChange}
                                    valueLabelDisplay="auto"
                                    getAriaValueText={valuetext}
                                    sx={{margin: '10px  10px 20px 20px', width: '80%'}}
                                />
                            </div>
                            <Divider />
                        </section>
                        <section className='brand-section'>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    >
                                    <motion.p initial={{x: 0}} style={{ color:'inherit', fontWeight: '500'}} animate={{ fontSize:'13px', x: 5, textTransform: 'uppercase' }} >Brand</motion.p>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox defaultChecked />} label="Apple" />
                                        <FormControlLabel control={<Checkbox />} label="Samsung" />
                                    </FormGroup>
                                </AccordionDetails>
                            </Accordion>
                        </section>
                        <Divider />
                        <section className='Ram-section'>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <motion.p initial={{x: 0}} style={{ fontWeight: '500'}} animate={{ fontSize:'13px', x: 5, textTransform: 'uppercase' }} >Ram</motion.p>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox />} label="8GB" />
                                        <FormControlLabel control={<Checkbox />} label="12GB" />
                                    </FormGroup>
                                </AccordionDetails>
                            </Accordion>
                        </section>
                    </div>
                </div>
                <div className='resultbar'>
                    <motion.p initial={{x: 0}} style={{ color:'inherit'}} animate={{ fontSize:'10px', x: 20, textTransform: 'uppercase' }} >Home &gt; Mobiles</motion.p>
                    <motion.h2 initial={{x: 0}} animate={{x: 20, textTransform: 'uppercase' }} >Search Result</motion.h2>
                    <Divider />
                    <div>
                        {Products.Mobiles.map((item) => (
                            <CardItem   title={item.title} 
                                        imgPath={item.imgPath} 
                                        highlight={item.highlight}
                                        price={item.Price}
                                        discount={item.discount}
                                        rating={item.rating}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ProductPage