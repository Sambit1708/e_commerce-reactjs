import axios from "../Utils/axios";

class SearchService {
  searchProducts(item) {
    return axios.get(`/search/${item}`);
  }
}
const searchService = new SearchService();
export default searchService;
