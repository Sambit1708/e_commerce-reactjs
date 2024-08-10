import Cookies from "js-cookie";

class CookieService {
  setCookie(name, value, options) {
    Cookies.set(name, value, options);
  }

  getCookie(name) {
    return Cookies.get(name);
  }

  removeCookie(name, options) {
    Cookies.remove(name, options);
  }
}
const cookieService = new CookieService();

export default cookieService;
