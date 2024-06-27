import * as React from 'react'
import { Box, CssBaseline, Typography, TextField, MenuItem, Stack  } from '@mui/material'
import { InputLabel, FormControl, Select, Button, InputAdornment } from '@mui/material'
import { DrawerHeader } from '../../../Components/Common/CommonComponent';
import AdminDrawer from '../../../Components/AdminDrawer';
import Products from '../../../Components/Common/Products';
import { CustomInput2, CustomInputTextArea2, CustomInput3 } from '../../../Components/Common/CustomInput';
import BrandService from '../../../Services/BrandService';
import ProductService from '../../../Services/ProductService';
import Swal from 'sweetalert2'
import {v4 as uuid} from "uuid";
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import { MdOutlineFormatColorFill } from "react-icons/md";
import Man2Icon from '@mui/icons-material/Man2';
import { TbBrandDatabricks } from "react-icons/tb";
import { HiAdjustments, HiCurrencyRupee, HiFilter } from "react-icons/hi";



const AddAdminProductPage = () => {

    const formRef = React.useRef()
    const [prod, setProd] = React.useState({img: Products.userImg.data})
    const [prodFile, setProdFile] = React.useState()
    const [brand, setBrand] = React.useState('');
    const [sizeList, setSizeList] = React.useState([
        {size: "", quantity: ""}
    ])
    const [brands, setBrands] = React.useState([
        {
            id: "demo",
            name: "demo",
            description: "demo",
            createDate: "demo",
            updateDate: "demo"
        }
    ]);

    const getAllBrandsForPage = async () => {
        const response = await BrandService.getAllBrand();
        setBrands(response.data)
    }

    React.useEffect(() => {
        getAllBrandsForPage();
    }, [])

    const handleChange = (event) => {
        setBrand(event.target.value);
    };
    const handleSizeAdd = () => {
        setSizeList([...sizeList,   {size: "", quantity: ""}])
    }

    const handleSizeRemove = (index) => {
        const list = [...sizeList]
        list.splice(index, 1)
        setSizeList(list)
    }

    const handleSizeChange = (event, index) => {
        const {name, value} = event.target;
        const list = [...sizeList]
        list[index][name]=value;
        setSizeList(list)

    }
  
    const handleChangeFile = (event) => {
        setProdFile(event.target.files[0]);
        if(event.target.files[0].type === 'image/png' || event.target.files[0].type === 'image/jpg' || event.target.files[0].type === 'image/jpeg' || event.target.files[0].type === 'image/avif') {
            const reader = new FileReader();
            reader.onload = (r) => {
                setProd({
                    img: r.target.result
                })
                console.log(event.target.files[0])
            }
            reader.readAsDataURL(event.target.files[0])
        }
    }

    const saveProduct = async (event) => {
        event.preventDefault();
        const form = document.getElementById('form');
        const formData = new FormData(form);
        const data = {
            title: formRef.current.productName.value,
            price: formRef.current.productPrice.value,
            brandId: brand,
            sizes: [...sizeList],
            description: formRef.current.description.value,
            color: formRef.current.productColor.value,
            modelName: formRef.current.modelName.value,
            idealFor: formRef.current.productIdealFor.value,
            occasion: formRef.current.productOccasion.value,
            type: formRef.current.productType.value
        }
        formData.append("sizes", [...sizeList])
        try {
            const result = await ProductService.addProduct(data);
            const prodId = result.data.id;
            const fileName = uuid().toString()+prodFile.name.substring(prodFile.name.lastIndexOf("."));
            const fileToSend = new File([prodFile], fileName, {type: "multipart/form-data"})
            const response = await ProductService.addImage(prodId, {files: fileToSend})
            if (response.status === 201) {
                // Success!
                Swal.fire({
                  title: 'Success!',
                  text: 'Product added successfully.',
                  icon: 'success',
                }).then((result) => {
                    if (result.isConfirmed) {
                      window.location.reload();
                    }
                  });
            }
        } catch(error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message
              });
        }
        
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AdminDrawer />
            <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: "#f5f5f5" }}>
                <DrawerHeader />
                <Box id="form" ref={formRef} component="form" method='post' onSubmit={saveProduct} className='prod-add-main' encType="multipart/form-data">
                    <Box sx={{ pt: 4, pb: 2, textAlign: "center" }}>
                        <Typography fontFamily="poppins" fontWeight="bold" fontSize="24px" textTransform="uppercase">Add Product</Typography>
                    </Box>
                    <Box className='p-details-info'>
                        <Box sx={{width: "550px", margin: "auto"}}>
                            <Typography color="grey" fontFamily="poppins" fontWeight="500" textTransform="uppercase" 
                                sx={{ pl: 1, pr: 1, mt: "-27px", bgcolor: "#fff", width: "fit-content"}}>Product Info</Typography>
                            <Box className='p-details-info-input'>
                                <CustomInput2 size='medium' label="Product Name" type='text' name='productName' 
                                                i_id='productName' required={true} cFullWidth={true} 
                                />
                                <CustomInputTextArea2 rows={4} label="Description" type='text' name='description' 
                                                        i_id='description' required={true} cFullWidth={true} 
                                />
                            </Box>
                        </Box>
                    </Box>

                    <Box className='pa-details'>
                        <Typography color="grey" fontFamily="poppins" fontWeight="500" textTransform="uppercase" 
                                    sx={{ pl: 1, pr: 1, ml: 4, mt: "-12px", bgcolor: "#fff", width: "fit-content"}}>
                                Product Details
                        </Typography>
                        <Box className='pa-details-container'>
                            <Stack spacing={2}>
                                <CustomInput3 size='medium' label="Price" type='text' name='productPrice' 
                                                i_id='productPrice' required={true} cFullWidth={false} 
                                                inputProps={<InputAdornment position='start'><HiCurrencyRupee /></InputAdornment>} 
                                />
                                <CustomInput3 size='medium' label="Color" type='text' name='productColor' 
                                                i_id='productColor' required={true} cFullWidth={false} 
                                                inputProps={<InputAdornment position='start'><MdOutlineFormatColorFill /></InputAdornment>} 
                                />
                                <CustomInput3 size='medium' label="Occasion" type='text' name='productOccasion' 
                                                i_id='productOccasion' required={true} cFullWidth={false} 
                                                inputProps={<InputAdornment position='start'><HiAdjustments /></InputAdornment>} 
                                />
                            </Stack>
                            <Stack spacing={2}>
                                <CustomInput3 size='medium' label="Type" type='text' name='productType' 
                                                i_id='productType' required={true} cFullWidth={false} 
                                                inputProps={<InputAdornment position='start'><FormatAlignLeftIcon /></InputAdornment>} 
                                />
                                <CustomInput3 size='medium' label="Ideal For" type='text' name='productIdealFor' 
                                                i_id='productIdealFor' required={true} cFullWidth={false} 
                                                inputProps={<InputAdornment position='start'><Man2Icon /></InputAdornment>} 
                                />
                                <FormControl fullWidth>
                                    <InputLabel sx={{ fontFamily: "poppins" }} id="brandLabelId" required>Brand</InputLabel>
                                    <Select
                                        labelId="brandLabelId"
                                        id="brandId"
                                        value={brand}
                                        defaultValue={brand}
                                        label="Brand"
                                        onChange={handleChange}
                                        required={true}
                                        startAdornment={<InputAdornment position='start'><TbBrandDatabricks /></InputAdornment>}
                                    >
                                        {
                                            brands.map((brnd) => (
                                                <MenuItem key={brnd.id} value={brnd.id}>{brnd.name}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                            </Stack>
                        </Box>
                        <Box sx={{ mt: 2, width: "550px", ml: "auto", mr: "auto" }}>
                            <CustomInput3 size='medium' label="Model Name" type='text' name='modelName' 
                                            i_id='modelName' required={true} cFullWidth={true} 
                                            inputProps={<InputAdornment position='start'><HiFilter /></InputAdornment>}  
                            />
                        </Box>
                    </Box>
                    {/** Product Size Page */}
                    <Box className='pa-details'>
                        <Typography color="grey" fontFamily="poppins" fontWeight="500" textTransform="uppercase" 
                                    sx={{ pl: 1, pr: 1, ml: 4, mt: "-12px", bgcolor: "#fff", width: "fit-content"}}>
                                Product Sizes
                        </Typography>
                        <Box className='pa-size-container'>
                        {
                            sizeList.map((size, index) => (
                                <Box key={index}>
                                    <Box sx= {{ display: "flex", justifyContent: "space-between" }}>
                                        <TextField InputProps={{ style: {fontFamily: "poppins"}, startAdornment: <InputAdornment position='start'><AspectRatioIcon /></InputAdornment> }} 
                                                    InputLabelProps={{ style: {fontFamily: "poppins"} }}
                                                    id="product-size" label="Size" name="size" variant="outlined"
                                                    onChange={(event) => handleSizeChange(event, index)}
                                        />
                                        <TextField InputProps={{ style: {fontFamily: "poppins"}, startAdornment: <InputAdornment position='start'><AddShoppingCartIcon /></InputAdornment> }} 
                                                    InputLabelProps={{ style: {fontFamily: "poppins"} }}
                                                    id="product-quantity" label="Quantity" variant="outlined"
                                                    name="quantity" onChange={(event) => handleSizeChange(event, index)}
                                        />
                                    </Box>
                                    <Box sx={{ width: "100%", textAlign: "right" }}>
                                        {sizeList.length-1 === index && sizeList.length < 4 && (
                                            <Button onClick={handleSizeAdd} sx={{ textDecoration: "underline", fontFamily: "poppins" }}>Add More</Button>
                                        )}
                                        {sizeList.length > 1 && (
                                            <Button onClick={() => handleSizeRemove(index)} color='error' sx={{ textDecoration: "underline", fontFamily: "poppins" }}>Remove</Button>
                                        )}
                                    </Box>
                                </Box>
                            ))
                        }
                        </Box>
                    </Box>
                    {/** Product Image Page */}
                    <Box className='pa-details'>
                        <Typography color="grey" fontFamily="poppins" fontWeight="500" textTransform="uppercase" 
                                        sx={{ pl: 1, pr: 1, ml: 4, mt: "-12px", bgcolor: "#fff", width: "fit-content"}}>
                                Product Image
                        </Typography>
                        <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                            <Box>
                                <Box
                                    component="img"
                                    sx={{
                                        height: 200,
                                        bgcolor: "#f5f5f5",
                                        width: 170,
                                        ml:2,
                                        boxShadow: `rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, 
                                                    rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, 
                                                    rgba(0, 0, 0, 0.12) 0px 1px 3px 0px`,
                                        flex: 1,
                                        borderRadius: "50%"
                                    }}
                                    src={prod.img}
                                    
                                    alt='R'
                                />
                            </Box>
                            <Box sx={{ mt: 2 }}>
                                <input style={{width: "115px"}} className="form-control ms-2" accept='image/*' type="file" id="formFile" name='cFile' onChange={handleChangeFile} />
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{pb: 2}}>
                        <Box className='pa-details-action'>
                            <Button type="submit" color='success' variant='contained' sx={{ fontFamily: "poppins" }}>Submit</Button>
                            <Button color='error' variant='contained' sx={{ fontFamily: "poppins" }}>Cancel</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
export default AddAdminProductPage