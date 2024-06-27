import * as React from 'react'
import { Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Slide } from '@mui/material'
import { Button, AppBar, Toolbar } from '@mui/material'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { CustomInput, CustomInputTextArea } from '../../../Components/Common/CustomInput';
import BrandService from '../../../Services/BrandService';
import CustomAlert from '../../../Components/Common/CustomAlert';

function SlideTransition(props) {
    return <Slide {...props} timeout={1000} direction="down" />;
}

const AdminAddBrand = (props) => {
    const formRef = React.useRef();
    const { openAddBrand, setOpenAddBrand } = props;
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

    const addAlertProps = {
        state: alertState,
        handleClose: handleClose
    }

    const handleCloseBrand = () => {
        setOpenAddBrand(false);
    }

    const handleSubmitBrand = async (data) => {
        try {
            const brandResponse = await BrandService.addBrand(data);
            if(brandResponse.status === 201) {
                const alertProps = {...alertState}
                alertProps.open = true;
                alertProps.vertical = 'top';
                alertProps.horizontal = 'center';
                alertProps.message = 'Brand Added Successfully !!';
                alertProps.Transition = SlideTransition;
                setAlertState(alertProps);
                var millisecondsToWait = 7000;
                setTimeout(function() {
                    handleCloseBrand();
                }, millisecondsToWait);
            }
        } catch(error) {
            console.log(error)
        }
    }

    return (
        <Box>
            <Dialog
                fullWidth
                open={openAddBrand}
                onClose={handleCloseBrand}
                PaperProps={{
                    component: 'form',
                    ref: {formRef},
                    encType: 'multipart/form-data',
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        handleSubmitBrand(formJson)
                    },
                }}
            >
                <AppBar sx={{ position: 'relative', bgcolor: "#4CBB17" }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleCloseBrand}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <DialogTitle>
                            <Typography sx={{ ml: 2, flex: 1 }} textTransform="uppercase" fontFamily="poppins" variant="h6" component="div">
                                Add Brand
                            </Typography>
                        </DialogTitle>
                    </Toolbar>
                </AppBar>
                <DialogContent>
                    <Box>
                        <CustomInput size='medium' label="Brand Name" type='text' name='name' i_id='brandName' required={true} cFullWidth={true} />
                        <CustomInputTextArea rows={4} label="Description" type='text' name='description' i_id='description' required={true} cFullWidth={true} />
                    </Box>
                </DialogContent>
                    <DialogActions>
                        <Button type='submit' variant='contained' color='success'  sx={{ fontFamily: "poppins", mR: 2, cursor: 'pointer' }} >Submit</Button>
                        <Button sx={{ fontFamily: "poppins", cursor: 'pointer' }}  variant='contained' onClick={handleCloseBrand} color='error'>Cancel</Button>
                    </DialogActions>
            </Dialog>
            { alertState.open && <CustomAlert {...addAlertProps} /> }
        </Box>
    )
}

export default AdminAddBrand