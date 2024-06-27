import axios from '../Utils/axios'

const PRODUCT = '/product';
const ADD = '/add';
const ADD_IMG = '/add-img';
const ALL_PRODUCT = '/getAll';
const UPDATE_SIZE = '/update-size';
const UPDATE = '/update';

const BY_OCCASION = '/by-occasion';
const BY_IDEALFOR = '/by-idealFor';
const BY_TYPE = '/by-type';

class ProductService {

    addProduct(productData) {
        return axios({
            method: 'post',
            url: `${PRODUCT}${ADD}`,
            data: productData
        })
    }

    addImage(prodId, imgData) {
        return axios({
            method: 'post',
            url: `${PRODUCT}${ADD_IMG}/${prodId}`,
            data: imgData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
            
        })
    }

    getAllProducts() {
        return axios({
            method: 'get',
            url: `${PRODUCT}${ALL_PRODUCT}`,
        })
    }

    getProduct(prodId) {
        return axios({
            method: 'get',
            url: `${PRODUCT}/${prodId}`,
        })
    }

    updateProductSize(prodId, data) {
        console.log(data)
        return axios({
            method: 'put',
            url: `${PRODUCT}${UPDATE_SIZE}`,
            data: data,
            params: {
                prodId: prodId
            }
        })
    }

    updateProduct(prodId, data) {
        return axios({
            method: 'put',
            url: `${PRODUCT}${UPDATE}`,
            data: data,
            params: {
                prodId: prodId
            }
        })
    }

    getAllDistOccasions() {
        return axios({
            method: 'get',
            url: `${PRODUCT}${BY_OCCASION}`,
        })
    }

    getAllDistIdelFor() {
        return axios({
            method: 'get',
            url: `${PRODUCT}${BY_IDEALFOR}`,
        })
    }

    getAllDistType() {
        return axios({
            method: 'get',
            url: `${PRODUCT}${BY_TYPE}`,
        })
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ProductService();