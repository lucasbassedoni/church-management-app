import axios from 'axios';

axios.defaults.withCredentials = true;

const api = axios.create({
    baseURL: 'https://church-management-api-production.up.railway.app/', //backend URL
});

export default api;