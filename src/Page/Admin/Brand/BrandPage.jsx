import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { Box, CssBaseline, Button } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination } from '@mui/material';
import { TableRow, Toolbar, Typography, Paper, Checkbox, FormControlLabel } from '@mui/material';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import AdminDrawer from '../../../Components/AdminDrawer';
import { DrawerHeader, tablePaginationStyle } from '../../../Components/Common/CommonComponent';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditAdminBrand from './EditAdminBrand';
import Swal from 'sweetalert2'
import '../../../Assets/style.css'
import AdminBrandDetails from './AdminBrandDetails';
import AdminAddBrand from './AdminAddBrand';
import BrandService from '../../../Services/BrandService';
import { NavLink } from 'react-router-dom';

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
        <TableCell>
            <Typography textTransform="uppercase" fontWeight="bold" fontFamily="poppins" >
                Name
            </Typography>
          </TableCell>
        <TableCell>
            <Typography textTransform="uppercase" fontWeight="bold" fontFamily="poppins" >
                Products
            </Typography>
          </TableCell>
        <TableCell>
            <Typography textTransform="uppercase" fontWeight="bold" fontFamily="poppins" >
                Description
            </Typography>
          </TableCell>
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
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%', fontFamily: "poppins" }}
          variant="h6"
          fontWeight="bold"
          id="tableTitle"
          component="div"
        >
          BRANDS
        </Typography>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const BrandPage = () => {
  const [openAddBrand, setOpenAddBrand] = React.useState(false);
  const [openEditBrand, setEditBrand] = React.useState(false)
  const [openBrandDetail, setBrandDetail] = React.useState(false)
  const [brands, setBrands] = React.useState([
    {
      id: '',
      name: '',
      description: '',
      createDate: '',
      updateDate: ''
    }
  ])
  const [currBrand, setCurrBrand] = React.useState({
    id: "-",
    name: "-",
    description: "-",
    quantity: "-"
  })
  
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const getAllBrandForPage = async () => {
    const response = await BrandService.getAllBrand();
    setBrands(response.data);
  }

  React.useEffect(() => {
    getAllBrandForPage();
  }, [])

  const handleAddBrand = () => setOpenAddBrand(!openAddBrand);

  const handleEditBrand = () => setEditBrand(!openEditBrand);

  const handleBrandDetail = () => setBrandDetail(!openBrandDetail);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = brands.map((n) => n.id);
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
    const bnd = brands.filter(item => item.id === id)
    setSelected(newSelected);
    setCurrBrand(bnd[0])
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

  const deleteBrand = () => {
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

  const addBrandProps = {
    brandId: selected[0],
    openAddBrand: openAddBrand,
    setOpenAddBrand: setOpenAddBrand
  }

  const editBrandProps = {
    brand: currBrand,
    openEditBrand: openEditBrand,
    handleEditBrand: handleEditBrand
  }

  const brandDetailProps = {
    brandId: selected[0],
    openBrandDetail: openBrandDetail,
    handleBrandDetail: handleBrandDetail
  }

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - brands.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(brands).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [brands, page, rowsPerPage],
  );
  // then later
  
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
                  size="medium" color='success' onClick={handleAddBrand}>
                  <AddIcon sx={{ mr: 1 }} />
                  Add Brand
              </Button>
              <Button sx={{ fontFamily: "poppins", ml: 2, cursor: 'pointer' }} variant="contained" 
                  size="medium" disabled={selected.length !== 1} color='primary' onClick={handleEditBrand}>
                  <EditIcon sx={{ mr: 1 }} />
                  Edit Brand
              </Button>
              <Button sx={{ fontFamily: "poppins", ml: 2, cursor: 'pointer' }} variant="contained" 
                  size="medium" disabled={selected.length !== 1} color='error' onClick={deleteBrand}>
                  <DeleteIcon sx={{ mr: 1 }} />
                  Delete Brand
              </Button>
              <Button sx={{ fontFamily: "poppins", ml: 2, cursor: 'pointer' }} variant="contained" 
                  size="medium" disabled={selected.length !== 1} color='secondary' onClick={handleBrandDetail}>
                  <VisibilityIcon sx={{ mr: 1 }} />
                    Brand Details
              </Button>
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
                        rowCount={brands.length}
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
                            >
                                <Typography fontFamily="poppins">
                                    {row.name}
                                </Typography>
                            </TableCell>
                            <TableCell>
                              <NavLink to={'/admin/product'}>
                                <Typography fontFamily="poppins">Product</Typography>
                              </NavLink>
                            </TableCell>
                            <TableCell align='left' sx={{ width: "350px"}}>
                                <Typography fontFamily="poppins" className='turncate-brand'>
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
                count={brands.length}
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
          {openAddBrand ? <AdminAddBrand {...addBrandProps} />: ""}
          {openEditBrand ? <EditAdminBrand {...editBrandProps} /> : ""}
          {openBrandDetail ? <AdminBrandDetails {...brandDetailProps} /> : ""}
        </Box>
      </Box>
    </Box>
  )
}

export default BrandPage