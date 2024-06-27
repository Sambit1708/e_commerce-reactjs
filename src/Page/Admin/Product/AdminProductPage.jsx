import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import { Box, CssBaseline, Button, Avatar } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination } from '@mui/material';
import { TableRow, Toolbar, Typography, Paper, Checkbox, FormControlLabel } from '@mui/material';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom'
import VisibilityIcon from '@mui/icons-material/Visibility';
import Swal from 'sweetalert2'
import PhotoSizeSelectLargeIcon from '@mui/icons-material/PhotoSizeSelectLarge';
import Products from '../../../Components/Common/Products';
import AdminDrawer from '../../../Components/AdminDrawer';
import { DrawerHeader, tablePaginationStyle } from '../../../Components/Common/CommonComponent';
import { EditSizeButton } from '../../../Components/Common/StyledButtons'
import EditProductSize from './EditProductSize';
import ProductDetails from './ProductDetails';
import EditAdminProduct from './EditAdminProduct';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import '../../../Assets/style.css'
import ProductService from '../../../Services/ProductService';

function stableSort(array) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const { onSelectAllClick, numSelected, rowCount } =
    props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all produccts',
            }}
          />
        </TableCell>
        {Products.ProductHeaders.map((headCell) => (
          <TableCell key={headCell.id}>
            <Typography textTransform="uppercase" fontWeight="bold" fontFamily="poppins" fontSize="15px">
                {headCell.label}
            </Typography>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%', fontFamily: "poppins" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected from Products
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%', fontFamily: "poppins" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Products
        </Typography>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

export default function AdminProducctPage() {
  const [selected, setSelected] = React.useState([]);
  const [currProduct, setCurrProduct] = React.useState(
    {
      id: "demo",
      title: "demo",
      price: 0,
      description: `demo`,
      rating: 0,
      imageName: "demo",
      imagePath: "../../../Assets/images/user.png",
      brand: {
          id: "6009215f-dc9d-48bd-9000-7f5040be606a",
          name: "PUMA",
          description: "Hello"
      },
      productSizes: [
        {
            id: "ae67c90b-ea2d-4982-863f-2c4b1202fb46",
            size: 6,
            quantity: 10
        }
      ],
      productDetails: {
          color: "White, Black",
          modelName: "Casual Sneaker Shoes for Men | Advanced Rounded Front, Elevated Softness",
          idealFor: "Men",
          occasion: "Casual",
          type: "Sneakers",
      }
    }
  )
  const [products, setProducts] = React.useState([
    {
      id: "demo",
      title: "demo",
      price: 0,
      description: `demo`,
      rating: 0,
      imageName: "demo",
      imagePath: "../../../Assets/images/user.png",
      brand: {
          id: "6009215f-dc9d-48bd-9000-7f5040be606a",
          name: "PUMA",
          description: "Hello"
      }
    }
  ])
  
  const [editBtnDlg, setEditBtnDlg] = React.useState(false);
  const [editSizeOpen, setEditSizeOpen] = React.useState(false)
  const [detaiOpenDlg, setDettailOpenDlg] = React.useState(false)
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const navigate = useNavigate();

  const getProducts = async () => {
    try {
      const result = await ProductService.getAllProducts();
      setProducts(result.data)
    } catch(error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    getProducts();
  }, [])

  const handleEditBtnClick = () => setEditBtnDlg(!editBtnDlg)
  
  const handleEditSizeBtnClick = () => setEditSizeOpen(!editSizeOpen)

  const handleDetailsProductClick = () => setDettailOpenDlg(!detaiOpenDlg)

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = products.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    const prod = products.filter(item => item.id === id)
    setCurrProduct(prod[0])
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const deleteProduct = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this product!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  }

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - products.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(products).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [page, products, rowsPerPage],
  );

  const editProps = {
    editBtnDlg: editBtnDlg,
    handleEditBtnClick: handleEditBtnClick,
    product: currProduct
  }

  const editSizeProps = {
    product: currProduct,
    editSizeOpen: editSizeOpen,
    handleEditSizeBtnClick: handleEditSizeBtnClick
  }

  const detailPageProps = {
    productId: currProduct.id,
    product: currProduct,
    detaiOpenDlg: detaiOpenDlg,
    handleDetailsProductClick: handleDetailsProductClick
  }

  const classes = tablePaginationStyle();

  return (
    <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AdminDrawer />
        <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: "#f7f7ff", minHeight: "645px" }}>
          <DrawerHeader />           
          <Box sx={{ width: '100%', bgcolor: "#fff", p: 2, boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", borderRadius: "10px" }}>
            <Box sx={{width: "100%", border: '1px solid #f2f3f5', mb: 2, p: 1 }}>
              <Button sx={{ fontFamily: "poppins", cursor: 'pointer' }} variant="contained" 
                  size="medium" color='success' onClick={() => navigate('add')}>
                  <AddIcon sx={{ mr: 1 }} />
                  Add Product
              </Button>
              <Button sx={{ fontFamily: "poppins", ml: 2, cursor: 'pointer' }} variant="contained" 
                  size="medium" disabled={selected.length !== 1} color='primary' onClick={handleEditBtnClick}>
                  <EditIcon sx={{ mr: 1 }} />
                  Edit Product
              </Button>
              <Button sx={{ fontFamily: "poppins", ml: 2, cursor: 'pointer' }} variant="contained" 
                  size="medium" disabled={selected.length !== 1} color='error' onClick={deleteProduct}>
                  <DeleteIcon sx={{ mr: 1 }} />
                  Delete Product
              </Button>
              <Button sx={{ fontFamily: "poppins", ml: 2, cursor: 'pointer' }} variant="contained" 
                  size="medium" disabled={selected.length !== 1} color='secondary' onClick={handleDetailsProductClick}>
                  <VisibilityIcon sx={{ mr: 1 }} />
                    Product Details
              </Button>
              <EditSizeButton sx={{ fontFamily: "poppins", ml: 2, cursor: 'pointer' }} variant="contained" 
                  size="medium" disabled={selected.length !== 1} onClick={handleEditSizeBtnClick}>
                  <PhotoSizeSelectLargeIcon sx={{ mr: 1 }} />
                    Edit Size & Quantity
              </EditSizeButton>
            </Box>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <EnhancedTableToolbar numSelected={selected.length} />
              <TableContainer>
                <Table
                    sx={{ minWidth: 750 }}
                    aria-labelledby="tableTitle"
                    size={dense ? 'small' : 'medium'}
                >
                  <EnhancedTableHead
                      numSelected={selected.length}
                      onSelectAllClick={handleSelectAllClick}
                      rowCount={products.length}
                  />
                    <TableBody>
                      {visibleRows.map((row, index) => {
                        const isItemSelected = isSelected(row.id);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <TableRow
                              hover
                              onClick={(event) => handleClick(event, row.id)}
                              role="checkbox"
                              aria-checked={isItemSelected}
                              tabIndex={-1}
                              key={row.id}
                              selected={isItemSelected}
                              sx={{ cursor: 'pointer' }}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                  color="primary"
                                  checked={isItemSelected}
                                  inputProps={{
                                      'aria-labelledby': labelId,
                                  }}
                              />
                            </TableCell>
                            <TableCell
                                component="th"
                                id={labelId}
                                scope="row"
                                padding="none"
                                align='right'
                            >
                              <Avatar alt="Image" src={row.imagePath} />
                            </TableCell>
                            <TableCell >
                              <Typography fontFamily="poppins" fontSize="14px">
                                  {row.title}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography fontFamily="poppins" fontSize="14px">
                                  {row.price}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography fontFamily="poppins" fontSize="14px">
                                  {row.brand.name}
                              </Typography>
                            </TableCell>
                            <TableCell >
                              <Typography fontFamily="poppins" fontSize="14px">
                                  {row.rating}
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ width: "300px"}}>
                              <Typography fontFamily="poppins" className='turncate-product' fontSize="14px">
                                  {row.description}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                      {emptyRows > 0 && (
                        <TableRow
                          style={{
                              height: (dense ? 33 : 53) * emptyRows,
                          }}
                        >
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={products.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                classes={{
                  toolbar: classes.toolbar,
                  caption: classes.caption
                }}
              />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            />
          </Box>
          <Box>
            <EditAdminProduct {...editProps} />
          </Box>
          <Box>
            <EditProductSize {...editSizeProps} />
          </Box>
          <Box>
            <ProductDetails {...detailPageProps} />
          </Box>
        </Box>
    </Box>
  );
}