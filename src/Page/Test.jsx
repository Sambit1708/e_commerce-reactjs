import * as React from "react";
import { Box } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
// import Tooltip from '@mui/material/Tooltip';

const Test = () => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
    setTimeout(() => {
      handleClose();
    }, 1000);
  };

  return (
    <Box sx={{ bgcolor: "#f5f5f5", display: "grid", placeItems: "center" }}>
      <Button onClick={handleOpen} variant="outlined">
        Show backdrop
      </Button>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default Test;
