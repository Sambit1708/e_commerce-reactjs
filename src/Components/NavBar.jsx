import * as React from 'react'
import { AppBar, Box, Button, Divider, Menu, Toolbar, Typography, Badge, Paper } from '@mui/material'
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { NavLink, useNavigate } from 'react-router-dom'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import '../Assets/style.css'
import LoginService from '../Services/LoginService';
import CartService from '../Services/CartService';


const navItems = [
  { title: "About", path: "/main" },
  { title: "Contact", path: "/main" }
];

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const NavBar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [loggedIn, setLoggedIn] = React.useState({ firstName: 'Signin' });
  const [totalCartItems, setTotalCartItems] = React.useState(0)
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const searhRef = React.useRef()

  const userValidate = async () => {
    const userResponse = await LoginService.isLoggedin();
    if(userResponse) {
      var data = localStorage.getItem('user');
      data = JSON.parse(data);
      if(data != null) {
        setLoggedIn({firstName: data.firstName});
      }
      const cartItems = await CartService.getAllCartItem();
      setTotalCartItems(cartItems.data.length)
    }
  }

  React.useEffect(() => {
    userValidate();
  }, [])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const searchProduct = (event) => {
      event.preventDefault();
      console.log(searhRef.current.search.value)
  }
  
  return (
    <AppBar sx={{color: 'black', background: '#2874f0'}} component="nav">
        <Toolbar sx={{ display:'flex', justifyContent: 'space-between' }}>
          <Box sx={{ width: '600px', display:'flex', justifyContent: 'space-between', alignItems: "center" }}>
            <Typography
              variant="h6"
              component="div"
              fontFamily="poppins"
              color="white"
            >
              E-Commerce
            </Typography>
            <Box component='form' ref={searhRef} onSubmit={searchProduct}>
              <Paper
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
              >
                <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                  <SearchIcon />
                </IconButton>
                <InputBase
                  sx={{ ml: 1, flex: 1, fontFamily: "poppins" }}
                  placeholder="Search for Products"
                  name='search'
                  inputProps={{ 'aria-label': 'search for products', fontFamily: "poppins" }}
                />
              </Paper>
            </Box>
          </Box>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Button
              aria-controls={open ? 'demo-customized-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              disableElevation
              sx={{color: "#fff", fontFamily: "poppins"}}
              onClick={ loggedIn.firstName !== 'Signin' ? handleClick : () => {navigate('/login')}}
              endIcon={ loggedIn.firstName !== 'Signin' && (open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon/>) }
            >
              {loggedIn.firstName}
            </Button>
            {
              loggedIn.firstName!== 'Signin' && (
                <StyledMenu
                  MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  <Box>
                    <NavLink style={{textDecoration: "none", color: "black"}} to={'/u/account'}>
                      <MenuItem disableRipple>
                        <AccountCircleIcon style={{ color: "#00ABF0" }} />
                        <Typography fontFamily="poppins">My Profile</Typography>
                      </MenuItem>
                    </NavLink>
                  </Box>
                  <Divider />
                  <Box>
                    <NavLink style={{textDecoration: "none", color: "black"}} to={'/u/account/orders'}>
                      <MenuItem disableRipple>
                        <FolderSpecialIcon style={{ color: "#00ABF0" }} />
                        <Typography fontFamily="poppins">Orders</Typography>
                      </MenuItem>
                    </NavLink>
                  </Box>
                  <Divider />
                  <Box>
                    <NavLink style={{textDecoration: "none", color: "black"}} to={'/main'}  onClick={() => {LoginService.logout()}}>
                      <MenuItem disableRipple>
                        <PowerSettingsNewIcon style={{ color: "#00ABF0" }} />
                        <Typography fontFamily="poppins">Logout</Typography>
                      </MenuItem>
                    </NavLink>
                  </Box>
                </StyledMenu>
              )
            }
            {navItems.map((item, index) => (
              <NavLink key={index} style={{textDecoration: "none", color: "black"}} to={item.path}>
                <Button sx={{ color: '#fff', fontFamily: "poppins" }}>
                  {item.title}
                </Button>
              </NavLink>
            ))}
            <IconButton aria-label="cart" onClick={() => navigate("/u/viewcart")}>
              <StyledBadge badgeContent={totalCartItems} color="error">
                <ShoppingCartIcon style={{color: '#fff'}} />
              </StyledBadge>
              <Typography fontFamily="poppins" sx={{ ml: totalCartItems === 0 ? 1 : 2, color: "#fff" }}>
                Cart
              </Typography>
            </IconButton>
          </Box>
        </Toolbar>
    </AppBar>
  )
}

export default NavBar