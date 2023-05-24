import axios from "axios";

const customAxios = axios.create({
    baseURL: process.env.REACT_APP_URL_API_WEB_APP_KEY,
    timeout: 1200000, 
    headers:{'Content-Type': 'application/json',},  
});

const tokenString = localStorage.getItem('token');
var token = '';

if(tokenString != ''){
    const userToken = JSON.parse(tokenString);
    token = `Bearer ${userToken?.token}`;
}

const requestHandler = request => {
    request.headers.Authorization = token;
    return request;
};

const responseHandler = response => {
    if (response.status === 401) {
        window.location = '/login';
    }
    return response;
};

const errorHandler = error => {
    return Promise.reject(error);
};

customAxios.interceptors.request.use(
    (request) => requestHandler(request),
    (error) => errorHandler(error)
);

customAxios.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => errorHandler(error)
 );

export default customAxios;