import axios from 'axios';
const axiosInstance = axios.create({
    //baseURL: 'http://127.0.0.1:3500/v1',
    baseURL: 'https://medmythica-api-rh5e6.ondigitalocean.app/v1/'
});
export default axiosInstance;

//baseURL: 'https://medmythica-api-rh5e6.ondigitalocean.app/v1/'    //baseURL: 'https://medmythica-api-rh5e6.ondigitalocean.app/v1/'
