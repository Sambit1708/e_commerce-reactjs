import * as React from 'react'
import { Box, Typography, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Slide } from '@mui/material'
import { Button, AppBar, Toolbar } from '@mui/material'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Unstable_Grid2';
import ProductService from '../../../Services/ProductService';
import CustomAlert from '../../../Components/Common/CustomAlert';

function SlideTransition(props) {
  return <Slide {...props} timeout={1000} direction="down" />;
}

export const EditProductSize = (props) => {
  const [currProductSize, setCurrProductSize] = React.useState([])
  const { product, editSizeOpen, handleEditSizeBtnClick } = props;
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    Transition: Slide,
    message: ''
  });

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  
  const handleProductEditSizeChange = (event, id) => {
    const pData = [...product.productSizes]
    const currSizeEle = [...currProductSize];
    const currSize = currSizeEle.find((item) => item.id === id)
    if(currSize !== undefined) {
        currSize.quantity = Number(event.target.value)
        setCurrProductSize(currSizeEle)
    }
    else {
        const newSize = pData.find((item) => item.id === id)
        newSize.quantity = Number(event.target.value)
        currSizeEle.push(newSize)
        setCurrProductSize(currSizeEle)
    }
  }

  const editAlertProps = {
    state: state,
    handleClose: handleClose
  }

  const updateProductSize = async (data) => {
    try {
        const response = await ProductService.updateProductSize(product.id, data)
        if(response.status === 201) {
            setState({ vertical: 'top', horizontal: 'center', Transition: SlideTransition, open: true, message: "Product Size Edited Successfully !!" });
            var millisecondsToWait = 7000;
            setTimeout(function() {
              handleEditSizeBtnClick();
            }, millisecondsToWait);
        }
    } catch(error) {
        console.log(error)
    }
  }

  return (
    <Box>
    <Dialog
        open={editSizeOpen}
        onClose={handleEditSizeBtnClick}
        sx={{
            "& .MuiDialog-container": {
              "& .MuiPaper-root": {
                width: "100%",
                maxWidth: "800px",  // Set your width here
              },
            },
          }}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            updateProductSize([...currProductSize])
          },
        }}
      >
        <AppBar sx={{ position: 'relative', bgcolor: "#ff9f00" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleEditSizeBtnClick}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <DialogTitle sx={{ flex: 1, textTransform: "uppercase", fontFamily: "poppins" }}>
                Edit Product Size
            </DialogTitle>
          </Toolbar>
        </AppBar>
        <DialogContent>
            <Box sx={{ display: "flex" }}>
                <Box
                    component="img"
                    sx={{
                        height: 100,
                        bgcolor: "#f5f5f5",
                        width: 150,
                        ml:2,
                        boxShadow: `rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, 
                                    rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, 
                                    rgba(0, 0, 0, 0.12) 0px 1px 3px 0px`
                        }}
                    src={product.imagePath}
                    alt='R'
                />
                <Box sx={{ml: 2}}>
                    <Typography sx={{flex: 1 }} textTransform="uppercase" fontFamily="poppins" fontSize="18px" fontWeight="bold">
                        {product.title}
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ mt: 2}}>
              {
                product.productSizes.map((row, index) => (
                  <Box key={index} sx={{ mt: 1 }}>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item xs={1}>
                        <Typography fontFamily="poppins">Size:</Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Box sx={{  border: "1px solid #ccc",  borderRadius: "5px", 
                                    p: 2, width: "70px", textAlign: "center", ml: 2 }}>{row.size}</Box>
                      </Grid>
                      <Grid item xs={1}>
                          <div>:</div>
                      </Grid>
                      <Grid item xs={7}>
                        <TextField type='number' sx={{ml: 2}}
                                    InputProps={{ style: {fontFamily: "poppins"} }}
                                    InputLabelProps={{ style: {fontFamily: "poppins"} }}
                                    label="Quantity" id="outlined-basic" variant="outlined"
                                    name="quantity" defaultValue={row.quantity}
                                    onChange={(event) => handleProductEditSizeChange(event, row.id) } 
                        />
                      </Grid>
                    </Grid>
                  </Box>
                ))
              }
            </Box>
        </DialogContent>
        <DialogActions>
          <Button sx={{ fontFamily: "poppins" }} onClick={props.handleEditSizeBtnClick} variant='contained' color='error'>Cancel</Button>
          <Button sx={{ fontFamily: "poppins" }} type="submit" variant='contained' color='success'>Update</Button>
        </DialogActions>
      </Dialog>
      { state.open && <CustomAlert {...editAlertProps} /> }
    </Box>
  )
}

export default EditProductSize
