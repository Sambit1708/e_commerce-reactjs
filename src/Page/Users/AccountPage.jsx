import * as React from 'react'
import { Avatar, Box, Card, CardContent, Divider, Grid, MenuItem, MenuList, Typography } from '@mui/material'
import NavBar from '../../Components/NavBar'
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import PersonalInfoPage from './PersonalInfoPage';
import Footer from '../../Components/Footer';
import AddressPage from './AddressPage';
import RatingAndReviewPage from './RatingAndReviewPage';
import { useNavigate } from 'react-router-dom'


const AccountPage = () => {
  
  const [activeTab, setActiveTab] = React.useState("Profile Information")
  const navigate = useNavigate();

  React.useEffect(() => {
    const allTabs = document.getElementsByClassName("custom-tabs");
    for(let i=0; i<allTabs.length; i++) {
        if(allTabs[i].textContent === activeTab) {
            allTabs[i].classList.add("active-tab")
        }
        else {
            allTabs[i].classList.remove("active-tab")
        }
    }
  }, [activeTab])

  return (
    <Box>
        <NavBar />
        <Box sx={{ mt: "70px", bgcolor: '#f7f7ff', minHeight: 580 }}>
           <Box sx={{ pt: 2, pl: 8, pr: 8 }}>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: "flex" }}>
                                <Avatar alt='P' src={require('../../Assets/images/user.png')} />
                                <Box sx={{ml: 2}}>
                                    <Typography fontFamily="poppins" fontSize="12px">Hello</Typography>
                                    <Typography fontFamily="poppins" fontSize="16px" fontWeight="500">Sambit Kumar Khandai</Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                    <Card sx={{mt: 2}}>
                        <CardContent>
                            {/* Order Section */}
                            <Box sx={{ mb: 1, display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }} onClick={() => {navigate('/account/orders')}}>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <FolderSpecialIcon style={{ color: "#00ABF0", fontSize: "30px" }} />
                                    <Box sx={{ml: 2}}>
                                        <Typography fontFamily="poppins" fontSize="16px" fontWeight="500" textTransform="uppercase" color="grey">Orders</Typography>
                                    </Box>
                                </Box>
                                <Box >
                                    <KeyboardArrowRightIcon style={{ color: "#00ABF0", fontSize: "30px" }} />
                                </Box>
                            </Box>
                            <Divider sx={{borderColor: "#777", mb: 1, ml: -2, mr: -2 }} />

                            {/* Accout Setting Section */}
                            <Box sx={{mt: 2}}>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <ManageAccountsIcon style={{ color: "#00ABF0", fontSize: "30px" }} />
                                    <Box sx={{ml: 2}}>
                                        <Typography fontFamily="poppins" fontSize="16px" fontWeight="500" textTransform="uppercase" color="grey">Account Settings</Typography>
                                    </Box>
                                </Box>
                                
                                <MenuList>
                                    <MenuItem onClick={(e) => {setActiveTab(e.currentTarget.textContent)}}>
                                        <Typography sx={{pl: 4}} className='custom-tabs' fontFamily="poppins" fontSize="14px" >Profile Information</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={(e) => {setActiveTab(e.currentTarget.textContent)}}>
                                        <Typography sx={{pl: 4}} className='custom-tabs' fontFamily="poppins" fontSize="14px" >Manage Address</Typography>
                                    </MenuItem>
                                </MenuList>
                            </Box>
                            <Divider sx={{borderColor: "#777", mt: 1, ml: -2, mr: -2 }} />

                            {/* My stuffs Section */}
                            <Box sx={{mt: 2}}>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <FolderSharedIcon style={{ color: "#00ABF0", fontSize: "30px" }} />
                                    <Box sx={{ml: 2}}>
                                        <Typography fontFamily="poppins" fontSize="16px" fontWeight="500" textTransform="uppercase" color="grey">My Stuffs</Typography>
                                    </Box>
                                </Box>
                                
                                <MenuList>
                                    <MenuItem onClick={(e) => {setActiveTab(e.currentTarget.textContent)}}>
                                        <Typography sx={{pl: 4}} className='custom-tabs' fontFamily="poppins" fontSize="14px" >My Rating & Reviews</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={(e) => {setActiveTab(e.currentTarget.textContent)}}>
                                        <Typography className='custom-tabs' sx={{pl: 4}} fontFamily="poppins" fontSize="14px" >Notifications</Typography>
                                    </MenuItem>
                                </MenuList>
                            </Box>
                            <Divider sx={{borderColor: "#777", mt: 1, ml: -2, mr: -2 }} />

                            {/* Logout Section */}
                            <Box sx={{mt: 2}}>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <PowerSettingsNewIcon style={{ color: "#00ABF0", fontSize: "30px" }} />
                                    <Box sx={{ml: 2}}>
                                        <Typography fontFamily="poppins" fontSize="16px" fontWeight="500" textTransform="uppercase" color="grey">Logout</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={9}>
                    <Box>
                        <Card>
                            <CardContent sx={{m: 1}}>
                                <Box>
                                    {activeTab === 'Profile Information' ? <PersonalInfoPage /> : 
                                        (activeTab === 'Manage Address' ) ? <AddressPage /> : <RatingAndReviewPage />
                                    }
                                </Box>
                            </CardContent>
                            <Box 
                                component="img"
                                src={require('../../Assets/images/downImg.png')}
                                sx={{ width: "100%", position: "relative", bottom: 0 }}
                            />
                        </Card>
                    </Box>
                </Grid>
            </Grid>
           </Box>
        </Box>
        <Footer />
    </Box>
  )
}

export default AccountPage