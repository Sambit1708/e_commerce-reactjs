import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PaletteIcon from '@mui/icons-material/Palette';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useNavigate } from 'react-router-dom'
import { MdOutlineMenuOpen } from "react-icons/md";
import { TbBrandDatabricks } from "react-icons/tb";
import { FaDatabase } from "react-icons/fa";
import { Avatar, Badge, Box } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';



const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    backgroundColor: 'black',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const drawerItem = [
  { text: 'Dashboard', icon: <PaletteIcon />, path: '/admin' },
  { text: 'Brand', icon: <TbBrandDatabricks  size={25} />, path: '/admin/brand' },
  { text: 'Product', icon: <FaDatabase />, path: '/admin/product' },
  { text: 'Order', icon: <AddShoppingCartIcon />, path: '/admin/order' },
]



const AdminDrawer = () => {
    const theme = useTheme();
    const navigate = useNavigate()
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const navigates = (path) => {
        navigate(path);
    }

    return (
        <React.Fragment>
            <AppBar position="fixed" open={open} sx={{bgcolor: "white"}}>
                <Toolbar>
                  <IconButton
                      color="black"
                      aria-label="open drawer"
                      onClick={handleDrawerOpen}
                      edge="start"
                      sx={{
                        marginRight: 5,
                        ...(open && { display: 'none' }),
                      }}
                  >
                      <MenuIcon />
                  </IconButton>
                  <Box sx={{ position: "fixed", right: 25 }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box sx={{mr: 2}}>
                        <Badge badgeContent={4} color="error">
                          <NotificationsIcon color="action" />
                        </Badge>
                      </Box>
                      <Box sx={{ display: "flex" }}>
                        <Avatar alt='R' src={require('../Assets/images/user.png')} />
                        <Box sx={{ml: 1}}>
                          <Typography color="black" fontFamily="poppins" fontSize="14px" fontWeight="500">Sambit Khandai</Typography>
                          <Typography color="black" fontFamily="poppins" fontSize="12px">sam@gmail.com</Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open} PaperProps={{ sx: { backgroundColor: "#001529", color: "#fff" } }}>
                <DrawerHeader>
                  <IconButton onClick={handleDrawerClose}>
                      {theme.direction === 'rtl' ? <ChevronRightIcon /> : <MdOutlineMenuOpen  style={{color:'white'}} />}
                  </IconButton>
                </DrawerHeader>
                <Divider sx={{ borderColor: "#fff" }} />
                <List>
                  {drawerItem.map((item, index) => (
                    <React.Fragment key={index}>
                      <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
                          <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                            onClick={() => navigates(item.path)}
                          >
                          <ListItemIcon
                            sx={{
                              color: "inherit",
                              minWidth: 0,
                              mr: open ? 3 : 'auto',
                              justifyContent: 'center',
                            }}
                          >
                              {item.icon}
                          </ListItemIcon>
                          <ListItemText primary={<Typography fontFamily="poppins">{item.text}</Typography>} sx={{ opacity: open ? 1 : 0 }} />
                          </ListItemButton>
                      </ListItem>
                      {/* <Divider sx={{ borderColor: "#fff" }} /> */}
                    </React.Fragment>
                  ))}
                </List>
            </Drawer>
        </React.Fragment>
    )
}

export default AdminDrawer