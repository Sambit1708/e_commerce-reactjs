import * as React from 'react'
import { Box, IconButton } from '@mui/material'
import Snackbar from '@mui/material/Snackbar';
import '../../Assets/style.css';
import CloseIcon from '@mui/icons-material/Close';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const CustomAlert = (props) => {

  const { state, handleClose} = props;
  const { open, vertical, horizontal, Transition, message } = state;
  
  return (
    <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        autoHideDuration={5000}
        key={vertical + horizontal}
        TransitionComponent={Transition}
    >
        <Box>
            <AppBar color='success' position="static" sx={{width: "400px"}}>
                <Toolbar variant='dense'>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={handleClose}
                        
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Alert
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box sx={{bgcolor:"#fff", border: "1px solid gray", pt: "10px", minHeight: "50px"}}>
                <Box sx={{ml: "50px"}}>
                    <Typography fontFamily="poppins">{message}</Typography>
                </Box>
            </Box>
        </Box>
    </Snackbar>
  )
}

export default CustomAlert