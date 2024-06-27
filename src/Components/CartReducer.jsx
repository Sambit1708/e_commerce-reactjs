const CartReducer = (state, action) => {
    if(action.type === "ADD_TO_CART") {
        let { size, product} = action.payload;
        
        const cartProduct = {
            productId: product.id,
            productSizeId: size.id
        }
        console.log(cartProduct)
        return {
            ...state,
            cart: [...state.cart, cartProduct]
        }
    }
    return state;
}

export default CartReducer