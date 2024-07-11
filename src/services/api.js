import axios from 'axios';

axios.defaults.withCredentials = true;

const api = axios.create({
    baseURL: 'http://church-management-api.vercel.app', //backend URL
});

export default api;