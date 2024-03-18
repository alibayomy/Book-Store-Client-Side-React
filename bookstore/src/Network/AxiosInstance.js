import axios from "axios";
import { jwtDecode } from 'jwt-decode'
import { useContext } from "react";
import dayjs from 'dayjs'
import { AuthContext } from "../Context/AuthContext";



let authTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null

console.log("Authtokens", authTokens)
const baseURL = "http://127.0.0.1:8000"
const useAxios = () => {

    const {  setAuthTokens, setUser, loading, setLoading, user } = useContext(AuthContext)
    const axiosInstance = axios.create({
        baseURL,
        headers: { Authorization: `Bearer ${authTokens?.access}` }
    })

    axiosInstance.interceptors.request.use(async function (req) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        const user = jwtDecode(authTokens.access)
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

        if (!isExpired) {
            return req
        }
        const response = await axios.post(`${baseURL}/api/token/refresh/`, {
            refresh: authTokens.refresh
        })
        
        localStorage.setItem('authTokens', JSON.stringify(response.data))
        setAuthTokens(response.data)
        setUser(jwtDecode(response.data.access))
        req.headers.Authorization = `Bearer ${response.data.access}`
        return req
       
    }, function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    });

    axiosInstance.interceptors.response.use(function (response) {
        setLoading(false)
        return response;
    }, function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    });
    return axiosInstance
}

export default useAxios