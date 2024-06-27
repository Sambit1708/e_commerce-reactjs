import * as React from "react";
import { alpha, Box, Checkbox, FormControlLabel, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Toolbar, Typography } from "@mui/material";
import PropTypes from 'prop-types';
import Products from '../../../Components/Common/Products';
import { tablePaginationStyle } from "./CommonComponent";

  
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
          {Products.brandHeads.map((headCell) => (
            <TableCell key={headCell.id}>
              <Typography textTransform="uppercase" fontWeight="bold" fontFamily="poppins" >
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
  
  const classes = tablePaginationStyle();

  const AdminTableHandler = (props) => {
    const [ dense, setDense ] = React.useState(false);
    const { selected, handleSelectAllClick, isSelected, handleClick, emptyRows, rowsPerPage, page, handleChangePage, handleChangeRowsPerPage, visibleRows } = props;
    
    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    return (
      <Box>
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
                      rowCount={Products.brandDetails.length}
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
                                    {row.title}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography fontFamily="poppins">
                                    Product
                                </Typography>
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
              count={Products.brandDetails.length}
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
    )
}
export { AdminTableHandler }