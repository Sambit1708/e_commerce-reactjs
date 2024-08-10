import axios from "../Utils/axios";
import cookieService from "./CookieService";

const GENERATE_TOKEN = "/auth/generate-token";
const VALIDATE_TOKEN = "/auth/validate-token";

class LoginService {
  //TODO: to generate token through user details
  userLogin(loginData) {
    return axios.post(`${GENERATE_TOKEN}`, loginData);
  }

  //TODO: to get current user from cookie
  setCurrentUser(User) {
    cookieService.setCookie("user", JSON.stringify(User));
  }

  //TODO: to get current user from cookie
  getCurrentUser() {
    const User = JSON.parse(cookieService.getCookie("user"));
    return User;
  }

  //TODO: to get token
  getToken() {
    return JSON.parse(cookieService.getCookie("token"));
  }

  //TODO: to set token
  setToken(token) {
    cookieService.setCookie("token", JSON.stringify(token));
    return true;
  }

  //TODO: to set token
  validateToken() {
    const data = {
      token: this.getToken(),
    };
    return axios.post(`${VALIDATE_TOKEN}`, data);
  }

  //TODO: logging out
  logout() {
    cookieService.removeCookie("user");
    cookieService.removeCookie("token");
    return true;
  }

  //TODO: to check if user is logged in or not
  async isLoggedin() {
    let tokenStr = this.getToken();
    if (tokenStr === undefined || tokenStr === "" || tokenStr == null) {
      return false;
    } else {
      try {
        var tokenValidResponse = await this.validateToken();
        const tokenValidData = tokenValidResponse.data;
        if (tokenValidData.statusCode === "200") {
          return true;
        } else {
          this.logout();
          return false;
        }
      } catch (error) {
        return false;
      }
    }
  }
}

const loginService = new LoginService();
export default loginService;
