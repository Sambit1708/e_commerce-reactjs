import { Box, Button, Typography, Toolbar } from '@mui/material'
import { Dialog, DialogTitle, DialogContent, DialogActions, AppBar } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import * as React from 'react'
import Products from '../../../Components/Common/Products';

const AdminBrandDetails = (props) => {
  const [brand, setBrand] = React.useState({
    id: "",
    title: "",
    description: "",
    quantity: ""
  })
  React.useEffect(() => {
      brandDataFind();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const brandDataFind = () => {
    const newData = {...brand}
    const newDataFind = Products.brandDetails.find((brnd) => brnd.id === props.brandId)
    console.log(newDataFind)
    setBrand((newDataFind !== undefined) ? newDataFind : newData)
  }
  return (
    <Dialog
      fullWidth
      open={props.openBrandDetail}
      onClose={props.handleBrandDetail}
    >
      <AppBar sx={{ position: 'relative', bgcolor: "#9c27b0" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={props.handleBrandDetail}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <DialogTitle>
              <Typography sx={{ ml: 2, flex: 1 }} textTransform="uppercase" 
                          fontFamily="poppins" variant="h6" component="div">
                  Brand Details
              </Typography>
          </DialogTitle>
          </Toolbar>
      </AppBar>
      <DialogContent>
        <Box>
          <Typography fontFamily="poppins" variant='h6' component="div">{brand.title}</Typography>
          <Typography sx={{ mt: 1 }} fontFamily="poppins" color="grey">{brand.description}</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
          <Button sx={{fontFamily: "poppins"}} onClick={props.handleBrandDetail} 
                  variant='contained' color='error'>
              Close
          </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AdminBrandDetails