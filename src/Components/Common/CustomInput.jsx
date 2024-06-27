import * as React from 'react'
import { Box, FormControl, OutlinedInput, InputLabel, TextField, InputAdornment, IconButton } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const CustomInput = (props) => {
    const { type, label, i_id, i_class, name, required, size, defaultValue, cFullWidth } = props;

    return (
        <Box>
            <FormControl fullWidth={cFullWidth} color='success'>
                <label style={{ fontWeight: "500" }}>{label}</label>
                <TextField InputLabelProps={{style: {fontFamily: "poppins"}}}
                            InputProps={{style: {fontFamily: "poppins"}}} 
                            id={i_id} className={i_class} size={size}
                            fullWidth={cFullWidth} variant='outlined' type={type} name={name} 
                            required={required} defaultValue={ defaultValue != null ?  defaultValue : ''} />
            </FormControl>
        </Box>
    )
}

const CustomInput2 = (props) => {
    const { type, label, i_id, i_class, name, required, size, defaultValue, cFullWidth } = props;

    return (
        <Box>
            <TextField InputLabelProps={{style: {fontFamily: "poppins"}}}
                        InputProps={{style: {fontFamily: "poppins"}}} 
                        id={i_id} className={i_class} size={size} label={label}
                        fullWidth={cFullWidth} variant='outlined' type={type} name={name} 
                        required={required} defaultValue={ defaultValue != null ?  defaultValue : ''} 
            />
        </Box>
    )
}

const CustomInput3 = (props) => {
    const { type, label, i_id, i_class, name, required, size, defaultValue, cFullWidth, inputProps } = props;

    return (
        <Box>
            <TextField InputLabelProps={{style: {fontFamily: "poppins"}}}
                        id={i_id} className={i_class} size={size} label={label}
                        fullWidth={cFullWidth} variant='outlined' type={type} name={name} 
                        required={required} defaultValue={ defaultValue != null ?  defaultValue : ''} 
                        InputProps={{
                            startAdornment: inputProps,
                            style: {fontFamily: "poppins"}
                          }}
            />
        </Box>
    )
}

const CustomInputTextArea = (props) => {
    const { type, label, i_id, i_class, name, required, rows, defaultValue, cFullWidth } = props;

    return (
        <Box>
            <FormControl fullWidth>
                <label style={{ fontWeight: "500" }}>{label}</label>
                <TextField InputLabelProps={{style: {fontFamily: "poppins"}}}
                            InputProps={{style: {fontFamily: "poppins"}}} 
                            id={i_id} className={i_class} rows={rows} multiline
                            fullWidth={cFullWidth} variant='outlined' type={type} name={name} 
                            required={required} defaultValue={ defaultValue != null ?  defaultValue : ''} />
            </FormControl>
        </Box>
    )
}

const CustomInputTextArea2 = (props) => {
    const { type, label, i_id, i_class, name, required, rows, defaultValue, cFullWidth } = props;

    return (
        <Box>
            <TextField InputLabelProps={{style: {fontFamily: "poppins"}}}
                        InputProps={{style: {fontFamily: "poppins"}}} 
                        id={i_id} className={i_class} rows={rows} multiline label={label}
                        fullWidth={cFullWidth} variant='outlined' type={type} name={name} 
                        required={required} defaultValue={ defaultValue != null ?  defaultValue : ''} 
            />
        </Box>
    )
}

const CustomPasswordInput = (props) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const { label, i_id, i_class, name, required, size, 
            defaultValue, cFullWidth } = props;

    return (
        <Box>
            <FormControl sx={{ width: '25ch' }} variant="outlined">
                <InputLabel sx={{fontFamily: "poppins"}} htmlFor="password">{label}</InputLabel>
                <OutlinedInput
                    className={i_class} defaultValue={defaultValue} fullWidth={cFullWidth}
                    size={size} id={i_id} required={required} name={name}
                    sx={{fontFamily: "poppins"}}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label={label}
                />
            </FormControl>
        </Box>
    )
}


export { CustomInput, CustomInputTextArea, CustomInput2, CustomInputTextArea2, CustomInput3, CustomPasswordInput }