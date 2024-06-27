import axios from '../Utils/axios';
import LoginService from './LoginService';

const USER_PATH = "/user";
const ADD_USER = '/create-user';
const CURRENT_USER = '/auth/current-user';
const CURRENT_ADDRESS = '/address/current';
const ALL_ADDRESSES = '/address/getAll';
const ADD_ADDRESS = '/address/add';

class UserService {

    createUser(userData) {
        return axios.post(`${USER_PATH}${ADD_USER}`, userData)
    }

    //TODO: to get current user from Principle
    getCurrentUser() {
        return axios.get(`${CURRENT_USER}`)
    }

    getCurrentAddress() {
        return axios.get(`${USER_PATH}${CURRENT_ADDRESS}`)
    }

    getUserRole() {
        var userRoles = []
        try {
            const users = LoginService.getCurrentUser();
            userRoles = users.roles;
            return userRoles;
        } catch (error) {
            console.log(error)
            return userRoles;
        }
    }

    getAllAddresses() {
        return axios.get(`${USER_PATH}${ALL_ADDRESSES}`)
    }

    saveAddress(address) {
        return axios({
            method: 'post',
            url: `${USER_PATH}${ADD_ADDRESS}`,
            data: address,
            headers: {
                'Content-Type':'application/json'
            }
        })
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new UserService();