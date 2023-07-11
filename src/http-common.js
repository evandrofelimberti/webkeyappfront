import axios from "axios";
import UseToken from "./components/layout/UseToken";

const customAxios = axios.create({
    baseURL: process.env.REACT_APP_URL_API_WEB_APP_KEY,
    timeout: 1200000, 
    headers:{'Content-Type': 'application/json',},  
});

const getToken = () => {   
    const tokenString = localStorage.getItem('token');
    if (tokenString != ''){
        const userToken = JSON.parse(tokenString);
        return `Bearer ${userToken?.token}`;        
    } else {
      return '';
    }
  };

const requestHandler = request => {
    request.headers.Authorization = getToken();
    return request;
};

const responseHandler = response => {
    return response;
};

const errorHandler = error => {
    if (error.response.status === 401) {      
        localStorage.setItem('token','');    
        window.location.href = '/';  
    }
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