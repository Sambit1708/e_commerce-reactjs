import axios from '../Utils/axios'

const GENERATE_TOKEN = '/auth/generate-token'
const VALIDATE_TOKEN = '/auth/validate-token'

class LoginService {
    
    //TODO: to generate token through user details
    userLogin(loginData) {
        return axios.post(`${GENERATE_TOKEN}`, loginData)
    }

    //TODO: to get current user from localStorage
    setCurrentUser(User) {
        localStorage.setItem('user', JSON.stringify(User))
    }

    //TODO: to get current user from localStorage
    getCurrentUser() {
        const User = JSON.parse(localStorage.getItem('user'))
        return User;
    }

    //TODO: to get token
    getToken() {
        return localStorage.getItem('token')
    }

    //TODO: to set token
    setToken(token) {
        localStorage.setItem('token', token)
        return true;
    }
    
    //TODO: to set token
    validateToken() {
        const data = {
            token: localStorage.getItem('token')
        }
        return axios.post(`${VALIDATE_TOKEN}`, data);
    }

    //TODO: logging out
    logout() {
        if(localStorage.getItem('user') !== null && localStorage.getItem('token') !== null) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    }

    //TODO: to check if user is logged in or not
    async isLoggedin() {
        let tokenStr = localStorage.getItem('token');
        if(tokenStr === undefined || tokenStr === '' || tokenStr == null) {
            return false;
        } else {
            try {
                var tokenValidResponse = await this.validateToken();
                const tokenValidData = tokenValidResponse.data;
                if(tokenValidData.statusCode === "200") {
                    return true;
                }
                else {
                    this.logout();
                    return false;
                }
            } catch (error) {
                return false;
            }
        }
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new LoginService()