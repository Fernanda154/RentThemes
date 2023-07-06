import axios from "axios";

const api = axios.create({
 baseURL: "http://3.128.249.166:8000/api",
});

export default api;