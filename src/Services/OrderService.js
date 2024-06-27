import axios from "../Utils/axios"

const ORDER = '/order';
const ADD = '/add';

class OrderService {

    addOrder(data) {
        return axios.post(`${ORDER}${ADD}`, data);
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new OrderService()