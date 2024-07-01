import Axios from "axios";

const api = await Axios.create({
    baseURL: 'http://localhost:8080'
})

export default api;