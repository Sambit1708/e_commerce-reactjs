import * as React from 'react'
import reducer from './CartReducer'

const CartContext = React.createContext();

const initialState = {
  cart: [],
  total_item: "",
  total_amount: "",
  shipping_fee: ""
}

const CartProvider = ({children}) => {

  const [state, dispatch] = React.useReducer(reducer, initialState)

  const addToCart = ( size, product) => {
    dispatch({type: "ADD_TO_CART", payload: { size, product}})
  }

  return (
    <CartContext.Provider value={{...state, addToCart}}>
      {children}
    </CartContext.Provider>
  )
}

const useCartContext = () => {
  return React.useContext(CartContext)
}

export { CartProvider, useCartContext };