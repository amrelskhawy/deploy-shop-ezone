import axios from "axios";
//import { UserContext } from "../context/user.context";

// export const axiosInstance = axios.create({
//   baseURL: process.env.NODE_ENV === 'development' ? "https://data-test.ezone.ly/api/" : "", 
// });

export const axiosInstance = axios.create({
  baseURL: "https://data-test.ezone.ly/api/"
});

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      //logOut();
      
    }

    return Promise.reject(error);
  }
);



axiosInstance.interceptors.request.use(
  function (config) {

    config.headers.set('Content-Type','application/json');
    config.headers.set('shopname', 'brands');
    config.headers.set('sid', '6');
    
   // const user = JSON.parse(localStorage.getItem("user"));

    // if (user && user.token)
    //   config.headers.Authorization = `Bearer ${user.token}`;    

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

