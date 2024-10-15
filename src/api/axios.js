import axios from "axios";

const instance = axios.create({
    baseURL: process.env.SERVER_URL || 'http://localhost:8000',
});

export default instance;