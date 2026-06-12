import axios from "axios";

const request = axios.create({
    baseURL: 'https://localhost:7225/api/v1/',
    // baseURL: 'https://sql8010.site4now.net/api/v1/',
    // baseURL: 'http://buiquiquyet-001-site1.jtempurl.com/api/vi',
    timeout: 3000000
})

request.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

request.interceptors.response.use(
    (response) => {
        return response.data
    }  ,
    (error) => {
        console.log(error);
    } 
)
// export const get = async (path, option = {}) => {
//     const res = await request.get(path, option)
//     return res.data
// }
// export const post = async (path, option = {}) => {
//     const res = await request.post(path, option)
//     return res.data
// }
export default request