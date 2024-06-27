import axios from '../Utils/axios'

const BRAND = "/brand"
const ADD = "/add";
const ALL_BRAND = '/get'
const UPDATE = '/update'

class BrandService {

    addBrand(brand) {
        return axios.post(`${BRAND}${ADD}`, brand);
    }
    
    getAllBrand() {
        return axios.get(`${BRAND}${ALL_BRAND}`);
    }

    getBrandById(brandId) {
        return axios.get(`${BRAND}${ALL_BRAND}/${brandId}`);
    }

    updateBrand(brandId, brand) {
        return axios({
                    method: 'put',
                    url: `${BRAND}${UPDATE}`,
                    data: brand,
                    params: {
                        brandId: brandId
                    }
                })
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new BrandService();