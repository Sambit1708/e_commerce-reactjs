import * as React from 'react'
import Box from '@mui/material/Box';
import AdminDrawer from '../../../Components/AdminDrawer';
import CssBaseline from '@mui/material/CssBaseline';
import DrawerHeader from '../../../Components/Common/CommonComponent';
import { Avatar, Card, CardContent, CardHeader, Typography, CardActions, Button, Grid } from '@mui/material';
import Products from '../../../Components/Products';
import { useNavigate } from 'react-router-dom';


const BrandPage = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ display: 'flex', backgroundColor: '#f5f5f5' }}>
        <CssBaseline />
        <AdminDrawer />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />
            <Grid container spacing={2}>
                {Products.CategoriesDetails.map((item) => (
                    <Grid item xs={3} >
                        <Card sx={{ maxWidth: 260, maxHeight: 200 }}>
                            <CardHeader
                            avatar={
                                <Avatar sx={{ background: '#fff', boxShadow: '1px 1px 7px #888888'  }} aria-label="recipe">
                                <img    alt={item.name} 
                                        style={{width: '45px'}} 
                                        src={item.Avatar} 
                                />
                                </Avatar>
                            }
                            title={item.name}
                            subheader={item.revenue}
                            />
                            <CardContent>
                                <Typography className='turncate' variant="body2" color="text.secondary">
                                    {item.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button onClick={() => navigate('/admin/brand/details')}>brands</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    </Box>
  )
}

export default BrandPage