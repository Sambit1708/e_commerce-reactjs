import * as React from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Menu, MenuItem, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';


const AddressPage = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [openAddressDialog, setOpenAddressDialog] = React.useState(false);
  const { allAddress } = props;

  const handleAddressDialogOpen = () => {
    setOpenAddressDialog(true);
  };

  const handleAddressDialogClosee = () => {
    setOpenAddressDialog(false);
  };
  
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
            <Button startIcon={<AddIcon />} onClick={handleAddressDialogOpen} 
                    sx={{textTransform: "uppercase", p: 2, width: "100%", fontFamily: "poppins" }}>
                Add a new address
            </Button>
        </Box>
        <Box sx={{ mt: 8 }}>
        {
            allAddress.map((item, index) => (
            <Box key={index} sx={{border: "1px solid #ccc", mt: 2, p: 2}}>
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
                        <MenuItem onClick={handleClose}>Edit</MenuItem>
                        <MenuItem onClick={handleClose}>Delete</MenuItem>
                    </Menu>
                </Box>
                <Box sx={{ display: "flex", mt: -3 }}>
                    <Typography fontFamily="poppins" fontSize="14px" fontWeight="500">{item.deliverTo}</Typography>
                    <Typography fontFamily="poppins" fontSize="14px" sx={{ml: 8}}>{item.phoneNumber}</Typography>
                </Box>
                <Box sx={{ width: "523px", mt: 1 }}>
                    <Typography fontFamily="poppins" fontSize="13px">
                        {item.address}, {item.city}, {item.state} - {item.pinCode}
                    </Typography>
                </Box>
            </Box>
            )) 
        }
        </Box>
        <Dialog
            sx={{
                "& .MuiDialog-container": {
                  "& .MuiPaper-root": {
                    width: "100%",
                    maxWidth: "700px",  // Set your width here
                  },
                },
              }}
            disableBackdropClick
            open={openAddressDialog}
            onClose={handleAddressDialogClosee}
        >
            <DialogContent>
            <Box id="add-address-section" sx={{m: "10px auto", width: "600px",}}>
                <Box>
                    <Typography textTransform="uppercase" fontFamily="poppins" 
                                fontWeight="bold" textAlign="center"
                                sx={{ mb: 3, textDecoration: "underline" }}>
                        Add Address
                    </Typography>
                </Box>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField label="Name" fullWidth={true} name="deliverTo"
                                    InputLabelProps={{ style: { fontFamily: "poppins" } }}
                                    InputProps={{ style: { fontFamily: "poppins", fontSize: "15px" } }} 
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label="Phone" fullWidth={true} name="phoneNumber"
                                    InputLabelProps={{ style: { fontFamily: "poppins" } }}
                                    InputProps={{ style: { fontFamily: "poppins", fontSize: "15px", letterSpacing: "1px" } }} 
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label="Pincode" fullWidth={true} name="pinCode"
                                    InputLabelProps={{ style: { fontFamily: "poppins" } }}
                                    InputProps={{ style: { fontFamily: "poppins", fontSize: "15px", letterSpacing: "1px" } }} 
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label="Landmark" fullWidth={true} name="landMark"
                                    InputLabelProps={{ style: { fontFamily: "poppins" } }}
                                    InputProps={{ style: { fontFamily: "poppins", fontSize: "15px" } }} 
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Address" fullWidth={true} multiline rows={4} name="address"
                                    InputLabelProps={{ style: { fontFamily: "poppins" } }}
                                    InputProps={{ style: { fontFamily: "poppins", fontSize: "15px" } }} 
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label="City" fullWidth={true} name="city"
                                    InputLabelProps={{ style: { fontFamily: "poppins" } }}
                                    InputProps={{ style: { fontFamily: "poppins", fontSize: "15px", letterSpacing: "1px" } }} 
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label="State" fullWidth={true} name="state"
                                    InputLabelProps={{ style: { fontFamily: "poppins" } }}
                                    InputProps={{ style: { fontFamily: "poppins", fontSize: "15px", letterSpacing: "1px" } }} 
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl sx={{ mt: 2 }}>
                            <FormLabel id="radio-label-type" sx={{fontFamily: "poppins"}}>Address Type</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="addressType"
                                // value={typeRadio}
                                // onChange={handleChangeAddressType}
                            >
                                <FormControlLabel value="HOME" control={<Radio />} label={ <Typography fontFamily="poppins">Home</Typography> } />
                                <FormControlLabel value="WORK" control={<Radio />} label={  <Typography fontFamily="poppins">Work</Typography> } sx={{ ml: 4 }} />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                </Grid>
                
            </Box>
            </DialogContent>
            <DialogActions>
                <Box>
                    <Box sx={{ display: "flex", mt: 4 }}>
                        <Button variant='contained' type="submit" sx={{ fontFamily: "poppins", fontSize: "14px" }}>
                            Save Address
                        </Button>
                        <Button sx={{ fontFamily: "poppins", fontSize: "14px", ml: 1 }} 
                                onClick={handleAddressDialogClosee}>
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </DialogActions>
        </Dialog>
    </Box>
  )
}

export default AddressPage