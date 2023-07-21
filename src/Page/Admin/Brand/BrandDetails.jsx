import { Avatar, Box, Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Modal, TextField, Typography } from '@mui/material'
import React from 'react'
import AdminDrawer from '../../../Components/AdminDrawer'
import DrawerHeader from '../../../Components/Common/CommonComponent'
import Products from '../../../Components/Products'
import useMediaQuery from '@mui/material/useMediaQuery';
import PeopleIcon from '@mui/icons-material/People';


const CardContentPC = (props) => (
  <Card sx={{ width: [350, 350, 250,350], display:'flex' }} >
    <div>
      <CardMedia
        sx={{ height: [100,100,50,100], width: [100,100,50,100], backgroundSize: [100,100,50,100], marginTop: '20px', marginLeft: '10px' }}
        image={props.imgpath}
        title="green iguana"
      />
    </div>
    <div>
      <CardContent>
        <div className=''>
          <Typography variant='h5' className='turncate' sx={{ fontSize: [25,25,20,25] }}>
            {props.title}
          </Typography>
          <Typography color='text.secondary' sx={{ fontSize: 15 }} className='turncate'>
            Items: {props.items}
          </Typography>
        </div>
        <Typography color='text.secondary' className='turncate mt-3' sx={{ width: [200,200,100,200] }}>
          {props.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button sx={{fontSize: [15,15,13,15]}} color='error'>Expand</Button>
        <Button sx={{fontSize: [15,15,13,15]}}>Products</Button>
      </CardActions>
    </div>
  </Card>
)

const addBrandStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

const BrandDetails = () => {
  const isMobileSmall = useMediaQuery('(max-width:750px)')
  const isSizeSmall = useMediaQuery('(max-width:899px)')
  const [openAddBrand, setAddBrand] = React.useState(false);
  const handleOpenAddBrand = () => setAddBrand(true);
  const handleCloseAddBrand = () => setAddBrand(false);
  const formRef = React.useRef()
  const [file, setFile] = React.useState()
  const [img, setImg] = React.useState({
      placeholder: <PeopleIcon />
  })



  const handleChangeFile = (event) => {
    setFile(event.target.files[0]);
    if(event.target.files[0].type === 'image/png' || event.target.files[0].type === 'image/jpg' || event.target.files[0].type === 'image/jpeg') {
        const reader = new FileReader();
        reader.onload = (r) => {
            setImg({
                placeholder: r.target.result
            })
        }
        reader.readAsDataURL(event.target.files[0])
    }
  };


  const submitCategory = (event) => {
    event.preventDefault();
    const data = {
        name: formRef.current.cName.value,
        desc: formRef.current.cDescription.value,
        img: file
    }
    console.log(data)

  }


  return (
    <Box sx={{ display: 'flex', backgroundColor: '#f5f5f5', width: 'fit-content' }}>
        <CssBaseline />
        <AdminDrawer />
        <Box component="main">
            <DrawerHeader />
            <div className='branddetail-bg'>
              <div style={{position: 'absolute', left: '50%' }}>
                <div style={{marginTop: 10}} className='small-circle'></div>
                <div className='big-circle'>
                  <img src={Products.Mobiles[8].imgPath} style={{width: '150px', position: 'absolute', top: '-75px', left: '50%', transform: 'translateX(-50%)'}} alt='P' />
                </div>
                <div className='small-circle' style={{position: 'relative', top: '40px'}}></div>
              </div>
              <div style={{position: 'absolute', top: '35%', left: '25%'}}>
                  <h1 style={{fontSize: '70px'}}>{Products.CategoriesDetails[0].name}</h1>
                  <span>{Products.CategoriesDetails[0].description}</span>
                </div>
            </div>
            {/* ------------------------------- Add Brand --------------------------------- */}
            <div style={{textAlign: 'right', paddingRight: '100px'}}>
              <Button variant='contained' color='error' sx={{ marginTop: 8}} onClick={handleOpenAddBrand}>Add Brand</Button>
              <Modal
                open={openAddBrand}
                onClose={handleCloseAddBrand}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={addBrandStyle}>
                  <Typography id="modal-modal-title" textTransform='uppercase' variant="h6" component="h2">
                    Add Brand
                  </Typography>
                  <div className='mt-3'>
                    <form onSubmit={(event) => submitCategory(event)} ref={formRef} id="modal-modal-description" style={{ marginTop: '20px' }} encType='multipart/form-data' >
                      <TextField required id="outlined-basic" fullWidth  label="Name" variant="outlined" name='cName' />
                      <TextField required id="outlined-multiline-static" fullWidth label="Description" multiline rows={4} sx={{mt: '20px'}}  name='cDescription' />
                      <TextField required id="outlined-multiline-static" fullWidth defaultValue='Mobile' label="Category"  sx={{mt: '20px'}} InputProps={{ readOnly: true }}  name='category' />
                      <div class="mb-3 mt-3 d-flex">
                          <Avatar alt="B" src={img.placeholder} />
                          <input class="form-control ms-2" accept='image/*' type="file" id="formFile" name='cFile' onChange={handleChangeFile} />
                      </div>
                      <div style={{textAlign: 'center'}}>
                          <Button type='submit' variant='contained' color='success' sx={{ mr: 5 }}>Submit</Button>
                          <Button variant='contained' onClick={handleCloseAddBrand} color='error'>Cancel</Button>
                      </div>
                    </form>
                  </div>
                </Box>
              </Modal>
            </div>
            {/* ---------------------------------------------------------------- */}
            <Grid container spacing={2} sx={{p: 5}}>
               {Products.Brands.map((item) => (
                  isMobileSmall ? (
                    <Grid item xs={12}>
                      <CardContentPC title={item.title} imgpath={item.imgpath} description={item.description} items={item.items} />
                    </Grid>
                  ) : (
                    isSizeSmall ? (
                      <Grid item xs={6}>
                        <CardContentPC title={item.title} imgpath={item.imgpath} description={item.description} items={item.items} />
                      </Grid>
                    ) : (
                      <Grid item xs={4}>
                        <CardContentPC title={item.title} imgpath={item.imgpath} description={item.description} items={item.items} />
                      </Grid>
                    )
                  )
               ))}
            </Grid>
        </Box>
    </Box>
  )
}

export default BrandDetails