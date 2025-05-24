import axios from "axios";


const axiosService = axios.create({
    baseURL:`${import.meta.env.VITE_RENDER_URL}`,
    headers:{
        "Content-Type":"application/json"
    }
})


axiosService.interceptors.request.use((config)=>{
    const token = sessionStorage.getItem('token')
    if(token){
        config.headers.Authorization = `bearer ${token}`
    }
    return config
})

export default axiosService