import * as React from 'react';
import { Box, CssBaseline, Typography, Card, CardContent, CardHeader, Grid, Paper, IconButton } from '@mui/material';
import { FaArrowTrendUp, FaArrowTrendDown  } from "react-icons/fa6";
import AdminDrawer from '../../Components/AdminDrawer';
import { DrawerHeader, tablePaginationStyle } from '../../Components/Common/CommonComponent';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { DemoColumn, DemoPie } from '../../Components/Common/CommonComponent'

function createData(no, status, Customer, Date, Total) {
  return { no, status, Customer, Date, Total };
}

const rows = [
  createData("#001", "Pending", "Sambit Khandai", "2023-08-23", 512),
  createData("#002", "Pending", "Sambit Khandai", "2023-08-23", 512),
  createData("#003", "Canceled", "Sambit Khandai", "2023-08-23", 512),
  createData("#004", "Compeleted", "Sambit Khandai", "2023-08-23", 512),
  createData("#005", "Pending", "Sambit Khandai", "2023-08-23", 512),
];

const recentUsers = [
  {
    user: "Sambit Khandai",
    order: 4
  },
  {
    user: "Madhu Sahoo",
    order: 2
  },
  {
    user: "Manish Pal",
    order: 12
  },
  {
    user: "Virat Kohli",
    order: 24
  },
  {
    user: "Happy Sahoo",
    order: 8
  },
]

const pendingStyle = {
  padding: 3,
  paddingLeft: 5,
  paddingRight: 5,
  width: "fit-content",
  backgroundColor: "rgba(0, 150, 199, 0.2)",
  color: "blue",
  fontFamily: "poppins",
  fontWeight: "500",
  fontSize: "10px"
}
const canceledStyle = {
  padding: 3,
  paddingLeft: 5,
  paddingRight: 5,
  width: "fit-content",
  backgroundColor: "rgba(215, 0, 64, 0.2)",
  color: "red",
  fontFamily: "poppins",
  fontWeight: "500",
  fontSize: "10px"
}
const compeletedStyle = {
  padding: 3,
  width: "fit-content",
  paddingLeft: 5,
  paddingRight: 5,
  backgroundColor: "rgba(31, 214, 85, 0.2)",
  color: "green",
  fontFamily: "poppins",
  fontWeight: "500",
  fontSize: "10px"
}

const AdminHomePage = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const DashboardHeaderCard = (props) => {

    const { title, mainText, date, type, typeValue, transition } = props;

    return (
      <Card sx={{ maxWidth: 350 }}>
        <CardHeader
          subheader={<Typography color='gray' fontFamily="poppins">{title}</Typography>}
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
        />
        <CardContent sx={{mt:-3}}>
          <Box sx={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
            <Typography fontFamily="poppins" fontSize="24px" fontWeight="500">
              {transition ? <React.Fragment>&#8377; {mainText}</React.Fragment> : mainText}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", textAlign: "right" }}>
              <Typography fontSize="11px" fontFamily="poppins" color={type==="Profit" ? "green" : "red"} fontWeight="600">
                { type === 'Profit' ? <FaArrowTrendUp /> : <FaArrowTrendDown /> } {typeValue}%
              </Typography>
              <Typography fontSize="11px" fontFamily="poppins" color="gray">
                Compared to {date}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    )
  }

  const classes = tablePaginationStyle();

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#f5f5f5' }}>
      <CssBaseline />
      <AdminDrawer />
      <Box component="main" sx={{ flexGrow: 1, p: 3, minHeight: "645px" }}>
        <DrawerHeader />
        <Box>
          <Typography fontFamily="poppins" fontWeight="bold" fontSize="24px">Dashboard</Typography>
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <DashboardHeaderCard title="Total sells" mainText="37000" date="April 2023" 
                                     type="Profit" typeValue="34.7" transition={true} />
              </Grid>
              <Grid item xs={4}>
                <DashboardHeaderCard title="Average order value" mainText="900" date="April 2023" 
                                     type="loss" typeValue="14.0" transition={true} />
              </Grid>
              <Grid item xs={4}>
                <DashboardHeaderCard title="Total orders" mainText="500" date="April 2023" 
                                     type="Profit" typeValue="27.9" transition={false} />
              </Grid>
            </Grid>
            <Box sx={{mt: 2}}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Card>
                    <CardHeader
                      title={<Box component='h6' >Active Users</Box>}
                      action={
                        <IconButton aria-label="settings">
                          <MoreVertIcon />
                        </IconButton>
                      }
                    />
                    <Box sx={{ bgcolor: "rgba(31, 81, 255, 0.3)", width: "280px", height: "80px", 
                                color: "blue", textAlign: "center", ml: "auto", mr: "auto" }}>
                      <p style={{ fontWeight: 500, fontSize: "24px", paddingTop: "25px" }}>150</p>
                    </Box>
                    <CardContent>
                      <Typography fontFamily="poppins">Recent Users</Typography>
                      <TableContainer sx={{ width: "90%", mt: 1 }}>
                        <Table size='small'>
                          <TableHead>
                            <TableRow>
                              <TableCell sx={{ fontFamily: "poppins" }} align="left">Name</TableCell>
                              <TableCell sx={{ fontFamily: "poppins" }} align="right">Orders</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {recentUsers.map((item, index) => (
                              <TableRow key={index}>
                                <TableCell sx={{ fontFamily: "poppins" }} align="left">{item.user}</TableCell>
                                <TableCell sx={{ fontFamily: "poppins" }} align="right">{item.order}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={8}>
                  <Card>
                    <CardHeader 
                      title={<Box component='h6' >Income Statistics</Box>}
                      action={
                        <IconButton aria-label="settings">
                          <MoreVertIcon />
                        </IconButton>
                      }
                    />
                    <DemoColumn />
                  </Card>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{mt: 2}} >
                <Grid item xs={8}>
                  <Paper sx={{ width: '100%' }}>
                    <Box component='h6' sx={{p: 2}}>Recent Orders</Box>
                    <TableContainer sx={{ maxHeight: 650 }}>
                      <Table  stickyHeader aria-label="sticky table">
                        <TableHead>
                          <TableRow>
                            <TableCell></TableCell>
                            <TableCell sx={{ fontWeight: "bold", fontFamily: "poppins" }} align='left'>No</TableCell>
                            <TableCell sx={{ fontWeight: "bold", fontFamily: "poppins" }} align="left">Status</TableCell>
                            <TableCell sx={{ fontWeight: "bold", fontFamily: "poppins" }} align="left">Customer</TableCell>
                            <TableCell sx={{ fontWeight: "bold", fontFamily: "poppins" }} align="left">Date</TableCell>
                            <TableCell sx={{ fontWeight: "bold", fontFamily: "poppins" }} align="left">Total</TableCell>
                            <TableCell></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map((row) => (
                            <TableRow key={row.no}>
                              <TableCell></TableCell>
                              <TableCell sx={{ fontFamily: "poppins" }} align="left" component="th" scope="row">
                                {row.no}
                              </TableCell>
                              <TableCell align="left"><div style={row.status === 'Pending' ? pendingStyle : (row.status === 'Canceled') ? canceledStyle : compeletedStyle}>{row.status}</div></TableCell>
                              <TableCell sx={{ fontFamily: "poppins" }} align="left">{row.Customer}</TableCell>
                              <TableCell sx={{ fontFamily: "poppins" }} align="left">{row.Date}</TableCell>
                              <TableCell sx={{ fontFamily: "poppins", fontWeight: "500" }} align="left">&#8377; {row.Total}</TableCell>
                              <TableCell></TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 20]}
                      component="div"
                      count={rows.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      classes={{
                        toolbar: classes.toolbar,
                        caption: classes.caption
                      }}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <Card>
                    <CardHeader
                      title={<Typography fontWeight="500" color='black' fontFamily="poppins">Sales per Brand</Typography>}
                      action={
                        <IconButton aria-label="settings">
                          <MoreVertIcon />
                        </IconButton>
                      }
                    />
                    <CardContent>
                      <DemoPie />
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default AdminHomePage