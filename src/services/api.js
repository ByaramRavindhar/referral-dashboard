import axios from "axios";

const api = axios.create({
  baseURL:
    "https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api",
});

export default api;