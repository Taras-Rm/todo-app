import axios from "axios";

const api = axios.create({ baseURL: "https://todo-app-server-snnr.onrender.com/api" });

export default api;
