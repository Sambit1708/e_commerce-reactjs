import { Card, CardContent, CardMedia, Divider, Grid, Typography } from '@mui/material'
import React from 'react'
import Helper from '../Helper/Helper'

const CardItem = (props) => (
    <Card key={props.title} sx={{ maxWidth: 230, cursor: 'pointer' }}>
        <CardMedia
            sx={{ width: 200, height: 180, backgroundSize: 'contain' }}
            image={props.imgPath}
            title={props.title}
        />
        <CardContent>
            <Typography gutterBottom variant="p" component="div">
                <strong>{props.title}</strong>
            </Typography>
        </CardContent>
    </Card>
)

const CardItemProductPage = (props) => (
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
                        <ul className='prod-ul'>
                            {props.highlight.split("\n").map((point) => (
                                <li className='prod-lst'>{point}</li>
                            ))}
                        </ul>
                    </Grid>
                    <Grid item xs={6} sx={{ marginTop: '-25px', display: 'flex', flexDirection: 'column' }}>
                        <h2 style={{marginLeft: '50px'}}>&#8377;{ Helper.getDiscountPrice(props.price, props.discount) }</h2>
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

export {CardItem, CardItemProductPage}