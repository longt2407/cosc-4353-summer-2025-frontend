import axios from 'axios';

const API_URL = axios.create({baseURL: "http://localhost:4000"});

API_URL.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = `${token}`;
    }
    return req;
});

export default API_URL;