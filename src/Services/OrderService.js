import axios from "../Utils/axios"

const ORDER = '/order';
const ADD = '/add';
const FETCH = '/fetch';
const ORDER_ITEMS = '/get/orderItems'
const USER_ORDER_ITEMS = '/get/all'
const ORDER_ITEM_SPECIFIC = '/item'

class OrderService {

    addOrder(data) {
        return axios.post(`${ORDER}${ADD}`, data);
    }

    getOrderById(id) {
        return axios({
            method: 'get',
            url: `${ORDER}${FETCH}`,
            params: {
                orderId: id
            }
        })
    }

    getOrderItemsByOrderId(orderId) {
        return axios({
            method: 'get',
            url: `${ORDER}${ORDER_ITEMS}`,
            params: {
                orderId: orderId
            }
        })
    }

    getAllOrderItemOfUser() {
        return axios({
            method: 'get',
            url: `${ORDER}${USER_ORDER_ITEMS}`
        })
    }

    getAllOrderItemById(orderItemId) {
        return axios({
            method: 'get',
            url: `${ORDER}${ORDER_ITEM_SPECIFIC}/${orderItemId}`,
        })
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new OrderService()