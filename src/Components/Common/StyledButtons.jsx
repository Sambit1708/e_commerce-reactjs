import { styled, Button } from '@mui/material'

const AuthButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: '#ffd333',
    borderColor: '#ffcb0c',
    color: "black",
    width: "200px",
    fontFamily: [
        'poppins',
    ].join(','),
    '&:hover': {
      backgroundColor: '#ffd333',
      borderColor: '#ffcb0c',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#ffd333',
      borderColor: '#ffcb0c',
    }
})


const EditSizeButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: 'none',
    lineHeight: 1.5,
    backgroundColor: '#ffa819',
    fontFamily: [
      'poppins',
    ].join(','),
    '&:hover': {
      backgroundColor: '#ff9f00',
      borderColor: '#ff9f00',
      boxShadow: 'rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;'
    },
    '&:active': {
      boxShadow: `none`,
      backgroundColor: '#ff9f00',
      border: 'none'
    }
});

export { AuthButton, EditSizeButton }