import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import * as React from 'react'

const navItems = ['Home', 'About', 'Contact', 'Login'];

const NavBar = () => {
  return (
    <AppBar sx={{color: 'black', background: '#fff'}} component="nav">
        <Toolbar sx={{display:'flex', justifyContent: 'space-between'}}>
            <Typography
                variant="h6"
                component="div"
            >
                E-Commerce
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                {navItems.map((item) => (
                <Button key={item} sx={{ color: 'black  ' }}>
                    {item}
                </Button>
                ))}
            </Box>
        </Toolbar>
    </AppBar>
  )
}

export default NavBar