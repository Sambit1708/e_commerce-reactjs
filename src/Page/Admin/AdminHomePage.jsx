import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Avatar, Card, CardContent, CardHeader, Grid } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import CategoryIcon from '@mui/icons-material/Category';
import LayersIcon from '@mui/icons-material/Layers';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { DataGrid } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import Products from '../../Components/Products';
import AdminDrawer from '../../Components/AdminDrawer';


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));



const AdminHomePage = () => {

  const { data } = useDemoData({
    dataSet: 'Employee',
    rowLength: 5,
    maxColumns: 6,
  });


  return (
    <Box sx={{ display: 'flex', backgroundColor: '#f5f5f5' }}>
      <CssBaseline />
      <AdminDrawer />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Box>
          <Grid container spacing={2} >
            <Grid item xs={3}>
              <Card sx={{ maxWidth: 240 }}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ width: '45px', height: '45px', background: 'linear-gradient(108.4deg, rgb(253, 44, 56) 3.3%, rgb(176, 2, 12) 98.4%);', boxShadow: '1px 1px 10px #888888' }} aria-label="recipe">
                      <PeopleIcon />
                    </Avatar>
                  }
                />
                <CardContent sx={{position: 'relative'}}>
                  <div style={{position: 'absolute', top: '-60px', left: '120px'}}>
                    <Typography color='text.secondary' textTransform='uppercase' sx={{ fontSize: '1.2em', letterSpacing: 1 }}>
                      Users
                    </Typography>
                    <span style={{fontSize: '1em', fontWeight: '900'}}>150+</span>
                  </div>
                  <Typography color="text.secondary" sx={{ fontSize: '12px', marginTop: '12px', display: 'flex', alignItems: 'center' }} >
                    <span>increase in products</span>&nbsp;<span style={{ color: 'red', display: 'flex', alignItems: 'center', justifyContent: 'center' }} ><span>5%</span><ArrowDropDownIcon /></span>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={3}>
              <Card sx={{ maxWidth: 230 }}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ width: '45px', height: '45px', background: 'linear-gradient(90deg, rgba(231,119,2,1) 0%, rgba(255,130,2,1) 43%, rgba(230,121,4,1) 100%);', boxShadow: '1px 1px 7px #888888'  }} aria-label="recipe">
                      <CategoryIcon />
                    </Avatar>
                  }
                />
                <CardContent sx={{position: 'relative'}}>
                  <div style={{position: 'absolute', top: '-60px', left: '100px'}}>
                    <Typography color='text.secondary' textTransform='uppercase' sx={{ fontSize: '1.1em', letterSpacing: 1 }}>
                      Products
                    </Typography>
                    <span style={{fontSize: '1em', fontWeight: '900'}}>150+</span>
                  </div>
                  <Typography color="text.secondary" sx={{ fontSize: '12px', marginTop: '12px', display: 'flex', alignItems: 'center' }} >
                    <span>increase in products</span>&nbsp;<span style={{ color: 'green', display: 'flex', alignItems: 'center', justifyContent: 'center' }} ><span>5%</span><ArrowDropUpIcon /></span>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={3}>
              <Card sx={{ maxWidth: 240 }}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ width: '45px', height: '45px', background: 'linear-gradient(90deg, rgba(7,23,190,1) 0%, rgba(0,31,255,1) 42%, rgba(0,38,255,1) 100%);', boxShadow: '1px 1px 7px #888888'  }} aria-label="recipe">
                      <LayersIcon />
                    </Avatar>
                  }
                />
                <CardContent sx={{position: 'relative'}}>
                  <div style={{position: 'absolute', top: '-60px', left: '120px'}}>
                    <Typography color='text.secondary' textTransform='uppercase' sx={{ fontSize: '1.2em', letterSpacing: 1 }}>
                      Brands
                    </Typography>
                    <span style={{fontSize: '1em', fontWeight: '900'}}>150+</span>
                  </div>
                  <Typography color="text.secondary" sx={{ fontSize: '12px', marginTop: '12px', display: 'flex', alignItems: 'center' }} >
                    <span>increase in products</span>&nbsp;<span style={{ color: 'green', display: 'flex', alignItems: 'center', justifyContent: 'center' }} ><span>5%</span><ArrowDropUpIcon /></span>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={3}>
              <Card sx={{ maxWidth: 240 }}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ width: '45px', height: '45px', background: 'linear-gradient(90deg, rgba(2,167,43,1) 0%, rgba(1,198,44,1) 42%, rgba(0,190,61,1) 100%);', boxShadow: '1px 1px 7px #888888'  }} aria-label="recipe">
                      <CurrencyRupeeIcon />
                    </Avatar>
                  }
                />
                <CardContent sx={{position: 'relative'}}>
                  <div style={{position: 'absolute', top: '-60px', left: '100px'}}>
                    <Typography color='text.secondary' textTransform='uppercase' sx={{ fontSize: '1.2em', letterSpacing: 1 }}>
                      Earning
                    </Typography>
                    <span style={{fontSize: '1em', fontWeight: '900'}}>&#x20B9;7,828.00</span>
                  </div>
                  <Typography color="text.secondary" sx={{ fontSize: '12px', marginTop: '12px', display: 'flex', alignItems: 'center' }} >
                    <span>increase in products</span>&nbsp;<span style={{ color: 'red', display: 'flex', alignItems: 'center', justifyContent: 'center' }} ><span>5%</span><ArrowDropDownIcon /></span>
                  </Typography>
                  <LayersIcon sx={{ position: 'absolute', color: 'rgba(255, 255, 255, 0.5)', fontSize: '5em', top: '20px', left: '120px' }} />
                </CardContent>
              </Card>
            </Grid> 
          </Grid>
          <Grid container spacing={2} >
            <Grid item xs={8}>
              <h3>Recent Orders</h3>
              <div style={{ height: 350, width: '100%', backgroundColor: '#fff' }}>
                <DataGrid {...data} />
              </div>
            </Grid>
            <Grid item xs={4}>
              <h3>Updates</h3>
              <div style={{ height: 350, width: '350px', backgroundColor: '#fff', boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)', borderRadius: '4px' }}>
                <div style={{ height: '90%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', margin: '20px' }} >
                  {Products.Updates.map((item) => (
                    <React.Fragment>
                      <div style={{ display: 'flex', marginTop: '15px' }}>
                        <div style={{marginRight: '20px'}}>{item.Avatar }</div>
                        <div><b>{item.Name}</b> <span >{item.Updates}</span></div>
                      </div>
                      <div style={{ color: 'grey', fontSize: '13px', marginLeft: 60 }}>{item.time}</div>
                      <Divider />
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default AdminHomePage