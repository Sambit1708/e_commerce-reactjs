import * as React from 'react'
import { Box, Typography, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Slide } from '@mui/material'
import { Button, AppBar, Toolbar } from '@mui/material'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import BrandService from '../../../Services/BrandService';
import CustomAlert from '../../../Components/Common/CustomAlert';

function SlideTransition(props) {
    return <Slide {...props} timeout={1000} direction="down" />;
}

const EditAdminBrand = (props) => {
    const { brand, openEditBrand, handleEditBrand } = props;
    var charCount = (brand.description.length/55 === 0) ? 1 : brand.description.length/55
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

    const editBrandPage = async (brandData) => {
        try {
            const brandDetailResponse = await BrandService.updateBrand(brand.id, brandData);
            console.log(brandDetailResponse)
            if(brandDetailResponse.status === 201) {
                const alertProps = {...alertState}
                alertProps.open = true;
                alertProps.vertical = 'top';
                alertProps.horizontal = 'center';
                alertProps.message = "Brand Edited Succuessfully !!"
                alertProps.Transition = SlideTransition;
                setAlertState(alertProps);
                var millisecondsToWait = 7000;
                setTimeout(function() {
                    handleEditBrand();
                }, millisecondsToWait);
            }

        }
        catch(error) {
            console.log(error);
        }
    }
    
    return (
        <Box>
            <Dialog
                fullWidth
                open={openEditBrand}
                onClose={handleEditBrand}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        editBrandPage(formJson)
                    },
                }}
                >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleEditBrand}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <DialogTitle>
                        <Typography sx={{ ml: 2, flex: 1 }} textTransform="uppercase" fontFamily="poppins" variant="h6" component="div">
                            Edit Brand
                        </Typography>
                    </DialogTitle>
                    </Toolbar>
                </AppBar>
                <DialogContent>
                    <TextField InputLabelProps={{ style: {fontFamily: "poppins"} }} 
                                InputProps={{ style: {fontFamily: "poppins"} }} 
                                label="Name" fullWidth id="brand-basic"
                                defaultValue={brand.name} name="name"
                                variant="outlined" sx={{mt:1}}
                    />
                    <Box sx={{ mt: 2, mb: 2 }}>
                        <TextField InputProps={{ style: {fontFamily: "poppins"} }} 
                                    InputLabelProps={{ style: {fontFamily: "poppins"} }}
                                    id="brand-desc" label="Description"
                                    name="description" variant="outlined" fullWidth
                                    defaultValue={brand.description}
                                    multiline rows={charCount}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button sx={{ fontFamily: "poppins" }} onClick={handleEditBrand} variant='contained' color='error'>Cancel</Button>
                    <Button sx={{ fontFamily: "poppins" }} type="submit" variant='contained' color='success'>Subscribe</Button>
                </DialogActions>
            </Dialog>
            { alertState.open && <CustomAlert {...editAlertProps} /> }
        </Box>
    )
}

export default EditAdminBrand