import * as React from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import AdminDrawer from '../../../Components/AdminDrawer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, Button, Modal, TableFooter, TablePagination, TextField, Typography } from '@mui/material';
import Products from '../../../Components/Products';
import PeopleIcon from '@mui/icons-material/People';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '5px'
  };
  


const Category = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [open, setOpen] = React.useState(false);
    const formRef = React.useRef()
    const [file, setFile] = React.useState()
    const [img, setImg] = React.useState({
        placeholder: <PeopleIcon />
    })


    const handleAddCategoryOpen = () => setOpen(true);
    const handleAddCategoryClose = () => setOpen(false);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

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

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
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
        <Box sx={{ display: 'flex', backgroundColor: '#f5f5f5' }}>
            <CssBaseline />
            <AdminDrawer />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell>Avatar</StyledTableCell>
                            <StyledTableCell>Category Name</StyledTableCell>
                            <StyledTableCell>Description</StyledTableCell>
                            <StyledTableCell>No of Items</StyledTableCell>
                            <StyledTableCell>Revenue</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {(rowsPerPage > 0
                            ? Products.CategoriesDetails.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : Products.CategoriesDetails  
                            ).map((row) => (
                                <StyledTableRow key={row.name}>
                                    <StyledTableCell>{row.Avatar}</StyledTableCell>
                                    <StyledTableCell>
                                        {row.name}
                                    </StyledTableCell>
                                    <StyledTableCell>{row.description}</StyledTableCell>
                                    <StyledTableCell>{row.items}</StyledTableCell>
                                    <StyledTableCell>&#x20B9;{row.revenue}</StyledTableCell>
                                </StyledTableRow>
                        ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, 100]}
                                    component="div"
                                    count={Products.CategoriesDetails.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
                <div style={{textAlign: 'right', marginTop: '20px'}}>
                    <Button onClick={handleAddCategoryOpen} variant='contained' color='error'>Add Category</Button>
                        <Modal
                            open={open}
                            onClose={handleAddCategoryClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2" textTransform='uppercase' >
                                    Add Category
                                </Typography>
                                <form onSubmit={(event) => submitCategory(event)} ref={formRef} id="modal-modal-description" style={{ marginTop: '20px' }} encType='multipart/form-data' >
                                    <TextField id="outlined-basic" fullWidth  label="Name" variant="outlined" name='cName' />
                                    <TextField id="outlined-multiline-static" fullWidth label="Description" multiline rows={4} sx={{mt: '20px'}}  name='cDescription' />
                                    <div class="mb-3 mt-3 d-flex">
                                        <Avatar alt="Remy Sharp" src={img.placeholder} />
                                        <input class="form-control ms-2" accept='image/*' type="file" id="formFile" name='cFile' onChange={handleChangeFile} />
                                    </div>
                                    <div style={{textAlign: 'center'}}>
                                        <Button type='submit' variant='contained' color='success' sx={{ mr: 5 }}>Submit</Button>
                                        <Button variant='contained' onClick={handleAddCategoryClose} color='error'>Cancel</Button>
                                    </div>
                                </form>
                            </Box>
                        </Modal>
                </div>
            </Box>
        </Box>
        
    )
}

export default Category