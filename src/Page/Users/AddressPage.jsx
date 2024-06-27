import * as React from 'react'
import { Box, Button, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';


const AddressPage = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box>
        <Typography fontFamily="poppins" fontSize="18px" fontWeight="500">Manage Address</Typography>
        <Box sx={{border: "1px solid #ccc", mt: 2, textAlign: "left"}}>
            <Button startIcon={<AddIcon />} sx={{textTransform: "uppercase", p: 2, width: "100%" }}>Add a new address</Button>
        </Box>
        <Box sx={{ mt: 8 }}>
            <Box sx={{border: "1px solid #ccc", mt: 2, p: 2}}>
                <Box sx={{ml: 100, mt: -1}}>
                    <IconButton
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Menu>
                </Box>
                <Box sx={{ display: "flex", mt: -3 }}>
                    <Typography fontFamily="poppins" fontSize="14px" fontWeight="500">Sambit Khandai</Typography>
                    <Typography fontFamily="poppins" fontSize="14px" sx={{ml: 8}}>9861114128</Typography>
                </Box>
                <Box sx={{ width: "523px", mt: 1 }}>
                    <Typography fontFamily="poppins" fontSize="13px">
                        Nesto Paradise PG for Gents, 27th Main Rd, near IQRA School, Old Madiwala, Jay Bheema Nagar, BTM 1st Stage, Bengaluru, Karnataka - 560068
                    </Typography>
                </Box>
            </Box>
        </Box>
    </Box>
  )
}

export default AddressPage