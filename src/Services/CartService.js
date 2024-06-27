import axios from "../Utils/axios"

const CART = "/cart";
const ADD_TO_CART = "/add_to_cart";
const UPDATE_CART = '/update_cart';
const REMOVE_CART = "/remove";
const ALL = '/getAll'

class CartService {

    addToCart(cart) {
        return axios.post(`${CART}${ADD_TO_CART}`, cart)
    }

    updateItemQuantity(cartId, data) {
        return axios({
            url: `${CART}${UPDATE_CART}`,
            method: 'put',
            data: data,
            params: {
                cartId: cartId
            }
        })
    }

    removeCartItem(cartItemId) {
        return axios({
            url: `${CART}${REMOVE_CART}`,
            method: 'delete',
            params: {
                cartItemId: cartItemId
            }
        })
    }

    getAllCartItem() {
        return axios.get(`${CART}${ALL}`)
    }

    getCartDetails() {
        return axios.get(`${CART}/get`)
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new CartService()