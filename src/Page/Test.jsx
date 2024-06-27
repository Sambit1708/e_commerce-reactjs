import * as React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import '../Assets/style.css';

const Test = () => {
    
    return (
        <Box sx={{ bgcolor: "gray"  }}>
            <Box sx={{ bgcolor: "#fff", height: "842px", width: "595px", m: "auto", mt: "25px", border: "2px solid #d5d5d5", borderRadius: "5px" }}>
                <Box>
                    <Box className='header-invoice'>
                        <Box>
                            <Typography fontWeight="bold">Invoice</Typography>
                        </Box>
                        <Box>
                            <Box sx={{ display: "flex" }}>
                                <Typography fontWeight="bold">Invoice No:</Typography>
                                <Typography># 1</Typography>
                            </Box>
                            <Box sx={{ display: "flex" }}>
                                <Typography fontWeight="bold">Invoice Date:</Typography>
                                <Typography>25/06/2001</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )

}

export default Test