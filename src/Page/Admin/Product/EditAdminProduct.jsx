import * as React from 'react';
import Button from '@mui/material/Button';
import { Dialog, DialogContent, Box } from '@mui/material'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { CustomInput2, CustomInputTextArea2 } from '../../../Components/Common/CustomInput';
import CustomAlert from '../../../Components/Common/CustomAlert';
import '../../../Assets/style.css'


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EditAdminProduct = (props) => {
 
  const { product, editBtnDlg, handleEditBtnClick } = props;
  const [alertState, setAlertState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    Transition: Slide,
    message: ''
  });

  const handleClose = () => {
    setAlertState({ ...{alertState}, open: false });
  };

  const editAlertProps = {
    state: alertState,
    handleClose: handleClose
  }

  const editProduct = async () => {

  }

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={editBtnDlg}
        onClose={handleEditBtnClick}
        TransitionComponent={Transition}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              
              editProduct(formJson)
          },
      }}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleEditBtnClick}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} textTransform="uppercase" fontFamily="poppins" variant="h6" component="div">
              Edit Product
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent sx={{mt: 3}}>
            <Box className='p-edit-page'>
                <CustomInput2 size='medium' label="Name" type='text' name='title' 
                             i_id='pName' defaultValue={product.title} required={true} cFullWidth={true} />
                
                <Box sx={{mt: 2}}>
                    <Box sx={{ mb: 2 }}>
                        <CustomInputTextArea2 rows={4} label="Product Description" type='text' name='description' cFullWidth={true} 
                                              i_id='product-desc' defaultValue={product.description} required={true} />
                    </Box>
                    <Box>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
                        <CustomInput2 size='medium' label="Type" type='text' defaultValue={product.productDetails.type} 
                                      name='type' i_id='modelType' required={true} cFullWidth={true} />
                        <CustomInput2 size='medium' label="Ideal For" type='text' defaultValue={product.productDetails.idealFor}
                                      name='idealFor' i_id='idealFor' required={true} cFullWidth={true} />
                      </Box>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
                        <CustomInput2 size='medium' label="Color" type='text' defaultValue={product.productDetails.color}
                                      name='color' i_id='pColor' required={true} cFullWidth={true} />
                        <CustomInput2 size='medium' label="Occasion" type='text' defaultValue={product.productDetails.occasion} 
                                      name='occasion' i_id='occasion' required={true} cFullWidth={true} />
                      </Box>
                    </Box>
                    <Box sx={{ mt: 2 }}>
                        <CustomInputTextArea2 rows={4} label="Model Name" type='text' name='modelName' i_id='modelName' 
                                              defaultValue={product.productDetails.modelName} required={true} cFullWidth={true} />
                    </Box>
                </Box>
                <Box sx={{ mt: 2, textAlign: "center" }}>
                    <Button variant='contained' color='success'>Update</Button>
                    <Button variant='contained' color='error' sx={{ml: 2}}>Cancel</Button>
                </Box>
            </Box>
        </DialogContent>
      </Dialog>
      { alertState.open && <CustomAlert {...editAlertProps} /> }
    </React.Fragment>
  );
}
export default EditAdminProduct;