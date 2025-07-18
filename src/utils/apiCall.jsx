import axios from 'axios';

const API_URL = axios.create({baseURL: "http://localhost:4000"});

API_URL.interceptors.request.use((req) => {
    localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTUzMjExMjIsImRhdGEiOnsiaWQiOjEsImVtYWlsIjoidm9sdW50ZWVyQGRvbWFpbi5jb20iLCJyb2xlIjowfSwiaWF0IjoxNzUyNzI5MTIyfQ.bwCUxnpYuwGoqQwtLxD3Wenv3DqfQw1_hkwCBo_zsA0");
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = `${token}`;
    }
    return req;
});

export default API_URL;