import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import * as React from 'react'
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';

const navItems = ['Home', 'About', 'Contact', 'Login'];
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 1px 6px 0 rgba(0, 0, 0, 0.19)',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));


const NavBar = () => {

    const searhRef = React.useRef()
    const search = (event) => {
        event.preventDefault();
        console.log(searhRef.current.search.value)
    }

    
    return (
        <AppBar sx={{color: 'black', background: '#fff'}} component="nav">
            <Toolbar sx={{display:'flex', justifyContent: 'space-between'}}>
                <Box sx={{  width: '400px',display:'flex', justifyContent: 'space-between'}}>
                    <Typography
                        variant="h6"
                        component="div"
                    >
                        E-Commerce
                    </Typography>
                    <form ref={searhRef} onSubmit={(event) => search(event)}>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search', 'name': 'search' }}
                            />
                        </Search>
                    </form>
                </Box>
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