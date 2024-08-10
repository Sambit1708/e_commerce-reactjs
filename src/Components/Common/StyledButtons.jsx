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

const BuyNowButton = styled(Button)({
  textTransform: 'uppercase',
  fontSize: 16,
  padding: '6px 12px',
  border: '1px solid',
  lineHeight: 1.5,
  width: '100%',
  height: "56px",
  borderColor: '#fb641b',
  backgroundColor: "#fb641b",
  color: "#fff",
  boxShadow: `none`,
  fontFamily: [
    'Poppins',
    'sans-serif',
  ].join(','),
  '&:hover': {
    backgroundColor: '#f85404',
    borderColor: '#f85404',
    boxShadow: 'none'
  },
  '&:active': {
    boxShadow: `none`,
    backgroundColor: '#ff9f00'
  }
});

const AddToCartButton = styled(Button)({
  width: '100%',
  height: "56px",
  textTransform: 'uppercase',
  fontSize: 16,
  padding: '6px 12px',
  border: '1px solid',
  lineHeight: 1.5,
  borderColor: '#ff9f00',
  backgroundColor: "#ff9f00",
  color: "#fff",
  boxShadow: `none`,
  fontFamily: [
    'Poppins',
    'sans-serif',
  ].join(','),
  '&:hover': {
    backgroundColor: '#eb9300',
    borderColor: '#eb9300',
    boxShadow: 'none'
  },
  '&:active': {
    boxShadow: `none`,
    backgroundColor: '#ff9f00'
  }
});

export { AuthButton, EditSizeButton, BuyNowButton, AddToCartButton }