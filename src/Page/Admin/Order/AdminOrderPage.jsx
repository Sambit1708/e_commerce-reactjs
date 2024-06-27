import * as React from 'react'
import { Box, Checkbox, CssBaseline, Paper, Toolbar, Typography } from '@mui/material'
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';
import AdminDrawer from '../../../Components/AdminDrawer'
import { DrawerHeader, tablePaginationStyle } from '../../../Components/Common/CommonComponent'
import Products from '../../../Components/Common/Products';

const pendingStyle = {
    padding: 3,
    paddingLeft: 5,
    paddingRight: 5,
    width: "fit-content",
    backgroundColor: "rgba(0, 150, 199, 0.2)",
    color: "blue",
    fontFamily: "poppins",
    fontWeight: "500",
    fontSize: "10px"
}
const canceledStyle = {
    padding: 3,
    paddingLeft: 5,
    paddingRight: 5,
    width: "fit-content",
    backgroundColor: "rgba(215, 0, 64, 0.2)",
    color: "red",
    fontFamily: "poppins",
    fontWeight: "500",
    fontSize: "10px"
}
const compeletedStyle = {
    padding: 3,
    width: "fit-content",
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: "rgba(31, 214, 85, 0.2)",
    color: "green",
    fontFamily: "poppins",
    fontWeight: "500",
    fontSize: "10px"
}
const onHoldStyle = {
    padding: 3,
    width: "fit-content",
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: "rgba(250, 250, 5, 0.3)",
    color: "rgb(246, 190, 0)",
    fontFamily: "poppins",
    fontWeight: "500",
    fontSize: "10px"
}

function stableSort(array) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    return stabilizedThis.map((el) => el[0]);
}
  
function EnhancedTableHead(props) {
    const { onSelectAllClick, numSelected, rowCount } = props;

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
                    <Typography fontWeight="bold" fontFamily="poppins" >
                        No
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography fontWeight="bold" fontFamily="poppins" >
                        Status
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography fontWeight="bold" fontFamily="poppins" >
                        Customer
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography fontWeight="bold" fontFamily="poppins" >
                        Date
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography fontWeight="bold" fontFamily="poppins" >
                        Total
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
                    ORDERS
                </Typography>
            )}
        </Toolbar>
    );
}
  
EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};
  

const AdminOrderPage = () => {

  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = Products.orderDetails.map((n) => n.id);
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
    setSelected(newSelected);
    console.log(newSelected)
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - Products.orderDetails.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(Products.orderDetails).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [page, rowsPerPage],
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
                    <Box component='h5' fontFamily="poppins" fontWeight="500">Order Page</Box>
                    <Paper sx={{ width: '100%', mb: 2 }}>
                        <EnhancedTableToolbar numSelected={selected.length} />
                        <TableContainer>
                            <Table
                                sx={{ minWidth: 750 }}
                                aria-labelledby="tableTitle"
                                size='medium'
                            >
                                <EnhancedTableHead
                                    numSelected={selected.length}
                                    onSelectAllClick={handleSelectAllClick}
                                    rowCount={Products.orderDetails.length}
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
                                                <TableCell component="th" id={labelId}>
                                                    <Typography fontFamily="poppins">
                                                        #00{index+1}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography fontFamily="poppins">
                                                        <div style={(row.orderStatus === 'PENDING' || row.orderStatus === 'SHIPPED') ? pendingStyle : 
                                                                   (row.orderStatus === 'CANCELLED') ? canceledStyle : 
                                                                   (row.orderStatus === 'ON_HOLD') ? onHoldStyle : compeletedStyle}>
                                                            {row.orderStatus}
                                                        </div>
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography fontFamily="poppins">
                                                        Sambit Khandai
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography fontFamily="poppins">
                                                        {row.createdDate}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography fontFamily="poppins">
                                                        &#8377; {row.totalAmount}
                                                    </Typography>
                                                </TableCell>
                                                
                                            </TableRow>
                                        );
                                    })}
                                    {emptyRows > 0 && (
                                        <TableRow
                                        style={{
                                            height: (53) * emptyRows,
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
                            count={Products.orderDetails.length}
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
                </Box>
            </Box>
        </Box>
    )
}

export default AdminOrderPage